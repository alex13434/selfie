import { MyContext } from '../../typings/context';

const tasks = [
  { link: 'https://t.me/emojimg', subscribed: false, type: 'channel' },
];

export const getFakeGramTasks = async (ctx: MyContext) => {
  for (let i = 0; i < tasks.length; i++) {
    try {
      const checkUser = await ctx.api.getChatMember(
        '@' + tasks[i].link.split('https://t.me/')[1],
        ctx.from.id
      );
      if (checkUser.status !== 'left') {
        tasks[i].subscribed = true;
      }
    } catch (error) {}
  }
  return tasks;
};

export const checkFakeGramSubscribes = async (
  ctx: MyContext,
  links: string[]
) => {
  let isSubscribed = true;
  for (let i = 0; i < links.length; i++) {
    try {
      const checkUser = await ctx.api.getChatMember(
        '@' + links[i].split('https://t.me/')[1],
        ctx.from.id
      );
      if (checkUser.status == 'left') {
        isSubscribed = false;
        return;
      }
    } catch (error) {
      return isSubscribed;
    }
  }

  return isSubscribed;
};
