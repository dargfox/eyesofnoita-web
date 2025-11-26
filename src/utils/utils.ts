export const useUtils = () => {
  function preloadImages(images: string[]) {
    return Promise.all(images.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    }));
  }

  function readFilesFromChangeEvent(event: Event): FileList | undefined {
    if (!event) return;
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    if (!files?.length)
      return;

    return files;
  }

  function readFileFromChangeEvent(event: Event): File | undefined {
    return readFilesFromChangeEvent(event)?.[0];
  }

  return  {
    preloadImages,
    readFilesFromChangeEvent,
    readFileFromChangeEvent,
  }
}

export default useUtils;
