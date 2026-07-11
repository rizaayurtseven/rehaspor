import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Product } from "@/types/product";

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="section-padding bg-brand-soft">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Öne Çıkanlar"
            title="Sahada kendini kanıtlayan ürün ve sistemler"
            description="Yoğun kullanıma, farklı iklim koşullarına ve profesyonel spor standartlarına göre seçilen çözümler."
          />
          <Button href="/products" variant="ghost" className="self-start lg:self-auto">
            Tüm ürünleri keşfet <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
