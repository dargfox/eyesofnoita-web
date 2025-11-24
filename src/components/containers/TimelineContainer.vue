<template>
  <BlurContainer class="wrapper">
    <CustomScrollbar ref="scrollbar" :style="{height: '100%'}" :contentStyle="{height: '100%', width: 'fit-content'}" :wrapperStyle="{height: '100%'}">
      <div class="timeline-container" ref="timeline">
        <div class="error" v-if="timelineStore.timelineRecords.length === 0">
          Timeline Records Are Empty :(
        </div>
        <template v-else>
          <TimelineItem
            v-bind="item"
            v-for="item, idx of records"
            :key="idx"
            :active="timelineStore.currentTimelineIndex === idx"
            @click="timelineStore.setCurrentTimelineIndex(idx)"
          />
        </template>
      </div>
    </CustomScrollbar>
  </BlurContainer>
</template>
<script setup lang="ts">
import type {TimelineRecord} from '@/utils/types';
import BlurContainer from './BlurContainer.vue';
import TimelineItem from '../timeline/TimelineItem.vue';
import {useTimelineStore} from '@/stores/timeline.store';
import {ref, watch} from 'vue';
import {useElementBounding, useScroll} from '@vueuse/core';

interface IEmit {
  (e: 'scroll', x: number, y: number): void,
}
interface IProps {
  records: TimelineRecord[];
}

const emit = defineEmits<IEmit>();
defineProps<IProps>();

const timelineStore = useTimelineStore();
const scrollbar = ref();
const timeline = ref();

const { x: scrollX, y: scrollY } = useScroll(() => scrollbar.value?.scrollEl);
const { width: widthScrollbar } = useElementBounding(() => scrollbar.value?.scrollEl);
const { width: widthTimeline } = useElementBounding(() => timeline.value);

function setScroll(scrollX_: number, scrollY_: number): void {
  scrollX.value = scrollX_;
  scrollY.value = scrollY_;
}

defineExpose({setScroll, widthTimeline, widthScrollbar});

watch([scrollX, scrollY], () => {
  emit('scroll', scrollX.value, scrollY.value);
});

</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.timeline-container {
  width: 100%;
  height: 100%;

  display: flex;
  gap: var(--gap);
  justify-content: space-between;

  // background: var(--container-color);
  // padding: var(--padding-sm);
  // border-radius: var(--border-radius-sm);
}
</style>
