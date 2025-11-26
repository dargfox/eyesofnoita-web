import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ISidebarItem, ISidebarItemWithExtra} from '@/utils/types';

export const useGlobalStore = defineStore('global', () => {
  const MAX_BACKGROUND_INDEX = 9;

  const sidebarItems = ref<ISidebarItemWithExtra[]>([
    {type: 'item', name: 'About Eyes', icon: 'material-symbols:indeterminate-question-box', to: '/'},
    {type: 'item', name: 'Messages', icon: 'material-symbols:inbox-text-asterisk-outline', to: '/'},
    {type: 'item', name: 'Timeline', icon: 'material-symbols:view-timeline-outline', to: '/'},
    {type: 'item', name: 'Create Timeline Record', icon: 'material-symbols:edit-document-outline', to: '/create'},
    {type: 'item', name: 'Contacts', icon: 'material-symbols:share', to: '/'},
    {type: 'divider'},
    {type: 'item', name: 'Isomorphs Tool', icon: 'material-symbols:vpn-key-outline', to: '/'},
    {type: 'item', name: 'Frequency Tool', icon: 'material-symbols:vpn-key-outline', to: '/'},
    {type: 'spacer'},
    {type: 'divider'},
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
