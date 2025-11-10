import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
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
  Download
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
  title: "AI & Data Science Student • COO & Fullstack Developer",
  email: "veerachinnumanikandan1@gmail.com",
  phone: "+91 9159573303",
  location: "India",
  githubUrl: "https://github.com/Sri174",
  linkedinUrl: "https://www.linkedin.com/in/veerachinnu-manikandan-19a75826b/",
  twitterUrl: "https://twitter.com/",
  resumeUrl: "/Chinnu Resume.pdf",
  imageUrl: "/profile.jpg"
};

const company = {
  name: "Skill Satron Technologies Pvt. Ltd.",
  url: "https://www.skillsatrontecnologies.com",
  logoPath: "/skillsatron.png" // Place the provided logo image under public/ with this name
};

const projects: Project[] = [
  {
    id: "p1",
    title: "Decentralized File Storage",
    description:
      "Blockchain-based decentralized file storage ensuring transparency and reliability for secure data access.",
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=500&fit=crop",
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
    id: "p5",
    title: "Payroll Desktop App",
    description:
      "Payroll application built with Python (Tkinter) featuring employee management and report generation.",
    image:
      "/payroll.png",
    technologies: ["Python", "Tkinter"],
    category: "Software",
    githubUrl: "https://github.com/thekabi-4/alliswell_payroll",
    liveUrl: "https://lmsreportgenerator.streamlit.app/",
    featured: false
  },
  {
    id: "p6",
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
    githubUrl: "https://github.com/Sri174/LMS_Report_Generator" ,
    liveUrl: "https://lmsreportgenerator.streamlit.app/",
    featured: false,
  },
];

const skills: Skill[] = [
  { name: "Python", level: 85, category: "Backend", icon: <Code className="w-5 h-5" /> },
  { name: "React", level: 80, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "UI/UX Design", level: 85, category: "Design", icon: <Palette className="w-5 h-5" /> },
  { name: "Problem Solving", level: 85, category: "Core", icon: <Globe className="w-5 h-5" /> },
  { name: "Communication", level: 90, category: "Core", icon: <Globe className="w-5 h-5" /> },
  { name: "Frontend", level: 80, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "Debugging", level: 85, category: "Core", icon: <Database className="w-5 h-5" /> },
  { name: "Tableau", level: 90, category: "Data", icon: <Database className="w-5 h-5" /> },
  { name: "MS Office", level: 93, category: "Productivity", icon: <Globe className="w-5 h-5" /> },
  { name: "Management", level: 82, category: "Leadership", icon: <Globe className="w-5 h-5" /> },
];

const experiences: Experience[] = [
  {
    role: "Chief Operating Officer",
    company: "Skill Satron Technologies Pvt. Ltd.",
    period: "Jun 2025 – Present",
    description:
      "Co‑Founder leading operations and UI development; launched AI‑based products and drove delivery."
  },
  {
    role: "Technical Mentor",
    company: "Chronosphere, Burhanpur (Madhya Pradesh)",
    period: "Jul 2025 – Present",
    description:
      "Completed a 6‑month Technical Internship as Full-Stack Developer; optimized and supported LMS systems manager; also served as a Full‑Stack Development role intern contributing to frontend and backend web features."
  },
];

const certifications: Certification[] = [
  { title: "Generative AI", issuer: "Microsoft" },
  { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle" },
  { title: "Data Analyst (RSDCA)", issuer: "RSDCA" },
  { title: "Prompt Design in Vertex AI (Badge)", issuer: "Google Cloud" },
  { title: "Journey to Cloud: Envisioning Your Solution", issuer: "IBM SkillBuild" },
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
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

// Minimal ResumePreview component to avoid "Cannot find name 'ResumePreview'"
const ResumePreview = ({ page1, page2, resumeUrl }: { page1: string; page2: string; resumeUrl: string }) => (
  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
    <Button variant="outline" className="border-[#38F9D7]/40 text-white hover:bg-[#38F9D7]/10 px-8 py-3 rounded-full">
      <Download className="w-4 h-4 mr-2" />
      Download Resume
    </Button>
  </a>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

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
    const handleScroll = () => {
      const sections = ["hero", "about", "leadership", "experience", "projects", "resume", "skills", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
      return { success: false, error: error.message || 'Failed to send message' };
    }
  };

const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const result = await sendContact({
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
    });

    if (result.success) {
      toast.success("Message sent! I'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
    } else {
      toast.error(
        result.error || "Failed to send message. Please try again."
      );
    }
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Failed to send message. Please try again."
    );
  }
};

  return (
 <div
      className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#12343f] to-[#1b3a45] relative overflow-hidden"
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
              "linear-gradient(45deg, #2C5364, #0F2027, #43E97B)",
              "linear-gradient(135deg, #12343f, #2C5364, #14FFEC)",
              "linear-gradient(225deg, #0F2027, #1b3a45, #38F9D7)",
              "linear-gradient(315deg, #2C5364, #0F2027, #43E97B)",
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
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-4">
            <motion.div
              className="relative rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-2 shadow-[0_2px_16px_0_rgba(34,197,235,0.10)] h-12"
              style={{ minWidth: 'fit-content', justifySelf: 'start' }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(56,249,215,0.25)]">
                Veerachinnu Manikandan
              </span>
            </motion.div>
            <div className="hidden md:flex items-center justify-self-center">
              <div className="relative rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="pointer-events-none absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(120px 40px at 50% 120%, rgba(56,249,215,0.25), transparent 60%)"
                }} />
                <div className="relative flex items-center gap-2">
                  {["hero", "about", "projects", "skills", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                        activeSection === section
                          ? "bg-white/20 text-white font-semibold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {section === "hero" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 justify-self-end">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[90vh] flex items-center justify-center relative pt-16">
        <div className="max-w-screen-xl mx-auto px-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#14FFEC] to-[#43E97B] p-1"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="w-52 h-52 rounded-full object-cover object-top"
                />
              </div>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold font-[Georgia,serif] bg-gradient-to-r from-[#14FFEC] via-[#38F9D7] to-[#43E97B] bg-clip-text text-transparent">
              {profile.name}
            </h1>
            <div className="h-16 flex items-center justify-center my-2">
              <span className="text-1xl md:text-2xl font-[Georgia,serif] bg-gradient-to-r from-[#14FFEC] via-[#38F9D7] to-[#43E97B] bg-clip-text text-transparent">
                <Typewriter 
                  words={['FULL STACK DEVELOPER', 'AI ENTHUSIAST']} 
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                  loop={true}
                />
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <Badge className="bg-[#14FFEC]/20 text-[#14FFEC] border-[#14FFEC]/30">AI & Data Science</Badge>
              <Badge className="bg-[#43E97B]/20 text-[#43E97B] border-[#43E97B]/30">Full‑Stack</Badge>
              <Badge className="bg-[#38F9D7]/20 text-[#38F9D7] border-[#38F9D7]/30">Design</Badge>
              <a href={company.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Badge className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                  COO @ {company.name}
                </Badge>
              </a>
            </div>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              {profile.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-[#14FFEC] to-[#43E97B] hover:from-[#10e8d7] hover:to-[#35d66a] text-black px-8 py-3 rounded-full"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-[#38F9D7]/40 text-white hover:bg-[#38F9D7]/10 px-8 py-3 rounded-full"
              >
                Get In Touch
              </Button>
              {profile.resumeUrl && (
                <ResumePreview 
                  page1="/resume/page1.jpg" 
                  page2="/resume/page2.jpg" 
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
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Motivated AI & Data Science student with leadership experience as
                Co‑Founder & COO at a startup and Technical Mentor. Passionate about
                building usable products, debugging, and collaborating to ship quality
                software. Eager to apply AI and full‑stack skills to real‑world projects.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Code className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Development</h3>
                  <p className="text-white/70">
                    Building scalable applications with modern technologies and best practices.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Palette className="w-12 h-12 text-sky-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
                  <p className="text-white/70">
                    Creating intuitive user experiences with attention to detail and aesthetics.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Globe className="w-12 h-12 text-indigo-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-white/70">
                    Staying ahead of trends and implementing cutting-edge solutions.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              Leadership — COO @ Skill Satron Technologies
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Driving product, delivery, and operations for growing tech initiatives.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-4">
                <img
                  src={company.logoPath}
                  alt="Skill Satron Logo"
                  className="w-14 h-14 rounded-md object-contain bg-white/5 p-2"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <a href={company.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-[#14FFEC]">
                    {company.name}
                  </a>
                  <p className="text-white/60">Chief Operating Officer • Jun 2025 – Present</p>
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/70">
                    Spearhead product roadmaps and ship features with cross‑functional teams.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/70">
                    Optimize delivery processes and stakeholder communication.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/70">
                    Mentor engineers; champion UI/UX quality and accessibility.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#14FFEC]/25 to-[#43E97B]/25 blur-2xl" />
              <h3 className="text-2xl font-semibold text-white mb-4">Focus Areas</h3>
              <ul className="space-y-3 text-white/80 list-disc pl-6">
                <li>Product strategy, release management, and quality gates</li>
                <li>Operations, reporting, and process automation</li>
                <li>Client communication, demos, and onboarding</li>
              </ul>
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-6"
              >
                <Button className="bg-gradient-to-r from-[#14FFEC] to-[#43E97B] text-black rounded-full px-6">
                  Visit Company Site
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Roles I've held and what I worked on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#14FFEC] to-[#43E97B] flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      {exp.company.includes("Skill Satron") ? (
                        <a href={company.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 hover:text-white">
                          {/* logo shown if present in /public */}
                          <img src={company.logoPath} alt="Skill Satron Logo" className="w-5 h-5 rounded-sm object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                          <span>{company.name}</span>
                        </a>
                      ) : (
                        <p className="text-white/70">{exp.company}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-white/60">{exp.period}</span>
                </div>
                <p className="text-white/80 mt-4">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              A showcase of my recent work spanning web development, mobile apps, and innovative digital solutions.
            </p>
            
            {/* Filter Controls */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-6"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedCategory}
                  {isFilterOpen ? <X className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-56 bg-black/80 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
                  >
                    <div className="max-h-64 overflow-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                            selectedCategory === category ? "bg-white/20 text-[#14FFEC]" : "text-white"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-3xl overflow-hidden h-full flex flex-col">
                  <div className="p-4 pb-0">
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <h3 className="text-base md:text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-3 justify-center pt-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button variant="outline" className="rounded-full px-5 border-white/30 text-white hover:bg-white/10">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button variant="outline" className="rounded-full px-5 border-white/30 text-white hover:bg-white/10">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Skills Section */}
      <section id="skills" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and skills I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className="text-cyan-400 mr-3">{skill.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>{skill.category}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-[#14FFEC] to-[#43E97B] h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="pt-12 pb-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent">
              Certifications
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Recognitions and courses I've completed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c, idx) => (
              <motion.button
                key={c.title + c.issuer}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6, rotate: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_0_1px_rgba(34,197,235,0.25)]"
                onClick={() => setSelectedCertification(c)}
              >
                {/* subtle gradient glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#14FFEC]/25 to-[#43E97B]/25 blur-2xl" />

                <div className="flex flex-col items-center text-center gap-3 h-full">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#14FFEC] to-[#43E97B] flex items-center justify-center">
                      <Award className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="text-xs text-white/60">Awarded</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="border-white/30 text-white/80 mt-auto">
                    {c.issuer}
                  </Badge>
                </div>

                {/* animated accent underline */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] transition-all duration-500 group-hover:w-full" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-20 md:pt-28 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-8xl font-bold font-[Georgia,serif] mb-6 bg-gradient-to-r from-[#14FFEC] to-[#43E97B] bg-clip-text text-transparent leading-tight">
              Let's Work Together
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto px-2">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#14FFEC] to-[#43E97B] hover:from-[#10e8d7] hover:to-[#35d66a] text-black py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-semibold font-[Georgia,serif] text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-semibold font-[Georgia,serif] text-white mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/100">
            © {new Date().getFullYear()} {profile.name}. 
          </p>
        </div>
      </footer>
    </div>
  );
}
