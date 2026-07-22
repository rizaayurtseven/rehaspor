type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="section-kicker mb-4 text-brand-red">{eyebrow}</p> : null}
      <h2 className="display-heading text-[2.6rem] text-brand-navy md:text-[4.4rem]">{title}</h2>
      {description ? <p className="mt-6 max-w-xl text-base leading-7 text-brand-muted">{description}</p> : null}
    </div>
  );
}
