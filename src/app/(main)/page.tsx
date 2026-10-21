

import { Hero, HomeCategory } from '@/components/home';
import AppDownloadPromo from '@/components/home/Appdownloadpromo';
import ComboProducts from '@/components/home/ComboProducts';
import SubscriptionPackages from '@/components/home/SubscriptionPackages';
import DeliveryBanner from '@/components/home/DeliveryBanner';
import DeliveryCharges from '@/components/home/DeliveryCharges';
import DeliveryCoverage from '@/components/home/Deliverycoverage';
import Faq from '@/components/home/Faq';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ReadyToCookProducts from '@/components/home/ReadyToCookProducts';
import HappyCustomers from '@/components/home/Happycustomers';
import OurCommitment from '@/components/home/Ourcommitment';
import TrustedBrands from '@/components/home/Trustedbrands';
import { serverFetch } from '@/services/api';

export default async function Home() {

  const [bannersData, categoriesData, brandsData, featuredData, readyToCookData, comboData, subscriptionPackagesData, shippingData, reviewsData, areasData] = await Promise.all([
    serverFetch<any>('/banners', { tags: ['banners'] }),
    serverFetch<any>('/categories?status=active&isDeleted=false&limit=20', { tags: ['categories'] }),
    serverFetch<any>('/brands?status=active&isDeleted=false&limit=30', { tags: ['brands'] }),
    serverFetch<any>('/products/featured?limit=10', { tags: ['products'] }),
    serverFetch<any>('/products/category/ready-to-cook?limit=10', { tags: ['products'] }),
    serverFetch<any>('/products?productType=combo&status=active&limit=10', { tags: ['products'] }),
    serverFetch<any>('/subscription-packages?status=active&limit=50', { cache: 'no-store' }),
    serverFetch<any>('/shipping/local', { tags: ['shipping'] }),
    serverFetch<any>('/reviews/featured?limit=10', { tags: ['reviews'] }),
    serverFetch<any>('/area', { cache: 'no-store' }),
  ]);

  const readyCategory = categoriesData?.data?.find(
    (cat: any) =>
      cat?.slug?.toLowerCase() === 'ready-to-cook' ||
      cat?.name?.toLowerCase()?.includes('ready')
  );
  const readyCategorySlug = readyCategory?.slug || 'ready-to-cook';

  return (
    <>
      <Hero initialBanners={bannersData?.data || []} />
      <HomeCategory initialCategories={categoriesData?.data} />
      <FeaturedProducts initialProducts={featuredData?.data} />
      <ReadyToCookProducts
        initialProducts={readyToCookData?.data}
        categorySlug={readyCategorySlug}
      />
      <ComboProducts initialProducts={comboData?.data} />
      <TrustedBrands initialBrands={brandsData?.data} />
      <SubscriptionPackages initialPackages={subscriptionPackagesData?.data || []} />

      <DeliveryBanner />
      <DeliveryCharges initialData={shippingData?.data} />
      {/* <OurCommitment /> */}
      <HappyCustomers initialReviews={reviewsData?.data} />
      <AppDownloadPromo />
      <DeliveryCoverage areas={areasData?.data || []} />
      <Faq />
    </>
  );
}