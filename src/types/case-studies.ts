/**
 * Represents a case study
 */
export interface CaseStudy {
  /** Title of the case study */
  title: string;
  /** URL to the cover image */
  coverImage: string;
  /** URL slug for the case study */
  slug: string;
  /** Brief description of the case study */
  description: string;
  /** Optional tags or categories */
  tags?: string[];
  /** Optional client name */
  client?: string;
  /** Optional year of completion */
  year?: number;
}
