<template>
  <BlurContainer class="wrapper">
    <CustomScrollbar
      :style="{height: '100%', borderRadius: '5px'}"
      :wrapperStyle="{height: '100%', width: '100%'}"
      :contentStyle="{height: '100%', width: '100%'}"
    >
      <div class="text-container">
        <slot>
          <Transition name="opacity">
            <div class="title" v-if="isTitleShown && title">
              <span>{{ title }}</span>
              <span class="subtitle">{{ subtitle }}</span>
            </div>
          </Transition>
          <template v-if="markdown">
            <VueMarkdown :markdown="markdown" v-for="i of Array(10).fill(0)" :key="i" />
          </template>
          <template v-else-if="text">
            {{ text }}
          </template>
        </slot>
      </div>
    </CustomScrollbar>
  </BlurContainer>
</template>
<script setup lang="ts">
import { VueMarkdown } from '@crazydos/vue-markdown';
import BlurContainer from './BlurContainer.vue';
import {onMounted, ref} from 'vue';

interface IProps {
  title?: string;
  subtitle?: string;
  text?: string;
  markdown?: string;
}

const props = defineProps<IProps>();

const isTitleShown = ref(false);
let titleTimeouts: number[] = [];

function showTitle(time: number = 2e3) {
  if (!props.title) return;
  titleTimeouts.forEach(t => clearTimeout(t));
  isTitleShown.value = true;
  titleTimeouts.push(setTimeout(() => {
    isTitleShown.value = false;
    titleTimeouts = [];
  }, time));
}

defineExpose({showTitle})

onMounted(() => {
  showTitle()
})
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
.text-container {
  background: var(--container-color);
  color: var(--text-color);
  padding: var(--padding-sm);
  border-radius: var(--border-radius-sm);
  min-height: 100%;
  height: fit-content;
  width: 100%;

}

.title {
  position: absolute;
  min-height: 10%;
  width: 100%;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  font-weight: 600;
  backdrop-filter: blur(7px);
  background-color: var(--container-color);
  transform: translateY(0%);
  padding: 10px 20%;
  border-bottom: 1px solid var(--border-color);

  .subtitle {
    font-size: 14px;
    font-weight: 300;
  }
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.2s ease-in-out;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  filter: blur(20px);
  transform: translateY(300px);
}
</style>
