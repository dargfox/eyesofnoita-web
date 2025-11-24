<template>
  <div class="timeline-item" :class="{active}">
    <img v-if="thumbnail" :src="thumbnail.src" :alt="thumbnail.alt" class="thumbnail" />
    <div class="thumbnail filler">
      <Icon icon="material-symbols:blur-circular-outline" />
    </div>
    <div class="details">
      <h3>{{ header }}</h3>
      <span class="date">{{ date }}</span>
      <span class="authors">{{ authors.join(',') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {TimelineRecord} from '@/utils/types';
import {Icon} from '@iconify/vue';

interface IProps {
  active?: boolean;
}

defineProps<TimelineRecord & IProps>();
</script>
<style lang="scss" scoped>
.timeline-item {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  gap: var(--gap-sm);
  padding: var(--padding-sm);

  color: var(--text-color);

  cursor: pointer;

  border-radius: var(--border-radius-sm);

  .thumbnail {
    position: relative;
    width: 20px;
    height: 20px;
    aspect-ratio: 1;
    object-fit: cover;
    background: var(--primary);
    border-radius: 20px;
    margin-left: 10px;
    box-shadow: 0 0 10px -5px var(--shadow-color);

    &:after {
      content: "";
      height: 0px;
      width: 120px;

      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(calc( 100% + 10px ), -70%);
    }

    svg {
      width: 100%;
      height: 100%;
      opacity: 0.5;
    }
  }
  & .thumbnail:after {
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: var(--container-color);
    border-radius: 6px;
  }
  // &:not(:last-child) .thumbnail:after {
  //   border-bottom: 3px solid var(--container-color);
  // }
  &.active .thumbnail:after {
    border-bottom-color: var(--active-color);
    filter: drop-shadow(0 0 1px var(--active-color));
  }
  &:last-child .thumbnail:after {
    width: 50px;
    border-bottom-style: dotted;
    border-radius: 0px;
  }
  &.active {
    .thumbnail {
      filter: drop-shadow(0px 0px 2px var(--active-color));
      box-shadow: inset 0 0 10px -3px var(--active-color);
    }
    .details {
      border: 1px solid var(--active-color);
      box-shadow: 0 0 10px var(--shadow-color), inset 0 0 10px -3px var(--active-color);
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    padding: var(--padding-sm);
    gap: var(--gap-xs);

    // border: 1px solid var(--border-color);
    background: var(--container-color);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 0 10px var(--shadow-color);
    border: 1px solid transparent;

    > * {
      max-width: 100%;
      text-align: start;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: var(--padding-xs);
      margin: 0;
      font-size: 14px;

      &:not(h3):before {
        content: "•";
        margin-right: 5px;
      }
    }
  }
}
</style>
