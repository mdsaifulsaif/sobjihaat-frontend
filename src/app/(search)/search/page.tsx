import React, { Suspense } from "react";
import SearchPageClient from "./_component/SearchPageClient";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <Suspense fallback={<div className="text-center py-20">লোড হচ্ছে...</div>}>
      <SearchPageClient query={q || ""} />
    </Suspense>
  );
}