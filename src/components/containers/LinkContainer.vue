<template>
  <div class="link-container">
      <a :href="href" target="_blank">
        <Icon icon="material-symbols:link-rounded" />
        <slot></slot>
      </a>
  </div>
</template>
<script setup lang="ts">
import {Icon} from '@iconify/vue';

interface IProps {
  href?: string;
}

defineProps<IProps>();
</script>
<style lang="scss" scoped>
.link-container {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;

  & > a {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    display: flex;
    justify-content: start;
    align-items: center;
    color: var(--always-white);

    padding: var(--padding-xs);
    gap: var(--gap-xs);

    text-decoration: none;
  }
}
</style>
