export type AdminStat = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type AdminMessageStatus = "Yeni" | "Okundu";

export type AdminMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  receivedAt: string;
  status: AdminMessageStatus;
};
