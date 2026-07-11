export type AdminMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  receivedAt: string;
  isRead: boolean;
};

export const adminMessages: AdminMessage[] = [
  {
    id: "msg-1",
    name: "Ali Demir",
    email: "ali.demir@example.com",
    phone: "+90 532 555 12 04",
    subject: "Akrilik zemin teklifi",
    body: "Ankara'da 620 m² açık basketbol sahası için akrilik zemin uygulaması hakkında fiyat ve termin bilgisi rica ederim.",
    receivedAt: "Bugün, 09:42",
    isRead: false,
  },
  {
    id: "msg-2",
    name: "Selin Kaya",
    email: "selin.kaya@example.com",
    phone: "+90 533 222 48 10",
    subject: "Padel kort proje görüşmesi",
    body: "İzmir projemizde iki panoramik padel kort planlıyoruz. Keşif ve uygulama süreci için görüşebilir miyiz?",
    receivedAt: "Dün, 16:18",
    isRead: true,
  },
  {
    id: "msg-3",
    name: "Murat Yılmaz",
    email: "murat.yilmaz@example.com",
    phone: "+90 535 861 77 30",
    subject: "Basketbol potası fiyat bilgisi",
    body: "Okul bahçesi için iki adet sabit basketbol potası ve montaj hizmetiyle birlikte teklifinizi bekliyoruz.",
    receivedAt: "8 Tem, 13:05",
    isRead: false,
  },
  {
    id: "msg-4",
    name: "Ece Şahin",
    email: "ece.sahin@example.com",
    phone: "+90 546 101 29 61",
    subject: "Kapalı salon zemin yenileme",
    body: "Mevcut poliüretan zeminimizin yenilenmesi için saha keşfi talep ediyoruz. Salon yaklaşık 900 m² büyüklüğündedir.",
    receivedAt: "7 Tem, 10:24",
    isRead: true,
  },
  {
    id: "msg-5",
    name: "Ömer Arslan",
    email: "omer.arslan@example.com",
    phone: "+90 505 234 90 12",
    subject: "E-katalog ve teknik şartname",
    body: "EPDM zemin ürünleriniz için güncel e-katalog ve teknik şartname dokümanlarını paylaşabilir misiniz?",
    receivedAt: "5 Tem, 15:37",
    isRead: true,
  },
];
