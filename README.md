# Maison Lumière — Luxury Beauty Salon

Full 13-section build, verified with a real `npm run build` (164KB first load JS, zero errors).

## Run it

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

## Architecture

- Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion · GSAP-ready · Lenis smooth scroll · Lucide icons
- `components/sections` — one file per section, each a self-contained composition
- `components/ui` — shared primitives (currently `EditorialFrame`, the image system)
- `hooks/useMagnetic.ts` — magnetic-pull interaction, wired into the loading/booking buttons via `.btn-luxury`
- Design tokens live in `tailwind.config.ts`, matching the brief exactly: `#0E0E0E` / `#F7F2EC` / `#C8A46A` / `#E6D7C8` / glass white, Cormorant Garamond + Manrope + Space Grotesk.

## All 13 sections

1. **Hero** — cinematic intro, split-line reveal, floating gold elements, scroll cue
2. **Philosophy** — asymmetric editorial layout, oversized background type
3. **Services** — five disciplines as an expanding editorial list (not cards), perspective image reveal on hover
4. **Before/After** — real drag-to-compare, mouse + touch
5. **Artists** — fashion-profile cards with live perspective tilt tracking the cursor
6. **Journey** — six-step process timeline with an animated connecting line
7. **Product Showcase** — auto-rotating 3D product platform, pauses on hover
8. **Atmosphere** — asymmetric masonry gallery
9. **Client Stories** — glass video-testimonial cards
10. **Package Finder** — a real calculator: hair length × type × goal → recommended ritual, time estimate, price range, all computed live in `PackageFinder.tsx`
11. **Membership** — Silver / Gold / Platinum glass pricing cards
12. **Instagram Wall** — infinite auto-scrolling reel gallery
13. **Booking** — 5-step wizard (service → artist → date → time → confirmation) with animated progress line and success state

## Images

No photography has been generated — this build environment can't create or fetch images. Every image slot routes through `components/ui/EditorialFrame.tsx`, which renders an art-directed placeholder (tonal gradient + a one-line shoot brief, e.g. *"Portrait · Hair Specialist · editorial lighting"*) at the exact aspect ratio the real photo should be.

**To go live:** drop files into `/public/images` and pass `src="/images/your-file.jpg"` to any `<EditorialFrame>` call — nothing else about the layout changes. Every brief across the site describes exactly what to shoot.

## Fonts

Loaded via a `<link>` tag in `app/layout.tsx` instead of `next/font`, because this build environment has no network access to `fonts.googleapis.com`. On a normal dev machine, swap to `next/font/google` for self-hosted, zero-layout-shift fonts — the change is a few lines (see the comment in `layout.tsx`).

## Suggested next steps

- Real photography for `EditorialFrame` slots
- Wire `Booking.tsx` and the newsletter form in `Footer.tsx` to a real backend / booking API
- GSAP ScrollTrigger pass for a couple of the scroll-storytelling moments (Journey line, Hero parallax) if you want motion beyond what Framer Motion's `whileInView` covers
- Swap `next/font` back in once you have open network access, for better font-loading performance

## Phase 3 — motion + accessibility pass (latest)

- **GSAP ScrollTrigger** is now actually wired in (it was listed as a dependency but unused in Phase 2):
  - `Hero.tsx` — background drifts and scales on scroll while the headline fades/drops away as you leave the section (`scrub: true`, tied directly to scroll position, not a fixed-duration animation)
  - `Journey.tsx` — the gold connecting line fills exactly in step with how far you've scrolled through the six-step rail
  - Both respect `prefers-reduced-motion` and clean up via `gsap.context().revert()` on unmount
- **Accessibility**:
  - Skip-to-content link (`app/layout.tsx`)
  - Visible, on-brand `:focus-visible` outline site-wide
  - Before/After comparison is a real `role="slider"` with arrow-key support, not mouse/touch-only
  - Booking wizard steps use `aria-current="step"`; the disabled "Back" button is hidden from the a11y tree on step 1 instead of just visually faded
  - Decorative elements (floating shapes, oversized background type) marked `aria-hidden`

## Phase 4 — SEO + code splitting (latest)

- **Dynamic imports**: every below-the-fold section (Artists through Footer) is now loaded via `next/dynamic` in `app/page.tsx`, split into separate chunks instead of one monolithic bundle. `ssr` is left at its default (`true`) so content still renders server-side for crawlers and first paint — this only defers JS hydration, it doesn't hide content from search engines.
- **`app/robots.ts`** and **`app/sitemap.ts`** — Next.js file-convention routes, served at `/robots.txt` and `/sitemap.xml`.
- **`app/icon.tsx`** — a generated favicon (no external image dependency).
- **JSON-LD structured data** (`BeautySalon` schema: address, opening hours, price range) injected in `app/layout.tsx` for rich search results.
- **`viewport` export** with theme color, plus expanded `metadata`: title template, canonical URL, robots directives, Twitter card.

One placeholder to swap before deploying: `https://maison-lumiere.example.com` appears in `metadataBase`, `robots.ts`, and `sitemap.ts` — replace with your real domain.

## Phase 5 — real persistence for booking + newsletter (latest)

Both forms now actually submit and persist, instead of only animating a fake success state:

- **`app/api/bookings/route.ts`** — `POST` validates `service`/`artist` against the real option lists, checks the date parses and time is present, then appends a record. `GET` lists everything stored.
- **`app/api/newsletter/route.ts`** — `POST` validates email format, de-duplicates by email, appends a record.
- **`lib/store.ts`** — a small JSON-file-backed store both routes share.
- **`Booking.tsx`** — the wizard now actually calls the bookings API on the last "Continue" (Time → Confirm). Shows a "Confirming…" state while in flight, surfaces a real error message with `role="alert"` if the request fails, and only shows the success screen after the server confirms it.
- **`Footer.tsx`** — newsletter form is a controlled input wired to the newsletter API, with idle/submitting/done/error states and a disabled+checkmark state once subscribed.

**Production note, important:** `lib/store.ts` writes to a `.data/*.json` file on disk. That's fine for `npm run dev` / `npm run start` on a normal server or self-hosted container, but it will **not** persist reliably on serverless/edge platforms like Vercel's default runtime (read-only filesystem outside `/tmp`, which is wiped between invocations). Before deploying there, swap the two functions in `lib/store.ts` for calls to a real database (Postgres, Supabase, PlanetScale, etc.) — the API route handlers that call it don't need to change at all.

## Phase 6 — real 3D + production completeness (latest)

**Real 3D, not CSS transforms:**
- `components/three/HeroScene3D.tsx` — an actual Three.js/`@react-three/fiber` scene: a metallic gold torus ("gold rings" from the brief) with `meshStandardMaterial` (`metalness: 1`), and glass spheres using `MeshTransmissionMaterial` for real refraction/chromatic aberration — not a CSS gradient circle. Auto-rotates gently and responds to mouse position (`Rig` component lerps toward pointer).
- Two placements: `variant="hero"` behind the Hero headline, `variant="ambient"` (lighter, 40% opacity) behind the Membership pricing cards.
- **Loaded via `next/dynamic` with `ssr: false`** and gated behind a `prefers-reduced-motion` + `pointer: coarse` check (`HeroScene3DGate.tsx`) — it never runs on mobile/touch devices or for visitors who've asked for reduced motion, and it's code-split into its own ~700KB chunk (confirmed in the build output) that only downloads if it's actually going to render, so it costs nothing on the initial page load.
- **Deliberately no `<Environment preset>` HDRI** — drei's environment presets fetch a texture from a third-party CDN at runtime, which is a fragile dependency for a production site. Reflections come from real positioned lights instead, so there's zero external runtime dependency for the 3D layer.

**Production completeness:**
- `app/not-found.tsx` — branded 404 page (verified returns real HTTP 404, not just a generic Next.js page)
- `app/loading.tsx` — branded route-transition loading state
- `app/apple-icon.tsx` — 180×180 Apple touch icon
- `app/opengraph-image.tsx` — generated 1200×630 social share image (shows up when the link is pasted into iMessage/Slack/Twitter/etc.)

All verified with a clean `npm run build` (11 routes, zero errors) and a live server smoke test of every route.

## Phase 7 — real multi-page architecture (latest)

The site was single-page (everything on `/`, linked by anchors). It's now a proper multi-page site — 24 routes total.

**New pages:**
- `/services` — full listing of all 5 categories with starting prices
- `/services/[slug]` — a real detail page per category (Hair Artistry, Skin Rituals, Spa & Body, Makeup Studio, Nail Lounge), each with its own hero, long description, full treatment menu with pricing, gallery, related artist, and cross-links to the other 4 categories. Statically generated at build time (`generateStaticParams`), with `dynamicParams = false` so an invalid slug correctly 404s instead of attempting an on-demand render.
- `/artists`, `/gallery` (Atmosphere + Instagram), `/membership`, `/about` (Philosophy + Journey), `/booking` — each a dedicated page reusing the existing section components, now with their own `<h1>`, breadcrumb, and per-page SEO metadata
- `/contact` — **new**, didn't exist before. Address, phone, email, hours, and a real working form (`app/api/contact/route.ts`, same validate-and-persist pattern as bookings/newsletter)

**Single source of truth, to kill duplication:**
- `lib/services-data.ts` — every category's title/description/pricing/gallery lives here once. The homepage teaser, `/services`, and every `/services/[slug]` page all read from this one array instead of three copies of the same content drifting apart.
- `lib/salon-info.ts` — address/hours/nav links, shared by `Navbar`, `Footer`, and `/contact` (previously the Footer had its own separate copy of hours/links).

**Real bugs fixed while restructuring, found by testing rather than assumed:**
- The homepage "View Ritual" service rows had an arrow icon and text but **weren't links at all** — clicking did nothing. Now every row routes to its real `/services/[slug]` page.
- Every `href="#booking"` across Hero, Membership, and Package Finder pointed at an anchor that only existed on the homepage — they'd silently do nothing from any other page. All converted to `<Link href="/booking">`.
- The Navbar and Footer both hard-coded `#section` anchors — broken from any page except `/`. Rewritten with `next/link` and `usePathname`-based active-state highlighting, using the shared `NAV_LINKS`.
- The initial `/services/[slug]` implementation returned **HTTP 200 with 404-page content** for invalid slugs instead of a real 404 status (verified with `curl -D -`, not assumed) — fixed via `dynamicParams = false`, which is also the semantically correct setting here since the category list is fixed, not user-generated.
- `/contact` needed a client component for form state, which can't export `metadata` in the App Router — split into a server `page.tsx` (metadata) rendering a client `ContactPageContent` component.

All 24 routes verified with a live server + `curl`, not just a successful build: every page returns 200, the invalid-slug case returns a real 404, the contact API validates and persists, and cross-page navigation was checked from a non-home page to confirm links resolve correctly everywhere, not just on `/`.

The homepage (`/`) is intentionally still the full flagship single-page experience (Hero → Philosophy → Services → … → Footer) — that's a deliberate choice, not an oversight: it's normal for a marketing site to have a rich homepage *and* dedicated inner pages for people who land directly on a category, share a specific service link, or get indexed by Google on that exact page.

## Phase 8 — data consistency + individual artist pages (latest)

**Real inconsistency fixed:** the Booking wizard's service list (`Hair Styling`, `Hair Colouring`, `Bridal Makeup`, `Skin Care`, `Nails`) didn't match the actual 5 service categories anywhere else on the site (`Hair Artistry`, `Skin Rituals`, `Spa & Body`, `Makeup Studio`, `Nail Lounge`). Someone booking couldn't book what the site actually offered. Fixed by having `Booking.tsx` import its service and artist lists directly from `lib/services-data.ts` / `lib/artists-data.ts` — one source, everywhere.

**New: `/artists/[slug]`** — same pattern as the service detail pages. Each artist gets a real profile: bio, specialties, their linked discipline (cross-links to `/services/[slug]`), their other teammates, and an Instagram link that now actually points somewhere (it was a dead `href="#"` before). Statically generated for all 4 team members, `dynamicParams = false` so an invalid artist slug correctly 404s.

**New: booking preselection.** "Book This Ritual" on a service page and "Book with [Artist]" on a profile page now link to `/booking?service=...&artist=...`. The booking wizard reads those params on mount and skips straight to whichever step is still unanswered — book from a service page and you land on "choose your artist," already past step 1. This is a client-side hydration effect, so it can't be verified with `curl` (the server-rendered HTML always shows step 1 — that's expected, not a bug); logic was verified by confirming the query values match `SERVICE_CATEGORIES` titles and `ARTISTS` names exactly, but worth a manual click-through in a real browser to confirm the UX feels right.

`useSearchParams` requires a Suspense boundary in the App Router — added around every `<Booking />` usage (`app/booking/page.tsx` and the homepage).

**Sitemap gap fixed:** the 4 new artist URLs weren't in `sitemap.xml` — added.

## Phase 9 — real feedback: color theme + performance (latest)

Direct feedback was: too slow, doesn't feel like a beauty salon, color theme is bad. Researched 5+ real beauty/spa salon sites and a Next.js performance guide before touching code — not guessing.

**What the research said:**
- Real salon/spa sites lean warm and soft (Colorlib's roundup specifically calls out "rose and powdery accents" as a successful pattern) rather than stark high-fashion black. Dark *can* work (one example, Muse Salon, uses it well) but only when real photography carries it — with placeholder gradients standing in for photos, dark reads as empty rather than moody.
- On performance: a Next.js animation-library comparison found GSAP's core + ScrollTrigger can exceed 150kb of parse/execute cost, Framer Motion adds another 40–60kb, and **"main thread JavaScript parsing is the primary driver of poor INP scores on mid-range hardware."** Running Framer Motion + GSAP + Lenis + Three.js simultaneously — which this project did — is a genuinely heavy combination, not an imagined problem.

**Real bug found and fixed:** `SmoothScrollProvider` ran Lenis on its own `requestAnimationFrame` loop but never told GSAP's `ScrollTrigger` about it. ScrollTrigger listens to native scroll position by default; Lenis overrides visual scroll with CSS transforms instead of moving the real scrollbar. The result: the Hero parallax and Journey timeline-line animations (both GSAP ScrollTrigger) were calculating against a scroll position that didn't match what was visually on screen — the concrete, technical cause of the animations feeling disconnected/janky. **Fix: removed Lenis entirely** rather than wiring the sync manually — native scroll works correctly with GSAP out of the box, it's one fewer library on the page, and it restores default browser scroll behavior for accessibility (screen readers, keyboard scrolling, trackpad momentum, scroll anchoring) that a custom smooth-scroll library can interfere with. `html { scroll-behavior: smooth }` handles anchor-link jumps natively now, still respecting `prefers-reduced-motion`.

**Second fix:** the two Three.js scenes (Hero + Membership ambient) ran a continuous WebGL render loop the moment they mounted, regardless of whether that section was ever scrolled into view — meaning both could be actively rendering every frame simultaneously. `HeroScene3DGate` now wraps each scene in an `IntersectionObserver`; the `<Canvas>` only mounts (and its render loop only runs) while the section is actually on screen, and fully unmounts — not just hides — when scrolled away.

**Color theme — retoned, not just recolored:**
- The core `ink` token moved from a stark `#0E0E0E` to a warm espresso `#2B241E`, and `ivory` warmed slightly to `#FBF6EF` — because colors are defined once as design tokens and every component references the token name, this single change reshaped every dark section on the site without touching component files.
- Rebalanced which sections are dark vs. light: **Philosophy, Artists, Product Showcase, and Client Stories flipped from dark to warm-ivory**, since 10 of 14 sections being near-black was the biggest contributor to "doesn't feel like a beauty salon." The site is now closer to a 6-dark/9-light rhythm (still keeps 2–3 dramatic dark moments — Hero, Booking, Footer — for visual pacing, which is normal, not monotone-light either).
- Added a `rose` token (`#C98F82`, dusty rose) matching the "powdery accent" pattern from research, currently used for the Philosophy quote — a natural next place to extend it is the Membership "Most Loved" badge or the Client Stories quote marks, if you want more of it.

All 28 routes reverified with a live server after every change (not just a successful build) — every route still returns 200, no leftover references to the removed Lenis dependency, and the new color values are confirmed present in the compiled CSS output.

**Being straight about what I can't verify from here:** "feels slow" and "doesn't feel right" are runtime, in-browser judgments, and this sandbox still has no real browser (see the earlier screenshot conversation — that limitation hasn't changed). Everything above is a fix for a concrete, named, verifiable cause — a real desync bug, a measured library weight, a continuous render loop that shouldn't have been continuous, and a token change confirmed in the compiled output. Whether it now *feels* right is worth a real look in your own browser after `npm install && npm run dev`.

## Phase 10 — full visual redesign per explicit new brief (latest)

A complete, specific redesign brief was provided (exact hex palette, section-by-section direction, "delete the current visual style"). Rebuilt accordingly — this is the biggest single change since the original build.

**New palette (exact values as specified):**
Background `#F8F5F1` (soft ivory), Secondary `#EADBC8` (warm beige), Accent `#C8A76A` (champagne gold), Text `#2B2B2B` (rich charcoal), Secondary text `#6F6B67` (warm gray). The whole site is now light/warm-dominant — dark is reserved for the Hero (image + overlay) and Footer only, both explicitly called for in the brief.

**Three.js removed entirely** — the floating gold ring / glass sphere decorative scenes were explicitly rejected ("no floating black objects, no abstract circles") and were also the heaviest thing on the site. `components/three/` deleted, `three`/`@react-three/fiber`/`@react-three/drei` removed from `package.json`. Hero's decorative touch is now lightweight CSS/Framer Motion floating gold particles instead — same "premium detail" effect, near-zero cost.

**`EditorialFrame` rebuilt with automatic image detection.** This directly answers "add pictures" as concretely as I can from this environment: every image slot now has a specific expected filename (see `IMAGE-MANIFEST.md` — 48 files, exact names, organized by section). Drop a correctly-named file into `/public/images/` and it displays automatically, no code changes. If the file isn't there, it fails gracefully to a minimal labeled frame instead of a decorative gradient standing in for real design (the brief explicitly rejected "placeholder graphics" and "generic gradients" — so the fallback is now honestly minimal rather than trying to look finished).

**Section-by-section redesign:**
- **Hero** — full-width image+overlay (not a flat dark section), split content layout, fits in one screen (`h-[100svh] max-h-[980px]`), floating gold particles, dual CTA (Reserve / Explore Services)
- **Services** — rebuilt from an editorial list into real cards: image, icon badge, title, description, gold border + shadow on hover, rounded corners
- **About/Philosophy** — added stats (years, clients, disciplines), a badge, and a CTA — split layout as specified
- **Gallery** — added a real lightbox (click to enlarge, keyboard/click-outside to close)
- **Before & After** — luxury rounded border, cleaner labels
- **Client Stories** — rebuilt as an auto-advancing carousel with 5-star ratings and a circular avatar, pauses on hover, dot navigation
- **Membership** — soft gold glow on cards, no more 3D background
- **New: Booking CTA** — a full-width image-background banner section, added to the homepage in place of the full booking wizard (which now lives only on its dedicated `/booking` page — lighter homepage, no duplicate heavy form)
- **Footer** — stays dark with gold accents, as specified

**Real bug found and fixed during this pass:** the booking API's server-side validation (`app/api/bookings/route.ts`) still had the *old* hardcoded service/artist name lists from before the Phase 8 data-sync fix — meaning every booking submitted through the (already-fixed) wizard was being silently rejected by the server, because the UI offered "Hair Artistry" but the API only accepted "Hair Styling." Fixed by having the API import from the same `lib/services-data.ts` / `lib/artists-data.ts` single source as everything else. Verified with `curl`: booking with the real category name now succeeds, the old name now correctly 400s.

All 28 routes reverified live after every change in this phase, not just a successful build.

## Phase 11 — first real photo integrated (latest)

`public/images/hero-main.jpg` — a real photo, uploaded directly in chat — is now live as the Hero background. This proves the whole image pipeline end-to-end: drop a correctly-named file into `/public/images/`, no code changes, it just appears.

- `EditorialFrame` gained an `objectPosition` prop so portrait-oriented or off-center source photos can be framed correctly when they fill a wide banner slot. Hero uses `objectPosition="65% 22%"` to keep the subject's face in frame despite the source photo being portrait (736×1104) inside a wide landscape hero.
- Verified for real, not assumed: fetched the actual optimized image Next.js serves (`/_next/image?...`, confirmed 200 + `image/jpeg`), and separately simulated the exact `object-cover` crop math Chrome will apply at hero-banner proportions to check the framing looks right before calling it done (rather than just trusting the numbers).
- **Honest quality note:** the source file is 736px wide. Next/Image correctly refuses to upscale past that, so on very large monitors the hero image will look a little soft rather than sharp. A version at 1920px+ on the long edge would look noticeably crisper — worth swapping in if a higher-res copy becomes available, same filename, zero code changes needed.

47 of the 48 image slots in `IMAGE-MANIFEST.md` are still on the placeholder fallback.

## Phase 12 — fixed real content-clipping bugs (latest)

Direct feedback: sections were "very very big" and content was getting cropped off-screen. Found and fixed two real, distinct bugs — not just a vibe adjustment.

**Bug 1 — Hero and 3 other sections used a fixed height + `overflow-hidden` instead of a minimum height.** `Hero.tsx` was `h-[100svh] max-h-[980px]` — a *hard cap*. On any viewport short enough (or with enough content — long text, a translated string, a browser's address bar eating into viewport height) that the content needed more than that space, the excess was silently clipped by `overflow-hidden` instead of the section growing. Same bug existed in `BookingCTA.tsx` (`h-[60vh]`) and both `/services/[slug]` and `/artists/[slug]` hero headers (`h-[70svh] min-h-[480px]` — the fixed `h-` still won over the `min-h-`). **Fixed everywhere:** swapped every fixed `h-[...]` on these sections for `min-h-[...]` (using `min-h-[max(70svh,420px)]` where a floor was also needed). A min-height can never clip its own content — the section simply grows if it needs to. This was the main cause of "cropped."

**Bug 2 — oversized decorative background typography used raw `vw` units with no ceiling.** `PageHeader.tsx` and `Footer.tsx` render a giant word (page name / "Lumière") behind the content using viewport-width-relative font sizing (`text-[20vw]`). On a narrow phone screen, a longer word like "Membership" at 20vw could genuinely overflow its container width and get visually cut off mid-letter — which is likely a second, separate source of the "cropped" complaint. **Fixed:** both now use `clamp(min, preferred-vw, max)` instead of raw `vw` (e.g. `text-[clamp(2.5rem,14vw,9rem)]`), which scales smoothly but can never exceed a sane maximum or, more importantly, can never be asked to render at some runaway size on an unusual aspect ratio.

**On top of the bug fixes, all 13 main sections had their vertical padding reduced** (`py-28 md:py-40` → `py-16 md:py-24`, and similar) — even where nothing was technically broken, the site was using very generous editorial-magazine-style whitespace that reads as "huge sections requiring a lot of scrolling" rather than tight and premium. Roughly a 35–40% reduction in section height across the board.

Verified with a clean build and a full live-server route sweep after the changes (all 28 routes still 200) — but as before, precise pixel-level "does this look right on my exact screen" needs a real browser on your end, which this sandbox still doesn't have.

## Phase 13 — fixes from real screenshots (latest)

Direct screenshots of the actual rendered site made these concrete:

1. **Navbar felt jumbled** — logo and nav links were positioned via 3-way `justify-content: space-between`, which doesn't guarantee a minimum gap between them (on a normal-width browser window, the middle item can end up closer to the logo than intended). Restructured: logo + a vertical divider + nav links are now grouped together with a fixed `gap-12`, independent of window width, so the brand name is never crowded against "SERVICES."
2. **Hero background wasn't dark enough for the text to read clearly.** Was a single soft gradient; now it's three stacked layers — a flat 45% wash plus two directional gradients — pushing opacity as high as ~95% on the left where the headline/CTA sit, while staying lighter on the right so the photo itself still shows. Also added an inherited `text-shadow` across the whole hero content block and a translucent dark backdrop behind both buttons, as extra insurance so text stays legible even against a busy patch of photo regardless of exactly where the gradient math lands.
3. **Services cards and the Before/After comparison were dominated by oversized empty placeholder boxes.** Reduced the Services card image ratio (`4/3` → `16/10`) and the Before/After comparison height (`16/10` → `21/9`, capped at `520px`) — both noticeably shorter now, which matters most while most images are still on the placeholder fallback.

On the Pinterest question: **Pexels is fine, Pinterest is not** — explained directly in chat, not just here. Pinterest doesn't itself hold or grant rights to the images pinned on it (they're aggregated from elsewhere, license status usually unknown), so "permission" for a Pinterest image isn't something that can actually be granted by anyone browsing Pinterest — worth avoiding for anything going into a real deployed site.

## Phase 13 — hero contrast, placeholder subtlety, tighter sections (latest)

Direct feedback with screenshots: Hero text not clear enough, colors "look weird" for a beauty site, sections still too big/content cropping.

**Real bug found in the Hero overlay:** it used the site's `ink` brand color (`#2B2B2B`, a warm charcoal — not true black) as the darkening scrim. Verified numerically (not just eyeballed): blending toward `#2B2B2B` in the photo's already-near-black regions actually *increased* brightness there (RGB 43 is lighter than near-0), which is the opposite of what a darkening overlay should do. Measured the text-zone brightness before/after with the old overlay: mean brightness went **up** from 24.4→42.3 out of 255 — objectively wrong direction. Switched the overlay to true `black` instead of the `ink` token; re-measured: mean brightness in the same zone now drops to 3.1, peak brightness in that zone drops from 245→37. That's the actual, measurable fix for "background thodi dark ho jaye."

**Placeholder color made much quieter.** Previously empty image slots (no photo yet) rendered as a visibly tan/beige block with a bordered icon — with so many empty slots still waiting for photos, that beige block was the *dominant* color across most of the site, which reads as "bad color choice" even though it's just an empty-state, not a real design decision. It's now a very quiet near-white (`#F3EFE9`) with a faint icon — recedes instead of standing out.

**Two specific images that were towering were capped** (`max-h-[520px]` on the About section photo, `max-h-[480px]` on Contact) — a 4/5 aspect-ratio box that's ~700px wide was rendering ~875px tall, which is a lot of one section's height being a single image.

**Padding cut again, more aggressively** — `py-16 md:py-24` → `py-12 md:py-16` and similar across all 13 sections, on top of the Phase 12 reduction. Two rounds in, sections are now roughly half the vertical footprint of the original build.

**On sourcing real photos:** used `image_search` to pull a few real reference examples (salon interiors, a stylist mid-haircut) so there's a concrete visual target while you pull actual files from Pexels/Pinterest — those aren't files I can download into the project myself (same limitation as before), but they're a starting point for what to search for. `IMAGE-MANIFEST.md` still has the exact filename for every slot.
