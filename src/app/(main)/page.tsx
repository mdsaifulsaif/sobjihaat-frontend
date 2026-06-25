import {
  Hero,
  HomeCategory,
  PopularProducts,
  NewProducts,
  BlogSection,
  Support
} from '@/components/home';
import AppDownloadPromo from '@/components/home/Appdownloadpromo';
import DeliveryCharges from '@/components/home/DeliveryCharges';
import DeliveryCoverage from '@/components/home/Deliverycoverage';
import Faq from '@/components/home/Faq';
import HappyCustomers from '@/components/home/Happycustomers';
import OurCommitment from '@/components/home/Ourcommitment';
import PreOrderDeliverySlots from '@/components/home/PreOrderDeliverySlots';
import PromoBanner from '@/components/home/PromoBanner';
import TrustedBrands from '@/components/home/Trustedbrands';
import TwoBanners from '@/components/home/TwoBanners';
import WhyChooseUs from '@/components/home/Whychooseus';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCategory />
      <TrustedBrands/>
      <PreOrderDeliverySlots />
      <DeliveryCharges />
      {/* <PopularProducts /> */}
     
   
      <OurCommitment />
      {/* <TwoBanners /> */}
      {/* <NewProducts /> */}
      {/* <BlogSection /> */}
      {/* <Support /> */}
         <WhyChooseUs />
         <HappyCustomers />
         <AppDownloadPromo />
       <DeliveryCoverage />
      <Faq/>
    </>
  );
}
