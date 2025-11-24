import type {TimelineRecord} from '@/utils/types';
import * as data20250219 from './2025-02-19.json';
import * as data20250220 from './2025-02-20.json';
import * as data20250221 from './2025-02-21.json';
import * as data20250222 from './2025-02-22.json';
import * as data20250223 from './2025-02-22.json';
import {computed} from 'vue';

export const useTimelineData = () => {
  const data = {
    "isSolved": false,
    "timeline": [
      data20250219,
      data20250220,
      data20250221,
      data20250222,
      data20250223,
      ...Array(21).fill(data20250223)
    ] as TimelineRecord[],
  };

  const timelineRecords = computed(() => data.timeline);

  const getTimelineRecordByDate = (date: string): TimelineRecord | undefined  => {
    return data.timeline.find(el => el.date === date);
  }

  const getTimelineRecordByIndex = (idx: number): TimelineRecord | undefined  => {
    return data.timeline[idx];
  }

  const isSolved = computed<boolean>(() => data.isSolved);

  return {
    data,
    timelineRecords,
    isSolved,
    getTimelineRecordByDate,
    getTimelineRecordByIndex,
  }
};

export default useTimelineData;
