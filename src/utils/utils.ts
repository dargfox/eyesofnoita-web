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

  return  {
    preloadImages,
  }
}

export default useUtils;
