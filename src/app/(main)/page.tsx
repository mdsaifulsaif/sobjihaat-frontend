

import { Hero, HomeCategory } from '@/components/home';
import AppDownloadPromo from '@/components/home/Appdownloadpromo';
import ComboProducts from '@/components/home/ComboProducts';
import DeliveryBanner from '@/components/home/DeliveryBanner';
import DeliveryCharges from '@/components/home/DeliveryCharges';
import DeliveryCoverage from '@/components/home/Deliverycoverage';
import Faq from '@/components/home/Faq';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HappyCustomers from '@/components/home/Happycustomers';
import OurCommitment from '@/components/home/Ourcommitment';
import TrustedBrands from '@/components/home/Trustedbrands';
import { serverFetch } from '@/services/api';

export default async function Home() {

  const [categoriesData, brandsData, featuredData, comboData,shippingData,reviewsData, areasData] = await Promise.all([
    serverFetch<any>('/categories?status=active&isDeleted=false&limit=20'),
    serverFetch<any>('/brands?page=1&limit=20'),
    serverFetch<any>('/products/featured?limit=10'),
    serverFetch<any>('/products?productType=combo&status=active&limit=10'), 
   serverFetch<any>('/shipping/local'),
   serverFetch<any>('/reviews/featured?limit=10'),
   serverFetch<any>('/area'),
  ]);

  return (
    <>
      <Hero />
      <HomeCategory initialCategories={categoriesData?.data} />
      <TrustedBrands initialBrands={brandsData?.data} />
      <FeaturedProducts initialProducts={featuredData?.data} />
      <ComboProducts initialProducts={comboData?.data} />
      
      <DeliveryBanner />
      <DeliveryCharges initialData={shippingData?.data} />
      <OurCommitment />
      <HappyCustomers initialReviews={reviewsData?.data} />
      <AppDownloadPromo />
       {/* <DeliveryCoverage areas={areasData?.data || []} /> */}
       <DeliveryCoverage />
      <Faq />
    </>
  );
}