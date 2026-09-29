# 🌌 Shahidur Rahman | 3D Interactive Portfolio

An immersive, highly interactive 3D developer portfolio showcasing my engineering pillars, projects, and professional journey. Powered by **Next.js** and **React Three Fiber**, it delivers a stunning visual experience while fetching dynamic data directly from my custom backend CMS.

🌐 **Live Website**: [shahidur.dev](https://shahidur.dev)

---

## ✨ Standout Features

### 🧊 Immersive 3D & Physics Experiences
- **Interactive 3D Hero & Models**: Stunning 3D desktop models and floating geometric elements that respond to user interaction.
- **Dynamic Procedural Backgrounds**: Procedurally generated 3D starfields and mesh-gradient space backgrounds for a captivating deep-space aesthetic.
- **Buttery Smooth Physics Scrolling**: Integrated with Lenis, delivering a luxurious, momentum-based scrolling experience with exponential deceleration curves.

### 🔄 Fully Dynamic Content (Headless CMS)
- **Backend Driven**: The portfolio is entirely dynamic. Projects, Experiences, Education, Testimonials, and Social Links are fetched seamlessly from the custom backend CMS (`api.shahidur.dev`).
- **Real-time Admin Control**: Changes made in the Admin Panel reflect instantly on the live portfolio without requiring a redeploy.
- **Dynamic Resume Delivery**: Fetch and view the latest resume/CV via a dedicated `/resume` route, dynamically managed through the admin panel.

### ⚙️ Hiring-Friendly SEO & Architecture
- **Rich Metadata & OpenGraph**: Fully configured for modern social sharing (LinkedIn, Twitter) with customized preview cards and recruiter-friendly keywords.
- **JSON-LD Schema Integration**: Embedded `Person` and `ProfilePage` structured data to ensure maximum visibility for Google Knowledge Graph and AI recruiter systems.

### ✉️ Automated Contact & Email System
- **Resend Integration**: Fully functional contact form built with React Email and Resend.
- **Branded Auto-Replies**: Instantly sends beautiful, branded HTML auto-reply emails to visitors who reach out.
- **Telegram/Admin Notifications**: Immediate alerts for new contact messages ensuring no opportunity is missed.

---

## 🏗️ Ecosystem Repositories

This portfolio is part of a larger ecosystem. The content and APIs are managed via dedicated backend and admin systems:

- **Frontend (This Repo)**: [Portfolio---shahidur.dev](https://github.com/Shahidur8381/Portfolio---shahidur.dev)
- **Backend API**: [backend-Shahidur-s-Portfolio-Website](https://github.com/Shahidur8381/backend-Shahidur-s-Portfolio-Website) (`api.shahidur.dev`)
- **Admin Panel**: [Admin---shahidur.dev](https://github.com/Shahidur8381/Admin---shahidur.dev) (`admin.shahidur.dev`)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [React Three Drei](https://github.com/pmndrs/drei)
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Email**: [Resend](https://resend.com/), [React Email](https://react.email/)

---

## 🚀 Setup & Deployment

### Prerequisites
- Node.js (v18+)
- Backend API running (or fallback data configured)
- Resend API Key (for emails)

### Local Development

1. **Clone and Install**
   ```bash
   git clone https://github.com/Shahidur8381/Portfolio---shahidur.dev.git
   cd Portfolio---shahidur.dev
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://api.shahidur.dev/api
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the site.

### Deployment
Optimized for Vercel deployment:
1. Push to GitHub.
2. Import project into Vercel.
3. Configure Environment Variables (`NEXT_PUBLIC_API_URL`, `RESEND_API_KEY`).
4. Deploy!
