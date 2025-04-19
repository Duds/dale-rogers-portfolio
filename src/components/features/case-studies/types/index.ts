export interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}

export interface CaseStudiesBentoProps {
  featured: boolean;
  limit?: number;
}

export interface CaseStudyImagesProps {
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}
