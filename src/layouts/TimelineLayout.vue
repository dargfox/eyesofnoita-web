<template>
  <div class="layout" :class="{'timeline-hidden': isTimelineHidden }">
    <div class="main-content flex"><slot name="main"></slot></div>
    <div class="right-large flex-col"><slot name="right-large"></slot></div>
    <div class="right-small flex"><slot name="right-small"></slot></div>
    <div class="timeline flex"><slot name="timeline"></slot></div>
    <div class="buttons">
      <GeneralButton @click="subIndexWithEmit()" class="go-prev" :disabled="!hasPrevItem">
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      </GeneralButton>
      <GeneralButton @click="toggleTimelineWithEmit()" class="timeline-toggle">
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      </GeneralButton>
      <GeneralButton @click="addIndexWithEmit()" class="go-next" :disabled="!hasNextItem">
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      </GeneralButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import GeneralButton from '@/components/general/GeneralButton.vue';
import {useTimelineStore} from '@/stores/timeline.store';
import {Icon} from '@iconify/vue';
import {useToggle} from '@vueuse/core';
import {storeToRefs} from 'pinia';

interface IEmit {
  (e: 'add-index', index: number): void,
  (e: 'sub-index', index: number): void,
  (e: 'toggle-timeline', shown: boolean): void,
}

const emit = defineEmits<IEmit>();

const {
  isTimelineHidden,
  hasNextItem,
  hasPrevItem,
  currentTimelineIndex,
} = storeToRefs(useTimelineStore());
const timelineStore = useTimelineStore();
const toggleTimeline = useToggle(isTimelineHidden);

function toggleTimelineWithEmit() {
  toggleTimeline();
  emit('toggle-timeline', !isTimelineHidden.value);
}
function addIndexWithEmit() {
  timelineStore.addCurrentTimelineIndex();
  emit('add-index', currentTimelineIndex.value);
}
function subIndexWithEmit() {
  timelineStore.subCurrentTimelineIndex();
  emit('sub-index', currentTimelineIndex.value);
}
</script>
<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-areas:
    "main right-large"
    "main right-large"
    "main right-small"
    "timeline timeline";

  grid-template-columns: 1fr 150px;
  grid-template-rows: repeat(3, minmax(100px, 1fr)) 150px;
  gap: var(--gap);
  padding: var(--padding-lg);

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 20px;
    gap: var(--gap-sm);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -153px);

    & > * {
      width: 100%;
      svg {
        height: 20px;
        width: 20px;
      }
      &.go-prev svg {
        transform: rotate(90deg);
      }
      &.go-next svg {
        transform: rotate(-90deg);
      }
    }

  }
  &.timeline-hidden {
    grid-template-areas:
      "main right-large"
      "main right-large"
      "main right-small";

    grid-template-rows: repeat(3, minmax(100px, 1fr));

    .timeline {
      display: none;
    }
    .buttons {
      transform: translate(-50%, -5px);
    }
    .buttons .timeline-toggle svg {
      transform: rotate(180deg);
    }
  }
  .main-content {
    grid-area: main;
  }
  .right-large {
    grid-area: right-large;
  }
  .right-small {
    grid-area: right-small;
  }
  .timeline {
    grid-area: timeline;
  }
}
</style>
