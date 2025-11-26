import { InlineKeyboard } from 'grammy';
import { EditOrSend } from '../../../helpers/EditOrSend';
import { subText } from '../../../texts';
import { MyContext } from '../../../typings/context';
import { redis } from '../../../bot';
import { User } from '../../../models/user';
import { checkSubscribes } from './taskManager';
import { providers, TaskProvider } from './providers';

export interface IActiveTask {
  user_id: number;
  message_id: number;
  provider: string;
  subCount: number;
  sentAt: Date;
}

export const tasksKeyboard = (tasks: any[], providerName: string) => {
  const provider = providers[providerName];

  const keyboard = new InlineKeyboard();

  tasks.forEach((task, i) => {
    const text = provider.getButtonText(task);

    const url = provider.getUrl(task);
    keyboard.url(text, url);

    if (i % 2 === 1 || i === tasks.length - 1) {
      keyboard.row();
    }
  });

  return keyboard.text('Проверить ✅', `check_subs_${providerName}`);
};

export const sendTasks = async (
  ctx: MyContext
): Promise<'completed' | 'incompleted' | 'no_tasks'> => {
  const userId = ctx.from.id;

  const oldKeys = await redis.keys(`activeTasks:${userId}:*`);
  for (const key of oldKeys) {
    //@ts-ignore
    const task: IActiveTask = await redis.hgetall(key);
    if (task?.message_id) {
      try {
        await ctx.api.deleteMessage(ctx.chat.id, task.message_id);
      } catch {}
    }
    await redis.del(key);
  }

  const user = await User.findOne({ telegram_id: userId });
  const usedProviders = user?.usedProviders || new Map<string, number>();

  let selectedProvider: TaskProvider | null = null;
  let minUsage = Infinity;

  for (const provider of Object.values(providers)) {
    const usage = usedProviders.get(provider.name) || 0;

    if (
      usage < minUsage ||
      (usage === minUsage &&
        provider.priority < (selectedProvider?.priority || Infinity))
    ) {
      minUsage = usage;
      selectedProvider = provider;
    }
  }

  if (!selectedProvider) return 'no_tasks';

  const providerName = selectedProvider.name;
  console.log('Выбран провайдер:', providerName);

  const { isSubscribed, unsubscribedTasks } = await checkSubscribes(
    ctx,
    providerName
  );

  if (isSubscribed) {
    user.usedProviders.set(
      providerName,
      (usedProviders.get(providerName) || 0) + 1
    );
    await user.save();
    return 'completed';
  }

  if (unsubscribedTasks.length > 0) {
    try {
      const message = await EditOrSend(ctx, subText, {
        reply_markup: tasksKeyboard(unsubscribedTasks, providerName),
      });

      const activeTask: IActiveTask = {
        user_id: userId,
        //@ts-ignore
        message_id: message.message_id,
        provider: providerName,
        subCount: unsubscribedTasks.length,
        sentAt: new Date(),
      };

      await redis.hset(`activeTasks:${userId}:${providerName}`, activeTask);
    } catch (error) {
      console.error('Ошибка отправки заданий:', error);
    }
    return 'incompleted';
  }

  user.usedProviders.set(
    providerName,
    (usedProviders.get(providerName) || 0) + 1
  );
  await user!.save();
  return 'no_tasks';
};
