import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

export interface TaglineProps extends HTMLAttributes<HTMLElement> {
  /** Optional override for the anchor's href. Defaults to "https://dengankarya.com". */
  href?: string;
  /** Any attributes to spread onto the <a> tag itself. */
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

export function Tagline({
  href = "https://dengankarya.com",
  anchorProps,
  ...props
}: TaglineProps) {
  return (
    <footer {...props}>
      <i>
        Thoughtfully crafted by{" "}
        <a href={href} {...anchorProps}>
          dengankarya.com
        </a>
      </i>
    </footer>
  );
}
