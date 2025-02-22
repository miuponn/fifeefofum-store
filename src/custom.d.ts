interface CurrencyData {
    symbol_native: string;
    name_plural: string;
}

interface InstagramPost {
    id: string;
    image: string;
    link: string;
    type: 'image' | 'video';
}

export interface HeroImages {
  images: string[];
}

declare module "*/currencies.json" {
    const value: { [key: string]: CurrencyData };
    export default value;
}

declare module "*/instagramPosts.json" {
    const value: { posts: InstagramPost[] };
    export default value;
}

declare module "*/hero.json" {
  const value: {
      images: string[];
  };
  export default value;
}

declare module "*.json" {
    const value: {
        [key: string]: string | number | boolean | CurrencyData | InstagramPost[] | string[];
    };
    export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.ttf" {
    const content: string;
    export default content;
}

declare module "*.otf" {
    const content: string;
    export default content;
}