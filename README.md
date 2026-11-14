# Faiz Syaiful Wafa, portfolio

A single-page portfolio for Faiz Syaiful Wafa (`f-wafa`). The work section is pulled from the public GitHub API and cached for an hour, so new repositories appear without editing the source.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS 4
- React Three Fiber, Drei, Three.js for the low-poly hero object
- CSS scroll reveals with `IntersectionObserver`, disabled under reduced motion
- `next-themes` for the light and dark theme

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build
npm run start
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` if you need either value.

- `GITHUB_TOKEN` (optional): raises the GitHub REST API limit from 60 to 5,000 requests per hour. The page works without it.
- `NEXT_PUBLIC_SITE_URL` (optional): canonical URL used by metadata, `robots.txt`, and the sitemap. It defaults to the current GitHub Pages address.

## Where the content comes from

- Profile, social links, stack, and the "be rich" quote: the GitHub profile README at `f-wafa/f-wafa`.
- Projects, descriptions, languages, licenses, push dates, and live links: the GitHub REST API for `f-wafa`, with a verified fallback snapshot when the API is unavailable.
- School, location, and internship status: the previous live portfolio, which is public.

There are no invented projects, testimonials, statistics, or client logos. If a repository has no live URL, the Live link is not rendered.

## Design notes

Reading this as a personal portfolio for a young self-taught developer, with an editorial minimalist language and a quiet interactive 3D study. Dial: ENERGY 2 / RHYTHM 3 / MOTION 2.

- Paper, ink, and one persimmon accent. The accent marks the italic word in each heading, section indices, and focus rings, so it stays a signal instead of a wash.
- Plus Jakarta Sans for reading, chosen because it was designed in Jakarta and fits the owner's context. JetBrains Mono only for repository names, dates, and code metadata. Instrument Serif italic appears once per heading to separate "feel" from engineering.
- Sections vary in composition: asymmetric hero, list-shaped work, sticky editorial about, then a full-width email. That is the RHYTHM 3 dial made visible.
- The 3D object is a low-poly core with one wireframe shell and one accent orbit. It reacts to the pointer and scroll, pauses when off-screen, caps DPR at 2, and never mounts when the user prefers reduced motion or WebGL is unavailable. A static SVG takes its place.
- Theme colors are CSS variables. The 3D materials read the resolved theme from `next-themes`, so the object changes with light and dark mode.
