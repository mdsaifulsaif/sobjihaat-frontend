import { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "./_component/SearchPageClient";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    brandName?: string;
    filter?: string;
    type?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const brand = params.brand;
  const filter = params.filter;
  const type = params.type;
  const q = params.q;

  let title = "Search Products | SobjiHaat";
  let description =
    "Find fresh groceries, daily essentials and kitchen items in Barisal at SobjiHaat.";

  if (brand) {
    const formattedBrand = (params.brandName || brand)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    title = `${formattedBrand} Products | SobjiHaat`;
    description = `Buy authentic ${formattedBrand} products online from SobjiHaat. Fast home delivery in Barisal.`;
  } else if (filter === "featured") {
    title = "Featured Products | SobjiHaat";
    description =
      "Discover our handpicked featured groceries and top items at SobjiHaat.";
  } else if (type === "combo") {
    title = "Combo Packs & Value Deals | SobjiHaat";
    description =
      "Save more with grocery combo packages and exclusive daily deals at SobjiHaat.";
  } else if (q) {
    title = `Search: "${q}" | SobjiHaat`;
    description = `Explore products matching "${q}" at SobjiHaat Barisal.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      }
    >
      <SearchPageClient query={q} />
    </Suspense>
  );
}