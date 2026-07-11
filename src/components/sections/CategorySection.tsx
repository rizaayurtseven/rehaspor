import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Category } from "@/types/category";

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="section-padding technical-grid bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Ürün Grupları"
            title="Her spor alanına uygun sistem çözümleri"
            description="Zemin altyapısından saha ekipmanına kadar proje ihtiyacınıza uygun ürün grubunu inceleyin."
          />
          <Button href="/products" variant="ghost" className="self-start lg:self-auto">
            Tüm ürün grupları <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
