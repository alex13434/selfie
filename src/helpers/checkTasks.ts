import { Api } from 'grammy';
import { IUser, User } from '../models/user';
import { MyContext } from '../typings/context';
import { sendTasks } from '../utils/op/main/sendTasks';

export const checkTasks = async (ctx: MyContext) => {
  const result = await sendTasks(ctx);
  return result;
};

export const giveFriendReward = async (api: Api, user: IUser) => {
  const inviterId = Number(user.ref_name.split('R_')[1]);
  if (user.usedGenCount == 0) {
    const userInviter = await User.findOne({
      telegram_id: inviterId,
    });
    await userInviter.updateOne({ $inc: { generations: 2 } });
    await userInviter.save();
    await api.sendMessage(
      inviterId,
      `<b>🫂 Ваш друг сгенерировал фото!</b>\n\n<blockquote>🥳 Вы получили <b>+2 генерации</b> на баланс</blockquote>`
    );
  }
};
