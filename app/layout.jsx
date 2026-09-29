import "../src/index.css";
import SmoothScroll from "../src/components/SmoothScroll";

export const metadata = {
  metadataBase: new URL("https://shahidur.dev"),
  title: {
    default: "Shahidur Rahman | Full-Stack Software Engineer & 3D Web Developer",
    template: "%s | Shahidur Rahman",
  },
  description:
    "Shahidur Rahman is a Full-Stack Software Engineer & 3D Web Developer specializing in Next.js, React, Node.js, TypeScript, Python AI/ML, and Web3 architectures. Available for full-time engineering roles, contracting, and technical collaborations worldwide.",
  keywords: [
    "Shahidur Rahman",
    "Shahidur Rahman Portfolio",
    "Full-Stack Developer",
    "Software Engineer",
    "3D Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Engineer",
    "TypeScript Developer",
    "Three.js Portfolio",
    "Python AI Engineer",
    "Web3 Developer",
    "Frontend Engineer",
    "Backend Developer",
    "Hire Full Stack Developer",
    "Hire Software Engineer",
    "Remote Software Engineer",
    "Software Engineer Resume",
    "shahidur.dev",
    "shahidur8381",
  ],
  authors: [{ name: "Shahidur Rahman", url: "https://shahidur.dev" }],
  creator: "Shahidur Rahman",
  publisher: "Shahidur Rahman",
  applicationName: "Shahidur Rahman Portfolio",
  category: "technology",
  alternates: {
    canonical: "https://shahidur.dev",
  },
  openGraph: {
    title: "Shahidur Rahman | Full-Stack Software Engineer & 3D Web Developer",
    description:
      "Explore production web applications, 3D WebGL experiences, AI integrations, and Web3 architectures by Shahidur Rahman. Available for full-time engineering roles & contracting.",
    url: "https://shahidur.dev",
    siteName: "Shahidur Rahman Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/medicore_showcase_cover.jpg",
        width: 1200,
        height: 630,
        alt: "Shahidur Rahman — Full-Stack Software Engineer & 3D Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahidur Rahman | Full-Stack Software Engineer & 3D Web Developer",
    description:
      "Full-Stack Software Engineer specializing in Next.js, React, Node.js, 3D WebGL, and scalable systems. Open to opportunities.",
    images: ["/medicore_showcase_cover.jpg"],
    creator: "@shahidur8381",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shahidur.dev/#person",
      "name": "Shahidur Rahman",
      "alternateName": ["Shahidur", "shahidur8381"],
      "url": "https://shahidur.dev",
      "image": "https://api.shahidur.dev/uploads/1790424783233-portrait.jpg",
      "jobTitle": "Full-Stack Software Engineer & 3D Web Developer",
      "description":
        "Full-stack software engineer and digital product builder specializing in Next.js, React, Node.js, TypeScript, Python AI/ML, and Web3 interactive applications.",
      "email": "mailto:hello@shahidur.dev",
      "sameAs": [
        "https://github.com/shahidur8381",
        "https://www.linkedin.com/in/shahidur8381",
        "https://leetcode.com/shahidur8381",
        "https://codeforces.com/profile/shahidur8381",
        "https://t.me/shahidur8381",
        "https://wa.me/shahidur8381"
      ],
      "knowsAbout": [
        "Full-Stack Web Development",
        "Next.js",
        "React.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Python",
        "Machine Learning",
        "Three.js",
        "WebGL",
        "Tailwind CSS",
        "REST APIs",
        "Web3",
        "Smart Contracts",
        "Docker",
        "Git"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full Stack Software Engineer",
        "occupationLocation": {
          "@type": "AdministrativeArea",
          "name": "Remote / Worldwide"
        },
        "skills":
          "Next.js, React, TypeScript, Node.js, PostgreSQL, Three.js 3D WebGL, Python, AI APIs"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "BGC Trust University Bangladesh"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://shahidur.dev/#website",
      "url": "https://shahidur.dev",
      "name": "Shahidur Rahman | Portfolio",
      "description":
        "Official engineering portfolio of Shahidur Rahman — Full-Stack Developer & 3D Web Engineer.",
      "publisher": {
        "@id": "https://shahidur.dev/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://shahidur.dev/#webpage",
      "url": "https://shahidur.dev",
      "name": "Shahidur Rahman | Full-Stack Software Engineer & 3D Web Developer Portfolio",
      "isPartOf": {
        "@id": "https://shahidur.dev/#website"
      },
      "about": {
        "@id": "https://shahidur.dev/#person"
      },
      "description":
        "Portfolio and hiring showcase for Shahidur Rahman featuring full-stack applications, interactive 3D WebGL experiences, technical skills, and production projects."
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
