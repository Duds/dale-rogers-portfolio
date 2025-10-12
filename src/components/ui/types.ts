/**
 * Type definitions for UI components
 */

export interface ButtonProps {
  /** Button ID */
  id?: string;
  /** Link href (renders as anchor if provided) */
  href?: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'grey' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Ghost button colour variant */
  ghostColour?: 'primary' | 'secondary' | 'accent' | 'grey';
  /** Additional CSS classes */
  class?: string;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Aria label */
  'aria-label'?: string;
  /** Target attribute (for links) */
  target?: string;
  /** Rel attribute (for links) */
  rel?: string;
}
