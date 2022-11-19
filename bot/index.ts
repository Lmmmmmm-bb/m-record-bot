import { Telegraf } from 'telegraf';

import { supabase } from './supa';
import { MRecord } from './types';
import { botToken, SUPABASE_RECORDS, webhook } from './config';

export const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome to _lmmmmmm\'s bot.');
});

bot.command('history', async (ctx) => {
  const result = await supabase.from(SUPABASE_RECORDS).select();
  const records: MRecord[] = result.data ?? [];
  ctx.replyWithMarkdownV2(records.map((item) => `**${item.date}**`).join('\n'));
});

bot.launch({ webhook });
