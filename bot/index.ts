import day from 'dayjs';
import { Telegraf } from 'telegraf';

import { MRecord } from './types';
import { supabase } from './supa';
import { botToken, SUPABASE_RECORDS, webhook } from './config';
import { dateDiffByDay, formatRecords, getAllRecords } from './utils';

export const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome to _lmmmmmm\'s bot.');
});

bot.command('history', async (ctx) => {
  try {
    const records = await getAllRecords();
    ctx.replyWithMarkdownV2(formatRecords(records));
  } catch (error) {
    console.log(`查找数据出错 ${error.message}`);
    ctx.reply(`查找数据出错 ${error.message}`);
  }
});

bot.command('record', async (ctx) => {
  try {
    const newRecord: Omit<MRecord, 'id'> = { date: day().format('YYYY.MM.DD') };
    await supabase.from(SUPABASE_RECORDS).insert(newRecord);

    const records = await getAllRecords();
    // 取上三个月的数据
    const [three, two, one] = records.slice(-3).map((item) => item.date);
    const reply = `前三个月的规律为 -> ${dateDiffByDay(two, three)}-${dateDiffByDay(one, two)}-${dateDiffByDay(newRecord.date, one)}`;

    ctx.replyWithMarkdownV2(reply);
  } catch (error) {
    console.log(`添加数据出错 ${error.message}`);
    ctx.reply(`添加数据出错 ${error.message}`);
  }
});

// 最近五条数据
bot.command('recent', async (ctx) => {
  try {
    const records = await getAllRecords();
    const recentRecords = records.slice(-6);
    const content: string[] = [];

    for (let i = 0; i < recentRecords.length; i += 2) {
      const f = recentRecords[i];
      const s = recentRecords[i + 1];
      content.push(`${f.date} - ${s.date} -> 距离 ${dateDiffByDay(f.date, s.date)}`);
    }
    ctx.replyWithMarkdownV2(content.join('\n'));
  } catch (error) {
    console.log(`查找数据出错 ${error.message}`);
    ctx.reply(`查找数据出错 ${error.message}`);
  }
});

bot.launch({ webhook });
