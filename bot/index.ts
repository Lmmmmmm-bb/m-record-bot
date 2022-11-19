import day from 'dayjs';
import { Telegraf } from 'telegraf';

import { MRecord } from './types';
import { supabase } from './supa';
import { formatRecords, getRecords } from './utils';
import { botToken, SUPABASE_RECORDS, webhook } from './config';

export const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome to _lmmmmmm\'s bot.');
});

bot.command('history', async (ctx) => {
  try {
    const records = await getRecords();
    ctx.replyWithMarkdownV2(formatRecords(records));
  } catch (error) {
    console.log(`查找数据出错 ${error.message}`);
    ctx.reply(`查找数据出错 ${error.message}`);
  }
});

bot.command('record', async (ctx) => {
  try {
    const newRecord: Omit<MRecord, 'id'> = { date: day().format('YYYY-MM-DD') };
    await supabase.from(SUPABASE_RECORDS).insert(newRecord);
    const records = await getRecords();
    ctx.replyWithMarkdownV2(formatRecords(records));
  } catch(error) {
    console.log(`添加数据出错 ${error.message}`);
    ctx.reply(`添加数据出错 ${error.message}`);
  }
});

bot.launch({ webhook });
