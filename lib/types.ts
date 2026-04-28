export type PaintingStatus = "available" | "sold" | "reserved";

export type Painting = {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: number;
  medium?: string;
  dimensions?: string;
  imageDriveId: string;
  imageUrl: string;
  status: PaintingStatus;
  featured: boolean;
  order: number;
};
