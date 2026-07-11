import type { Product } from "@/types/product";

const catalogPdfUrl = "/catalog/Katalog.pdf";

type ProductInput = Omit<Product, "features">;

function createProduct(product: ProductInput): Product {
  return {
    ...product,
    // Eski kartlarla geçici uyumluluk; yeni arayüzler technicalDetails kullanır.
    features: product.technicalDetails
  };
}

export const products: Product[] = [
  createProduct({
    id: "prd-1",
    code: "RH-Z-001",
    title: "Standart Sistem Akrilik Zemin Kaplaması",
    slug: "standart-sistem-akrilik-zemin-kaplamasi",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Çok amaçlı açık spor sahalarında kullanılan standart akrilik zemin kaplama sistemidir.",
    description:
      "Kaymaz yüzeyi, UV dayanımlı renkleri ve kolay bakım avantajıyla açık spor sahalarında dengeli oyun performansı sunan çok katmanlı akrilik sistemdir.",
    technicalDetails: [
      "Zemin yüksek basınçlı yıkama makineleri ile temizlenir.",
      "Beton zeminlerde epoksi veya poliüretan astar uygulanır.",
      "Akrilik resurfacer kat uygulaması yapılır.",
      "Akrilik renk katları uygulanır.",
      "Oyun çizgileri uluslararası normlara uygun çizilir."
    ],
    usageAreas: [
      "Basketbol sahaları",
      "Voleybol sahaları",
      "Tenis kortları",
      "Çok amaçlı spor alanları",
      "Okul spor sahaları"
    ],
    applicationSteps: [
      "Yüzey temizliği ve gerekli tamiratların yapılması",
      "Astar ve akrilik resurfacer katlarının uygulanması",
      "Akrilik renk katlarının tamamlanması",
      "Branş çizgilerinin ölçülerek çizilmesi"
    ],
    image: "/images/products/rh-z-001/main.jpg",
    gallery: [
      "/images/products/rh-z-001/main.jpg",
      "/images/products/rh-z-001/detail-01.jpg"
    ],
    catalogPageImage: "/images/catalog-pages/page-04.jpg",
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-2",
    code: "RH-Z-002",
    title: "Cushion Sistem Akrilik Zemin Kaplaması",
    slug: "cushion-sistem-akrilik-zemin-kaplamasi",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Darbe emici cushion katlarıyla oyuncu konforunu artıran profesyonel akrilik zemin sistemidir.",
    description:
      "Standart akrilik sisteme eklenen esnek cushion katmanları sayesinde eklem yükünü azaltmaya ve daha konforlu oyun karakteri oluşturmaya yardımcı olur.",
    technicalDetails: [
      "Uygulama zemini temizlenir, çatlak ve kot kusurları onarılır.",
      "Uygun astar ve akrilik resurfacer katı uygulanır.",
      "İstenen performansa göre birden fazla cushion katı serilir.",
      "Akrilik renk katları UV dayanımlı olarak tamamlanır.",
      "Oyun çizgileri ilgili branş ölçülerine göre uygulanır."
    ],
    usageAreas: [
      "Tenis kortları",
      "Basketbol sahaları",
      "Voleybol sahaları",
      "Profesyonel antrenman alanları"
    ],
    applicationSteps: [
      "Zemin hazırlığı ve astarlama",
      "Resurfacer ile yüzey tesviyesi",
      "Cushion ve renk katlarının uygulanması",
      "Oyun çizgilerinin çizilmesi"
    ],
    image: "/images/products/rh-z-002/main.jpg",
    gallery: ["/images/products/rh-z-002/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-05.jpg",
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-3",
    code: "RH-Z-003",
    title: "Rulo Üzeri Sistem Akrilik Zemin Kaplaması",
    slug: "rulo-uzeri-sistem-akrilik-zemin-kaplamasi",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Esnek rulo altyapı üzerine uygulanan, konforlu ve homojen akrilik spor zemini çözümüdür.",
    description:
      "Hazırlanan alt zemine yapıştırılan darbe emici rulo katman ile akrilik son katları bir araya getirerek salonlarda konforlu, derzsiz bir oyun yüzeyi oluşturur.",
    technicalDetails: [
      "Alt zemin nem, kot ve yüzey dayanımı açısından kontrol edilir.",
      "Esnek rulo malzeme poliüretan yapıştırıcı ile zemine sabitlenir.",
      "Rulo birleşimleri uygun dolgu sistemiyle kapatılır.",
      "Akrilik dolgu ve renk katları homojen biçimde uygulanır.",
      "Branş çizgileri projedeki ölçülere göre tamamlanır."
    ],
    usageAreas: [
      "Kapalı spor salonları",
      "Okul spor alanları",
      "Çok amaçlı salonlar",
      "Antrenman tesisleri"
    ],
    applicationSteps: [
      "Alt zemin kontrolü ve temizliği",
      "Rulo katmanın yapıştırılması",
      "Birleşim ve yüzey düzeltmelerinin yapılması",
      "Akrilik katlar ile çizgilerin uygulanması"
    ],
    image: "/images/products/rh-z-003/main.jpg",
    gallery: ["/images/products/rh-z-003/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-06.jpg",
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-4",
    code: "RH-Z-004",
    title: "Poliüretan Zemin Kaplaması",
    slug: "poliuretan-zemin-kaplamasi",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Kapalı spor alanlarında tercih edilen, esnek ve dayanıklı poliüretan zemin kaplama sistemidir.",
    description:
      "Darbe emici altyapısı ve derzsiz son katıyla profesyonel kapalı salonlarda konfor, dayanıklılık ve kolay bakım sağlayan spor zemini sistemidir.",
    technicalDetails: [
      "Zemin temizlendikten sonra SBR rulo malzeme uygulanır.",
      "Poliüretan yapıştırıcı kullanılır.",
      "Sealer/macunun ardından self leveling poliüretan uygulanır.",
      "Son kat poliüretan boya yapılır.",
      "Branş çizgileri çizilir."
    ],
    usageAreas: [
      "Kapalı spor salonları",
      "Basketbol sahaları",
      "Voleybol sahaları",
      "Çok amaçlı kapalı tesisler"
    ],
    applicationSteps: [
      "Alt zeminin hazırlanması ve astarlanması",
      "SBR rulo katmanın yapıştırılması",
      "Sealer ve self leveling katlarının uygulanması",
      "Son kat boya ile branş çizgilerinin tamamlanması"
    ],
    image: "/images/products/rh-z-004/main.jpg",
    gallery: [
      "/images/products/rh-z-004/main.jpg",
      "/images/products/rh-z-004/detail-01.jpg"
    ],
    catalogPageImage: "/images/catalog-pages/page-07.jpg",
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-5",
    code: "RH-Z-005",
    title: "EPDM Zemin Kaplaması",
    slug: "epdm-zemin-kaplamasi",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Dış mekân spor ve oyun alanları için esnek, renkli ve darbe azaltıcı kauçuk zemin sistemidir.",
    description:
      "SBR alt kat ve renkli EPDM granül üst katın birlikte uygulandığı sistem; güvenli, su geçirgen ve projeye özel desenlenebilen bir yüzey sunar.",
    technicalDetails: [
      "Beton veya asfalt alt zemin dayanım ve eğim açısından kontrol edilir.",
      "Poliüretan bağlayıcı ile SBR kauçuk alt kat serilir.",
      "Renkli EPDM granüller projedeki kalınlıkta uygulanır.",
      "Derzsiz yüzey su tahliyesini destekleyecek şekilde tamamlanır.",
      "Renk ve desenler proje ihtiyacına göre uyarlanabilir."
    ],
    usageAreas: [
      "Çocuk oyun alanları",
      "Koşu ve yürüyüş parkurları",
      "Açık hava fitness alanları",
      "Okul bahçeleri"
    ],
    applicationSteps: [
      "Alt zemin hazırlığı ve astar",
      "SBR kauçuk alt kat uygulaması",
      "EPDM granül son kat uygulaması",
      "Kürlenme ve yüzey kontrolü"
    ],
    image: "/images/products/rh-z-005/main.jpg",
    gallery: ["/images/products/rh-z-005/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-08.jpg",
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-6",
    code: "RH-Z-006",
    title: "Sentetik Çim Zemin Kaplaması Kumlu Sistem",
    slug: "sentetik-cim-zemin-kaplamasi-kumlu-sistem",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Silis kum dolgulu yapısıyla tenis ve çok amaçlı alanlarda dengeli kullanım sunan sentetik çim sistemidir.",
    description:
      "Dayanıklı sentetik çim halı ile kontrollü silis kum dolgusunu birleştirir; düzenli top davranışı ve düşük bakım ihtiyacıyla farklı tesislere uyarlanabilir.",
    technicalDetails: [
      "Alt zemin eğimi ve drenajı uygulama öncesinde kontrol edilir.",
      "Sentetik çim rulolar projeye göre açılır ve ek yerleri birleştirilir.",
      "Silis kum dolgu yüzeye homojen olarak dağıtılır.",
      "Çim lifleri mekanik fırçalama ile dik konuma getirilir.",
      "Saha çizgileri farklı renk çimle sisteme entegre edilir."
    ],
    usageAreas: [
      "Tenis kortları",
      "Çok amaçlı spor alanları",
      "Okul bahçeleri",
      "Peyzaj uygulamaları"
    ],
    applicationSteps: [
      "Alt zemin ve drenaj kontrolü",
      "Çim ruloların serilmesi ve eklenmesi",
      "Silis kum dolgunun uygulanması",
      "Fırçalama ve son saha kontrolü"
    ],
    image: "/images/products/rh-z-006/main.jpg",
    gallery: ["/images/products/rh-z-006/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-09.jpg",
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-7",
    code: "RH-Z-007",
    title: "Sentetik Çim Zemin Kaplaması Granüllü Sistem",
    slug: "sentetik-cim-zemin-kaplamasi-granullu-sistem",
    categorySlug: "zemin-kaplamalari",
    shortDescription:
      "Futbol sahalarında yoğun kullanıma uygun, kum ve performans granülü dolgulu sentetik çim sistemidir.",
    description:
      "Yoğun antrenman ve maç trafiğine uygun sentetik çim, silis kum ve elastik granül katmanlarıyla doğal çime yakın oyun hissi ve güçlü drenaj sağlar.",
    technicalDetails: [
      "Alt temel, kot ve drenaj değerleri proje şartlarına göre hazırlanır.",
      "Sentetik çim rulolar serilir ve profesyonel ek bandı ile birleştirilir.",
      "Silis kum dolgu kontrollü miktarda yüzeye yayılır.",
      "SBR veya proje tanımındaki performans granülü uygulanır.",
      "Dolgu seviyesi fırçalama ve saha testleriyle dengelenir."
    ],
    usageAreas: [
      "Futbol sahaları",
      "Halı sahalar",
      "Antrenman tesisleri",
      "Okul spor alanları"
    ],
    applicationSteps: [
      "Alt temel ve drenaj hazırlığı",
      "Çim ruloların serilmesi ve birleştirilmesi",
      "Kum ve granül dolgu uygulaması",
      "Fırçalama ile saha kontrolü"
    ],
    image: "/images/products/rh-z-007/main.jpg",
    gallery: [
      "/images/products/rh-z-007/main.jpg",
      "/images/products/rh-z-007/detail-01.jpg"
    ],
    catalogPageImage: "/images/catalog-pages/page-10.jpg",
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-8",
    code: "RH-Z-008",
    title: "Otopark ve Fabrika Çizgileri",
    slug: "otopark-ve-fabrika-cizgileri",
    categorySlug: "saha-cizgileri",
    shortDescription:
      "Yoğun trafik alanları için ölçülü, görünür ve dayanıklı profesyonel çizgi uygulamasıdır.",
    description:
      "Otopark, fabrika ve saha dolaşımını düzenlemek için yüzeye uygun boya sistemi, hassas aplikasyon ve temiz bitişle uygulanan işaretleme çözümüdür.",
    technicalDetails: [
      "Uygulama yüzeyi toz, yağ ve gevşek parçalardan arındırılır.",
      "Akslar, park cepleri ve güvenlik alanları projeye göre işaretlenir.",
      "Yüzeye uygun epoksi, akrilik veya poliüretan boya seçilir.",
      "Maskeleme ile net kenarlı çizgiler uygulanır.",
      "Kürlenme sonrasında kalınlık ve görünürlük kontrolü yapılır."
    ],
    usageAreas: [
      "Kapalı ve açık otoparklar",
      "Fabrika üretim alanları",
      "Depo ve lojistik tesisleri",
      "Spor sahaları"
    ],
    applicationSteps: [
      "Yüzey temizliği",
      "Ölçüm, aplikasyon ve maskeleme",
      "Boya uygulaması",
      "Kürlenme ve kalite kontrol"
    ],
    image: "/images/products/rh-z-008/main.jpg",
    gallery: ["/images/products/rh-z-008/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-11.jpg",
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-9",
    code: "RH-SE-001",
    title: "Basketbol Potası",
    slug: "basketbol-potasi",
    categorySlug: "spor-ekipmanlari",
    shortDescription:
      "Açık ve kapalı sahalar için sabit ya da hareketli profesyonel basketbol potası çözümleri.",
    description:
      "Proje ölçülerine göre seçilebilen gövde, pano, çember ve koruma ekipmanlarıyla güvenli, dayanıklı ve standartlara uygun kurulum sunar.",
    technicalDetails: [
      "Sabit, tavana katlanır veya hareketli model seçenekleri bulunur.",
      "Çelik gövde elektrostatik boya veya galvaniz kaplama ile korunur.",
      "Pano ve çember ölçüleri kullanım seviyesine göre belirlenir.",
      "Koruyucu minder ve ankraj detayları projeye dahil edilebilir."
    ],
    usageAreas: [
      "Açık basketbol sahaları",
      "Kapalı spor salonları",
      "Okul spor alanları",
      "Antrenman tesisleri"
    ],
    image: "/images/products/basketbol-potasi/main.jpg",
    gallery: ["/images/products/basketbol-potasi/main.jpg"],
    catalogPageImage: "/images/catalog-pages/page-12.jpg",
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-10",
    code: "RH-SE-002",
    title: "Voleybol Direği",
    slug: "voleybol-diregi",
    categorySlug: "spor-ekipmanlari",
    shortDescription:
      "Salon ve açık saha kullanımına uygun, ayarlanabilir file gergili voleybol direği sistemidir.",
    description:
      "Sağlam zemin yuvası, hassas file gerdirme mekanizması ve farklı oyun seviyelerine uyarlanabilen yüksekliğiyle uzun ömürlü kullanım sağlar.",
    technicalDetails: [
      "Direk gövdesi alüminyum veya korumalı çelik üretilebilir.",
      "File yüksekliği farklı kullanıcı grupları için ayarlanabilir.",
      "Gerdirme mekanizması kontrollü ve güvenli kullanım sağlar.",
      "Direk koruma minderleri projeye eklenebilir."
    ],
    usageAreas: [
      "Voleybol sahaları",
      "Kapalı spor salonları",
      "Okul spor alanları",
      "Çok amaçlı sahalar"
    ],
    image: "/images/products/voleybol-diregi/main.jpg",
    gallery: ["/images/products/voleybol-diregi/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-11",
    code: "RH-SE-003",
    title: "Futbol Kale Direği",
    slug: "futbol-kale-diregi",
    categorySlug: "spor-ekipmanlari",
    shortDescription:
      "Farklı saha ölçülerine uygun, güvenli bağlantılı ve hava koşullarına dayanıklı futbol kalesidir.",
    description:
      "Mini saha, okul ve profesyonel tesisler için sabit veya taşınabilir gövde seçenekleri; düzenli file bağlantısı ve güvenli montaj detaylarıyla sunulur.",
    technicalDetails: [
      "Gövde ölçüleri saha standardına göre projelendirilir.",
      "Alüminyum veya korozyona dayanıklı çelik profil kullanılabilir.",
      "File kancaları oyuncu güvenliğini destekleyecek biçimde yerleştirilir.",
      "Sabit modellerde ankraj, mobil modellerde devrilme önlemi uygulanır."
    ],
    usageAreas: [
      "Profesyonel futbol sahaları",
      "Halı sahalar",
      "Okul sahaları",
      "Antrenman alanları"
    ],
    image: "/images/products/futbol-kale-diregi/main.jpg",
    gallery: ["/images/products/futbol-kale-diregi/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-12",
    code: "RH-SE-004",
    title: "Tenis Direği",
    slug: "tenis-diregi",
    categorySlug: "spor-ekipmanlari",
    shortDescription:
      "Profesyonel ve çok amaçlı kortlar için kontrollü file gerdirmeli tenis direği sistemidir.",
    description:
      "Kort standardına uygun ölçüsü, dayanıklı metal gövdesi ve mekanik gerdirme sistemiyle file yüksekliğinin düzenli korunmasına yardımcı olur.",
    technicalDetails: [
      "Direk kesiti ve yüksekliği kort standardına uygun hazırlanır.",
      "Mekanik gerdirme kolu file tansiyonunu hassas biçimde ayarlar.",
      "Gömme yuva ve kapak detayı çok amaçlı alanlarda kolay kullanım sağlar.",
      "Dış mekân modellerinde korozyon koruması uygulanır."
    ],
    usageAreas: [
      "Tenis kortları",
      "Spor kulüpleri",
      "Site spor alanları",
      "Okul tesisleri"
    ],
    image: "/images/products/tenis-diregi/main.jpg",
    gallery: ["/images/products/tenis-diregi/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-13",
    code: "RH-G-001",
    title: "Tribün Koltuğu",
    slug: "tribun-koltugu",
    categorySlug: "gym-ekipmanlari",
    shortDescription:
      "Salon ve saha tribünleri için ergonomik, dayanıklı ve farklı renklerde koltuk çözümleri.",
    description:
      "Projeye uygun yerleşim, sağlam sabitleme ve kolay temizlenebilir yüzey özellikleriyle seyirci alanlarında düzenli ve kurumsal bir görünüm oluşturur.",
    technicalDetails: [
      "Darbe ve UV dayanımlı polimer gövde seçenekleri bulunur.",
      "Basamak veya metal konstrüksiyon üzerine güvenli biçimde sabitlenir.",
      "Numaralandırma ve kurumsal renk uygulaması yapılabilir.",
      "Ergonomik form uzun süreli oturum konforunu destekler."
    ],
    usageAreas: [
      "Kapalı spor salonları",
      "Stadyumlar",
      "Okul tribünleri",
      "Çok amaçlı etkinlik alanları"
    ],
    image: "/images/products/tribun-koltugu/main.jpg",
    gallery: ["/images/products/tribun-koltugu/main.jpg"],
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-14",
    code: "RH-G-002",
    title: "Skorboard",
    slug: "skorboard",
    categorySlug: "gym-ekipmanlari",
    shortDescription:
      "Farklı spor branşları için uzaktan kontrollü, yüksek görünürlüklü dijital skorboard sistemidir.",
    description:
      "Salon ölçüsü ve branş ihtiyaçlarına göre yapılandırılan gösterge alanları; oyuncu, hakem ve seyirciler için net maç bilgisi sağlar.",
    technicalDetails: [
      "Yüksek parlaklıklı LED göstergeler uzak mesafeden okunabilir.",
      "Skor, süre, periyot ve takım faul bilgileri yapılandırılabilir.",
      "Kablolu veya kablosuz kontrol seçenekleri sunulur.",
      "Panel kasası tesis koşullarına uygun koruma ile üretilir."
    ],
    usageAreas: [
      "Basketbol salonları",
      "Voleybol salonları",
      "Çok amaçlı spor tesisleri",
      "Okul spor salonları"
    ],
    image: "/images/products/skorboard/main.jpg",
    gallery: ["/images/products/skorboard/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-15",
    code: "RH-G-003",
    title: "Koruyucu Duvar Paneli",
    slug: "koruyucu-duvar-paneli",
    categorySlug: "gym-ekipmanlari",
    shortDescription:
      "Kapalı spor salonlarında oyuncu güvenliğini artıran darbe emici duvar koruma panelidir.",
    description:
      "Salon duvarlarını korurken çarpma etkisini azaltmaya yardımcı olan panel sistemi, proje ölçüsünde ve kurumsal renk seçenekleriyle uygulanır.",
    technicalDetails: [
      "Darbe emici iç katman dayanıklı dış kaplama ile korunur.",
      "Panel kalınlığı ve yüksekliği risk analizine göre seçilebilir.",
      "Yüzey kolay temizlenebilir ve yoğun kullanıma uygundur.",
      "Gizli veya kontrollü sabitleme detayları güvenli bitiş sağlar."
    ],
    usageAreas: [
      "Kapalı spor salonları",
      "Okul salonları",
      "Jimnastik alanları",
      "Antrenman tesisleri"
    ],
    image: "/images/products/koruyucu-duvar-paneli/main.jpg",
    gallery: ["/images/products/koruyucu-duvar-paneli/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-16",
    code: "RH-P-001",
    title: "Panoramik Padel Kort",
    slug: "panoramik-padel-kort",
    categorySlug: "padel-court",
    shortDescription:
      "Geniş görüş alanı, temperli camları ve güçlü çelik yapısıyla premium padel kort çözümüdür.",
    description:
      "Profesyonel oyun geometrisini panoramik cam tasarım, sentetik çim zemin ve entegre aydınlatma altyapısıyla birleştiren anahtar teslim kort sistemidir.",
    technicalDetails: [
      "Taşıyıcı çelik konstrüksiyon proje yüklerine göre hazırlanır.",
      "Panoramik temperli cam paneller güvenli bağlantılarla monte edilir.",
      "Tel örgü, kapı ve oyuncu temas yüzeyleri kontrollü biçimde tamamlanır.",
      "Sentetik çim, file ve LED aydınlatma sisteme entegre edilir."
    ],
    usageAreas: [
      "Padel kulüpleri",
      "Otel ve resort tesisleri",
      "Özel spor kompleksleri",
      "Belediye spor tesisleri"
    ],
    applicationSteps: [
      "Saha altyapısı ve ankraj planının hazırlanması",
      "Çelik konstrüksiyon ile camların montajı",
      "Çim zemin, file ve çevre ekipmanlarının kurulması",
      "Aydınlatma, güvenlik ve oyun kontrollerinin yapılması"
    ],
    image: "/images/products/panoramik-padel-kort/main.jpg",
    gallery: [
      "/images/products/panoramik-padel-kort/main.jpg",
      "/images/products/panoramik-padel-kort/detail-01.jpg"
    ],
    catalogPdfUrl,
    isFeatured: true
  }),
  createProduct({
    id: "prd-17",
    code: "RH-P-002",
    title: "Standart Padel Kort",
    slug: "standart-padel-kort",
    categorySlug: "padel-court",
    shortDescription:
      "Standartlara uygun ölçülerde, dayanıklı çelik ve cam bileşenlerden oluşan padel kort sistemidir.",
    description:
      "Kulüp, site ve belediye projeleri için bakım kolaylığı, kontrollü maliyet ve güvenli oyun alanını bir araya getiren eksiksiz kort çözümüdür.",
    technicalDetails: [
      "Kort ölçüleri ve oyun alanı yerleşimi standartlara uygun hazırlanır.",
      "Çelik taşıyıcılar korozyona karşı korumalı olarak üretilir.",
      "Temperli cam ve tel örgü paneller güvenli bağlantılarla sabitlenir.",
      "Sentetik çim, file ve kapı ekipmanları projeye dahil edilir."
    ],
    usageAreas: [
      "Padel kulüpleri",
      "Site spor alanları",
      "Belediye tesisleri",
      "Okul ve üniversite kampüsleri"
    ],
    applicationSteps: [
      "Altyapı ve ankraj hazırlığı",
      "Konstrüksiyon, cam ve tel örgü montajı",
      "Sentetik çim ile oyun ekipmanlarının kurulması",
      "Son ölçüm ve güvenlik kontrolü"
    ],
    image: "/images/products/standart-padel-kort/main.jpg",
    gallery: ["/images/products/standart-padel-kort/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  }),
  createProduct({
    id: "prd-18",
    code: "RH-P-003",
    title: "Padel Kort Aydınlatma Sistemi",
    slug: "padel-kort-aydinlatma-sistemi",
    categorySlug: "padel-court",
    shortDescription:
      "Gece kullanımında homojen görüş sağlayan, enerji verimli LED padel kort aydınlatma sistemidir.",
    description:
      "Kort geometrisine göre yapılan aydınlatma yerleşimi, kamaşmayı azaltmaya ve oyun alanının dengeli biçimde aydınlatılmasına yardımcı olur.",
    technicalDetails: [
      "LED armatür gücü hedeflenen aydınlık seviyesine göre seçilir.",
      "Direk ve armatür açıları homojen ışık dağılımı için ayarlanır.",
      "Dış ortam bileşenleri uygun koruma sınıfında kullanılır.",
      "Elektrik panosu ve kontrol seçenekleri projeye göre yapılandırılır."
    ],
    usageAreas: [
      "Açık padel kortları",
      "Kapalı padel tesisleri",
      "Spor kulüpleri",
      "Otel spor alanları"
    ],
    applicationSteps: [
      "Aydınlatma hesabı ve yerleşim planı",
      "Direk, kablolama ve pano altyapısının kurulması",
      "LED armatürlerin montajı ve yönlendirilmesi",
      "Ölçüm, test ve devreye alma"
    ],
    image: "/images/products/padel-kort-aydinlatma-sistemi/main.jpg",
    gallery: ["/images/products/padel-kort-aydinlatma-sistemi/main.jpg"],
    catalogPdfUrl,
    isFeatured: false
  })
];
