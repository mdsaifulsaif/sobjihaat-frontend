


// app/category/[slug]/page.tsx
import { Metadata } from "next";
import CategoryPageClient from "../_component/CategoryPageClient";


// মেটাডেটা জেনারেট করা
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  
  // ক্যাটাগরি নাম বের করা (আপনার API কল বা লোকাল ডেটা থেকে)
  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
  return {
    title: `${categoryName} - Best Products in Bangladesh`,
    description: `Shop for ${categoryName} products at best prices. Get fresh, quality products delivered to your doorstep.`,
  };
}

// সার্ভার কম্পোনেন্ট
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  
  // সার্ভার সাইডে প্রোডাক্ট ফেচ করা (ঐচ্ছিক)
  // আপনি চাইলে এখানে ইনিশিয়াল ডেটা ফেচ করতে পারেন
  // const initialData = await fetchProductsByCategory(slug);
  
  return <CategoryPageClient slug={slug} />;
}