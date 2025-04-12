// Astro Components and Prop Contracts
// For use in `/components` directory of Astro project

// HeroSection.astro
export interface HeroSectionProps {
  heading: string;
  intro: string;
  ctaLabel: string;
  onCTAClick?: () => void;
}

// CaseStrip.astro
export interface CaseStripProps {
  items: Array<{
    imageUrl: string;
    title: string;
    href: string;
  }>;
}

// TextIntro.astro
export interface TextIntroProps {
  paragraphs: string[];
  animateOnScroll?: boolean;
}

// ProjectGrid.astro
export interface ProjectGridProps {
  projects: Array<{
    title: string;
    tags: string[];
    imageUrl: string;
    meta: string;
  }>;
}

// ServicesGrid.astro
export interface ServicesGridProps {
  services: Array<{
    title: string;
    description: string;
    bgColor: string;
    imageUrl: string;
  }>;
}

// BrandStatement.astro
export interface BrandStatementProps {
  statement: string;
  emoji: string;
}

// ClientList.astro
export interface ClientListProps {
  clients: string[];
  heading?: string;
}

// FinalCTA.astro
export interface FinalCTAProps {
  title: string;
  ctaLabel: string;
  onClick?: () => void;
}

// Footer.astro
export interface FooterProps {
  socials: Array<{
    name: string;
    href: string;
  }>;
  sitemap: Array<{
    label: string;
    href: string;
  }>;
  legal: Array<{
    label: string;
    href: string;
  }>;
}

// Layout wrapper suggestion
// DefaultLayout.astro should accept { title?: string, children?: any }
