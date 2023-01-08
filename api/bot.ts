import { VercelRequest, VercelResponse } from '@vercel/node';

import { bot } from '../bot';

export const config = {
  runtime: 'edge'
};

export default async (request: VercelRequest, response: VercelResponse) => {
  console.log('[bot] request body', request.body);
  try {
    await bot.handleUpdate(request.body);
  } catch(err) {
    console.log('Something Error', err, err.message);
    return response.status(200).send(`Something Error ${err.message}`);
  }

  return response.status(200).send('Hi.');
};
