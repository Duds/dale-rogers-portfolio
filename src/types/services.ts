/**
 * Represents a service offering
 */
export interface Service {
  /** Title of the service */
  title: string;
  /** Description of the service */
  description: string;
  /** URL to the service's image */
  imageUrl: string;
  /** Cover image URL for featured display */
  coverImage?: string;
  /** Icon identifier for the service */
  icon?: string;
  /** Link to the service's page */
  link: string;
  /** Slug for the service URL path */
  slug?: string;
}
