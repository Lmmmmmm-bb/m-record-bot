import { Telegraf } from 'telegraf';

import { botToken, webhook } from './config';

export const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome to _lmmmmmm\'s bot.');
});

bot.launch({ webhook });
