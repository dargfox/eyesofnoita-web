<template>
  <DefaultLayout>
    <template #header>
      <GeneralHeader />
    </template>
    <template #sidebar>
      <GeneralSidebar :items="sidebarItems" />
    </template>
    <template #footer>
      <GeneralFooter />
    </template>
    <template #modals>
      <GeneralModals />
    </template>
  </DefaultLayout>
</template>
<script setup lang="ts">
import {onMounted} from 'vue';
import GeneralFooter from './components/general/GeneralFooter.vue';
import GeneralHeader from './components/general/GeneralHeader.vue';
import GeneralModals from './components/general/GeneralModals.vue';
import GeneralSidebar from './components/general/GeneralSidebar.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import {useGlobalStore} from './stores/global.store';
import useUtils from './utils/utils';
import {storeToRefs} from 'pinia';

const { sidebarItems, backgroundsList } = storeToRefs(useGlobalStore());
const { preloadImages } = useUtils();

onMounted(async () => {
  await preloadImages(backgroundsList.value);
})
</script>
<style scoped>

</style>
