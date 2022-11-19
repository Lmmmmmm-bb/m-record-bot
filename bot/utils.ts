import dayjs from 'dayjs';

import { MRecord } from './types';
import { supabase } from './supa';
import { SUPABASE_RECORDS } from './config';

export const formatRecords = (records: MRecord[]) => {
  const recordsDate = records.map((item) => item.date);

  const markdown = records.length ?
    recordsDate.map((item, index) => {
      const number = index + 1;
      const dateFormat = dayjs(item).format('YYYY / MM / DD');
      return `${number}: **${dateFormat}**`;
    }).join('\n') :
    '没有找到经期数据';
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
