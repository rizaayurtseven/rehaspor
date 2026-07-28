# Mock Veri Geçiş Haritası

> Durum: Faz 0 tamamlandı. Bu dosya Faz 2 Prisma şeması ve Faz 4–5 entegrasyonu için referanstır.

## Mevcut veri girişleri

| Alan | Şimdiki kaynak | Hedef |
|---|---|---|
| Public kategori/ürün/referans/katalog/ayar sayfaları | `src/lib/api.ts` | Public read service (`src/server/modules/*`) |
| ProductCard kategori etiketi | `src/data/categories` doğrudan import | Ürün DTO'sunda `category` özeti veya server prop |
| Navbar, Footer, Contact CTA ayarları | `src/data/siteSettings` doğrudan import | Root/public layout service ve prop |
| Footer kategorileri | `src/data/categories` doğrudan import | Root/public layout service ve prop |
| Admin dashboard | `src/data/*`, `components/admin/adminMockData` | Admin dashboard query service |
| Admin CRUD ekranları | Client `useState` + `src/data/*` | `/api/v1/admin/*` + server doğrulama |
| Contact form | Yerel başarı state'i | `POST /api/v1/contact` |
| Admin messages | `adminMockData` + yerel state | `contact_messages` query/mutation service |

## Public ve admin alan eşleşmesi

### Kategori

- Public model: `id`, `title`, `slug`, `description`, `image`, `productCount`.
- Admin mevcut form: `title`, `slug`, `description`; görsel alanı yalnızca placeholder.
- Hedef: `imageAssetId`, `sortOrder`, `status`, opsiyonel SEO alanları eklenir. `productCount` ilişkiden hesaplanır, yazılmaz.

### Ürün

- Public model: kod, başlık, slug, kategori, kısa/uzun açıklama, teknik detaylar, kullanım alanları, uygulama adımları, ana görsel, galeri, katalog görselleri/PDF'i, vitrin durumu.
- Admin mevcut form: kod, başlık, kategori slug'ı, kısa açıklama, teknik detaylar, vitrin durumu; görsel placeholder.
- Eksik yönetim alanları: `slug`, `description`, `usageAreas`, `applicationSteps`, `image`, `gallery`, `catalogPageImage`, `catalogPdfUrl`, yayın durumu ve sıralama.
- Hedef: ilişki `categoryId` ile tutulur; slug yalnızca benzersiz URL alanıdır. Sıralı metin alanları child tablolarla, medya `assets` ve `product_media` ile modellenir.

### Referans

- Public model: başlık, şehir, yıl, kategori, açıklama, görsel.
- Admin mevcut form: başlık, şehir, yıl, kategori, açıklama; görsel placeholder.
- Hedef: `slug`, `imageAssetId`, `status`, `sortOrder`, opsiyonel SEO alanları eklenir.

### Katalog ve site ayarları

- Katalog ekranı mevcut kayıtları gösterir; dosya seçici ve kaydetme akışı mock'tur.
- Site ayarları formu local state'e yazmaktadır.
- Hedef: katalog sürüm/yayın akışı `catalogs` + `assets`; ayarlar singleton `site_settings` kaydı.

### Mesajlar

- Contact form: `fullName`, `email`, `phone`, `subject`, `message`.
- Admin mock: isim ve gövde alanları farklı adlarla tutuluyor; tamamen ayrı demo veri kümesi.
- Hedef: tek `contact_messages` kaynağı, durumlar `UNREAD`, `READ`, `ARCHIVED`; mail bildirimi kayıttan sonra ve başarısız olsa da mesaj korunur.

## Uygulama kuralları

- Faz 2'de bu alanlar Prisma şemasına taşınır.
- Faz 4'te public doğrudan `src/data` importları kaldırılır.
- Faz 5'te admin formları eksik alanlar tamamlanmadan gerçek CRUD'a bağlanmaz.
- Mock dosyaları seed kaynağına dönüşür; production runtime'da kullanılmaz.
