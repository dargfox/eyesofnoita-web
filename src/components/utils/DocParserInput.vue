<template>
  <div class="parser-input">
    <input type="file" @change="onFileChange" />
    <GeneralButton @click="parse()">
      PARSE
    </GeneralButton>
    <MdEditor class="parsed-text" v-model="model" language="en"/>
    <TextContainer v-if="false" class="parsed-text" title="CREATE YOUR RECORD" :markdown="model"/>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import GeneralButton from '../general/GeneralButton.vue';
import TextContainer from '../containers/TextContainer.vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useUtils from '@/utils/utils';
import {useDocParser} from '@/utils/docparser';

const file = ref<File>();
const model = defineModel<string>();

const { readFileFromChangeEvent } = useUtils();
const { parse, markdown, images, links } = useDocParser(file, updateModel);

function onFileChange(event: Event) {
  file.value = readFileFromChangeEvent(event);
}
function updateModel(markdown: string) {
  model.value = markdown;
}

watch(model, () => {
  markdown.value = model.value;
  console.log("PARSED IMAGES: ", images.value);
  console.log("PARSED LINKS: ", links.value);
})
</script>
<style lang="scss" scoped>
.parser-input {
  width: 100%;
  height: 100%;

  .parsed-text {
    width: 100%;
    height: 100%;

    --md-bk-color: var(--container-color);
    --md-color: var(--text-color);
  }
}
</style>
