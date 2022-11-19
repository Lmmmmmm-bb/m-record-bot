import { VercelRequest, VercelResponse } from '@vercel/node';

export default (request: VercelRequest, response: VercelResponse) => {
  const { name = 'lmmmmmm' } = request.query;
  return response.send(`Hello ${name}, it is lz-m-record bot.`);
};
