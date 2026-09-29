# 🌌 Shahidur Rahman | 3D Interactive Developer Portfolio

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Website-shahidur.dev-00f59b?style=for-the-badge&logo=vercel&logoColor=black)](https://shahidur.dev)
[![Admin Panel](https://img.shields.io/badge/Admin_CMS-admin.shahidur.dev-6366f1?style=for-the-badge&logo=shield&logoColor=white)](https://admin.shahidur.dev)
[![Backend API](https://img.shields.io/badge/Backend_API-api.shahidur.dev-38bdf8?style=for-the-badge&logo=node.js&logoColor=white)](https://api.shahidur.dev)

[![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/Three.js-R3F-blue?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_Engine-black?style=flat-square&logo=resend)](https://resend.com/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Smooth_Physics-emerald?style=flat-square)](https://lenis.darkroom.engineering/)

</div>

---

An immersive, production-grade 3D developer portfolio and digital showcase engineered with **Next.js 14 (App Router)** and **React Three Fiber**. Designed around high visual impact, futuristic dark aesthetics, physics-based momentum scrolling, and a 100% dynamic **Headless CMS architecture** that feeds directly from a custom backend.

🌐 **Production URL**: [shahidur.dev](https://shahidur.dev)

---

## ⚡ Highlights & Key Features

### 🧊 3D WebGL & Interactive Visuals
- **3D Canvas & Desktop Rig**: Interactive 3D computer workstation model rendered with Three.js / React Three Fiber, featuring mouse-reactive lighting, tilt physics, and fallback states.
- **Procedural Particle Cosmos**: Deep-space starry field with floating geometric geometries and procedural galaxy rotation.
- **Physics Smooth Scroll**: Integrated with **Lenis**, delivering inertia-driven momentum scrolling with exponential deceleration curves.
- **Custom Cyberpunk Cursor & Glows**: Subtle mouse-following ambient luminescence and interactive hover micro-animations.

### 🔄 100% Dynamic Content (Headless CMS)
- **Live Sync with Backend**: All portfolio data is fetched directly from [`api.shahidur.dev`](https://api.shahidur.dev), eliminating the need for code redeploys when updating experiences, education, projects, or credentials.
- **Real-Time Visibility Filtering**: Projects, testimonials, and milestones can be dynamically toggled visible or hidden on the live landing page via the Admin Panel.
- **Sequential Reordering**: Supports dynamic sort order for nav links, projects, and work history.
- **Dynamic Resume/CV Route**: Visitors can view or download the latest PDF Resume/CV directly at `/resume` and `/cv`.

### 🔗 Dynamic Social & Contact Links Hub
- **Custom Link Orchestration**: Full support for LinkedIn, GitHub, WhatsApp, Telegram, Codeforces, LeetCode, Email, Facebook, and more.
- **Brand-Authentic Glassmorphism**: Hover reactive pill badges with platform-authentic brand gradients and neon highlights.

### ✉️ Resend Email System with Auto-Replies
- **Serverless API Route**: Built-in contact form handler running on Next.js Edge-ready endpoints.
- **Recruiter Alert Notifications**: Automatically sends immediate contact alerts with visitor info to the developer inbox.
- **Branded Auto-Reply HTML**: Instant, beautifully formatted confirmation email dispatched back to the sender.

### 🔍 Recruiter-Ready SEO & AI Discoverability
- **JSON-LD Schema Integration**: Embedded `Person` and `ProfilePage` structured data optimized for Google Knowledge Graph and AI search parsers.
- **OpenGraph & Twitter Cards**: High-resolution share previews configured with dynamic metadata.
- **Robots & Dynamic Sitemap**: Complete XML sitemap and robots directives generated automatically.

---

## 🏗️ Portfolio Ecosystem Architecture

This frontend is part of an integrated three-tier portfolio architecture:

| Component | Repository | Live Deployment |
| :--- | :--- | :--- |
| **Portfolio Frontend** *(This Repo)* | [Portfolio---shahidur.dev](https://github.com/Shahidur8381/Portfolio---shahidur.dev) | [`shahidur.dev`](https://shahidur.dev) |
| **Admin Panel (CMS)** | [Admin---shahidur.dev](https://github.com/Shahidur8381/Admin---shahidur.dev) | [`admin.shahidur.dev`](https://admin.shahidur.dev) |
| **Backend REST API** | [backend-Shahidur-s-Portfolio-Website](https://github.com/Shahidur8381/backend-Shahidur-s-Portfolio-Website) | [`api.shahidur.dev`](https://api.shahidur.dev) |

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **3D & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), `maath`
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Glassmorphism, CSS Modules
- **Communication**: [Resend](https://resend.com/), [React Email](https://react.email/)
- **Icons**: [Lucide React](https://lucide.dev/), `react-icons`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17 or later)
- npm, yarn, or pnpm

### 1. Installation

```bash
git clone https://github.com/Shahidur8381/Portfolio---shahidur.dev.git
cd Portfolio---shahidur.dev
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://api.shahidur.dev/api
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_NOTIFICATION_EMAIL=hello@shahidur.dev
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Deployment

The project is pre-configured for optimal deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the repository in [Vercel Dashboard](https://vercel.com).
3. Add the required environment variables (`NEXT_PUBLIC_API_URL`, `RESEND_API_KEY`).
4. Hit **Deploy** — automatic preview and production deployments are activated out of the box.

---

## 📄 License

Created and maintained by **Shahidur Rahman**. Distributed under the MIT License.
