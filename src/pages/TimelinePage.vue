<template>
  <TimelineLayout class="page" @add-index="onAddIndex" @sub-index="onSubIndex">
    <template #main>
      <TextContainer
        ref="textElement"
        class="main-text-area"
        :markdown="currentTimelineRecord?.content"
        :title="currentTimelineRecord?.header"
        :subtitle="currentTimelineRecord?.authors.join(', ')"
      />
    </template>
    <template #right-large>
      <ListContainer class="images-area">
        <ImageContainer v-for="image of imagesList" :key="image.src" :src="image.src" :alt="image.alt" />
      </ListContainer>
    </template>
    <template #right-small>
      <ListContainer class="links-area">
        <LinkContainer v-for="_, idx of Array(30).fill(0)" :key="idx" href="https://google.com">
          Google
        </LinkContainer>
      </ListContainer>
    </template>
    <template #timeline>
      <TimelineContainer :records="timelineRecords" ref="timeline" />
    </template>
  </TimelineLayout>
</template>
<script setup lang="ts">
import ImageContainer from '@/components/containers/ImageContainer.vue';
import LinkContainer from '@/components/containers/LinkContainer.vue';
import ListContainer from '@/components/containers/ListContainer.vue';
import TextContainer from '@/components/containers/TextContainer.vue';
import TimelineContainer from '@/components/containers/TimelineContainer.vue';
import TimelineLayout from '@/layouts/TimelineLayout.vue';
import {useTimelineStore} from '@/stores/timeline.store';
import type {ImageProps} from '@/utils/types';
import {storeToRefs} from 'pinia';
import {computed, ref, watch} from 'vue';

const SCROLL_CORRECTION = 1.0020;

const { timelineRecords, currentTimelineRecord, currentTimelineIndex } = storeToRefs(useTimelineStore());

const imagesList = computed<ImageProps[]>(() => currentTimelineRecord.value?.images ?? []);
const textElement = ref();
const timeline = ref();

watch(currentTimelineIndex, () => {
  textElement.value?.showTitle();
})

function onAddIndex(index: number) {
  timeline.value.setScroll(timeline.value.widthTimeline * (index - 1) / timelineRecords.value.length *
    SCROLL_CORRECTION, 0);
}
function onSubIndex(index: number) {
  timeline.value.setScroll(timeline.value.widthTimeline * (index - 1) / timelineRecords.value.length *
    SCROLL_CORRECTION, 0);
}

</script>
<style lang="scss" scoped>
.page {
  max-height: 100%;
  .main-text-area {
    max-height: 100%;
    width: 100%;
  }
  .images-area {
    height: 100%;
    max-height: 100%;

    :deep(.list-container) {
      --columns: 2;
    }
  }
  .links-area {
    height: 100%;
    max-height: 100%;
    width: 100%;

    :deep(.list-container) {
      padding: 0;
      background: none;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
