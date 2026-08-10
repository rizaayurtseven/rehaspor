type ProductSectionLink = {
  href: `#${string}`;
  label: string;
};

export function ProductSectionNav({ links }: { links: ProductSectionLink[] }) {
  return (
    <nav
      aria-label="Ürün detay bölümleri"
      className="sticky top-[72px] z-30 w-full min-w-0 border-y border-brand-line bg-brand-panel/95 backdrop-blur lg:top-[108px]"
    >
      <div className="container-page min-w-0 overflow-x-auto [scrollbar-width:thin]">
        <ul className="flex w-max min-w-full items-center gap-1 py-2">
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="label-caps inline-flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent px-4 text-brand-muted transition hover:border-brand-red hover:text-brand-red focus-visible:border-brand-red focus-visible:text-brand-red"
              >
                <span className="mr-2 text-brand-red" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export type { ProductSectionLink };
