# Reha Spor Kurulum ve Admin Paneli Rehberi

Bu rehber, projeyi yerelde çalıştırmak, PostgreSQL'i hazırlamak ve admin paneline gerçek oturumla giriş yapmak içindir. Production kurulumu bu rehberden farklı olarak müşteriye ait altyapı ve secret'larla yapılacaktır.

## Gereksinimler

- Node.js `24.x`
- npm `11.x`
- PostgreSQL `18.x` **veya** Docker Desktop

Sürümleri kontrol edin:

```powershell
node --version
npm --version
```

## 1. Projeyi ve ortam değişkenlerini hazırla

```powershell
npm install
Copy-Item .env.example .env
```

`.env` dosyasında en az aşağıdakileri düzenleyin:

```dotenv
APP_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://KULLANICI:SIFRE@localhost:5432/rehaspor?schema=public
DIRECT_DATABASE_URL=postgresql://KULLANICI:SIFRE@localhost:5432/rehaspor?schema=public
SESSION_COOKIE_NAME=rehaspor_session
SESSION_SECRET=en-az-32-karakterlik-rastgele-ve-gizli-bir-deger
```

`.env` Git'e gönderilmez. Gerçek şifre, veritabanı URL'si veya production secret'ı dokümana ve kaynak koda yazılmaz.

Rastgele bir session secret üretmek için:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## 2. PostgreSQL kurulumu

İki yerel seçenek vardır. Yalnızca birini kullanın.

### Seçenek A — Bilgisayardaki PostgreSQL

PostgreSQL servisiniz çalışıyorsa `rehaspor` veritabanını oluşturun. Ayrı, sınırlı yetkili bir kullanıcı önerilir:

```sql
CREATE ROLE rehaspor LOGIN PASSWORD 'yerel-guclu-sifre';
CREATE DATABASE rehaspor OWNER rehaspor;
```

Ardından `.env` içindeki iki PostgreSQL URL'sini bu kullanıcı, şifre ve veritabanına göre güncelleyin.

### Seçenek B — Docker PostgreSQL

Docker Desktop çalışırken:

```powershell
npm run db:up
npm run db:status
```

Yerel Docker varsayılanları `rehaspor / rehaspor / rehaspor`dur ve yalnızca geliştirme içindir. `.env.example` içindeki varsayılan URL bu yapı ile uyumludur. Veriyi tamamen silmek gerekmedikçe `npm run db:down` dışında Docker volume silme komutu kullanmayın.

## 3. Şema ve demo verisini yükle

Yeni veya boş veritabanında sırasıyla:

```powershell
npm run db:migrate:deploy
npm run db:seed
```

- Migration, tablo ve indeksleri oluşturur.
- Seed, mevcut demo kategorileri, ürünler, referanslar, kataloglar, ayarlar ve demo mesajlarını yükler.
- Seed idempotenttir; tekrar çalıştırılması kayıtları çoğaltmaz.

Bağlantıyı uygulama üzerinden kontrol etmek için uygulama çalışırken `http://localhost:3000/api/health/ready` adresini açın. Cevapta `database: "connected"` görünmelidir.

## 4. İlk admin hesabını oluştur

İlk kullanıcı veritabanına tek seferlik komutla eklenir:

```powershell
npm run admin:create -- --email admin@example.com --password GucluVeBenzersizBirParola --name "Yönetici Adı"
```

Kurallar:

- Parola en az 12 karakter olmalıdır.
- Aynı e-posta zaten varsa komut mevcut hesabı değiştirmez.
- Parola Argon2id ile hashlenir; veritabanına düz metin yazılmaz.
- Terminal geçmişinde parola kalmaması için production kurulumunda secret yöneticisi veya güvenli kurulum prosedürü kullanılmalıdır.

## 5. Uygulamayı ve admin panelini çalıştır

```powershell
npm run dev
```

Tarayıcı adresleri:

- Public site: `http://localhost:3000`
- Admin giriş: `http://localhost:3000/admin/login`
- Canlılık: `http://localhost:3000/api/health/live`
- Veritabanı hazırlığı: `http://localhost:3000/api/health/ready`

Admin panelindeki mevcut akış:

1. Yönetici e-posta ve parolasıyla giriş yapılır.
2. Sunucu yeni bir opaque session üretir; ham token sadece `HttpOnly` cookie'de tutulur.
3. Veritabanında token'ın HMAC özeti, son kullanma zamanı ve oturum metadatası saklanır.
4. `/admin/*` sayfaları her istekte sunucuda session kaydını doğrular; oturumsuz kullanıcı `/admin/login` sayfasına yönlendirilir.
5. Çıkış, session kaydını veritabanından siler; eski cookie yeniden kullanılamaz.

Admin ekranlarının içerik CRUD işlemleri henüz mock verilerle gösterilir. Gerçek kategori, ürün ve referans yönetimi Faz 5'te bağlanacaktır.

## 6. Kontroller

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:health
npm run test:auth -- http://localhost:3000 admin@example.com GucluVeBenzersizBirParola
```

`test:auth`, login → session → logout → iptal edilmiş session akışını kontrol eder. Uygulama bu komuttan önce çalışıyor olmalıdır.

Temiz bir test veritabanında migration ve seed doğrulaması için:

```powershell
npm run test:db:clean -- rehaspor_clean_test_YYYYMMDD
```

Bu komut adı verilen yeni, geçici veritabanını oluşturur; mevcut `rehaspor` veritabanına yazmaz. Aynı test adı ikinci kez kullanılmaz.

## Production Öncesi Zorunlu Adımlar

- Müşteriye ait veritabanı, domain, storage ve mail hesaplarını kullanın.
- `SESSION_SECRET` değerini yeni ve rastgele üretin; local değerini taşımayın.
- Ayrı bir production admin hesabı oluşturun; local demo hesabını taşımayın.
- `NODE_ENV=production` ve doğru `APP_ORIGIN` değerini ayarlayın. Böylece session cookie `Secure` olur.
- Migration'ı önce staging ortamında deneyin ve yedek/geri dönüş planını doğrulayın.

---

## 7. Domain Bağlama ve Canlıya Geçiş (Production Runbook)

Müşteri veya proje sahibi uygulamayı canlıya alırken aşağıdaki adımları izlemelidir:

### Adım 1: Canlı Veritabanı (PostgreSQL) Hazırlığı
Canlı PostgreSQL veritabanı kurulur (AWS RDS, Supabase, Neon, Hetzner veya kendi VPS sunucunuz).
`DATABASE_URL` ve `DIRECT_DATABASE_URL` canlı bağlantı dizesi olarak tanımlanır.

### Adım 2: Canlı Ortam Değişkenleri (Environment Variables)
Deployment platformunda (Vercel, Railway, Coolify, Docker vb.) aşağıdaki ortam değişkenleri girilir:

```dotenv
NODE_ENV=production
APP_ORIGIN=https://www.rehaspor.com.tr
DATABASE_URL=postgresql://kullanici:sifre@canli-db-host:5432/rehaspor?schema=public
DIRECT_DATABASE_URL=postgresql://kullanici:sifre@canli-db-host:5432/rehaspor?schema=public
SESSION_COOKIE_NAME=rehaspor_session
SESSION_SECRET=32-karakterden-uzun-gizli-rastgele-str-key

# Opsiyonel S3 Object Storage (Cloudflare R2, AWS S3, MinIO)
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
S3_REGION=auto
S3_BUCKET=rehaspor-assets
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_PUBLIC_BASE_URL=https://assets.rehaspor.com.tr
```

### Adım 3: Migration ve Seed Komutlarının Çalıştırılması
Canlı veritabanına tabloları ve varsayılan içerikleri aktarmak için:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Adım 4: Canlı Admin Hesabının Oluşturulması
Canlı ortamda yönetim paneline giriş için gerçek admin hesabı açılır:

```bash
npx tsx scripts/create-admin.ts --email yonetim@rehaspor.com.tr --password "GucluParola123!" --name "Reha Spor Yönetim"
```

### Adım 5: Domain (DNS) Bağlama
1. **A Kaydı (A Record)**: Domain sağlayıcınızda (Netsis, İsimtescil, GoDaddy, Cloudflare vb.) `@` ve `www` kayıtlarını sunucunuzun IP adresine veya Vercel/Cloudflare CNAME hedefine yönlendirin:
   - `CNAME www cname.vercel-dns.com.` veya sunucu IP adresi.
2. **SSL / HTTPS Certificate**: Caddy, Nginx veya Vercel/Cloudflare tarafından otomatik HTTPS SSL sertifikası üretilecektir.

---

Detaylı mimari, fazlar ve karar günlüğü için [ana plan](./plan.md) esas kaynaktır.
