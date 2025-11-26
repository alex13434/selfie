import { InputFile } from 'grammy';
import { redis } from '../bot';
import { groupStartText, mainText } from '../texts';
import { MyContext } from '../typings/context';
import { InputMediaBuilder } from 'grammy';
import { User } from '../models/user';

const assetsFolder = 'assets/';

const paths = [`1.jpg`, '2.jpg', '3.jpg', '4.jpg'];

export const startHandler = async (ctx: MyContext) => {
  if ((await redis.get(String(ctx.chat.id))) == '1') {
  } else {
    const files = paths.map(path => new InputFile(assetsFolder + path));
    const media = files.map(file => {
      return InputMediaBuilder.photo(file, {
        caption:
          file.filename === paths[0]
            ? '🔥 <b>Могу сгенерировать такое из твоего фото</b>'
            : undefined,
        parse_mode: 'HTML',
      });
    });
    await ctx.api.sendMediaGroup(ctx.chat.id, media);
    await redis.set(String(ctx.chat.id), '1');
  }
  const { generations } = await User.findOne({ telegram_id: ctx.from.id });
  await ctx.api.sendMessage(ctx.chat.id, mainText(generations));
};

export const groupStartHandler = async (ctx: MyContext) => {
  const isProcessed = await redis.get(`groupStart:${ctx.chat.id}`);
  if (!(isProcessed == '0')) {
    await redis.set(`groupStart:${ctx.chat.id}`, 0);
  } else {
    await ctx.api.sendMessage(ctx.chat.id, groupStartText());
  }
};
