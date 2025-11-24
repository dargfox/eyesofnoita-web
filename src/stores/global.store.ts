import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ISidebarItem} from '@/utils/types';

export const useGlobalStore = defineStore('global', () => {
  const MAX_BACKGROUND_INDEX = 9;

  const sidebarItems = ref<ISidebarItem[]>([
    {name: 'About Eyes', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Messages', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Timeline', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Isomorphs Tool', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Frequency Tool', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Create Timeline Record', icon: 'material-symbols:data-info-alert', to: '/'},
    {name: 'Contacts', icon: 'material-symbols:data-info-alert', to: '/'},
  ]);

  const backgroundsList = computed<string[]>(() => (
    Array(MAX_BACKGROUND_INDEX + 1).fill(0)
    .map((_, idx) => `/img/background${idx}.png`)
  ));

  const backgroundIndex = ref(0);
  const currentBackgroundURL = computed<string>(() => {
    return backgroundsList.value[backgroundIndex.value]!;
  });

  // Little hack to avoid flickering of background image
  const nextBackgroundURL = computed<string>(() => {
    return backgroundsList.value[(backgroundIndex.value + 1) % backgroundsList.value.length]!;
  })

  function nextBackground() {
    backgroundIndex.value = (backgroundIndex.value + 1) % (MAX_BACKGROUND_INDEX + 1);
  }

  return {
    sidebarItems,
    backgroundsList,
    backgroundIndex,
    currentBackgroundURL,
    nextBackgroundURL,
    nextBackground,
  }
});
