/**
 * All site copy lives here. Content is taken from the supplied brief / CV.
 * Items marked `TODO` are placeholders awaiting real material.
 */
import {
  Blocks,
  BrainCircuit,
  Bug,
  Code,
  Code2,
  Frame,
  Gauge,
  Globe,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Puzzle,
  Rocket,
  TestTube2,
  Wrench,
} from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa6";
import {
  SiAnthropic,
  SiBootstrap,
  SiCss,
  SiCursor,
  SiElementor,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiGmail,
  SiGooglechrome,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiMui,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiReactbootstrap,
  SiSass,
  SiShadcnui,
  SiSublimetext,
  SiTailwindcss,
  SiV0,
  SiVite,
  SiWordpress,
} from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobeXd, TbBrandOpenai } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import type {
  ContactInfo,
  Education,
  Experience,
  Faq,
  Highlight,
  NavItem,
  Project,
  Service,
  SkillCategory,
  Social,
  Stat,
} from "@/types";
 
export const siteConfig = {
  name: "Saumya Majumder",
  shortName: "Saumya",
  initials: "SM",
  role: "Freelance Frontend Developer",
  tagline:
    "Freelance frontend developer building responsive, fast and user-friendly websites with React.js, Next.js and WordPress.",
  seoTitle: "Freelance Frontend Developer | React & WordPress | Saumya",
  seoDescription:
    "Hire Saumya Majumder, a freelance frontend developer with 7+ years of experience in React.js, WordPress, JavaScript, Tailwind CSS, and responsive website development.",
  // Set NEXT_PUBLIC_SITE_URL in your hosting environment (used for canonical,
  // Open Graph, sitemap and structured data).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  cvHref: "/Resume.docx",
  portrait: {
    // Rendered with next/image (fill + object-cover in a 4:5 frame), which
    // serves resized AVIF/WebP. Keep the source at least ~1000px wide.
    src: "/images/saumya-majumder.jpg",
    alt: "Portrait of Saumya Majumder, freelance frontend developer",
    width: 1254,
    height: 1254,
  },
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const contactInfo: ContactInfo = {
  email: "saumyarulez@gmail.com",
  phone: "+91 98329 96918",
  whatsapp: "919832996918",
  location: "West Bengal, India",
  linkedin: "https://linkedin.com/in/saumya-majumder-b5b5a2130",
  facebook:"https://www.facebook.com/saumya.majumder.9",
  instagram:"https://www.instagram.com/saumyamajumder/",
};

export const whatsappHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
  "Hi Saumya, I'd like to discuss a website project.",
)}`;

export const hero = {
  badge: "Available for projects",
  titleLead: "Building Modern Websites & Digital Experiences That",
  titleAccent: "Make an Impact.",
  intro:
    "I'm Saumya Majumder, a freelance frontend developer with 7+ years of experience building responsive, modern, and user-friendly websites. I specialize in React.js, WordPress, JavaScript, and modern frontend technologies, helping businesses turn ideas into exceptional digital experiences.",
  highlights: [
    { icon: Rocket, title: "7+ Years", label: "Experience" },
    { icon: Code, title: "React & WordPress", label: "Development" },
    { icon: Globe, title: "Worldwide", label: "Working with clients" },
  ] satisfies Highlight[],
};

export const about = {
  eyebrow: "About Me",
  title: "Design-Minded Developer With a *Product Focus.*",
  paragraphs: [
    "I'm a passionate Frontend Developer who enjoys building beautiful, functional, and user-friendly digital experiences.",
    "With over 7 years of professional experience, I've worked with modern web technologies and developed websites for different business requirements.",
    "I specialize in creating responsive interfaces, translating Figma designs into pixel-perfect layouts, developing React applications, and building customized WordPress websites.",
    "My focus is simple: clean code, excellent design, great performance, and meaningful user experiences.",
  ],
  stats: [
    {
      value: 7,
      suffix: "+",
      title: "Years of Experience",
      description: "Building production websites and frontend applications since 2017.",
    },
    {
      icon: Layers,
      title: "Multiple Frontend Technologies",
      description: "React.js, Next.js, WordPress, JavaScript, Tailwind CSS and more.",
    },
    {
      icon: MonitorSmartphone,
      title: "Responsive & User-Focused",
      description: "Interfaces that work beautifully on desktop, tablet and mobile.",
    },
  ] satisfies Stat[],
};

export const services: Service[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    icon: Code,
    summary: "Custom, responsive websites built with clean, modern frontend code.",
    description:
      "A custom website built around your business goals: clean semantic HTML, well-structured CSS and modern JavaScript, designed to look great and work smoothly on every screen size.",
    features: [
      "Custom website development",
      "Responsive web design",
      "HTML, CSS, JavaScript",
      "Modern frontend development",
    ],
  },
  {
    id: "react-nextjs",
    number: "02",
    title: "React & Next.js Development",
    icon: Blocks,
    summary: "Fast, scalable interfaces built from reusable React components.",
    description:
      "Interactive web applications and marketing sites built with React.js and Next.js, using reusable components and a maintainable frontend architecture that is easy for your team to extend.",
    features: [
      "React.js development",
      "Next.js interfaces",
      "Reusable UI components",
      "Modern frontend architecture",
    ],
  },
  {
    id: "wordpress",
    number: "03",
    title: "WordPress Development",
    icon: LayoutTemplate,
    summary: "Custom WordPress sites you can manage and update with confidence.",
    description:
      "Custom WordPress websites built with Elementor, Divi or custom theme work, plus customization of existing sites and ongoing maintenance so your site stays up to date.",
    features: [
      "Custom WordPress websites",
      "Elementor and Divi",
      "WordPress customization",
      "Website maintenance",
    ],
  },
  {
    id: "figma-to-website",
    number: "04",
    title: "Figma to Website",
    icon: Frame,
    summary: "Pixel-perfect conversion of your Figma designs into live websites.",
    description:
      "Your Figma (or Adobe XD) designs turned into responsive HTML or React code with close attention to spacing, typography and interaction details.",
    features: [
      "Figma to HTML",
      "Figma to React",
      "Pixel-perfect implementation",
      "Responsive UI development",
    ],
  },
];

/**
 * TODO: replace these placeholders with real projects. Set `placeholder: false`
 * and add `liveUrl` / `caseStudyUrl` once available. Until then the buttons
 * are rendered disabled and each card is clearly labelled as a placeholder.
 */
export const projects: Project[] = [
  {
    id: "project-1",
    placeholder: true,
    title: "Project Title",
    category: "React.js Web Application",
    description:
      "Placeholder: add a short summary of the project goal, your role and what you built.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    image: {
      src: "/images/projects/placeholder-1.webp",
      alt: "Placeholder image for a React.js web application project",
      width: 1200,
      height: 800,
    },
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "project-2",
    placeholder: true,
    title: "Project Title",
    category: "WordPress Website",
    description:
      "Placeholder: describe the business, the requirements and how the WordPress build met them.",
    tech: ["WordPress", "Elementor", "CSS3"],
    image: {
      src: "/images/projects/placeholder-2.webp",
      alt: "Placeholder image for a WordPress website project",
      width: 1200,
      height: 800,
    },
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "project-3",
    placeholder: true,
    title: "Project Title",
    category: "Figma to React",
    description:
      "Placeholder: explain how the Figma design was translated into a responsive React interface.",
    tech: ["Figma", "React.js", "SCSS"],
    image: {
      src: "/images/projects/placeholder-3.webp",
      alt: "Placeholder image for a Figma to React project",
      width: 1200,
      height: 800,
    },
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: "project-4",
    placeholder: true,
    title: "Project Title",
    category: "Next.js Website",
    description:
      "Placeholder: summarise the project scope, the tech choices and the final deliverable.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/images/projects/placeholder-4.webp",
      alt: "Placeholder image for a Next.js website project",
      width: 1200,
      height: 800,
    },
    liveUrl: null,
    caseStudyUrl: null,
  },
];

export const experience: Experience[] = [
  {
    company: "Capital Numbers Infotech",
    companyUrl: "https://www.capitalnumbers.com/",
    title: "Frontend Developer",
    period: "May 2019 – Present",
    start: "2019-05",
    responsibilities: [
      "Develop and maintain frontend applications using React.js and WordPress.",
      "Build responsive websites for desktop, tablet, and mobile devices.",
      "Convert Figma and Adobe XD designs into functional interfaces.",
      "Create reusable frontend components.",
      "Collaborate with teams to deliver projects on time.",
      "Improve UI consistency and frontend performance.",
    ],
    tech: ["React.js","Next.js", "WordPress", "Figma", "Adobe XD"],
    current: true,
  },
  {
    company: "Sleek Infosolutions Pvt. Ltd.",
    companyUrl: "https://www.sleekinfosolutions.com/",
    title: "Web Designer",
    period: "December 2017 – March 2019",
    start: "2017-12",
    end: "2019-03",
    responsibilities: [
      "Designed and developed WordPress websites.",
      "Worked with HTML, CSS, and jQuery.",
      "Created UI layouts and responsive designs.",
      "Customized websites based on client requirements.",
      "Implemented design improvements based on client feedback.",
    ],
    tech: ["WordPress", "HTML", "CSS", "jQuery" ,"Photoshop"],
    current: false,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "SCSS", icon: SiSass },
      { name: "JavaScript", icon: SiJavascript },
      { name: "jQuery", icon: SiJquery },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
    ],
  },
  {
    title: "Styling & UI",
    icon: Palette,
    skills: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "React Bootstrap", icon: SiReactbootstrap },
      { name: "Material UI", icon: SiMui },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "Responsive Web Design", icon: MonitorSmartphone },
    ],
  },
  {
    title: "WordPress",
    icon: LayoutTemplate,
    skills: [
      { name: "WordPress", icon: SiWordpress },
      { name: "Elementor", icon: SiElementor },
      { name: "Divi", icon: LayoutTemplate },
       { name: "Custom WordPress Development", icon: Code2 },
    { name: "Theme Customization", icon: Palette },
    { name: "Plugin Integration", icon: Puzzle },
    ],
  },
  {
    title: "AI Tools & Technologies",
    icon: BrainCircuit,
    skills: [
      { name: "ChatGPT", icon: TbBrandOpenai },
      { name: "Claude AI", icon: SiAnthropic },
      { name: "Google Gemini", icon: SiGooglegemini },
      { name: "GitHub Copilot", icon: SiGithubcopilot },
      { name: "Cursor AI", icon: SiCursor },
      { name: "Vercel v0", icon: SiV0 },
      { name: "Figma AI", icon: SiFigma },
    ],
  },
  {
    title: "Design",
    icon: PenTool,
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Adobe Photoshop", icon: TbBrandAdobePhotoshop },
      { name: "Adobe XD", icon: TbBrandAdobeXd },
    ],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    skills: [
      { name: "VS Code", icon: VscVscode },
      { name: "Sublime Text", icon: SiSublimetext },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "npm", icon: SiNpm },
      { name: "Vite", icon: SiVite },
      { name: "Chrome DevTools", icon: SiGooglechrome },
    ],
  },
  {
    title: "Testing & Quality",
    icon: TestTube2,
    skills: [
      { name: "UI Testing", icon: TestTube2 },
      { name: "Debugging", icon: Bug },
      { name: "Cross-Browser Compatibility", icon: Globe },
      { name: "Performance Optimization", icon: Gauge },
    ],
  },
];

export const education: Education[] = [
  {
    title: "Bachelor of Arts (Honours) in History",
    institution: "Tarakeshwar Degree College",
  },
  {
    title: "Higher Secondary",
    institution: "Gurbari M.B.S.C. High School",
  },
  {
    title: "Web Designing",
    institution: "Ejob India Computer Center",
  },
  {
    title: "Advanced Computer Programming & Applications",
    institution: "Ramakrishna Mission Shilpamandira Computer Centre",
  },
];

export const faqs: Faq[] = [
  {
    question: "Do you work with international freelance clients?",
    answer:
      "Yes. I work remotely with businesses, startups, agencies and individuals worldwide. I'm based in India (IST), keep communication clear over email, WhatsApp or video calls, and plan milestones so time-zone differences don't slow the project down.",
  },
  {
    question: "Can you convert Figma designs into React websites?",
    answer:
      "Yes. Converting Figma (and Adobe XD) designs into responsive, pixel-perfect interfaces is a core part of my work. I can build them in React.js or Next.js with reusable components, or as clean HTML, CSS and JavaScript if you don't need a framework.",
  },
  {
    question: "Do you provide WordPress website development?",
    answer:
      "Yes. I build custom WordPress websites using Elementor, Divi or custom theme work, customize existing WordPress sites, and can help with ongoing maintenance and updates.",
  },
  {
    question: "Can you redesign existing websites?",
    answer:
      "Yes. I can refresh the look of an existing site, rebuild it with a modern responsive layout, or move it to a new stack such as React, Next.js or WordPress, keeping your content and structure where it makes sense.",
  },
  {
    question: "What frontend technologies do you use?",
    answer:
      "My main tools are HTML5, CSS3/SCSS, JavaScript, React.js, Next.js and WordPress, styled with Tailwind CSS, Bootstrap, Material UI or shadcn/ui. I design with Figma, Adobe XD and Photoshop, and use Git for version control.",
  },
  {
    question: "How can I discuss my project with you?",
    answer:
      "Send a project inquiry through the contact form, email me, or message me on WhatsApp. Share a short description, your timeline and your budget if you have one, and I'll get back to you to discuss the next steps.",
  },
];

export const socials: Social[] = [
  { label: "Email", href: `mailto:${contactInfo.email}`, icon: SiGmail, color: "#ea4335" },
  { label: "LinkedIn", href: contactInfo.linkedin, icon: FaLinkedinIn, color: "#0a66c2" },
  { label: "WhatsApp", href: whatsappHref, icon: FaWhatsapp, color: "#25d366" },
  { label: "Facebook", href: contactInfo.facebook, icon: FaFacebook, color: "#1877F2" },
  { label: "Instagram", href: contactInfo.instagram, icon: FaInstagram, color: "#E4405F" },
];

export { budgetRanges, projectTypes } from "@/lib/contact-options";

export const footer = {
  bigLine: "Let's build something amazing.",
  intro:
    "Freelance frontend developer from West Bengal, India, helping businesses worldwide with React.js, Next.js and WordPress websites.",
};
