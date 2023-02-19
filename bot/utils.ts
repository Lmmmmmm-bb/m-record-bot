import dayjs from 'dayjs';

import { supabase } from './supa';
import type { MRecord } from './types';
import { SUPABASE_RECORDS } from './config';

export const formatRecords = (records: MRecord[]) => {
  const recordsDate = records.map((item) => item.date);

  const markdown = records.length
    ? recordsDate.map((item, index) => {
      const number = index + 1;
      const dateFormat = dayjs(item).format('YYYY / MM / DD');
      return `${number}: **${dateFormat}**`;
    }).join('\n')
    : '没有找到经期数据';
  return markdown;
};

// 获取全部记录
export const getAllRecords = async () => {
  const result = await supabase
    .from(SUPABASE_RECORDS)
    .select()
    .order('id', { ascending: true });
  const records: MRecord[] = result.data ?? [];

  return records;
};

// 日期 diff
export const dateDiffByDay = (f: string, s: string) => Math.abs(dayjs(f).diff(s, 'd'));

export const replaceDateReserved = (d: string) => d.replace(/\./g, ' / ');

export const replyRecentRecordsContent = async () => {
  const records = await getAllRecords();
  const recentRecords = records.slice(-6);
  const content: string[] = ['前六个月'];

  for (let i = 0; i < recentRecords.length - 1; i++) {
    const f = recentRecords[i];
    const s = recentRecords[i + 1];
    if (i === recentRecords.length - 1) {
      content.push('', '距离上个月');
    }
    content.push(`${replaceDateReserved(f.date)} \\=\\> ${replaceDateReserved(s.date)} 距离 **${dateDiffByDay(f.date, s.date)}** 天`);
  }

  return content.join('\n');
};
