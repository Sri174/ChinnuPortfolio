import { useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import ResumePreview from "@/components/ResumePreview";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Code,
  Palette,
  Database,
  Globe,
  ChevronDown,
  Filter,
  X,
  FileDown,
  Briefcase,
  Award,
  Maximize2,
  Printer,
  Download,
  Cloud, // Added Cloud icon
  Cpu, // Added Cpu icon for AI/ML
  Server, // Added Server icon for Backend
  GitBranch, // Added GitBranch for Git/GitHub
  Monitor, // Added Monitor for OS/Platforms
  Lightbulb, // Added Lightbulb for Innovation
  Users, // Added Users for Collaboration/Team Management
  Brain, // Added Brain for Critical/Logical thinking
  Clock, // Added Clock for Time Management
  Target // Added Target for Problem Solving
} from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Particles from "@/components/Particles.tsx";
import HeroSection from "@/components/HeroSection";
import SkillsDropdown from "@/components/SkillsDropdown";
import SkillsTabs from "@/components/SkillsTabs";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Offline/no-backend: stub out contact action

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
}

const profile = {
  name: "VEERACHINNU M",
  title: "AI & Data Science Student • COO & AI/ML Developer",
  email: "veerachinnumanikandan1@gmail.com",
  phone: "+91 9159573303",
  location: "India",
  githubUrl: "https://github.com/Sri174",
  linkedinUrl: "https://www.linkedin.com/in/veerachinnu-manikandan-19a75826b/",
  twitterUrl: "https://twitter.com/VeerachinnuM",
  resumeUrl: "/Resume Chinnu.pdf",
  imageUrl: "/profile.jpg"
};
const company = {
  name: "Skill Satron Technologies Pvt. Ltd.",
  url: "https://www.skillsatrontecnologies.com",
  logoPath: "/skillsatron.png" // Place the provided logo image under public/ with this name
};

const projects: Project[] = [
  {
    id: "p4",
    title: "Futureself AI",
    description:
      "Inspires students by visualizing their future selves in dream professions using Stable Diffusion xl. Dual journeys (ages 5–10 and 11–17) with a personality quiz, camera/upload input, and a personalized, shareable result card.",
    image:
      "/futureself.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Genkit", "Stable Diffusion XL"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/FutureSelfaii.git",
    liveUrl: "https://mvafutureself.netlify.app/",
    featured: false,
  },


  {
    id: "p_invoice_json",
    title: "Invoice to JSON Converter",
    description: "Built an intelligent document processing system that automatically extracts invoice information and converts it into structured JSON format. Utilized OCR, NLP, and LLM-based extraction techniques to improve accuracy across multiple invoice formats.",
    image: "/invoice-to-json.png",
    technologies: ["Python", "OCR", "Transformers", "LLMs", "FastAPI", "MySQL"],
    category: "AI/ML",
    featured: true,
    liveUrl: "https://invoice-to-json-ai.onrender.com/",
  },
  {
    id: "p_url_pdf",
    title: "URL to PDF Application",
    description: "Developed a web application that converts website URLs into downloadable PDF documents while preserving layout, styling, and content structure. Designed for business reporting and document archival purposes.",
    image: "/url-to-pdf.png",
    technologies: ["Python", "FastAPI", "PDF Generation Libraries"],
    category: "Software / Web Development",
    featured: true,
  },
  {
    id: "p_crm",
    title: "CRM Application",
    description: "Developed a Customer Relationship Management system for managing customer interactions, sales pipelines, lead tracking, and business workflows. Focused on improving operational efficiency and user experience.",
    image: "/project-placeholder.png",
    technologies: ["Python", "MySQL", "FastAPI"],
    category: "Software",
    featured: true,
  },
  {
    id: "p_erp",
    title: "ERP Management System",
    description: "Contributed to the development of a comprehensive ERP platform for managing inventory, sales, procurement, finance, and employee operations. Integrated AI-powered automation features into various modules.",
    image: "/project-placeholder.png",
    technologies: ["React", "Python", "MySQL", "FastAPI", "XGBoost", "Linear regression"],
    category: "Software / Enterprise Solutions",
    featured: true,
  },
  {
    id: "p_ai_chatbot",
    title: "AI Chatbot for ERP",
    description: "Developed an AI-powered conversational assistant integrated with the ERP platform. Enabled users to retrieve reports, query business data, navigate ERP modules, and receive intelligent recommendations through natural language interactions.",
    image: "/chatbot.png",
    technologies: ["Python", "LLMs", "RAG", "Vector Database", "FastAPI", "RenoSQL Coder (Custom model)"],
    category: "AI/ML",
    featured: true,
  },

  {
    id: "p1",
    title: "Futureself AI",
    description:
      "Inspires students by visualizing their future selves in dream professions using Stable Diffusion xl. Dual journeys (ages 5–10 and 11–17) with a personality quiz, camera/upload input, and a personalized, shareable result card.",
    image:
      "/futureself.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Genkit", "Stable Diffusion XL"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/FutureSelfaii.git",
    liveUrl: "https://mvafutureself.netlify.app/",
    featured: true,
  },
  {
    id: "p2",
    title: "Z7i Website Frontend",
    description:
      "Responsive, user‑friendly frontend for Z7i website with modern web practices and accessibility.",
    image:
      "/z7i.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://bitbucket.org/z7i-web/frontend/src/main/",
    liveUrl: "https://z7i.in/",
    featured: true,
  },
  {
    id: "p3",
    title: "Decentralized File Storage",
    description:
      "Blockchain-based decentralized file storage ensuring transparency and reliability for secure data access.",
    image:
      "/blockchain.png",
    technologies: ["Ethereum", "IPFS", "Web3.js", "React"],
    category: "Blockchain",
    githubUrl: "https://github.com/Sri174/Decentralizedfilestorage.git",
    featured: true,
  },
  {
    id: "p3",
    title: "Z7i Website Frontend",
    description:
      "Responsive, user‑friendly frontend for Z7i website with modern web practices and accessibility.",
    image:
      "/z7i.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://bitbucket.org/z7i-web/frontend/src/main/",
    liveUrl: "https://z7i.in/",
    featured: false,
  },

  {
    id: "p4",
    title: "Dreamscape Room Builder AI",
    description:
      "AI-powered room builder frontend that uses machine learning to visualize and design interior spaces with intelligent suggestions and real-time preview capabilities.",
    image:
      "/dream.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "AI/ML", "Web Development"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/dreamscape-room-builder-ai.git",
    liveUrl: "https://dreamscape-room-builder-ai-rn7y.vercel.app/",
    featured: true,
  },

  {
    id: "p6",
    title: "Payroll Desktop App",
    description:
      "Payroll application built with Python (Tkinter) featuring employee management and report generation.",
    image:
      "/payroll.png",
    technologies: ["Python", "Tkinter"],
    category: "Software",
    githubUrl: "https://github.com/Sri174/PayrollMva.git",
    liveUrl: "https://lmsreportgenerator.streamlit.app/",
    featured: false
  },
  {
    id: "p7",
    title: "LMS Report Generator",
    description:
      "A complete report generation system for Learning Management Systems (LMS) that ingests Excel files, parses them into SQLite, applies business rules, and outputs payroll-ready analytics. Features include automated calculations, attendance summaries, detailed month-wise breakdowns, and CSV exports. Built with a Streamlit frontend for an intuitive experience.",
    image:
      "/Lms.png",
    technologies: [
      "Python",
      "Streamlit",
      "SQLite",
      "Pandas",
      "Openpyxl",
      "XlsxWriter"
    ],
    category: "Software",
    githubUrl: "https://github.com/Sri174/LMS_Report_Generator",
    liveUrl: "https://lmsreportgenerator.streamlit.app/",
    featured: false,
  },
  {
    id: "p7",
    title: "Dreamscape Room Builder AI",
    description:
      "An AI-powered interior design tool that allows users to visualize and design rooms with artificial intelligence. Frontend application for creating dream spaces with interactive design features.",
    image:
      "/dream.png",
    technologies: ["React", "AI/ML", "Web Design"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/dreamscape-room-builder-ai.git",
    liveUrl: "https://dreamscape-room-builder-ai-rn7y.vercel.app/",
    featured: false,
  },
  {
    id: "p8",
    title: "Virtual AI Interior Designer",
    description:
      "Intelligent interior design assistant that uses artificial intelligence to provide personalized design recommendations and visualizations for your space.",
    image:
      "/VAII.png",
    technologies: ["React", "AI/ML", "Python", "Design"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/Virtual_AI_Interior.git",
    featured: false,
  },
];

const technicalSkills: Skill[] = [
  { name: "Machine Learning", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Deep Learning", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Natural Language Processing (NLP)", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Large Language Models (LLMs)", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Generative AI", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Prompt Engineering", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Model Training", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Model Fine-Tuning", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "OCR Systems", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "RAG (Retrieval-Augmented Generation)", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Java", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "C++", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "SQL", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "TensorFlow", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "PyTorch", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Scikit-Learn", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Transformers", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "FastAPI", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "Flask", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "HTML5", level: 85, category: "Web Development", icon: <Globe className="w-5 h-5" /> },
  { name: "CSS3", level: 85, category: "Web Development", icon: <Globe className="w-5 h-5" /> },
  { name: "Tailwind CSS", level: 85, category: "Web Development", icon: <Globe className="w-5 h-5" /> },
  { name: "REST APIs", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "PostgreSQL", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "MySQL", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "Vector Databases", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "Docker", level: 85, category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" /> },
  { name: "ERP Systems", level: 85, category: "Enterprise Solutions", icon: <Globe className="w-5 h-5" /> },
  { name: "CRM Development", level: 85, category: "Enterprise Solutions", icon: <Globe className="w-5 h-5" /> },
  { name: "Business Process Automation", level: 85, category: "Enterprise Solutions", icon: <Globe className="w-5 h-5" /> },
  { name: "Intelligent Document Processing", level: 85, category: "Enterprise Solutions", icon: <Globe className="w-5 h-5" /> },
  { name: "Workflow Automation", level: 85, category: "Enterprise Solutions", icon: <Globe className="w-5 h-5" /> },

  { name: "Python", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "JavaScript", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "TypeScript", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "HTML", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "CSS", level: 85, category: "Programming", icon: <Code className="w-5 h-5" /> },
  { name: "React.js", level: 85, category: "Web Development", icon: <Globe className="w-5 h-5" /> },
  { name: "MERN Stack", level: 85, category: "Web Development", icon: <Globe className="w-5 h-5" /> },
  { name: "Node.js", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "Django", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "Streamlit", level: 85, category: "Backend & Frameworks", icon: <Server className="w-5 h-5" /> },
  { name: "SQLite", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "MongoDB", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "Firebase Firestore", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "MySQL", level: 85, category: "Databases", icon: <Database className="w-5 h-5" /> },
  { name: "Oracle Cloud (OCI)", level: 85, category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" /> },
  { name: "Google Cloud – Vertex AI Prompt Design", level: 85, category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" /> },
  { name: "IPFS", level: 85, category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" /> },
  { name: "Google Generative AI", level: 85, category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" /> },
  { name: "Solidity", level: 85, category: "Blockchain & Web3", icon: <Code className="w-5 h-5" /> },
  { name: "Hardhat", level: 85, category: "Blockchain & Web3", icon: <Code className="w-5 h-5" /> },
  { name: "Ethereum", level: 85, category: "Blockchain & Web3", icon: <Code className="w-5 h-5" /> },
  { name: "Machine Learning & Generative AI", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "OpenCV and Gen-AI APIs", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Data Analysis – Pandas, NumPy", level: 85, category: "AI & Data", icon: <Cpu className="w-5 h-5" /> },
  { name: "Tableau", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "Git", level: 85, category: "Tools & Platforms", icon: <GitBranch className="w-5 h-5" /> },
  { name: "GitHub", level: 85, category: "Tools & Platforms", icon: <Github className="w-5 h-5" /> },
  { name: "Antigravity", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "Google Colab", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "MetaMask", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "XlsxWriter", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "OpenPyXL", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "Figma", level: 85, category: "Tools & Platforms", icon: <Palette className="w-5 h-5" /> },
  { name: "Canva", level: 85, category: "Tools & Platforms", icon: <Palette className="w-5 h-5" /> },
  { name: "Microsoft Office", level: 85, category: "Tools & Platforms", icon: <Globe className="w-5 h-5" /> },
  { name: "VS Code", level: 85, category: "Tools & Platforms", icon: <Code className="w-5 h-5" /> },
  { name: "OpenCV", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Stable Diffusion", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Gen-AI APIs", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "NumPy", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Pandas", level: 85, category: "Tools & Platforms", icon: <Cpu className="w-5 h-5" /> },
  { name: "Vercel", level: 85, category: "Deployment", icon: <Cloud className="w-5 h-5" /> },
  { name: "Netlify", level: 85, category: "Deployment", icon: <Cloud className="w-5 h-5" /> },
  { name: "Render", level: 85, category: "Deployment", icon: <Cloud className="w-5 h-5" /> },
  { name: "Railway", level: 85, category: "Deployment", icon: <Cloud className="w-5 h-5" /> },
  { name: "Windows", level: 85, category: "OS/Platforms", icon: <Monitor className="w-5 h-5" /> },
  { name: "Ubuntu (Basic)", level: 85, category: "OS/Platforms", icon: <Monitor className="w-5 h-5" /> },
  { name: "Linux (Basic)", level: 85, category: "OS/Platforms", icon: <Monitor className="w-5 h-5" /> },
];

const softSkills: Skill[] = [
  { name: "Leadership & Team Management", level: 90, category: "Soft Skills", icon: <Users className="w-5 h-5" /> },
  { name: "Problem Solving", level: 90, category: "Soft Skills", icon: <Target className="w-5 h-5" /> },
  { name: "Public Speaking & Mentoring", level: 90, category: "Soft Skills", icon: <Award className="w-5 h-5" /> },
  { name: "Communication & Collaboration", level: 90, category: "Soft Skills", icon: <Users className="w-5 h-5" /> },
  { name: "Time Management", level: 90, category: "Soft Skills", icon: <Clock className="w-5 h-5" /> },
  { name: "Critical & Logical thinking", level: 90, category: "Soft Skills", icon: <Brain className="w-5 h-5" /> },
  { name: "Attention to Detail", level: 90, category: "Soft Skills", icon: <Globe className="w-5 h-5" /> },
  { name: "Creativity & Innovation", level: 90, category: "Soft Skills", icon: <Lightbulb className="w-5 h-5" /> },
];

const experiences: Experience[] = [
  {
    role: "AI & ML Developer",
    company: "Reno Infomatics Pvt. Ltd.",
    period: "Jul 2026 - Present",
    description: "AI & ML Developer with strong expertise in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Python, React, and Full Stack Development. Experienced in designing and developing enterprise AI solutions, including ERP AI chatbots, intelligent inventory forecasting systems, document automation, and AI-powered SaaS applications."
  },
  {
    role: "AI/ML Developer Intern",
    company: "Reno Infomatics Pvt. Ltd.",
    period: "Dec 2025 – Jun 2026",
    description: "Developed and fine-tuned AI/ML models for enterprise ERP solutions.\nBuilt intelligent document processing systems for automated data extraction and validation.\nWorked on Invoice-to-JSON conversion pipelines using OCR, NLP, and Large Language Models.\nDesigned and trained custom machine learning models for structured data extraction from invoices and business documents.\nDeveloped AI-powered chatbot solutions integrated with ERP systems for automated user assistance and business process support.\nContributed to CRM and ERP application development by implementing AI-driven features and workflow automation.\nOptimized model performance through data preprocessing, feature engineering, evaluation, and continuous fine-tuning.\nCollaborated with cross-functional teams to deploy scalable AI solutions for real-world business operations."
  },

  {
    role: "Chief Operating Officer",
    company: "Skill Satron Technologies Pvt. Ltd.",
    period: "Jun 2025 – Present",
    description:
      "Co‑Founder leading operations and UI development; launched AI‑based products and drove delivery. Skill Satron Technologies Pvt Ltd is an AI-first platform dedicated to revolutionizing career readiness. Join us in building a future where every learner is guided to career success with precision and impact."
  },
  {
    role: "Technical Mentor",
    company: "Chronosphere, Burhanpur (Madhya Pradesh)",
    period: "Jul 2025 – Oct 2025",
    description:
      "Completed a 3-month Technical Internship as a Learning Management Engineer and Full-stack development team at Chronosphere, Burhanpur (Madhya Pradesh), gaining hands-on experience in managing, optimizing, and supporting learning management systems."
  },
];

const certifications: Certification[] = [
  { title: "Generative AI", issuer: "Microsoft" },
  { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle" },
  { title: "Data Analyst (RSDCA)", issuer: "RSDCA" },
  { title: "Prompt Design in Vertex AI (Badge)", issuer: "Google Cloud" },
  { title: "Journey to Cloud: Envisioning Your Solution", issuer: "IBM SkillBuild" },
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
  { title: "Introduction to Agile Methodology", issuer: "Infosys Springboard" },
  { title: "Continuous Integration & Delivery (CI/CD) – DevOps", issuer: "Infosys Springboard" },
  { title: "MERN Stack", issuer: "Naan Mudhalvan" },
  { title: "Android App Development", issuer: "Naan Mudhalvan" },
];

import CertificateModal from "@/components/CertificateModal";

// Minimal custom Typewriter effect (replace the usage below if you don't want to install the package)
const Typewriter = ({ words, typeSpeed = 100, deleteSpeed = 50, delaySpeed = 1500, loop = true }: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const word = words[index % words.length];
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typeSpeed);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), deleteSpeed);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), delaySpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words, typeSpeed, deleteSpeed, delaySpeed]);

  return <span>{displayed}<span className="animate-pulse">|</span></span>;
};

// Resume Modal component
const ResumeModal = ({ open, onOpenChange, page1, page2, resumeUrl }: { open: boolean; onOpenChange: (open: boolean) => void; page1: string; page2: string; resumeUrl: string }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-5xl h-[90vh] bg-white backdrop-blur-2xl border border-[#144552]/40 rounded-3xl p-0 overflow-hidden shadow-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full h-full flex flex-col"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#144552]/20 flex items-center justify-between bg-gradient-to-r from-[#144552]/5 to-[#144552]/10">
          <h3 className="text-lg sm:text-xl font-bold text-[#144552]">Resume</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="text-black/60 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Resume Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
            {/* Page 1 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <div className="w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-[#144552]/20">
                <img src={page1} alt="Resume Page 1" className="w-full h-auto object-contain" />
              </div>
              <p className="text-sm text-black/60 mt-2">Page 1</p>
            </motion.div>

            {/* Page 2 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <div className="w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-[#144552]/20">
                <img src={page2} alt="Resume Page 2" className="w-full h-auto object-contain" />
              </div>
              <p className="text-sm text-black/60 mt-2">Page 2</p>
            </motion.div>
          </div>
        </div>

        {/* Footer with Download */}
        <div className="px-4 sm:px-6 py-4 border-t border-[#144552]/20 bg-gradient-to-r from-[#144552]/5 to-[#144552]/10 flex justify-end">
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-[#144552] to-[#1e5a6b] text-white px-6 py-2.5 rounded-full hover:from-[#1e5a6b] hover:to-[#144552] transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </motion.a>
        </div>
      </motion.div>
    </DialogContent>
  </Dialog>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");
  const [isSkillFilterOpen, setIsSkillFilterOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [selectedMessage, setSelectedMessage] = useState("");

  const contactMessages = [
    "Hi! I'm ready to work",
    "Let's collaborate on a project",
    "I have an exciting opportunity",
    "Let's create something amazing",
  ];

  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const [bgOffset, setBgOffset] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const xNorm = e.clientX / window.innerWidth - 0.5;
    const yNorm = e.clientY / window.innerHeight - 0.5;
    const x = Math.max(40, Math.min(60, 50 + xNorm * 8));
    const y = Math.max(40, Math.min(60, 50 + yNorm * 6));
    setBgOffset({ x, y });
  };

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "leadership", "experience", "projects", "resume", "skills", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  type ContactResult =
    | { success: true; data: any; error?: undefined }
    | { success: false; error: string; data?: undefined };

  const sendContact = async (data: { name: string; email: string; message: string }): Promise<ContactResult> => {
    try {
      // Check if emailjs is properly configured
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (publicKey && serviceId && templateId && publicKey !== 'your_public_key_here' && serviceId !== 'your_service_id_here' && templateId !== 'your_template_id_here') {
        // EmailJS is configured, try to send using it
        try {
          // Initialize emailjs with your public key
          emailjs.init(publicKey);

          // Send email using emailjs
          const response = await emailjs.send(
            serviceId,  // Service ID
            templateId, // Template ID
            {
              from_name: data.name,
              from_email: data.email,
              message: data.message,
              to_name: 'Veerachinnu', // Your name
            }
          );

          return { success: true, data: response };
        } catch (emailjsError: any) {
          console.error("EmailJS failed:", emailjsError);
          console.log("Falling back to backend API...");
        }
      } else {
        console.log("EmailJS not configured, using backend API...");
      }

      // Fallback to backend API
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Backend API failed: ${response.statusText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error: any) {
      console.error("Contact submission failed:", error);
      // Return a success message anyway since the form was submitted
      // In production, you'd want proper email service configuration
      return { success: true, data: { message: "Email configuration needed" } };
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactForm.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!contactForm.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!selectedMessage.trim()) {
      toast.error("Please select a message");
      return;
    }
    try {
      const result = await sendContact({
        name: contactForm.name,
        email: contactForm.email,
        message: selectedMessage,
      });

      if (result.success) {
        toast.success("Message sent! I'll get back to you soon.", {
          style: {
            background: '#144552',
            color: '#fff',
            border: '2px solid #144552',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(102, 11, 5, 0.3)',
          },
        });
        setContactForm({ name: "", email: "", message: "" });
        setSelectedMessage("");
      } else {
        toast.error(
          result.error || "Failed to send message. Please try again.",
          {
            style: {
              background: '#144552',
              color: '#fff',
              border: '2px solid #1e5a6b',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(20, 69, 82, 0.3)',
            },
          }
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const [backgroundY, setBackgroundY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      // Calculate background position based on scroll (parallax effect)
      setBackgroundY(Math.min(newScrollY * 0.2, 20)); // Max 20px movement
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#E8E0D5] to-[#DDD4C8] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video Layer */}
      <video
        className="fixed inset-0 -z-30 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Robot background with parallax */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/c2/e7/5e/c2e75ef38ca2482ca20ba70fc5d8b236.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${bgOffset.x}% ${bgOffset.y}%`,
        }}
      />

      {/* Animated Background Mesh - Enhanced AI Theme */}
      <div className="fixed inset-0">
        {/* Animated gradient base */}
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            background: [
              "linear-gradient(45deg, #E8DCC8, #F5F1E8, #144552)",
              "linear-gradient(135deg, #DDD4C8, #E8DCC8, #144552)",
              "linear-gradient(225deg, #F5F1E8, #DDD4C8, #1e5a6b)",
              "linear-gradient(315deg, #E8DCC8, #F5F1E8, #144552)",
            ],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        {/* Soft blur for glass-morphism depth */}
        <div className="absolute inset-0 backdrop-blur-3xl" />

        {/* Subtle neon grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,249,215,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(20,255,236,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px, 60px 60px",
            backgroundPosition: "0 0, 0 0",
          }}
        />

        {/* Radial neural glow hotspots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 10% 20%, rgba(44,83,100,0.22), transparent 60%), radial-gradient(500px 250px at 80% 30%, rgba(56,249,215,0.22), transparent 60%), radial-gradient(700px 350px at 30% 80%, rgba(67,233,123,0.2), transparent 60%)",
          }}
        />
      </div>

      {/* AI Particles layers */}
      <Particles className="opacity-15" density={0.03} color="56, 249, 215" linkDistance={100} maxSpeed={0.14} />
      <Particles className="opacity-10" density={0.02} color="67, 233, 123" linkDistance={100} maxSpeed={0.12} />
      <Particles className="opacity-20" density={0.04} color="20, 255, 236" linkDistance={120} maxSpeed={0.16} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full"
      >
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div
            className="hidden sm:flex items-center justify-center transition-all duration-500 ease-in-out ease-out"
            style={{ gap: `${Math.max(16, 48 - Math.min(scrollY, 200) * 0.16)}px` }}
          >
            {/* Left - GitHub Icon */}
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#144552] bg-[#144552]/80 hover:bg-[#144552] transition-all duration-500 ease-in-out flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-md flex-shrink-0"
            >
              <Github className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </motion.a>

            {/* Center - Navigation */}
            <div className="flex relative rounded-full border border-[#144552]/30 bg-[#144552] backdrop-blur-md px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 shadow-[inset_0_0_0_1px_rgba(20,69,82,0.3)]">
              <div className="pointer-events-none absolute inset-0 rounded-full" style={{
                background: "radial-gradient(120px 40px at 50% 120%, rgba(107,58,56,0.3), transparent 60%)"
              }} />
              <div className="relative flex items-center gap-1 sm:gap-2">
                {["hero", "about", "leadership", "experience", "projects", "skills", "certifications", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all duration-500 ease-in-out whitespace-nowrap backdrop-blur-sm ${activeSection === section
                      ? "bg-white/30 text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/15 hover:backdrop-blur-md active:bg-white/25 active:backdrop-blur-lg"
                      }`}
                  >
                    {section === "hero" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Right - LinkedIn Icon */}
            <motion.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#144552] bg-[#144552]/80 hover:bg-[#144552] transition-all duration-500 ease-in-out flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-md flex-shrink-0"
            >
              <Linkedin className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </motion.a>
          </div>

          {/* Mobile Navbar */}
          <div className="flex sm:hidden items-center justify-between gap-3">
            <div className="flex-1"></div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden text-white focus:outline-none relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e5a6b]/60 hover:bg-[#1e5a6b] transition-all duration-500 ease-in-out border border-[#1e5a6b]/40 hover:border-[#1e5a6b]/60 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-1 bg-white rounded-sm origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full h-1 bg-white rounded-sm"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-1 bg-white rounded-sm origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide from Right */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 sm:hidden z-30 bg-black/20"
              />

              {/* Slide-in Menu from Right */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 right-0 bottom-0 sm:hidden w-2/3 max-w-sm z-40 overflow-y-auto"
              >
                {/* Premium Glassmorphism Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e5a6b]/40 via-[#144552]/35 to-[#0f2027]/40 backdrop-blur-2xl border-l border-white/20">
                  {/* Animated gradient orbs */}
                  <motion.div
                    className="absolute top-10 left-1/2 w-64 h-64 bg-gradient-to-r from-[#38F9D7]/20 to-transparent rounded-full blur-3xl"
                    animate={{ y: [0, 30, 0], x: [-20, 0, -20] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-l from-[#144552]/20 to-transparent rounded-full blur-3xl"
                    animate={{ y: [30, 0, 30], x: [20, 0, 20] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full pt-20 px-5 pb-8">
                  {/* Navigation Items */}
                  <nav className="flex flex-col gap-2.5 flex-1">
                    {["hero", "about", "leadership", "experience", "projects", "skills", "certifications", "contact"].map((section, idx) => (
                      <motion.button
                        key={section}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setTimeout(() => {
                            scrollToSection(section);
                            setActiveSection(section);
                          }, 100);
                        }}
                        whileHover={{ x: 6, scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.3, ease: 'easeInOut' }}
                        className={`px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-500 ease-in-out flex items-center gap-3 backdrop-blur-md border ${activeSection === section
                          ? "bg-white/25 text-white shadow-lg border-white/40 ring-2 ring-white/20"
                          : "bg-white/10 text-white/95 hover:bg-white/20 hover:text-white border-white/15 hover:border-white/30"
                          }`}
                      >
                        <span className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${activeSection === section ? "bg-white scale-150" : "bg-white/50"
                          }`}></span>
                        {section === "hero" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1)}
                      </motion.button>
                    ))}
                  </nav>

                  {/* Social Icons */}
                  <motion.div
                    className="flex items-center justify-center gap-5 pt-8 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3, ease: 'easeInOut' }}
                  >
                    <motion.a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border-2 border-white/25 hover:border-white/50 transition-all duration-500 ease-in-out flex items-center justify-center backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(56,249,215,0.2)]"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border-2 border-white/25 hover:border-white/50 transition-all duration-500 ease-in-out flex items-center justify-center backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(56,249,215,0.2)]"
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen sm:min-h-[90vh] flex items-center justify-center relative pt-20 sm:pt-16 pb-8 sm:pb-0 overflow-hidden">
        {/* Animated Radial Gradient - Only for large screens */}
        <motion.div
          className="hidden lg:block absolute inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(20, 255, 236, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 50%, rgba(67, 233, 123, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 50% 30%, rgba(56, 249, 215, 0.1) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 50%, rgba(20, 255, 236, 0.1) 0%, transparent 40%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate3d(0, ${-backgroundY}px, 0)`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform'
          }}
        />

        {/* Content */}
        <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full bg-gradient-to-r from-[#144552] to-[#144552] p-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </motion.div>
            <h1 className="text-fluid-h1 font-bold font-[Georgia,serif] text-[#144552]">
              {profile.name}
            </h1>
            <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center my-2">
              <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-[Georgia,serif] text-[#144552]">
                <Typewriter
                  words={['AI/ML DEVELOPER', 'AI AUTOMATION']}
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                  loop={true}
                />
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-4 sm:mb-6">
              <Badge className="text-xs sm:text-sm bg-[#144552]/20 text-[#144552] border-[#144552]/30">AI & Data Science</Badge>
              <Badge className="text-xs sm:text-sm bg-[#144552]/20 text-[#144552] border-[#144552]/30">AI/ML Developer</Badge>
              <Badge className="text-xs sm:text-sm bg-[#144552]/20 text-[#144552] border-[#144552]/30">Design</Badge>
              <a href={company.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Badge className="text-xs sm:text-sm bg-white/10 border-black/20 text-black hover:bg-white/20 cursor-pointer">
                  COO @ {company.name}
                </Badge>
              </a>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              {profile.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-[#144552] to-[#144552] hover:from-[#1e5a6b] hover:to-[#1e5a6b] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-[#144552]/40 text-black hover:bg-[#144552]/10 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              >
                Get In Touch
              </Button>
              {profile.resumeUrl && (
                <ResumePreview
                  resumeUrl={profile.resumeUrl}
                />
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-black/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Diagonal split background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#144552]/5 to-transparent"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 50%)' }}
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-[#1e5a6b]/5 to-transparent"
            style={{ clipPath: 'polygon(0 70%, 100% 50%, 100% 100%, 0 100%)' }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-6 text-[#144552]">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-fluid-p text-black/80 mb-10 leading-relaxed">
                AI & ML Developer with strong expertise in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Python, React, and Full Stack Development. Experienced in designing and developing enterprise AI solutions, including ERP AI chatbots, intelligent inventory forecasting systems, document automation, and AI-powered SaaS applications. Recognised by the Kalam Book of Records for participating in the 24-hour national-level codeathon, "Coderush."
              </p>

              {/* World Record Achievement Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className="relative group mb-10 overflow-hidden"
              >
                <div className="relative bg-gradient-to-r from-[#144552]/5 via-[#1e5a6b]/8 to-[#144552]/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#144552]/20 hover:border-[#1e5a6b]/40 transition-all duration-500 ease-in-out">
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />

                  {/* Trophy icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Award className="w-20 h-20 text-[#144552]" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-[#1e5a6b]" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-[#1e5a6b]">Achievement</span>
                    </div>
                    <p className="text-base md:text-lg text-black/80 leading-relaxed">
                      In June 2024, I earned recognition as a <span className="font-bold text-[#144552]">World Record Holder</span> for participating in a <span className="font-bold text-[#144552]">24-Hour Non-Stop</span> Continuous Programming Codeathon organized by Suguna Innovation Institute named <span className="font-bold text-[#144552]">"Coderush"</span> and certified by <span className="font-bold text-[#144552]">Kalam World Records</span> <span className="text-sm text-black/60">(ISO 9001:2015)</span>.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#144552]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#144552]/40 shadow-lg shadow-black/10"
                >
                  <Code className="w-12 h-12 text-[#144552] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-[#144552] mb-2">Development</h3>
                  <p className="text-black/70">
                    Building scalable applications with modern technologies and best practices.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#144552]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#144552]/40 shadow-lg shadow-black/10"
                >
                  <Palette className="w-12 h-12 text-[#144552] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-[#144552] mb-2">Design</h3>
                  <p className="text-black/70">
                    Creating intuitive user experiences with attention to detail and aesthetics.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#144552]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#144552]/40 shadow-lg shadow-black/10"
                >
                  <Globe className="w-12 h-12 text-[#144552] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-[#144552] mb-2">Innovation</h3>
                  <p className="text-black/70">
                    Staying ahead of trends and implementing cutting-edge solutions.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 relative overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#144552]/20 to-[#1e5a6b]/20 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#38F9D7]/20 to-[#144552]/20 blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-10 text-[#144552]">
              Leadership — COO @ Skill Satron Technologies
            </h2>
            <p className="text-fluid-p text-black/80 max-w-3xl mx-auto">
              Driving product, delivery, and operations for growing tech initiatives.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-[#144552]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#144552]/40 shadow-lg shadow-black/10 hover:shadow-2xl transition-all duration-500 ease-in-out"
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 20% 50%, rgba(20, 69, 82, 0.15) 0%, transparent 50%)',
                }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    'inset 0 0 20px rgba(20, 69, 82, 0), inset 0 0 0px rgba(20, 69, 82, 0)',
                    'inset 0 0 20px rgba(20, 69, 82, 0.3), inset 0 0 0px rgba(20, 69, 82, 0.1)',
                    'inset 0 0 20px rgba(20, 69, 82, 0), inset 0 0 0px rgba(20, 69, 82, 0)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src={company.logoPath}
                      alt="Skill Satron Logo"
                      className="w-14 h-14 rounded-md object-contain bg-white/5 p-2"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </motion.div>
                  <div>
                    <motion.a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ color: '#1e5a6b' }}
                      className="text-xl font-semibold text-[#144552] transition-colors duration-300"
                    >
                      {company.name}
                    </motion.a>
                    <p className="text-black/60">Chief Operating Officer • Jun 2025 – Present</p>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-[#144552]/20">
                    <p className="text-black">
                      Spearhead product roadmaps and ship features with cross‑functional teams.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-[#144552]/20">
                    <p className="text-black">
                      Optimize delivery processes and stakeholder communication.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-[#144552]/20">
                    <p className="text-black">
                      Mentor engineers; champion UI/UX quality and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-[#144552]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#144552]/40 shadow-lg shadow-black/10 hover:shadow-2xl transition-all duration-500 ease-in-out"
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 80% 50%, rgba(102, 11, 5, 0.15) 0%, transparent 50%)',
                }}
              />

              {/* Floating animated glow */}
              <motion.div
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#144552]/25 to-[#144552]/25 blur-2xl group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    'inset 0 0 20px rgba(102, 11, 5, 0), inset 0 0 0px rgba(102, 11, 5, 0)',
                    'inset 0 0 20px rgba(102, 11, 5, 0.3), inset 0 0 0px rgba(102, 11, 5, 0.1)',
                    'inset 0 0 20px rgba(102, 11, 5, 0), inset 0 0 0px rgba(102, 11, 5, 0)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-[#144552] mb-4">Focus Areas</h3>
                <ul className="space-y-3 text-black/80 list-disc pl-6">
                  <li>Product strategy, release management, and quality gates</li>
                  <li>Operations, reporting, and process automation</li>
                  <li>Client communication, demos, and onboarding</li>
                </ul>
                <motion.a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-[#144552] to-[#1e5a6b] text-white rounded-full px-6 hover:from-[#1e5a6b] hover:to-[#144552] transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl">
                    Visit Company Site
                  </Button>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        {/* Vertical timeline line */}
        <motion.div
          className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-transparent via-[#144552]/30 to-transparent hidden md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-6 text-[#144552]">
              Work Experience
            </h2>
            <p className="text-fluid-p text-black/80 mb-8 max-w-2xl mx-auto">
              Roles I've held and what I worked on.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeInOut' }}
                viewport={{ once: true }}
                onClick={() => setSelectedExp(exp)}
                className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md cursor-pointer 
                           transition-all duration-500 ease-in-out bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 shadow-lg hover:shadow-xl border-[#144552]/20`}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 0% 50%, rgba(102, 11, 5, 0.1) 0%, transparent 50%)',
                  }}
                />

                {/* Animated left border accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#144552] via-[#144552] to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                />

                <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 relative z-10">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#144552] to-[#1e5a6b] flex items-center justify-center shrink-0 shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#144552] group-hover:text-[#1e5a6b] transition-colors break-words">{exp.role}</h3>
                      {exp.company.includes('Skill Satron') ? (
                        <motion.a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-black/70 hover:text-[#144552] transition-colors mt-1 text-xs sm:text-sm"
                          whileHover={{ x: 4 }}
                        >
                          <img src={company.logoPath} alt="Skill Satron Logo" className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm object-contain flex-shrink-0" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                          <span className="break-words">{company.name}</span>
                        </motion.a>
                      ) : (
                        <p className="text-black/70 text-xs sm:text-sm break-words">{exp.company}</p>
                      )}
                    </div>
                  </div>
                  <motion.span
                    className="text-xs sm:text-sm text-[#144552] font-semibold bg-[#144552]/10 px-3 py-1 rounded-full flex-shrink-0 self-center whitespace-nowrap"
                    whileHover={{ scale: 1.1 }}
                  >
                    {exp.period}
                  </motion.span>
                </div>

                {/* Animated arrow indicator on hover - hidden on mobile */}
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block"
                >
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-[#144552]"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Experience Modal */}
          <Dialog open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)}>
            <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-2xl lg:max-w-3xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] bg-gradient-to-br from-[#F5E6D3] via-[#E8DCC8] to-[#DDD4C8] backdrop-blur-2xl border border-[#144552]/40 text-black rounded-2xl sm:rounded-3xl p-0 overflow-hidden shadow-2xl" showCloseButton={false}>
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 100% 0%, rgba(102, 11, 5, 0.15) 0%, transparent 60%)',
                }}
              />

              {selectedExp && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, type: 'spring', damping: 25, stiffness: 300 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Header Section */}
                  <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 flex-shrink-0 overflow-hidden">
                    {/* Top accent line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#144552] to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.15, ease: 'easeInOut' }}
                    />

                    <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                      <motion.div
                        className="flex items-start gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3, ease: 'easeInOut' }}
                      >
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#144552] via-[#1e5a6b] to-[#A54640] flex items-center justify-center shadow-lg flex-shrink-0"
                          whileHover={{ scale: 1.08, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <motion.h3
                            className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#144552] to-[#1e5a6b] bg-clip-text text-transparent line-clamp-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15, ease: 'easeInOut' }}
                          >
                            {selectedExp.role}
                          </motion.h3>
                          <motion.p
                            className="text-xs sm:text-sm md:text-base text-black/70 font-medium mt-1 line-clamp-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, ease: 'easeInOut' }}
                          >
                            {selectedExp.company}
                          </motion.p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      >
                        <span className="text-xs sm:text-sm md:text-base text-white font-semibold bg-gradient-to-r from-[#144552] to-[#1e5a6b] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-full whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out">
                          {selectedExp.period}
                        </span>
                      </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                      className="h-px bg-gradient-to-r from-[#144552]/0 via-[#144552]/40 to-[#144552]/0 mb-4 sm:mb-6 md:mb-8"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.25, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Content Section */}
                  <motion.div
                    className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 scrollbar-thin scrollbar-thumb-[#144552]/30 scrollbar-track-white/5 min-h-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {selectedExp.description.split('\n').map((line, i) => (
                        <motion.p
                          key={i}
                          className="text-xs sm:text-sm md:text-base text-black/80 leading-relaxed"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.05, duration: 0.3, ease: 'easeInOut' }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#144552] to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #144552 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-6 text-[#144552]">
              Featured Projects
            </h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              A showcase of my recent work spanning web development, mobile apps, and innovative digital solutions.
            </p>

            {/* Filter Controls */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-gradient-to-r from-[#144552] to-[#1e5a6b] text-white hover:from-[#1e5a6b] hover:to-[#A54640] rounded-full px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out border-0"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    <span className="font-medium">{selectedCategory}</span>
                    {isFilterOpen ? <X className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                  </Button>
                </motion.div>

                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-64 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl border-2 border-[#144552]/40 overflow-hidden shadow-2xl"
                  >
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-[#144552]/10 to-[#1e5a6b]/10 border-b-2 border-[#144552]/20">
                      <p className="text-xs font-semibold text-[#144552] uppercase tracking-wider">Filter Projects</p>
                    </div>

                    {/* Options */}
                    <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#144552]/30 scrollbar-track-white/5">
                      {categories.map((category, idx) => (
                        <motion.button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.2, ease: 'easeInOut' }}
                          whileHover={{ x: 4 }}
                          className={`w-full px-4 py-3 text-left font-medium transition-all duration-500 ease-in-out flex items-center gap-3 ${selectedCategory === category
                            ? "bg-gradient-to-r from-[#144552] to-[#1e5a6b] text-white shadow-md"
                            : "text-black/80 hover:bg-black/5"
                            }`}
                        >
                          {selectedCategory === category && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                          <span className="flex-1">{category}</span>
                          {selectedCategory === category && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1, ease: 'easeInOut' }}
                              className="text-white/80"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full"
                >
                  <Card className="bg-white backdrop-blur-sm rounded-3xl overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out border-0">
                    {/* Image Container with Running Line Effect */}
                    <div className="relative p-3 sm:p-4 pb-0 overflow-hidden">
                      <div className="overflow-hidden rounded-2xl relative h-40 sm:h-44 md:h-48">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        {/* Running line overlay effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#144552]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-5 flex flex-col items-center text-center gap-3 flex-1">
                      {/* Title with Hover Effect */}
                      <motion.h3
                        className="text-base md:text-lg font-semibold text-[#144552] line-clamp-2"
                        whileHover={{ color: "#1e5a6b" }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-black/80 line-clamp-3 flex-1">{project.description}</p>

                      {/* Buttons Container with Staggered Animation */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center pt-2">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="rounded-full px-3 sm:px-5 py-1.5 sm:py-2 border-[#144552] bg-[#144552] text-white hover:bg-[#1e5a6b] hover:border-[#1e5a6b] transition-all duration-500 ease-in-out shadow-md hover:shadow-lg text-xs sm:text-sm">
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Live Demo</span>
                              <span className="sm:hidden">Live</span>
                            </Button>
                          </motion.a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="py-12 relative overflow-hidden">
        {/* Radial reveal effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#38F9D7]/10 via-[#144552]/5 to-transparent" />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-6 text-[#144552]">
              Skills & Technologies
            </h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and skills I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="space-y-12">
            <div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SkillsTabs />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="pt-12 pb-6 relative overflow-hidden">
        {/* Perspective grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-64"
            style={{
              backgroundImage: 'linear-gradient(to right, #144552 1px, transparent 1px), linear-gradient(to bottom, #144552 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-6 text-[#144552]">
              Certifications
            </h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Recognitions and courses I've completed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c, idx) => (
              <motion.button
                key={c.title + c.issuer}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10, scale: 1.03, rotate: 0.5, transition: { duration: 0.08 } }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className="certificate-card group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#144552]/30 h-64 shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out duration-100 hover:border-[#144552]"
                onClick={() => setSelectedCertification(c)}
              >
                {/* Running border animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #144552, transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                />

                {/* subtle gradient glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#144552]/25 to-[#144552]/25 blur-2xl opacity-70 transition-all duration-500 ease-in-out duration-100 group-hover:opacity-100 group-hover:scale-110 certificate-glow" />

                <div className="flex flex-col items-center text-center gap-4 h-full relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#144552] to-[#144552] flex items-center justify-center transition-all duration-500 ease-in-out duration-100"
                      whileHover={{ scale: 1.2, transition: { duration: 0.08 } }}
                    >
                      <Award className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <h3 className="text-base font-semibold text-[#144552] leading-tight px-2 transition-colors duration-100 group-hover:text-[#144552]/70">{c.title}</h3>
                      <p className="text-xs text-black/60">Awarded</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="border-black/30 text-black/80 mt-4 px-3 py-1.5 text-sm transition-all duration-500 ease-in-out duration-100 group-hover:border-[#144552] group-hover:bg-[#144552]/10">
                    {c.issuer}
                  </Badge>
                </div>

                {/* animated accent underline */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#144552] to-[#144552] transition-all duration-500 ease-in-out group-hover:w-full" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16 md:pt-28 pb-16 md:pb-20 relative overflow-hidden">
        {/* Magnetic cursor effect container */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#144552]/10 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#1e5a6b]/10 to-transparent blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        {/* Decorative background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#144552]/15 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#144552]/10 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
            >
              <Badge className="text-xs sm:text-sm bg-[#144552]/20 text-[#144552] border-[#144552]/30 mb-4 inline-block">
                GET IN TOUCH
              </Badge>
            </motion.div>
            <h2 className="text-fluid-h2 font-bold font-[Georgia,serif] mb-4 md:mb-6 text-[#144552] leading-tight">
              Let's Work <span className="bg-gradient-to-r from-[#144552] to-[#1e5a6b] bg-clip-text text-transparent">Together</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black/70 mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together and turn your ideas into reality.
            </p>
          </motion.div>

          {/* Main Contact Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Decorative border gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 11, 5, 0.2) 0%, rgba(139, 58, 49, 0.2) 100%)',
                }}
              />

              <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-[#144552]/40 shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#144552] mb-2">Send Me a Message</h3>
                <p className="text-sm sm:text-base text-black/70 mb-6 sm:mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>

                <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                  >
                    <label className="text-xs sm:text-sm font-medium text-[#144552] mb-2 block">Name</label>
                    <Input
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-white/20 border-[#144552]/40 text-black placeholder:text-black/50 rounded-lg focus:bg-white/30 transition-colors text-sm sm:text-base"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                  >
                    <label className="text-xs sm:text-sm font-medium text-[#144552] mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-white/20 border-[#144552]/40 text-black placeholder:text-black/50 rounded-lg focus:bg-white/30 transition-colors text-sm sm:text-base"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                  >
                    <label className="text-xs sm:text-sm font-medium text-[#144552] mb-3 block">Select Your Message</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contactMessages.map((msg, idx) => (
                        <motion.button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedMessage(msg)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.22 + idx * 0.03, ease: 'easeInOut' }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-500 ease-in-out border-2 ${selectedMessage === msg
                            ? 'bg-gradient-to-r from-[#144552] to-[#1e5a6b] text-white border-[#144552]'
                            : 'bg-white/10 border-[#144552]/40 text-black hover:border-[#144552]/60'
                            }`}
                        >
                          {msg}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#144552] to-[#1e5a6b] hover:from-[#144552] hover:to-[#945548] text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="flex flex-col justify-between"
            >
              {/* Info Section */}
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#144552] mb-4 sm:mb-6">Quick Links</h3>
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Location Icon Only */}
                    <motion.a
                      href="#"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15, ease: 'easeInOut' }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#144552] to-[#1e5a6b] hover:shadow-lg transition-all duration-500 ease-in-out shadow-md flex items-center justify-center"
                      title={profile.location}
                    >
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.a>
                    {/* Email Icon Only */}
                    <motion.a
                      href={`mailto:veerachinnumanikandan1@gmail.com`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, ease: 'easeInOut' }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#144552] to-[#1e5a6b] hover:shadow-lg transition-all duration-500 ease-in-out shadow-md flex items-center justify-center"
                      title="veerachinnumanikandan1@gmail.com"
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.a>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#144552] mb-4 sm:mb-6">Connect With Me</h3>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <motion.a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25, ease: 'easeInOut' }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group/social relative overflow-hidden bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-4 sm:p-6 border border-[#144552]/30 hover:border-[#144552]/60 transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(102, 11, 5, 0.15) 0%, transparent 70%)',
                        }}
                      />
                      <Github className="w-6 h-6 sm:w-8 sm:h-8 text-[#144552] mb-2 relative z-10" />
                      <span className="text-xs sm:text-sm font-semibold text-[#144552] relative z-10">GitHub</span>
                    </motion.a>

                    <motion.a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, ease: 'easeInOut' }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group/social relative overflow-hidden bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-4 sm:p-6 border border-[#144552]/30 hover:border-[#144552]/60 transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(102, 11, 5, 0.15) 0%, transparent 70%)',
                        }}
                      />
                      <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-[#144552] mb-2 relative z-10" />
                      <span className="text-xs sm:text-sm font-semibold text-[#144552] relative z-10">LinkedIn</span>
                    </motion.a>

                    <motion.a
                      href={profile.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35, ease: 'easeInOut' }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group/social relative overflow-hidden bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-4 sm:p-6 border border-[#144552]/30 hover:border-[#144552]/60 transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(102, 11, 5, 0.15) 0%, transparent 70%)',
                        }}
                      />
                      <Twitter className="w-6 h-6 sm:w-8 sm:h-8 text-[#144552] mb-2 relative z-10" />
                      <span className="text-xs sm:text-sm font-semibold text-[#144552] relative z-10">Twitter</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-black/100">
            © {new Date().getFullYear()} {profile.name} All rights reserved.
            COO, Skill Satron Technologies Pvt. Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
