export default function Loading() {
  return (
    <div className="grid min-h-[72vh] place-items-center bg-brand-cream" role="status" aria-label="Sayfa yükleniyor">
      <div className="flex items-center gap-6">
        <span className="site-loader" aria-hidden="true" />
        <span className="technical-label text-brand-red">Saha hazırlanıyor</span>
      </div>
    </div>
  );
}
