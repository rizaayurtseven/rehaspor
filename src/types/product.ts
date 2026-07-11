export type Product = {
  id: string;
  code: string;
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  technicalDetails: string[];
  usageAreas: string[];
  applicationSteps?: string[];
  image: string;
  gallery?: string[];
  catalogPageImage?: string;
  catalogPdfUrl?: string;
  isFeatured: boolean;
  /** @deprecated Yeni ekranlarda technicalDetails alanını kullanın. */
  features: string[];
};
