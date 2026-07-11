import type { AdminMessage, AdminStat } from "@/types/admin";

export const adminStats: AdminStat[] = [
  {
    id: "stat-categories",
    label: "Toplam Kategori",
    value: "5",
    description: "Yayındaki ürün kategorileri"
  },
  {
    id: "stat-products",
    label: "Toplam Ürün",
    value: "18",
    description: "Katalogda tanımlı ürünler"
  },
  {
    id: "stat-references",
    label: "Toplam Referans",
    value: "6",
    description: "Yayındaki referans projeler"
  },
  {
    id: "stat-messages",
    label: "Gelen Mesaj",
    value: "8",
    description: "İletişim formu mesajları"
  }
];

export const mockMessages: AdminMessage[] = [
  {
    id: "msg-1",
    name: "Ali Demir",
    email: "ali.demir@example.com",
    phone: "+90 532 111 22 33",
    subject: "Akrilik zemin teklifi",
    message: "Okul sahamız için standart akrilik zemin uygulaması hakkında teklif rica ederiz.",
    receivedAt: "2026-07-10T09:30:00+03:00",
    status: "Yeni"
  },
  {
    id: "msg-2",
    name: "Selin Kaya",
    email: "selin.kaya@example.com",
    subject: "Padel kort proje görüşmesi",
    message: "Tesisimiz için iki panoramik padel kort planlıyoruz. Proje görüşmesi yapmak istiyoruz.",
    receivedAt: "2026-07-09T15:10:00+03:00",
    status: "Okundu"
  },
  {
    id: "msg-3",
    name: "Murat Yılmaz",
    email: "murat.yilmaz@example.com",
    phone: "+90 533 444 55 66",
    subject: "Basketbol potası fiyat bilgisi",
    message: "Açık saha için iki adet sabit basketbol potası hakkında bilgi alabilir miyim?",
    receivedAt: "2026-07-09T11:45:00+03:00",
    status: "Yeni"
  },
  {
    id: "msg-4",
    name: "Ece Arslan",
    email: "ece.arslan@example.com",
    subject: "Kapalı salon zemin yenileme",
    message: "Mevcut kapalı salon zemininin yenilenmesi için keşif talep ediyoruz.",
    receivedAt: "2026-07-08T16:20:00+03:00",
    status: "Okundu"
  }
];
