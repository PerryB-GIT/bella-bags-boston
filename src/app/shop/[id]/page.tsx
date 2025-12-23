import { sampleProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

// Generate static params for all products at build time
export function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = sampleProducts.find(p => p.id === params.id);

  return <ProductDetailClient product={product} />;
}
