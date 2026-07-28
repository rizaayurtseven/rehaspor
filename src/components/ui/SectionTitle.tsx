type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="label-caps mb-3 text-brand-red">{eyebrow}</p> : null}
      <h2 className="industrial-heading text-3xl text-brand-navy md:text-[42px]">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-brand-muted">{description}</p> : null}
    </div>
  );
}
