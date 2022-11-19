import { MRecord } from './types';
import { supabase } from './supa';
import { SUPABASE_RECORDS } from './config';

export const formatRecords = (records: MRecord[]) => {
  const markdown = records.length ? records.map((item) => `**${item.date}**`).join('\n') : '没有找到经期数据';
  return markdown;
};

export const getRecords = async () => {
  const result = await supabase.from(SUPABASE_RECORDS).select();
  const records: MRecord[] = result.data ?? [];

  return records;
};
