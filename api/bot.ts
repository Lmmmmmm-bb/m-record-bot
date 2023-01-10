import { VercelRequest, VercelResponse } from '@vercel/node';

import { bot } from '../bot';

export default async (request: VercelRequest, response: VercelResponse) => {
  console.log('[bot] request body', request.body);
  try {
    await bot.handleUpdate(request.body);
  } catch(err) {
    console.log('Something Error', err);
    return response.status(200).send('Something Error');
  }

  return response.status(200).send('Hi.');
};
