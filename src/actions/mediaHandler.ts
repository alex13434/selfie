import { MyContext } from '../typings/context';
import { InlineKeyboard } from 'grammy';
import { NanoBananaAPI } from '../utils/NanoBananaAPI';
import { User } from '../models/user';
import { checkTasks } from '../helpers/checkTasks';
import { donate_kb, persons } from '../common';
import { redis } from '../bot';
import { zeroGensText } from '../texts';
import { PhotoSize } from 'grammy/types';

export const nanoAPI = new NanoBananaAPI('09f7c9fc49fcfaed1b7950557af5e6da');

export interface ImageData {
  file_id?: string;
  entryMessageId?: number;
  personIndex?: number;
}

export const makePersonKeyboard = (photo: PhotoSize) => {
  const keyboard = new InlineKeyboard();

  for (let i = 0; i < persons.length; i += 2) {
    const row = [];

    row.push(
      InlineKeyboard.text(
        persons[i].name,
        `person_${i}_${photo.file_unique_id}`
      )
    );

    if (i + 1 < persons.length) {
      row.push(
        InlineKeyboard.text(
          persons[i + 1].name,
          `person_${i + 1}_${photo.file_unique_id}`
        )
      );
    }

    keyboard.row(...row);
  }

  return keyboard;
};

const updateUserImageData = async (
  userId: string,
  updates: Partial<ImageData>
) => {
  const rawData = await redis.get(userId);
  const currentData: ImageData = rawData ? JSON.parse(rawData) : {};

  const newData: ImageData = {
    ...currentData,
    ...updates,
  };

  await redis.set(userId, JSON.stringify(newData));
  return newData;
};

export const mediaHandler = async (ctx: MyContext) => {
  const message = ctx.message;
  if (!message || !('photo' in message)) return;

  await ctx.deleteMessage();

  const photo = message.photo![message.photo!.length - 1];
  const kb = makePersonKeyboard(photo);

  const photoMessage = await ctx.api.sendPhoto(ctx.chat!.id, photo.file_id, {
    reply_markup: kb,
  });

  await redis.set(photo.file_unique_id, photo.file_id);
  await updateUserImageData(String(ctx.from.id), {
    file_id: photo.file_id,
    entryMessageId: photoMessage.message_id,
  });
};

export const choosePersonCQ = async (ctx: MyContext) => {
  const callbackData = ctx.callbackQuery?.data;
  if (!callbackData) return;

  const parts = callbackData.split('_');
  const personIndex = Number(parts[1]);

  const photo =
    ctx.callbackQuery.message.photo![
      ctx.callbackQuery.message.photo!.length - 1
    ];

  await updateUserImageData(String(ctx.from.id), {
    entryMessageId: ctx.callbackQuery.message.message_id,
    personIndex,
    file_id: photo.file_id,
  });

  await ctx.answerCallbackQuery();

  const result = await checkTasks(ctx);
  if (result === 'completed' || result === 'no_tasks') {
    await generatePhoto(ctx);
  }
};

export async function generatePhoto(ctx: MyContext) {
  const userId = ctx.from.id;

  const raw = await redis.get(String(ctx.from.id));
  const data: ImageData = JSON.parse(raw || '{}');

  // === 2. Проверяем баланс ===
  const user = await User.findOne({ telegram_id: userId });
  if (!user || user.generations < 1) {
    return ctx.reply(zeroGensText, {
      reply_markup: donate_kb(userId),
    });
  }

  // === 3. Списываем генерацию ===
  await User.updateOne(
    { telegram_id: userId },
    { $inc: { usedGenCount: 1, generations: -1 } }
  );

  // === 4. Скачиваем файлы ===
  let photoUrl: string;
  try {
    const file = await ctx.api.getFile(data.file_id);
    photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;
  } catch (error: any) {
    await ctx.reply(`Ошибка загрузки фото: ${error.message}`, {
      reply_to_message_id: data.entryMessageId,
    });
    return;
  }

  // === 5. Уведомление ===
  await ctx.reply(
    '📸 <b>Генерирую фото...</b>\n\n<blockquote>⏰ Это займёт ~30-60 секунд</blockquote>',
    { reply_to_message_id: data.entryMessageId }
  );

  // === 6. Запуск генерации ===
  console.log();
  try {
    const taskId = await nanoAPI.generateImage(
      `A realistic photo of two people happily hugging each other, looking at camera, high quality, natural lighting, detailed faces, professional photography`,
      {
        type: 'TEXTTOIAMGE',
        numImages: 1,
        imageUrls: [photoUrl, persons[data.personIndex].imageUrl],
        watermark: false,
      }
    );

    const task = {
      taskId,
      userId,
      chatId: ctx.chat.id,
      photoUrls: [photoUrl],
      createdAt: Date.now(),
      status: 'pending' as const,
    };

    await redis.set(
      `generate:task:${taskId}`,
      JSON.stringify(task),
      'EX',
      3600
    );
    await redis.sadd('generate:active_tasks', taskId);
  } catch (error: any) {
    await ctx.reply(`Ошибка запуска генерации: ${error.message}`, {
      reply_to_message_id: data.entryMessageId,
    });
  }
}
