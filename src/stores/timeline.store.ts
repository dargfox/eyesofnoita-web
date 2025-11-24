import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {TimelineRecord} from '@/utils/types';
import useTimelineData from '@/timeline/timeline';

export const useTimelineStore = defineStore('timeline', () => {
  const {
    timelineRecords,
    getTimelineRecordByDate,
    getTimelineRecordByIndex,
  } = useTimelineData();

  const isTimelineHidden = ref<boolean>(false);
  const currentTimelineIndex = ref<number>(0);
  const currentTimelineRecord = computed<TimelineRecord>(() => {
    return getTimelineRecordByIndex(currentTimelineIndex.value) as TimelineRecord;
  });

  const hasNextItem = computed(() => currentTimelineIndex.value < timelineRecords.value.length - 1);
  const hasPrevItem = computed(() => currentTimelineIndex.value > 0);

  function setCurrentTimelineIndex(idx: number) {
    currentTimelineIndex.value = idx;
  }
  function addCurrentTimelineIndex() {
    if (!hasNextItem.value) return;
    currentTimelineIndex.value++;
  }
  function subCurrentTimelineIndex() {
    if (!hasPrevItem.value) return;
    currentTimelineIndex.value--;
  }

  return {
    isTimelineHidden,
    currentTimelineIndex,
    currentTimelineRecord,
    hasNextItem,
    hasPrevItem,

    setCurrentTimelineIndex,

    timelineRecords,
    getTimelineRecordByDate,
    getTimelineRecordByIndex,
    addCurrentTimelineIndex,
    subCurrentTimelineIndex,
  }
})
