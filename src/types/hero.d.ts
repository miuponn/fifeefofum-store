interface HeroData {
  images: string[];
}

declare module '@/data/hero.json' {
  const value: HeroData;
  export default value;
}