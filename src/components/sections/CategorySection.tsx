import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Category } from "@/types/category";

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Ürün ve hizmetler"
            title="Spor alanınız için ihtiyacınız olan her şey"
            description="Zemin altyapısından saha ekipmanına kadar ihtiyacınıza uygun ürün ve uygulamaları bir arada sunuyoruz."
          />
          <Button href="/products" variant="ghost" className="self-start lg:self-auto">
            Tümünü incele <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
