# Shaik Mohammad Sajid - Developer Portfolio

A premium, production-quality developer portfolio website built using a clean vanilla stack enhanced with high-fidelity glassmorphism elements, custom interactive graphics, and smooth animations.

---

## Project Overview

This portfolio serves as a highly interactive digital resume and project showcase for **Shaik Mohammad Sajid**, an MCA Postgraduate and Software Developer. The application details their academic credentials, certifications, technical skills, core services, blog posts, and academic/professional projects. It features a custom full-screen product case study overlay modal, allowing recruiters to inspect detailed engineering challenges, architectures, and outcomes of key projects.

---

## Features

- **Preloader overlay**: Frost-glass cinematic loading screen with ambient glowing light orbs and canvas-drawn status progressions.
- **Background VFX system**: Animated radial blur-gradient mesh layers, drifting top aurora lights, dynamic mouse-follow spotlights, and a procedural film grain overlay to provide depth.
- **Constellation nodes**: An interactive particle link network drawn on a floating HTML5 Canvas, generating golden connector webs towards the user's cursor.
- **Liquid select system**: Category selection filters (All, Web development, Applications, UI/UX Design) with a fluidly transitioning background pill.
- **Glassmorphism cards**: Interactive layout components with responsive 3D tilt angles, perspective shifting, specular reflection sheen, and dynamic gradient borders.
- **Typewriter title slide**: Animated text scrolling for sub-role definitions on the Hero badge.
- **Case studies overlay modal**: Fullscreen modal dynamically populated via projects data files, with standalone smooth scrolling wrappers, key milestones, user research insights, and technical challenge matrices.
- **Form validation and slot-machine send button**: Fully validated contact form with vertically sliding text animations ("Send Message" → "Sending..." → "✓ Sent!") driven by GSAP timelines.
- **Blog post carousel**: Responsive carousel implementing GSAP Flip transitions.

---

## Technology Stack

### Frontend
- **HTML5**: Semantic tags structure and accessibility hooks.
- **JavaScript (ES6+)**: Custom DOM controllers, event mapping, validations, and interactive components.

### Backend
- **Node.js**: Standard HTTP file-server module (`server.js`) for local debugging and assets delivery.

### Animations
- **GSAP (GreenSock Animation Platform)**: Core timeline animations, text staggers, slide-ups, and form buttons transitions.
- **GSAP Flip Plugin**: Blog carousel card ordering.
- **Lenis Scroll**: Smooth scroll momentum engine for scroll speed tracking and velocity-linked background distortion effects.

### Styling
- **Vanilla CSS3**: Stylesheet reset, custom property colors (Quantira Light Brand palette), layout grids, flexboxes, and responsive breakpoints.
- **glass.css**: Pre-configured frosted glass styling parameters.
- **motion.css**: GPU-accelerated keyframe transforms and custom animations for background meshes, auroras, and cursors.

### Deployment
- **Web Servers**: Capable of hosting statically on platforms like GitHub Pages, Vercel, or Netlify, or as a Node.js web worker.

---

## Folder Structure

```text
res/
├── assets/
│   ├── css/
│   │   ├── glass.css          # Glassmorphism helper styles
│   │   ├── motion.css         # GPU-accelerated animations and layouts
│   │   └── style.css          # Core styles, layout structure and colors
│   ├── images/
│   │   ├── trait-adaptability.png   # Interpersonal trait graphic
│   │   ├── trait-availability.png   # Interpersonal trait graphic
│   │   ├── trait-collaboration.png  # Interpersonal trait graphic
│   │   ├── trait-communication.png  # Interpersonal trait graphic
│   │   ├── blog-aws-s3.png    # AWS S3 blog post banner
│   │   ├── blog-git.png       # Git blog post banner
│   │   ├── blog-mern.png      # MERN blog post banner
│   │   ├── blog-uiux.png      # UI/UX blog post banner
│   │   ├── icon-app.svg       # Database Management service icon
│   │   ├── icon-design.svg    # UI/UX Graphical Design service icon
│   │   ├── icon-dev.svg       # Web Development service icon
│   │   ├── icon-photo.svg     # DevOps & Cloud Basics service icon
│   │   ├── icon-quote.svg     # Testimonial quote icon
│   │   ├── logo.jpg           # Application tab icon
│   │   ├── my-avatar.png      # Sidebar main profile image
│   │   ├── project-gas-agency.png   # Gas Agency project screenshot
│   │   ├── project-nutrition.png    # Nutrition App mockup screenshot
│   │   └── project-textile.png      # Textile Management mockup screenshot
│   └── js/
│       ├── motion.js          # GSAP engines, cursor physics, and animations
│       ├── projects-data.js   # Projects case studies data dictionary
│       └── script.js          # Validation, form handling, and layout listeners
├── index.html                 # Main portfolio markup entry
├── server.js                  # Node.js local development server utility
└── README.md                  # Project documentation
```

---

## Installation

To run this repository locally, follow these steps:

1. Clone or extract this repository to your local workspace directory.
2. Ensure you have [Node.js](https://nodejs.org/) installed (recommended version 16.x or higher).
3. Open your terminal in the root directory containing `server.js`.
4. Start the development server using:
   ```bash
   node server.js
   ```
5. Open your web browser and navigate to:
   ```
   http://localhost:5500/
   ```

---

## Responsive Design

The portfolio utilizes viewport media query breakpoints in `style.css` to deliver an adaptable layout:

- **Desktop (>= 1024px)**: Grid layouts with sidebar locked on the left, navbar anchored at the top right, large interactive showcase grids, and advanced custom cursors/spotlights.
- **Tablet (768px - 1023px)**: Adaptive column spans, larger modal popups, and touch-adapted sliders.
- **Mobile (< 768px)**: Optimized single-column layout. The contacts list folds vertically, and the navbar shifts to a sticky bottom tab bar for easy thumb navigation. Cursor physics and resource-heavy animations are paused to conserve mobile CPU.

---

## UI Components

1. **Hero**: Volumetric logo reveal loader, bold introduction text, typewriter sub-role rotation loop, quick navigation buttons, and a tech stack badge cloud.
2. **About**: Description paragraphs featuring text scrambling on scroll reveal, postgraduate metrics cards, and service list cards highlighting developer offerings.
3. **Skills**: SVG-drawn circular progress rings that count up to their respective values as they enter the viewport.
4. **Resume**: Timelines illustrating educational milestones and professional certifications.
5. **Projects**: Dynamic grid list with category filters (All, Web development, Applications, UI/UX Design). Clicking on any project launches the case study modal overlay.
6. **Contact**: Google Map embed and a feedback form with client-side input validations.

---

## Performance Optimizations

- **Image Lazy Loading**: The `loading="lazy"` attribute is implemented on all screenshots and media files to prevent page blocks.
- **GPU Acceleration**: Hover transformations, opacity fading, and 3D tilts use CSS `transform` and `opacity` properties to offload rendering onto the GPU.
- **CPU Safety Guard**: A tab visibility listener triggers `gsap.ticker.sleep()` when the tab is hidden, freezing all JS loops and animation routines to eliminate background battery draw.
- **Optimized Noise Overlay**: Canvas noise generations and particle updates are throttled and downscaled.
- **Clean Stylesheet Payload**: Removed duplicate and unused styles from the original template to reduce file parse times.

---

## Accessibility

- **Semantic HTML**: Structural sections utilize proper HTML5 elements (`<main>`, `<section>`, `<article>`, `<aside>`, `<nav>`).
- **Tab Index & Contrast**: Form inputs have focus styling. Gradient overlays are set to lock high contrast ratios on translucent backgrounds.
- **Alt Text Integrity**: Visual graphics contain descriptive `alt` tags (`UI/UX Graphical Design Icon`, `Database Management Icon`, etc.) to assist screen reader navigation.

---

## Browser Support

- Chrome, Chromium Edge, and Opera (Full features, including spotlight mouse-tracking and cursor physics).
- Mozilla Firefox (Backdrop filters and color differences fall back to solid dark variations).
- Apple Safari (iOS touch controls and smooth kinetic lists).

---

## Future Improvements

1. **Dark/Light Mode Toggle**: Implement a toggle switch to flip stylesheets between dark and light themes.
2. **Dynamic Blog API**: Pull the latest blog articles automatically using DEV.to or Medium RSS endpoints.
3. **Headless Mailer Integration**: Wire the contact form to a mail service like EmailJS or Formspree to enable emails delivery without backend code.

---

## Project Architecture

1. **HTML5 (`index.html`)** defines the DOM structure.
2. **CSS3 (`style.css`, `glass.css`, `motion.css`)** styles the visual attributes. Responsive media queries adapt structure across viewports.
3. **Data Layer (`projects-data.js`)** houses detailed case studies in an object dictionary.
4. **Script Controllers (`script.js`, `motion.js`)** monitor client mouse movements, scroll actions, and click states to trigger visual transformations.

---

## Motion System

The animation hierarchy is divided into:
- **Immediate Scroll Triggers**: IntersectionObservers add classes (like `.active-reveal` or `.title--visible`) to slide-up headers and fill skills progress rings.
- **Scroll Velocity Engine**: Lenis captures scroll velocity and direction to adjust background mesh scales and warp aurora ellipses.
- **Interactive Cursor Physics**: `gsap.ticker` tracks mouse positions, dragging the cursor dot and stretching the cursor ring along the velocity vector.
- **3D Tilt and Glare**: Card mouse moves adjust CSS custom variables `--mouse-x`, `--mouse-y` for gradient boundary highlights, while rotating the card along the X and Y axes.

---

## Author

- **Name**: Shaik Mohammad Sajid
- **GitHub**: https://github.com
- **Portfolio**: https://sksajid.github.io/
- **Email**: sksajid2502@gmail.com
