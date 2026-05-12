import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

/**
 * Props for the Tagline component.
 *
 * @interface TaglineProps
 * @extends {HTMLAttributes<HTMLElement>}
 *
 * @example
 * ```tsx
 * <Tagline className="text-sm text-gray-500" />
 * <Tagline href="https://dengankarya.com?ref=myapp" />
 * <Tagline anchorProps={{ target: "_blank", rel: "noopener noreferrer" }} />
 * ```
 */
export interface TaglineProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional override for the anchor's href.
   * @default "https://dengankarya.com"
   */
  href?: string;

  /**
   * Optional UTM source parameter to append to the href for tracking purposes.
   * If provided, it will be appended as a query parameter to the href.
   *
   * @example
   * ```tsx
   * <Tagline href="https://dengankarya.com" utm_source="myapp" />
   * // Resulting href: "https://dengankarya.com?utm_source=myapp"
   * ```
   */
  utm_source?: string;

  /**
   * Additional HTML attributes to spread onto the `<a>` tag.
   * Useful for adding `target`, `rel`, `className`, or event handlers to the link.
   *
   * @example
   * ```tsx
   * anchorProps={{ target: "_blank", rel: "noopener noreferrer", className: "underline" }}
   * ```
   */
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

/**
 * Tagline component - A minimal, style-inheriting attribution footer.
 *
 * Renders "Thoughtfully crafted by dengankarya.com" with no bundled styles.
 * The component inherits all styling from the parent app via standard HTML attributes.
 *
 * @component
 *
 * @param {TaglineProps} props - Component props
 * @returns {React.ReactElement} A footer element containing the attribution
 *
 * @example
 * // Minimal usage - inherits all styles from parent
 * ```tsx
 * <Tagline />
 * ```
 *
 * @example
 * // With custom styling via className
 * ```tsx
 * <Tagline className="text-xs text-gray-500 py-4 border-t border-gray-200" />
 * ```
 *
 * @example
 * // With UTM parameters
 * ```tsx
 * <Tagline utm_source="teraskota-bali" />
 * ```
 *
 * @example
 * // With custom link attributes
 * ```tsx
 * <Tagline
 *   href="https://dengankarya.com?utm_source=myapp"
 *   anchorProps={{ target: "_blank", rel: "noopener noreferrer" }}
 * />
 * ```
 *
 * @remarks
 * - The component renders a semantic `<footer>` element (not a `<div>`)
 * - All standard HTML attributes from `HTMLAttributes<HTMLElement>` are forwarded to the `<footer>`
 * - The link text "dengankarya.com" inherits the parent's link styling (color, underline, hover effects, etc.)
 * - No CSS files or inline styles are injected by the component
 */
export function Tagline({
  href = "https://dengankarya.com",
  utm_source,
  anchorProps,
  ...props
}: TaglineProps) {
  const finalHref = `${href}${utm_source ? `?utm_source=${utm_source}` : ""}`;

  return (
    <footer {...props}>
      <i>
        Thoughtfully crafted by{" "}
        <a href={finalHref} {...anchorProps}>
          dengankarya.com
        </a>
      </i>
    </footer>
  );
}
