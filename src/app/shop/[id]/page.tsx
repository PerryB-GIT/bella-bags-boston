import { sampleProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

// Generate static params for all products at build time
export function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = sampleProducts.find(p => p.id === id);

  return <ProductDetailClient product={product} />;
}
