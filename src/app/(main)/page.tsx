import {
  Hero,
  HomeCategory,
  PopularProducts,
  NewProducts,
  BlogSection,
  Support
} from '@/components/home';
import DeliveryCharges from '@/components/home/DeliveryCharges';
import DeliveryCoverage from '@/components/home/Deliverycoverage';
import Faq from '@/components/home/Faq';
import OurCommitment from '@/components/home/Ourcommitment';
import PreOrderDeliverySlots from '@/components/home/PreOrderDeliverySlots';
import PromoBanner from '@/components/home/PromoBanner';
import TwoBanners from '@/components/home/TwoBanners';
import WhyChooseUs from '@/components/home/Whychooseus';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <HomeCategory /> */}
      <PreOrderDeliverySlots />
      <DeliveryCharges />
      {/* <PopularProducts /> */}
      <DeliveryCoverage />
      <WhyChooseUs />
      <OurCommitment />
      <TwoBanners />
      {/* <NewProducts /> */}
      {/* <BlogSection /> */}
      <Support />
      <Faq/>
    </>
  );
}
