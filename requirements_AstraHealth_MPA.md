# Requirements Document: AstraHealth Birthing Center Web Platform (MPA)

## 1. Introduction
A premium, highly trustworthy, and clean enterprise platform engineered as a robust Multi-Page Application (MPA) built with **Vue.js 3** for **AstraHealth Birthing Center**. This architecture handles decoupled medical and patient views across distinct URL routes managed natively via **Vue Router**. It distributes patient-centric features across high-intent specialized paths (Home View, Services & Packages, Facility Gallery, and a interactive Booking & Consultation Center) while preserving consistent component behaviors, shared navigation layers, global GSAP orchestrations, and a smooth, cross-page scroll system.

## 2. Glossary & Core Assets
* **The Platform**: The multi-page web platform containing independent routes, components, and specific layout files.
* **Vue Router**: The architectural routing module executing clean URL route tracking, state management, and view transition steps.
* **Shared Header/Footer**: Reusable global layout blocks persisting uniformly across all structural platform paths.
* **Home View (`/`)**: The main landing view focusing on brand values, safety protocols, a Facebook feedback carousel, and an interactive physical map location.
* **Services & Packages View (`/services`)**: A granular sub-page detailing maternity care, professional birthing packages, pre-natal/post-natal checkups, and facility amenities.
* **Facility Gallery View (`/gallery`)**: An interactive visual portal that seamlessly links out to dedicated patient and newborn celebration albums.
* **Booking & Consultation Center View (`/booking`)**: A dedicated patient intake and scheduling funnel housing an advanced multi-variable interactive configuration widget.
* **Core Brand Assets**:
  * **Logo Asset**: Derived strictly from `image_5ed1f7.png` (incorporating a maternal silhouette and teardrop/leaf contours).
  * **Brand Colors**: Clean White, Soft Blue (Calming/Medical), Bright Leaf Green (Growth/Life/Health), and Deep Slate Black text accents.
  * **Official Facebook Page**: `https://www.facebook.com/astrahealthmed`
  * **Official Contact Hotline**: `0922 740 6819`
  * **Official Email**: `astrahealthmed@gmail.com`
  * **Physical Location**: Purok 1, Mabical Highway, Mabical, Floridablanca, Philippines, 2006.

---

## 3. System Requirements

### Requirement 1: Tech Stack & Router Architecture (MPA)
#### Acceptance Criteria
1. THE Platform SHALL be constructed via **Vue.js 3** leveraging the **Composition API** paired with **Vue Router (v4.x)** to map paths (`/`, `/services`, `/gallery`, `/booking`).
2. THE application construction pipeline SHALL use Vite to split resource assets into isolated chunk modules, serving structural code files optimized specifically for the requested path.
3. EACH individual page view component SHALL independently mount its required GSAP ScrollTrigger routines strictly inside local `onMounted()` timeline loops.
4. THE platform SHALL trigger an explicit animation purge event mapping `ScrollTrigger.getAll().forEach(t => t.kill())` inside Vue Router’s global hooks (`onBeforeRouteLeave`) to protect against orphaned animation triggers leaking onto the incoming view page.

### Requirement 2: Global Branding, Palette & Typography Core
#### Acceptance Criteria
1. THE Platform SHALL utilize a premium, clean white background or ultra-soft pastel gradient background color scheme universally across all mapped routing paths to reflect a sterile, professional, yet welcoming healthcare environment.
2. THE Typography system SHALL display headers and textual copy utilizing modern sans-serif typefaces (Inter, Plus Jakarta Sans, or equivalent system sets) rendered in Deep Slate/Charcoal Black (`#1a1a1a`) or primary medical tones.
3. UI Element states, buttons, links, and borders SHALL enforce AstraHealth's visual palette derived from `image_5ed1f7.png`: Primary Calming Blue and Secondary Growth Leaf Green.
4. ALL layout elements across all page paths SHALL compile cleanly through the W3C markup verification system with no structural document errors.
5. Typography rendering parameters across all routes SHALL use fluid CSS `clamp()` formatting, allowing full layout adjustments without horizontal layout overflow at screen widths $\ge 320	ext{ px}$.

### Requirement 3: Vue Router Traversal & Transition Mechanics
#### Acceptance Criteria
1. WHEN a route traversal action fires, the Vue Router lifecycle configuration SHALL reset global window coordinates back to `top: 0, left: 0` before rendering the new page view.
2. THE Platform router viewport layout SHALL nest routing components within an explicit hardware-accelerated Vue `<transition>` structure.
3. Route switches SHALL run an explicit CSS opacity crossfade sequence completing smoothly within a $300	ext{ ms}$ duration profile.
4. THE universal Lenis smooth-scrolling engine SHALL pause its tracking vectors momentarily during active route transitions and completely re-initialize once the incoming target DOM structure is ready.

### Requirement 4: Page-Specific Asset & Feature Mapping
#### Acceptance Criteria
1. **Home View (`/`):** SHALL serve as the principal welcoming portal display. It must hold high-impact branding copy leveraging the logo asset (`image_5ed1f7.png`), safety value statements, a specialized Facebook review module, and persistent clinical contact metadata.
2. **Services & Packages View (`/services`):** SHALL maintain the core healthcare packages display system. It must present Tier-1 maternity suites, customizable pre-natal/post-natal packages, and neonatal tracking features, complete with an interactive package filtration array layout.
3. **Facility Gallery View (`/gallery`):** SHALL focus entirely on showcasing patient satisfaction and clinical facilities. It must function as an interactive portal where clicking specific collection elements redirects the user seamlessly to official Facebook photo albums or designated media repositories containing past patient records and celebration snapshots.
4. **Booking & Consultation Center View (`/booking`):** SHALL act as the main intake funnel page. This page isolates focus completely onto the expanded step-by-step multi-variable computing and scheduling widget.

### Requirement 5: Persistent Shared Navigation Header Component
#### Acceptance Criteria
1. THE fixed-position navigation header layout block SHALL persist natively across all routing paths inside the root application shell wrapper, clearly displaying the brand logo from `image_5ed1f7.png`.
2. Page navigation paths inside the layout element SHALL be driven by explicit `<router-link>` elements to avoid hard browser frame re-render steps.
3. Navigation links SHALL dynamically verify active route parameters to append an explicit `.router-link-active` CSS visual layout state, giving users a clear tracking indicator of their current clinical page context.
4. THE primary navigation accent button labeled "Book Consultation" SHALL instantly redirect users directly to the `/booking` page path.

### Requirement 6: Facebook Feedback Carousel & Footer Integrations
#### Acceptance Criteria
1. THE Home View (`/`) SHALL house a dedicated interactive, touch-responsive Feedback Carousel that dynamically or systematically cycles through genuine user reviews sourced from the official Facebook Page (`https://www.facebook.com/astrahealthmed`).
2. EACH card inside the feedback carousel layout SHALL cleanly render the reviewer's name, profile placeholder/avatar, verified star rating, explicit feedback text, and an integrated Facebook logo asset that links directly to the center's online public review ledger.
3. THE Platform footer layout across all pages SHALL explicitly exclude any form of contact text boxes or input forms.
4. THE Platform footer layout SHALL instead embed a high-performance, interactive, responsive map element pinned directly to the address: *Purok 1, Mabical Highway, Mabical, Floridablanca, Philippines, 2006*.
5. THE Platform footer layout SHALL prominently feature the center's verified contact coordinates: Hotline (`0922 740 6819`), Mail (`astrahealthmed@gmail.com`), and a hyperlink to the external Facebook portal.

### Requirement 7: Dedicated Booking Center & Funnel Parameters
#### Acceptance Criteria
1. THE `/booking` view page component SHALL isolate focus entirely on a comprehensive client pre-admission intake and scheduling system.
2. It SHALL capture user parameters across multi-variable options (e.g., expected delivery windows, care package selection tiers) linked via real-time two-way data model bindings (`v-model`) instead of basic static text input forms.
3. Beyond standard inputs, this dedicated panel view SHALL execute reactive computed operations parsing care milestones or coverage benchmarks.
4. THE underlying data object array model SHALL encapsulate user consultation configurations inside a structured submission payload so that when a patient triggers a booking confirmation, their calculated parameters are dispatched cleanly alongside their contact info.

### Requirement 8: Performance, Accessibility, & Motion Bounds
#### Acceptance Criteria
1. THE platform compilation structure SHALL produce optimized asset chunks ensuring that initial page landing requests process a Largest Contentful Paint (LCP) performance score inside 2.5 seconds.
2. WHEN a client platform presents active parameters for `prefers-reduced-motion: reduce`, all page entry fade-ins, crossfades, GSAP pinning routines, and Facebook feedback carousel animations across all routing views SHALL turn off instantly. Content must render immediately in its final visual layout.
3. Contrast ratios across all text and UI layout backgrounds on all independent sub-pages SHALL preserve a strict rating threshold of $\ge 4.5:1$ to conform fully to WCAG 2.1 AA parameters.
4. Keyboard navigational path commands (`Tab`) SHALL correctly cycle across interactive links, input sliders, carousel controls, and scheduling modules on all routes, deploying an explicit visible focus highlight border with a minimum contrast rating of $\ge 3:1$.
