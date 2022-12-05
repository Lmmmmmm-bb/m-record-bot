import { VercelRequest, VercelResponse } from '@vercel/node';

export default (_: VercelRequest, response: VercelResponse) => {
  return response.send('Hi, it is lz-m-record bot. Have a nice day.');
};
