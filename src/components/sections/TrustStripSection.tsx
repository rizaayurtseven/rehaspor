const trustItems = [
  { title: "Keşif ve projelendirme", text: "Saha, kullanım ve altyapı analizi" },
  { title: "Üretim ve tedarik", text: "Projeye uygun sistem bileşenleri" },
  { title: "Uygulama ve montaj", text: "Teknik ekip ile kontrollü saha işi" },
  { title: "Tek ekip, tek muhatap", text: "Başlangıçtan teslimata bütünlük" }
];

export function TrustStripSection() {
  return (
    <section aria-label="Reha Spor çalışma yaklaşımı" className="border-b border-brand-line bg-white">
      <div className="container-page">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ title, text }, index) => (
            <li
              key={title}
              className={`grid min-h-36 grid-cols-1 content-start gap-3 p-5 sm:p-6 lg:min-h-32 lg:grid-cols-[2.25rem_1fr] lg:px-7 lg:py-7 ${index > 1 ? "border-t border-brand-line lg:border-t-0" : ""} ${index % 2 === 1 ? "border-l border-brand-line" : ""} ${index > 0 ? "lg:border-l lg:border-brand-line" : "lg:pl-0"} ${index === trustItems.length - 1 ? "lg:pr-0" : ""}`}
            >
              <span className="technical-label pt-0.5 text-brand-red" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-[0.92rem] font-bold leading-5 text-brand-navy">{title}</h2>
                <p className="mt-1.5 text-[0.92rem] leading-6 text-brand-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
