import {
  Hero,
  HomeCategory,
  PopularProducts,
  NewProducts,
  BlogSection,
  Support
} from '@/components/home';
import Faq from '@/components/home/Faq';
import PromoBanner from '@/components/home/PromoBanner';
import TwoBanners from '@/components/home/TwoBanners';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCategory />
      <PopularProducts />
      <TwoBanners />
      <NewProducts />
      <BlogSection />
      <Support />
      <Faq/>
    </>
  );
}
