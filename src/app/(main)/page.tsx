// import {
//   Hero,
//   HomeCategory,
// } from '@/components/home';
// import AppDownloadPromo from '@/components/home/Appdownloadpromo';
// import DeliveryCharges from '@/components/home/DeliveryCharges';
// import DeliveryCoverage from '@/components/home/Deliverycoverage';
// import Faq from '@/components/home/Faq';
// import HappyCustomers from '@/components/home/Happycustomers';
// import OurCommitment from '@/components/home/Ourcommitment';
// import PreOrderDeliverySlots from '@/components/home/PreOrderDeliverySlots';
// import TrustedBrands from '@/components/home/Trustedbrands';
// import WhyChooseUs from '@/components/home/Whychooseus';
// import { getCategories } from "@/redux/api/categoryApi";



// export default async function Home() {

//     const categories = await getCategories({
//     status: "active",
//     isDeleted: false,
//     limit: 20,
//   });
//   return (
//     <>
//       <Hero />
//       <HomeCategory initialCategories={categories?.data} />
//       <TrustedBrands/>
//       <PreOrderDeliverySlots />
//       <DeliveryCharges />
//       <OurCommitment />
//          <WhyChooseUs />
//          <HappyCustomers />
//          <AppDownloadPromo />
//        <DeliveryCoverage />
//       <Faq/>
//     </>
//   );
// }




// app/page.tsx
import {
  Hero,
  HomeCategory,
} from '@/components/home';
import AppDownloadPromo from '@/components/home/Appdownloadpromo';
import ComboProducts from '@/components/home/ComboProducts';
import DeliveryBanner from '@/components/home/DeliveryBanner';
import DeliveryCharges from '@/components/home/DeliveryCharges';
import DeliveryCoverage from '@/components/home/Deliverycoverage';
import Faq from '@/components/home/Faq';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HappyCustomers from '@/components/home/Happycustomers';
import OurCommitment from '@/components/home/Ourcommitment';
import PreOrderDeliverySlots from '@/components/home/PreOrderDeliverySlots';
import TrustedBrands from '@/components/home/Trustedbrands';
import WhyChooseUs from '@/components/home/Whychooseus';

// Server-side fetch function
async function fetchCategories() {
  try {
    // আপনার API endpoint এ ফেচ করুন
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const res = await fetch(
      `${baseUrl}/categories?status=active&isDeleted=false&limit=20`,
      {
        cache: 'force-cache',
        next: { revalidate: 3600 }, // ১ ঘন্টা পর রিফ্রেশ
      }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

export default async function Home() {
  // Server Side এ ডাটা ফেচ করুন
  const categories = await fetchCategories();

  return (
    <>
      <Hero />
      <HomeCategory initialCategories={categories?.data} />
      <TrustedBrands />
      <FeaturedProducts />
      <ComboProducts />
      {/* <PreOrderDeliverySlots /> */}
      <DeliveryBanner />
      <DeliveryCharges />
      <OurCommitment />
      {/* <WhyChooseUs /> */}
      <HappyCustomers />
      <AppDownloadPromo />
      <DeliveryCoverage />
      <Faq />
    </>
  );
}