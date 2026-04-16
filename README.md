<p align="center">
  <img src="app/icon.svg" width="64" height="64" alt="Skyline logo" />
</p>

<h1 align="center">Skyline</h1>

<p align="center">
  A curated real estate platform for Nairobi's premium residential market.<br/>
  Built with Next.js, React and TypeScript.
</p>

<p align="center">
  <a href="https://github.com/Lincoln-Madaraka/skyline/stargazers">Stars</a> &middot;
  <a href="https://github.com/Lincoln-Madaraka/skyline/issues">Issues</a> &middot;
  <a href="https://www.linkedin.com/in/lincoln01/">LinkedIn</a>
</p>

---

## What is Skyline?

Skyline is a real estate platform focused exclusively on Nairobi's premium residential corridors: Karen, Runda, Lavington, Kilimani, Westlands and Kileleshwa. It connects serious buyers with verified listings through a trust-first, curated approach.

### What it does

- **Curated listings** -- Every property is verified and on-brief before it reaches the platform. No spam listings, no time wasters.
- **Neighborhood profiles** -- In-depth pages for six focus areas with pricing bands, demand signals and local context.
- **Owner listings** -- A four-step process for homeowners to list properties through a pre-screened buyer pool.
- **Saved homes** -- Users can create accounts, save listings and request viewings in one click.
- **Contact pipeline** -- Structured enquiry forms that route directly to the Skyline desk with intent, budget and area preferences.
- **Partner ecosystem** -- Trusted alongside banks (KCB, Equity, Standard Chartered, NCBA), valuers (Knight Frank, HassConsult) and developers (Cytonn, Acorn, Centum).

### Built with

- [Next.js 14](https://nextjs.org/) -- App router, server components, file-based routing
- [React 18](https://react.dev/) -- Client-side interactivity, modals, slideshows
- [TypeScript](https://www.typescriptlang.org/) -- Type-safe data layer and components
- Vanilla CSS -- No framework, hand-written responsive styles with CSS variables

---

## Getting started

```bash
# Clone the repository
git clone https://github.com/Lincoln-Madaraka/skyline.git
cd skyline

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Project structure

```
skyline/
  app/
    components/      # Reusable UI components (Nav, Footer, AuthModal, etc.)
    listings/        # Listings index and detail pages
    areas/           # Neighborhood profiles
    contact/         # Contact form and enquiry pipeline
    list-your-property/  # Owner listing flow
    careers/         # Careers page
    globals.css      # All styles (variables, layout, responsive)
    layout.tsx       # Root layout with nav, footer, auth
    page.tsx         # Homepage with hero slideshow
  lib/
    listings.ts      # Listing data
    areas.ts         # Area/neighborhood data
    partners.ts      # Partner logos and names
  public/
    images/          # Optimized .webp assets (hero, listings, sections)
```

---

## Contributing

Contributions are welcome. Here is how to get involved:

1. **Fork** the repository
2. **Create a branch** for your feature or fix (`git checkout -b feature/your-feature`)
3. **Make your changes** and test locally with `npm run dev`
4. **Commit** with a clear message describing what you changed
5. **Open a pull request** against `main`

### Guidelines

- Keep PRs focused -- one feature or fix per PR
- Follow the existing code style (vanilla CSS, no utility frameworks)
- Test on both desktop and mobile viewports before submitting
- Do not commit `.env` files or credentials

---

## Like what you see?

If you find this project useful or interesting, consider giving it a star on GitHub. It helps others discover the project.

---

## Hire me / Collaborate

I am open to freelance work, collaborations and full-time opportunities in software engineering.

- **Email**: [softwares.lincoln@gmail.com](mailto:softwares.lincoln@gmail.com)
- **LinkedIn**: [linkedin.com/in/lincoln01](https://www.linkedin.com/in/lincoln01/)
- **GitHub**: [github.com/Lincoln-Madaraka](https://github.com/Lincoln-Madaraka)

Whether you need a website built from scratch, a real estate platform, or any web application -- reach out and let's talk.

---

## License

This project is available for personal and educational use. For commercial licensing, contact [softwares.lincoln@gmail.com](mailto:softwares.lincoln@gmail.com).
