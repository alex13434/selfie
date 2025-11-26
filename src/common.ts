import { InlineKeyboard } from 'grammy';
import config from './typings/config';

export const ACTIVETASKSTIME = 10 * 60;

export const persons = [
  {
    name: '🧔🏻 Павел Дуров',
    personIndex: 0,
    imageUrl:
      'https://i.pinimg.com/1200x/eb/ad/63/ebad630320f80e8f47b8eed319aa4f88.jpg',
  },
  {
    name: '⚽ Роналду',
    personIndex: 1,
    imageUrl:
      'https://i.pinimg.com/1200x/48/49/ba/4849ba2ea6517f805785071120cccc08.jpg',
  },
  {
    name: '🎰 Мелстрой',
    personIndex: 2,
    imageUrl:
      'https://i.pinimg.com/736x/40/53/9d/40539d83dabdb3daffcc6fc7094345dc.jpg',
  },
  {
    name: '👱🏼‍♂️ Трамп',
    personIndex: 3,
    imageUrl:
      'https://i.pinimg.com/736x/ca/9a/00/ca9a00e3439f75d180bfa29b3c94b56d.jpg',
  },
  {
    name: '🧻 Влад A4',
    personIndex: 4,
    imageUrl:
      'https://i.pinimg.com/736x/cc/1f/36/cc1f36285cf06fbdd98f552c3ad21e85.jpg',
  },
  {
    name: '🐐 Месси',
    personIndex: 5,
    imageUrl:
      'https://i.pinimg.com/736x/ad/d6/6d/add66d13ff8be284f609a31e2c9bf587.jpg',
  },
  {
    name: '💋 Инстасамка',
    personIndex: 6,
    imageUrl:
      'https://i.pinimg.com/736x/fa/98/97/fa98971c5ad88b45282914e1362a0a40.jpg',
  },
  {
    name: '🎤 Егор Крид',
    personIndex: 7,
    imageUrl:
      'https://i.pinimg.com/736x/37/36/22/373622d8025119c51f2a608c780b412b.jpg',
  },
  {
    name: '👔 Аль Пачино',
    personIndex: 8,
    imageUrl:
      'https://i.pinimg.com/736x/fb/d0/8e/fbd08e4fd4b4ab0f2ac8514715d27c69.jpg',
  },
  {
    name: '👀 Элджей',
    personIndex: 9,
    imageUrl:
      'https://i.pinimg.com/1200x/0d/c6/93/0dc693410f57b7099748e83fff3e50c8.jpg',
  },
  {
    name: '🔥 Моргенштерн',
    personIndex: 10,
    imageUrl:
      'https://i.pinimg.com/1200x/49/26/83/492683c932cefc0e74ec8193ccc4d890.jpg',
  },
  {
    name: '🎸 Макс Корж',
    personIndex: 11,
    imageUrl:
      'https://i.pinimg.com/1200x/2a/5d/44/2a5d4416679cc52ed6b91462dc8e8766.jpg',
  },
  {
    name: '🎶 Билли Айлиш',
    personIndex: 12,
    imageUrl:
      'https://i.pinimg.com/736x/c8/3d/ad/c83dad026b65f716b5a931655a2f63e8.jpg',
  },
  {
    name: '👨🏼‍🦲 Джон Синс',
    personIndex: 13,
    imageUrl:
      'https://i.pinimg.com/736x/57/37/09/573709dcd6c2096928e6b97fe35ca28e.jpg',
  },
  {
    name: '💰 Мистер Бист',
    personIndex: 14,
    imageUrl:
      'https://i.pinimg.com/1200x/87/67/62/8767623ced0908c3dc251f67ff80e81c.jpg',
  },
  {
    name: '🎙 Баста',
    personIndex: 15,
    imageUrl:
      'https://i.pinimg.com/736x/56/8e/5e/568e5e3fe9cf4ca45e6bcd2718ff6fdc.jpg',
  },
  {
    name: '🚀 Илон Маск',
    personIndex: 16,
    imageUrl:
      'https://i.pinimg.com/1200x/3a/98/19/3a98190b458c7fab6161e7ff8d127789.jpg',
  },
  {
    name: '🎮 Папич',
    personIndex: 17,
    imageUrl:
      'https://i.pinimg.com/736x/12/43/a8/1243a8a26f4e116ad1caf4ecf72c6b29.jpg',
  },
  {
    name: '🪨 Скала',
    personIndex: 18,
    imageUrl:
      'https://i.pinimg.com/1200x/82/98/41/829841369d3f131b7426a0b0f75f48e1.jpg',
  },
  {
    name: '🎬 ДиКаприо',
    personIndex: 19,
    imageUrl:
      'https://i.pinimg.com/736x/c7/de/5a/c7de5a7a62839583ee6268c783676c1f.jpg',
  },
  {
    name: '👴🏻 Зубарев',
    personIndex: 20,
    imageUrl:
      'https://i.pinimg.com/736x/d0/5b/74/d05b7440c210e3178006472150e24d7a.jpg',
  },
  {
    name: '🤡 Иван Золо',
    personIndex: 21,
    imageUrl:
      'https://i.pinimg.com/736x/16/b9/ed/16b9edcf788f20928bc3af3e1fab068f.jpg',
  },
  {
    name: '👦🏻 Анар',
    personIndex: 22,
    imageUrl:
      'https://i.pinimg.com/736x/f1/a6/ac/f1a6aca3e55964b812c8e07b43834621.jpg',
  },
  {
    name: '🎧 Оксимирон',
    personIndex: 23,
    imageUrl:
      'https://i.pinimg.com/736x/a8/63/78/a863789869e58dbad87ead027209827f.jpg',
  },
  {
    name: '🔞 Ева Элфи',
    personIndex: 24,
    imageUrl:
      'https://i.pinimg.com/736x/39/46/13/394613a5cde0d894e8f96ccb2df6f925.jpg',
  },
  {
    name: '🧳 Зеленский',
    personIndex: 25,
    imageUrl:
      'https://i.pinimg.com/736x/20/3d/cb/203dcb07532f73954503d1a03564c912.jpg',
  },
  {
    name: '⚜️ Путин',
    personIndex: 26,
    imageUrl:
      'https://i.pinimg.com/736x/8f/70/33/8f70331a741470b548487e7415a01752.jpg',
  },
  {
    name: '🥔 Лукашенко',
    personIndex: 27,
    imageUrl:
      'https://i.pinimg.com/736x/84/70/c8/8470c8215b6db3d417606dd214e14711.jpg',
  },
  {
    name: '🧔🏼 Брэд Питт',
    personIndex: 28,
    imageUrl:
      'https://i.pinimg.com/736x/3d/f2/aa/3df2aa73a860c4fd2ea12485460af425.jpg',
  },
  {
    name: '🦾 Арнольд',
    personIndex: 29,
    imageUrl:
      'https://i.pinimg.com/1200x/c3/61/b4/c361b4ee7f30ad2b50d81a35c8d0da77.jpg',
  },
  {
    name: '🇰🇵 Ким Чен Ын',
    personIndex: 30,
    imageUrl:
      'https://i.pinimg.com/1200x/64/8f/ae/648fae1fde79cd436526e60631b97af6.jpg',
  },
  {
    name: '🎩 Томас Шелби',
    personIndex: 31,
    imageUrl:
      'https://i.pinimg.com/736x/4a/d2/ad/4ad2ad3bb1ebbe4c38efb98a7e9e2bfd.jpg',
  },
  {
    name: '🔪 Патрик Бейтман',
    personIndex: 32,
    imageUrl:
      'https://i.pinimg.com/1200x/d3/c8/47/d3c847d0adb2664223cef8902cdfc8ea.jpg',
  },
];
// generations : cost
export const items: Record<number, number[]> = {
  0: [1, 5],
  1: [5, 20],
  2: [10, 30],
};

export const getGenEnding = (days: number) => {
  if (days % 10 === 1 && days % 100 !== 11) {
    return 'генерация';
  } else if (
    [2, 3, 4].includes(days % 10) &&
    ![12, 13, 14].includes(days % 100)
  ) {
    return 'генерации';
  } else {
    return 'генераций';
  }
};

export const donate_kb = (user_id: number) => {
  const keyboard = new InlineKeyboard();

  Object.entries(items).forEach(([key, [gens, cost]]) => {
    const text = `${key == '0' ? '🪄' : key == '1' ? '🦋' : '🔥'} ${gens} ${getGenEnding(gens)} • ${cost} ⭐️`;

    keyboard.text(text, `buy_gens_${key}`).row();
  });

  keyboard.copyText(
    `🔗 Ссылка для друга`,
    `https://t.me/${config.BOT_USERNAME}?start=R_${user_id}`
  );

  return keyboard;
};

export const pCommands = [
  { command: '/start', description: '📸 Создать фото' },
  { command: '/free', description: '🖼 Генерации за друзей' },
];

export const invite_menu_kb = (user_id: number) =>
  new InlineKeyboard()
    .url(
      '➡️ Отправить другу',
      `https://t.me/share/url?url=https://t.me/${config.BOT_USERNAME}?start=R_${user_id}`
    )
    .row()
    .copyText(
      '🔗 Ссылка для друга',
      `https://t.me/${config.BOT_USERNAME}?start=R_${user_id}`
    );

// admin
export const cancel_add_meme_conv_kb = new InlineKeyboard().text(
  '❌ Отменить',
  'cancel_add_meme_conv'
);

export const cancel_mail_conv_kb = new InlineKeyboard().text(
  '❌ Отменить',
  'cancel_mail_conv'
);

export const cancel_mailing_kb = new InlineKeyboard().text(
  '❌ Отменить',
  'cancel_mailing'
);

export const pause_mailing_kb = new InlineKeyboard()
  .text('⏸ Пауза', 'pause_mailing')
  .text('❌ Отменить', 'cancel_mailing');

export const resume_mailing_kb = new InlineKeyboard()
  .text('▶️ Возобновить', 'resume_mailing')
  .text('❌ Отменить', 'cancel_mailing');

export const start_mail_conv_kb = new InlineKeyboard()
  .text('✅ Старт', 'go_mail_conv')
  .text('❌ Отменить', 'cancel_mail_conv');

export const choise_rec_kb = new InlineKeyboard()
  .text('Юзеры', 'choise_users')
  .text('Группы', 'choise_groups')
  .text('Все', 'choise_all')
  .row()
  .text('❌ Отменить', 'cancel_mail_conv');

export const get_file_kb = new InlineKeyboard()
  .text('📄 .txt', 'get_file')
  .text('📊 Рефы', 'ref_menu');
