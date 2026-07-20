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
        <ul className="grid divide-y divide-brand-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {trustItems.map(({ title, text }, index) => (
            <li key={title} className="grid min-h-32 grid-cols-[2.5rem_1fr] items-start gap-3 px-1 py-7 sm:px-5 lg:px-7 first:pl-0 last:pr-0">
              <span className="technical-label pt-0.5 text-brand-red">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-sm font-bold text-brand-navy">{title}</h2>
                <p className="mt-1.5 text-base leading-6 text-brand-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
