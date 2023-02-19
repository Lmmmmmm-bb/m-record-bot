export const botToken = process.env.BOT_TOKEN || '';

export const webhook = {
  domain: process.env.BOT_WEBHOOK_DOMAIN || '',
  hookPath: process.env.BOT_WEBHOOK_PATH || '',
};

export const supabaseConfig = {
  url: process.env.SUPA_BASE_URL || '',
  key: process.env.SUPA_BASE_KEY || '',
};

export const SUPABASE_RECORDS = 'records';
