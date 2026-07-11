# reha-spor-frontend

Reha Spor için hazırlanan modern, kurumsal ve responsive ürün/katalog sitesi frontend projesi. Public web sitesi ile frontend tabanlı yönetim paneli aynı Next.js App Router uygulamasında yer alır. Proje şu anda mock verilerle çalışır ve backend bağlantısına hazır bir veri erişim katmanı kullanır.

## Kullanılan Teknolojiler

- Next.js 14 ve App Router
- React 18
- TypeScript (strict mod)
- Tailwind CSS
- lucide-react
- Yerel, tip güvenli mock veri katmanı

## Gereksinimler

- Node.js 18.17 veya daha yeni bir LTS sürümü
- npm

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

```bash
npm install
```

## Geliştirme Ortamında Çalıştırma

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Build Alma

Üretim build'ini oluşturmak için:

```bash
npm run build
```

Oluşan production build'ini yerelde çalıştırmak için:

```bash
npm run start
```

Kod kalitesi kontrolü için:

```bash
npm run lint
```

## Katalog PDF'i

Türkçe katalog dosyasını aşağıdaki tam konuma ekleyin:

```text
public/catalog/Katalog.pdf
```

Dosya uygulamada `/catalog/Katalog.pdf` adresinden açılır. E-katalog görüntüleme/indirme butonları ve ürün detaylarındaki katalog bağlantıları bu yolu kullanır. PDF henüz eklenmemiş olsa da build tamamlanır; yalnızca ilgili bağlantı dosya eklenene kadar sonuç vermez.

İngilizce katalog için ayrılan örnek yol `public/catalog/Reha-Spor-EN.pdf` dosyasıdır. Katalog kayıtları `src/data/catalogs.ts` içinde yönetilir.

## Ürün ve Proje Görselleri

Gerçek görseller `public/images` altına eklenmelidir. Veri dosyalarındaki hazır yollar şu düzeni izler:

```text
public/images/categories/<kategori-slug>/main.jpg
public/images/products/<urun-slug-veya-kod>/main.jpg
public/images/products/<urun-slug-veya-kod>/detail-01.jpg
public/images/references/<proje-slug>/main.jpg
public/images/catalog-pages/page-04.jpg
```

Örneğin RH-Z-001 ana görseli `public/images/products/rh-z-001/main.jpg` konumuna, katalog sayfa görseli ise `public/images/catalog-pages/page-04.jpg` konumuna eklenir. Görseller eklenmeden de sayfalar fallback/placeholder tasarımla çalışmaya devam eder.

## Veri ve API Mimarisi

- `src/types`: Kategori, ürün, referans, katalog, iletişim ve site ayarı tipleri
- `src/data`: 5 kategori, 18 ürün, 6 referans, kataloglar, site ayarları ve admin mock verileri
- `src/lib/api.ts`: Sayfaların kullandığı asenkron veri erişim fonksiyonları

`src/lib/api.ts` şu anda `src/data` içindeki mock verileri döndürür. Backend API hazır olduğunda sayfa bileşenlerini değiştirmek yerine bu dosyadaki fonksiyon gövdeleri gerçek `fetch` çağrılarıyla değiştirilmelidir. Mevcut fonksiyon adları ve dönüş tipleri korunarak kategori, ürün, referans, katalog ve site ayarı endpoint'lerine geçiş yapılabilir.

Backend geçişinde temel API adresinin ortam değişkeninden okunması, HTTP hata yönetimi, cevap doğrulama, kimlik doğrulama ve Next.js cache/revalidation ayarlarının merkezi olarak ele alınması önerilir. Mock aşamasında backend bulunmadığı için bilerek ağ isteği yapılmaz.

## Başlıca Route'lar

- `/`: Kurumsal ana sayfa
- `/about`: Hakkımızda
- `/products`: Ürün kategorileri
- `/products/[categorySlug]`: Kategori ürünleri
- `/products/[categorySlug]/[productSlug]`: Ürün detayı
- `/references`: Referans projeler
- `/e-catalog`: PDF katalog
- `/contact`: İletişim
- `/admin/login` ve `/admin/*`: Frontend admin paneli iskeleti

Admin panelinde gerçek kimlik doğrulama veya kalıcı CRUD işlemleri henüz yoktur. Bu işlevler backend entegrasyonuyla birlikte eklenmelidir.
