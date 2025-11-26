import { MyContext } from '../../../typings/context';
import { redis } from '../../../bot';
import { User } from '../../../models/user';
import { IActiveTask, tasksKeyboard } from './sendTasks';
import { subText } from '../../../texts';
import { providers } from './providers';
import { generatePhoto, ImageData } from '../../../actions/mediaHandler';

export const checkSubscribes = async (ctx: MyContext, providerName: string) => {
  const provider = providers[providerName];
  if (!provider) return { isSubscribed: true, unsubscribedTasks: [] };

  const tasks = await provider.getTasks(ctx);
  if (!tasks || tasks.length === 0) {
    return { isSubscribed: true, unsubscribedTasks: [] };
  }

  return await provider.checkSubscriptions(ctx, tasks);
};

export const checkButtonCQ = async (ctx: MyContext) => {
  const providerName = ctx.callbackQuery?.data?.split('check_subs_')[1];
  if (!providerName) return;

  const { isSubscribed, unsubscribedTasks } = await checkSubscribes(
    ctx,
    providerName
  );

  if (!isSubscribed && unsubscribedTasks.length > 0) {
    try {
      await ctx.editMessageText(subText, {
        reply_markup: tasksKeyboard(unsubscribedTasks, providerName),
      });
    } catch (error) {
    } finally {
      await ctx.answerCallbackQuery('Не все задания выполнены =(');
    }
    return;
  }

  //@ts-ignore
  const activeTask: IActiveTask = await redis.hgetall(
    `activeTasks:${ctx.from.id}:${providerName}`
  );

  if (activeTask?.subCount > 0) {
    await User.updateOne(
      { telegram_id: ctx.from.id },
      {
        $inc: { subCount: activeTask.subCount },
        $set: { completeFirstSubs: true },
      }
    );
  }

  const user = await User.findOne({ telegram_id: ctx.from.id });
  if (user) {
    user.usedProviders.set(
      providerName,
      (user.usedProviders.get(providerName) || 0) + 1
    );
    await user.save();
  }

  try {
    await ctx.deleteMessage();
  } catch {}

  const raw = await redis.get(String(ctx.from.id));
  const data: ImageData = JSON.parse(raw || '{}');

  await generatePhoto(ctx);
};

export const setUsedProvider = async (provider: string, userId: number) => {
  const user = await User.findOne({ telegram_id: userId });
  if (user) {
    user.usedProviders.set(
      provider,
      (user.usedProviders.get(provider) || 0) + 1
    );
    await user.save();
  }
};
