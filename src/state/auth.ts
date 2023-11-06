import { atom } from "jotai";

export interface User {
  imageUrl: string;
  name: string;
  description: string;
  socialLinks: {
    url: string;
    socialNetwork: string;
  }[];
  customLinks: {
    label: string;
    url: string;
    thumbnail?: string;
  }[];
  layoutConfig: {
    bgColor: string;
    bgImage: string;
    iconPack: string;
    font: string;
    customLinksStyle: string;
  };
}

export const userAtom = atom<User | null>(null);
