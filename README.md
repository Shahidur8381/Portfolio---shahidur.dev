# 🌌 Shahidur's 3D Developer Portfolio

An immersive, highly interactive 3D developer portfolio showcasing my engineering pillars, projects, and professional journey. Powered by Next.js and React Three Fiber, it delivers a stunning visual experience while fetching dynamic data directly from my custom backend CMS.

🌐 **Live Website**: [shahidur.dev](https://shahidur.dev)

---

## ✨ Key Features

### 🧊 Immersive 3D Experiences
- **Interactive 3D Hero & Models**: Stunning 3D desktop models and floating geometric elements that respond to user interaction.
- **Dynamic Backgrounds**: Procedurally generated 3D starfields and space backgrounds for a captivating deep-space aesthetic.
- **Custom Cursors & Smooth Scrolling**: Highly polished micro-interactions and fluid navigation.

### 🔄 Dynamic Content Driven
- **Backend Integration**: Completely dynamic content (Projects, Experiences, Education, Testimonials, Social Links) fetched seamlessly from the custom backend CMS (`api.shahidur.dev`).
- **Real-time Updates**: Changes made in the Admin Panel reflect instantly on the live portfolio.

### ✉️ Automated Contact & Email System
- **Resend Integration**: Fully functional contact form built with React Email and Resend.
- **Auto-Replies**: Instantly sends beautiful, branded HTML auto-reply emails to visitors who reach out.
- **Discord/Admin Notifications**: Immediate alerts for new contact messages.

### 📄 Resume Management
- **Dynamic PDF Delivery**: Fetch and view the latest resume/CV via a dedicated `/resume` route, managed directly through the admin panel.

### 📱 Responsive & Performant
- Optimized 3D rendering ensuring smooth 60fps performance across desktop and mobile devices.
- Responsive Tailwind CSS layouts that adapt flawlessly to any screen size.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [React Three Drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email**: [Resend](https://resend.com/), [React Email](https://react.email/)

---

## 🚀 Setup & Deployment

### Prerequisites
- Node.js (v18+)
- Backend API running (or fallback `portfolioData.json` configured)
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
