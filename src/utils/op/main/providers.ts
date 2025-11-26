// providers/registry.ts
import { MyContext } from '../../../typings/context';
import { getSubGramTasks, checkSubGramSubscribes } from '../subGramManager';
import { getFlyerTasks, checkFlyerSubscribes } from '../flyerManager';
import { getTgrassTasks, checkTgrassSubscribes } from '../tgrassManager';
import { getFakeGramTasks, checkFakeGramSubscribes } from '../FakeGrumManager';

export type Task = {
  link?: string;
  links?: string[];
  type?: string;
  task?: string;
  status?: 'subscribed' | 'unsubscribed' | 'incomplete';
  subscribed?: boolean;
};

export interface TaskProvider {
  name: string;
  priority: number;

  getTasks: (ctx: MyContext) => Promise<Task[] | null>;

  checkSubscriptions: (
    ctx: MyContext,
    tasks: Task[]
  ) => Promise<{
    isSubscribed: boolean;
    unsubscribedTasks: Task[];
  }>;

  getButtonText?: (task: Task) => string;

  getUrl: (task: Task) => string;
}

export const providers: Record<string, TaskProvider> = {
  subgram: {
    name: 'subgram',
    priority: 1,
    getTasks: getSubGramTasks,
    checkSubscriptions: async (ctx, tasks) => {
      const links = tasks.map(t => t.link!);
      const isSubscribed = await checkSubGramSubscribes(ctx, links);
      const unsubscribedTasks = tasks.filter(t => t.status === 'unsubscribed');
      return { isSubscribed, unsubscribedTasks };
    },
    getButtonText: task => {
      return task.type === 'channel'
        ? '📢 Канал'
        : task.type === 'bot'
          ? '🚀 Бот'
          : '🔗 Перейти';
    },
    getUrl: task => task.link,
  },

  flyer: {
    name: 'flyer',
    priority: 2,
    getTasks: getFlyerTasks,
    checkSubscriptions: async ctx => {
      const { isAllSubs, checkedTasks } = await checkFlyerSubscribes(ctx);
      const unsubscribedTasks = checkedTasks.filter(
        t => t.status === 'incomplete'
      );
      return { isSubscribed: isAllSubs, unsubscribedTasks };
    },
    getButtonText: task => {
      return task.type === 'subscribe channel'
        ? '📢 Канал'
        : task.type === 'start bot'
          ? '🚀 Бот'
          : '🔗 Перейти';
    },
    getUrl: task => task.links[0] || '',
  },

  tgrass: {
    name: 'tgrass',
    priority: 3,
    getTasks: getTgrassTasks,
    checkSubscriptions: async (ctx, tasks) => {
      const isSubscribed = await checkTgrassSubscribes(ctx);
      const unsubscribedTasks = tasks.filter(t => !t.subscribed);
      return { isSubscribed, unsubscribedTasks };
    },
    getButtonText: task => {
      return task.type === 'channel'
        ? '📢 Канал'
        : task.type === 'bot'
          ? '🚀 Бот'
          : '🔗 Перейти';
    },
    getUrl: task => task.link,
  },

  // fake: {
  //   name: 'fake',
  //   priority: 99,
  //   getTasks: getFakeGramTasks,
  //   checkSubscriptions: async (ctx, tasks) => {
  //     const links = tasks.map(t => t.link!);
  //     const isSubscribed = await checkFakeGramSubscribes(ctx, links);
  //     return {
  //       isSubscribed,
  //       unsubscribedTasks: tasks.filter(t => !t.subscribed),
  //     };
  //   },
  //   getButtonText: task => {
  //     return task.type === 'channel'
  //       ? '📢 Канал'
  //       : task.type === 'bot'
  //         ? '🚀 Бот'
  //         : '🔗 Перейти';
  //   },
  //   getUrl: task => task.link!,
  // },
};
