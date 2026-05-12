# dengankarya-ui

[![CI / Release](https://github.com/dengan-karya/dengankarya-ui/actions/workflows/release.yml/badge.svg)](https://github.com/dengan-karya/dengankarya-ui/actions/workflows/release.yml)

A minimal, reusable React component library by [dengankarya.com](https://dengankarya.com). Built with TypeScript, published to npm, and ready to use in any React project.

## Philosophy

Components in this library are **style-agnostic**. They don't impose colors, fonts, or spacing. Instead, they inherit all styling from your application, giving you complete control over appearance through your own CSS, Tailwind classes, or inline styles.

## Installation

Using `pnpm`:
```bash
pnpm add dengankarya-ui
```

Using `npm`:
```bash
npm install dengankarya-ui
```

Using `yarn`:
```bash
yarn add dengankarya-ui
```

> Requires `react >= 18.0.0` and `react-dom >= 18.0.0`

## Components

### Tagline

A simple, semantic footer component that displays "Thoughtfully crafted by dengankarya.com".

#### Basic Usage

```tsx
import { Tagline } from "dengankarya-ui";

export default function App() {
  return (
    <>
      <main>Your page content here</main>
      <Tagline />
    </>
  );
}
```

#### With Tailwind CSS

```tsx
<Tagline className="text-xs text-gray-500 py-4 border-t border-gray-200" />
```

#### With Custom Link

```tsx
<Tagline href="https://dengankarya.com?utm_source=myapp" />
```

#### Open Link in New Tab

```tsx
<Tagline
  anchorProps={{
    target: "_blank",
    rel: "noopener noreferrer"
  }}
/>
```

#### Full Control

```tsx
<Tagline
  className="footer-container"
  style={{ marginTop: "2rem", paddingBottom: "1rem" }}
  anchorProps={{
    target: "_blank",
    rel: "noopener noreferrer",
    className: "footer-link hover:underline"
  }}
/>
```

## API Reference

### `<Tagline />`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"https://dengankarya.com"` | URL for the dengankarya.com link |
| `anchorProps` | `AnchorHTMLAttributes<HTMLAnchorElement>` | `undefined` | Additional attributes to spread onto the `<a>` element (e.g., `target`, `rel`, `className`, `onClick`) |
| `...props` | `HTMLAttributes<HTMLElement>` | — | All standard HTML attributes for `<footer>` element (e.g., `className`, `style`, `id`, `data-*`, event handlers) |

#### TypeScript

The component is fully typed. You can import the `TaglineProps` type:

```tsx
import type { Tagline, TaglineProps } from "dengankarya-ui";

const MyFooter = (props: TaglineProps) => {
  return <Tagline {...props} />;
};
```

## Examples

### Next.js App Router

```tsx
// app/layout.tsx
import { Tagline } from "dengankarya-ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Tagline className="mt-12 pt-8 text-center text-sm text-gray-600" />
      </body>
    </html>
  );
}
```

### React + Vite

```tsx
// src/App.tsx
import { Tagline } from "dengankarya-ui";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">Content goes here</main>
      <Tagline className="px-4 py-8 text-gray-500" />
    </div>
  );
}

export default App;
```

### Custom Styling with CSS Modules

```tsx
// App.tsx
import { Tagline } from "dengankarya-ui";
import styles from "./App.module.css";

export default function App() {
  return (
    <div>
      <main>Your content</main>
      <Tagline className={styles.footer} />
    </div>
  );
}
```

```css
/* App.module.css */
.footer {
  margin-top: 3rem;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  border-top: 1px solid #e5e7eb;
}
```

## Development

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/dengankarya/dengankarya-ui.git
cd dengankarya-ui
pnpm install
```

### Build

Build the library:

```bash
pnpm build
```

Watch mode (rebuilds on file changes):

```bash
pnpm dev
```

### Type Checking

Verify TypeScript without emitting output:

```bash
pnpm exec tsc --noEmit
```

### Testing Locally

Before publishing to npm, test the package locally:

```bash
# In the dengankarya-ui directory
pnpm link --global

# In your consumer project
pnpm link --global dengankarya-ui
```

Then import and use as normal. When done testing, unlink:

```bash
pnpm unlink --global dengankarya-ui
pnpm install dengankarya-ui  # Install from npm instead
```

### Publishing

Publish a new version to npm:

```bash
# Update version in package.json manually (follow semver)
pnpm build
pnpm publish --access public
```

## Browser Support

This library targets ES2020 and supports all modern browsers. It has zero runtime dependencies beyond React.

## License

MIT

## Contributing

This is a personal project by dengankarya. Suggestions and feedback are welcome. For issues or feature requests, please open an issue on GitHub.

---

Made with ❤️ by [dengankarya.com](https://dengankarya.com)
