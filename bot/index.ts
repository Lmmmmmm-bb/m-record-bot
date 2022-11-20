import day from 'dayjs';
import { Telegraf } from 'telegraf';

import { MRecord } from './types';
import { supabase } from './supa';
import { botToken, SUPABASE_RECORDS, webhook } from './config';
import { formatRecords, getAllRecords, replyRecentRecordsContent } from './utils';

export const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome to _lmmmmmm\'s bot.');
});

bot.help( (ctx) => {
  const content: string[] = [
    '/history \\=\\> 查看所有历史记录',
    '/recent \\=\\> 查看前六个与的记录',
    '/record \\=\\> 记录今天并查看前六个月的记录',
  ];

  ctx.replyWithMarkdownV2(content.join('\n'));
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

    const reply = await replyRecentRecordsContent();
    ctx.replyWithMarkdownV2(reply);
  } catch (error) {
    console.log(`添加数据出错 ${error.message}`);
    ctx.reply(`添加数据出错 ${error.message}`);
  }
});

// 最近五条数据
bot.command('recent', async (ctx) => {
  try {
    const reply = await replyRecentRecordsContent();

    ctx.replyWithMarkdownV2(reply);
  } catch (error) {
    console.log(`查找数据出错 ${error.message}`);
    ctx.reply(`查找数据出错 ${error.message}`);
  }
});

bot.launch({ webhook });
