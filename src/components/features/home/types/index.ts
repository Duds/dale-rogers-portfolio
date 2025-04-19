export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface LogoSaladProps {
  logos: Array<{
    name: string;
    url: string;
    alt: string;
  }>;
}

export interface Service {
  title: string;
  description: string;
  variant: "purple" | "black" | "green" | "orange";
  imageUrl: string;
}

export interface ServicesProps {
  services: Service[];
}
