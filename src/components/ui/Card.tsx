import type { BaseProps } from "../../lib/utils.js";

export interface CardProps extends BaseProps {
  /** Title displayed at the top of the card */
  title?: string;
  /** Description text below the title */
  description?: string;
  /** URL of the card image */
  image?: string;
  /** URL for the card link */
  link?: string;
  /** Array of tags to display */
  tags?: string[];
  /** Visual variant of the card */
  variant?: "default" | "featured" | "compact";
}

export default function Card({
  title,
  description,
  image,
  link,
  tags,
  variant = "default",
  class: className,
  ...props
}: CardProps) {
  const baseClasses = ["card-base", variant && `card-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const CardContent = () => (
    <div class={baseClasses} {...props}>
      {image && (
        <div class="card-image">
          <img src={image} alt={title || "Card image"} />
        </div>
      )}

      <div class="card-content">
        {title && <h3 class="card-title">{title}</h3>}
        {description && <p class="card-description">{description}</p>}

        {tags && tags.length > 0 && (
          <div class="card-tags">
            {tags.map((tag) => (
              <span key={tag} class="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} class="card-link">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}
