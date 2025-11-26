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
  type: 'item',
  name: string;
  icon: string;
  to?: string;
  callback?: () => void;
}

export interface ISidebarDivider {
  type: 'divider',
}

export interface ISidebarSpacer {
  type: 'spacer',
}

export type ISidebarItemWithExtra = ISidebarItem | ISidebarSpacer | ISidebarDivider;

