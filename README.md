# Know Your Spice — Next.js + Tailwind CSS

A client-ready responsive landing-page prototype for **Know Your Spice**, a Kerala-crafted spice brand concept focused on clear product stories, small-batch freshness, thoughtful sourcing and traceability. The design takes cues from the supplied Senseible reference's restrained editorial layout while using a warmer palette of forest green, turmeric gold, terracotta and cream.

## Stack

- **Next.js App Router** and **React**
- **Tailwind CSS v4** with the official PostCSS integration
- Custom global CSS for the branded editorial layout, SVG product artwork, and detailed responsive behaviour
- React state for mobile navigation, traceability selectors, FAQ accordions and the launch-interest modal

## Run locally

Requirements: Node.js **20.9 or newer** and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify a production build:

```bash
npm run build
npm run start
```

## Project structure

```text
know-your-spice-next/
├── app/
│   ├── globals.css       # Tailwind import, brand tokens, responsive site styles
│   ├── layout.jsx        # Root layout and SEO metadata
│   └── page.jsx          # Landing page and interactive React state
├── public/
│   └── assets/
│       └── hero-still-life.svg
├── next.config.mjs
├── postcss.config.mjs
├── package.json
└── README.md
```

## Included sections and interactions

- Responsive announcement bar and sticky navigation with mobile menu
- Hero section with local custom SVG still-life artwork
- Four launch products: turmeric, coriander, cumin and black pepper
- Discovery box section with launch-interest modal
- Interactive traceability explainer: select a spice and a stage to update the story in place
- Sourcing-to-packaging process section
- FAQ accordions, keyboard Escape to close the modal, and client-side form validation
- Mobile-specific layouts at tablet, phone and narrow-phone breakpoints

## Before production launch

This is a polished **front-end prototype**.

- The modal form validates the email in the browser and shows a local demo confirmation. It does not save or transmit submissions. Connect an API/CRM/email provider before launch.
- The traceability explainer is an illustrative sample interface, not live batch information. Replace it with verified supplier, harvest-region, processor, quality report and packaging data.
- Use organic/certification statements only when the applicable certifications and food-safety requirements have been met, as noted in the supplied business blueprint.
- Confirm real product packaging, price, MRP, net weights, FSSAI information, shipping/returns policies, contact details and privacy terms with the client.
- Product packaging is custom SVG concept art and should not be presented as final approved label artwork.

## Notes

Tailwind CSS is installed through the official v4 PostCSS plugin. The page combines Tailwind utilities for common layout utilities with custom CSS for the bespoke brand design and its detailed responsive breakpoints.
