export interface Education {
  id: number;
  title: string;
  institution: string;
  result: string;
  date: string;
  icon: string;
  image?: string | null;
  description: string;
  expectedGraduationYear?: number | null;
  showOnHomepage?: boolean;
  sortOrder?: number;
}

export interface Experience {
  id: string | number;
  slug?: string;
  title: string;
  companyName: string;
  company_name?: string;
  date: string;
  icon: string;
  iconBg: string;
  image?: string | null;
  points: string[];
  showOnHomepage?: boolean;
  sortOrder?: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  salam: string;
  salamMeaning: string;
  roles: string[];
  aboutIntro: string;
  portrait: string;
  resumeUrl?: string;
}

export interface NavLink {
  id: string;
  title: string;
}

export interface WhatIBuilt {
  id: number;
  number: string;
  title: string;
  description: string;
  tech: string;
  iconType: string;
  isPrimary: boolean;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link?: string;
  live_demo_link?: string;
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

export interface SocialLink {
  id: number | string;
  platform: string;
  label?: string;
  url: string;
  icon?: string;
  displayInContact?: boolean;
  display_in_contact?: boolean;
  displayInFooter?: boolean;
  display_in_footer?: boolean;
  sortOrder?: number;
  sort_order?: number;
  isActive?: boolean;
  is_active?: boolean;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navLinks: NavLink[];
  what_i_built: WhatIBuilt[];
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  socialLinks?: SocialLink[];
}
