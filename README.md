# Beauty Salon Website Demo

A modern and responsive Beauty Salon website built with **Next.js**, designed and developed as a professional demonstration project.

---

## Purpose

This project was developed for **Cimple Tech** as part of client presentation and website development work.

It showcases a fully functional, multi-page beauty salon website with premium UI/UX design, smooth animations, and production-ready architecture — built to demonstrate capabilities and facilitate client evaluation.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 15** (App Router) | Framework & routing |
| **React 18** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **GSAP + ScrollTrigger** | Scroll-driven animations |
| **Lucide React** | Icon library |

---

## Features

- **Multi-page architecture** — 28 fully-routed pages including service detail pages and artist profiles
- **Responsive design** — optimized for desktop, tablet, and mobile
- **Premium animations** — scroll-triggered reveals, cursor tracking, and micro-interactions
- **Booking system** — multi-step wizard with real API persistence
- **SEO ready** — JSON-LD structured data, Open Graph tags, sitemap, and robots.txt
- **Accessible** — ARIA roles, skip-to-content link, keyboard navigation, and reduced-motion support
- **Performance optimized** — dynamic imports, code splitting, and lazy-loaded sections

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mirzajanix786/Beauty-Salon-Demo-1.git

# Navigate to the project directory
cd Beauty-Salon-Demo-1

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build && npm run start
```

---

## Project Structure

```
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # Backend API routes (bookings, contact, newsletter)
│   ├── services/           # Service listing & detail pages
│   ├── artists/            # Artist listing & profile pages
│   ├── booking/            # Booking page
│   ├── contact/            # Contact page
│   └── ...
├── components/
│   ├── sections/           # Full page sections (Hero, Services, Footer, etc.)
│   └── ui/                 # Reusable UI primitives
├── lib/                    # Data sources & utilities
├── hooks/                  # Custom React hooks
└── public/images/          # Static assets & images
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — full single-page experience |
| `/services` | All service categories |
| `/services/[slug]` | Individual service detail pages |
| `/artists` | Team listing |
| `/artists/[slug]` | Individual artist profiles |
| `/booking` | Appointment booking wizard |
| `/membership` | Membership plans |
| `/gallery` | Photo gallery |
| `/about` | About & philosophy |
| `/contact` | Contact form & info |

---

## Disclaimer

> **This repository contains a demonstration website created for Cimple Tech.**
>
> The project is intended exclusively for client presentations, development, testing, and evaluation purposes. It is not an official production website.

---

© Cimple Tech — Demo Project
