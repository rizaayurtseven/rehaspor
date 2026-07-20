"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useInViewOnce } from "@/components/motion/useInViewOnce";

const processSteps = [
  {
    title: "Keşif ve ihtiyaç analizi",
    text: "Alan, mevcut zemin, branşlar ve kullanım yoğunluğu birlikte değerlendirilir."
  },
  {
    title: "Sistem ve proje planı",
    text: "Uygun zemin katmanları, ekipman kapsamı ve saha detayları netleştirilir."
  },
  {
    title: "Üretim ve saha hazırlığı",
    text: "Malzemeler hazırlanırken altyapı, drenaj ve yüzey koşulları uygulamaya alınır."
  },
  {
    title: "Uygulama ve teslim",
    text: "Kaplama, çizgiler, ekipman montajı ve son kontroller tek programda tamamlanır."
  }
];

export function ProcessSection() {
  const { ref, isInView } = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="bg-brand-cream py-20 sm:py-28 lg:py-32" aria-labelledby="process-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="technical-label text-brand-red">Uygulama süreci</p>
            <h2
              id="process-title"
              className="mt-4 max-w-xl text-[clamp(2.7rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.055em] text-brand-navy"
            >
              Karardan teslime, aynı teknik çizgi.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-3" delay={90}>
            <p className="max-w-lg text-base leading-7 text-brand-muted sm:text-lg sm:leading-8">
              Her adım bir sonrakini hazırlar. Böylece zemin, ekipman ve uygulama takvimi birbirinden kopmaz.
            </p>
          </Reveal>
        </div>

        <ol className={`process-track mt-12 grid border-y border-brand-line md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-brand-line ${isInView ? "is-active" : ""}`}>
          {processSteps.map((step, index) => (
            <li key={step.title} className="process-step border-b border-brand-line py-7 pl-7 md:px-6 lg:border-b-0 lg:px-7 lg:py-9 lg:first:pl-0 lg:last:pr-0">
              <span className="technical-label text-brand-red">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-bold leading-tight tracking-[-0.025em] text-brand-navy">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-brand-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
