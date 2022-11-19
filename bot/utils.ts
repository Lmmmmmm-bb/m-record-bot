import { MRecord } from './types';
import { supabase } from './supa';
import { SUPABASE_RECORDS } from './config';
import dayjs from 'dayjs';

export const formatRecords = (records: MRecord[]) => {
  const recordsDate = records.map((item) => item.date);

  const markdown = records.length ?
    recordsDate.map((item) => `**${dayjs(item).format('YYYY年MM月DD日')}**`).join('\n') :
    '没有找到经期数据';
  return markdown;
};

export const getRecords = async () => {
  const result = await supabase.from(SUPABASE_RECORDS).select();
  const records: MRecord[] = result.data ?? [];

  return records;
};
