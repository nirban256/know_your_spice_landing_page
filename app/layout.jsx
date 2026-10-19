import "./globals.css";

export const metadata = {
  title: "Know Your Spice — From source to spoon",
  description:
    "Know Your Spice is a modern Indian pantry brand concept built around thoughtful sourcing, freshness, purity and batch-level transparency, crafted and packed in Kerala.",
  applicationName: "Know Your Spice",
  keywords: [
    "Know Your Spice",
    "Kerala spices",
    "spice traceability",
    "turmeric powder",
    "coriander powder",
    "cumin powder",
    "black pepper",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f8f6ee" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
