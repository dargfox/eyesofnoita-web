import TurdownService from 'turndown';
import mammoth from 'mammoth';
import {computed, ref, watch, type Ref} from 'vue';

type Callback = (markdown: string) => void;
interface ImageRecord {
  type: string;
  base64: string;
  name?: string;
}
interface LinkRecord {
  data: string;
  name?: string;
}

export const useDocParser = (
  file: Ref<File | undefined>,
  callback: Callback,
  options: {
    immediate?: boolean,
    parseOnUpdate?: boolean,
  } = {}
) => {

  // Group 1: name
  // Group 2: data type
  // Group 3: base64 data
  const BASE64_IMAGE_REGEXP = /!\[([^\[\]]+)?\]\(data:([^\[\]]+);base64,([^\[\]]+)\)/gmi;

  // Group 1: detector of image ("!" symbol)
  // Group 2: name
  // Group 3: URL
  const LINK_REGEXP = /(!?)\[([^\[\]]+)?\]\(([^\[\]]+)\)/gmi;

  const fileReader = new FileReader();
  const turndownService = new TurdownService();
  const markdown = ref<string>();
  const images = computed<ImageRecord[]>(() => {
    return Array.from(markdown.value?.matchAll(BASE64_IMAGE_REGEXP) ?? []).map(match => {
      // check if no image data
      if (!match[2] || !match[3]) return null;
      return {
        name: match[1],
        type: match[2],
        base64: match[3],
      }
    }).filter(Boolean) as ImageRecord[];
  })
  const links = computed<LinkRecord[]>(() => {
    return Array.from(markdown.value?.matchAll(LINK_REGEXP) ?? []).map(match => {
      // check if link is empty
      if (!match[3]) return null;
      // check if match is image
      if (match[1]) return null;
      return {
        name: match[2] || match[3],
        data: match[3],
      }
    }).filter(Boolean) as LinkRecord[];
  })


  function parseFile(file_?: File): boolean {
    if (!file_) {
      markdown.value = undefined;
      return false
    };

    try {
      fileReader.addEventListener('load', async (event) => {
        const arrayBuffer: ArrayBuffer = event.target?.result as ArrayBuffer;
        const dataHTML = await mammoth.convertToHtml({arrayBuffer: arrayBuffer});
        const dataMarkdown = turndownService.turndown(dataHTML.value);
        markdown.value = dataMarkdown;
        callback(dataMarkdown);
      });
      fileReader.readAsArrayBuffer(file_);
      return true;
    } catch(error: unknown) {
      console.error("Error while reading file: ", error);
      markdown.value = undefined;
      return false;
    }
  }

  function parse() {
    return parseFile(file.value);
  }

  watch([file], () => {
    if (!file.value) return;
    if (!options.parseOnUpdate) return;
    parse();
  }, {immediate: options.immediate});

  return {
    parseFile,
    parse,
    markdown,
    images,
    links,
  }
}
