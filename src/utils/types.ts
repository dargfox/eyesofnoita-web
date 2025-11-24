export interface ImageProps {
  src?: string;
  alt?: string;
}

export interface TimelineRecord {
  header: string;
  authors: string[],
  date: string,
  content: string,
  images?: ImageProps[],
  thumbnail?: ImageProps,
}

export interface ISidebarItem {
  name: string;
  icon: string;
  to?: string;
  callback?: () => void;
}

