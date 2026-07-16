type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="technical-label mb-4 text-brand-red">{eyebrow}</p> : null}
      <h2 className="text-[2.6rem] font-bold leading-[0.95] tracking-[-0.052em] text-brand-navy md:text-[4.4rem]">{title}</h2>
      {description ? <p className="mt-6 max-w-xl text-[0.84rem] leading-[1.72] tracking-[0.01em] text-slate-600">{description}</p> : null}
    </div>
  );
}
