import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Code,
  Globe,
  Server,
  Database,
  Cloud,
  Brain,
  Wrench,
  Rocket,
  Monitor,
  Zap,
  Cpu,
  GitBranch,
  Terminal
} from "lucide-react";

interface SkillCategory {
  name: string;
  icon: React.ReactElement;
  skills: { name: string; level: number }[];
  color: string;
}

// Map skill names to Simple Icons slugs for logo rendering
const skillLogoSlug: Record<string, string> = {
  Python: 'python', JavaScript: 'javascript', TypeScript: 'typescript', HTML: 'html5', CSS: 'css3',
  'React.js': 'react', 'MERN Stack': 'mongodb',
  'Node.js': 'nodedotjs', 'Express.js': 'express', Django: 'djangoproject', Streamlit: 'streamlit',
  SQLite: 'sqlite', MongoDB: 'mongodb', 'Firebase Firestore': 'firebase',
  'Oracle Cloud (OCI)': 'oracle', 'Google Cloud – Vertex AI Prompt Design': 'googlecloud', 'IPFS (Inter-Planetary File System)': 'ipfs',
  Solidity: 'solidity', Hardhat: 'ethereum', Ethereum: 'ethereum',
  'Machine Learning & Generative AI': 'tensorflow', 'OpenCV and Gen-AI APIs': 'opencv', 'Data Analysis – Pandas, NumPy': 'numpy',
  Tableau: 'tableau', Git: 'git', GitHub: 'github', 'Google Colab': 'googlecolab', MetaMask: 'metamask', XlsxWriter: 'microsoftxlsx', OpenPyXL: 'microsoftxlsx', Figma: 'figma', Canva: 'canva', 'Microsoft Office': 'microsoftoffice', 'VS Code': 'visualstudiocode', OpenCV: 'opencv', 'Stable Diffusion': 'stabilityai', 'Gen-AI APIs': 'openai', NumPy: 'numpy', Pandas: 'pandas',
  Midjourney: 'midjourney', 'Kling AI': 'klingai', Veo3: 'google', Jasper: 'jasper', Claude: 'anthropic', Perplexity: 'perplexity', Gemini: 'google', OpenAI: 'openai', 'Notion AI': 'notion', 'Cursor AI': 'cursor',
  Vercel: 'vercel', Netlify: 'netlify', Render: 'render', Railway: 'railway',
  Windows: 'windows', 'Ubuntu (Basic)': 'ubuntu', 'Linux (Basic)': 'linux',
};

const logoUrlFor = (name: string, colorHex = '38F9D7') => {
  const slug = skillLogoSlug[name];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/${colorHex.replace('#','')}`;
};

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    color: "#38F9D7",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 90 },
    ],
  },
  {
    name: "Web Development",
    icon: <Globe className="w-5 h-5" />,
    color: "#43E97B",
    skills: [
      { name: "React.js", level: 85 },
      { name: "MERN Stack", level: 80 },
    ],
  },
  {
    name: "Backend & Frameworks",
    icon: <Server className="w-5 h-5" />,
    color: "#FF6B6B",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Django", level: 75 },
      { name: "Streamlit", level: 70 },
    ],
  },
  {
    name: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "#FFD166",
    skills: [
      { name: "SQLite", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "Firebase Firestore", level: 75 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5" />,
    color: "#7C3AED",
    skills: [
      { name: "Oracle Cloud (OCI)", level: 70 },
      { name: "Google Cloud – Vertex AI Prompt Design", level: 70 },
      { name: "IPFS (Inter-Planetary File System)", level: 65 },
    ],
  },
  {
    name: "Blockchain & Web3",
    icon: <Brain className="w-5 h-5" />,
    color: "#0EA5E9",
    skills: [
      { name: "Solidity", level: 70 },
      { name: "Hardhat", level: 65 },
      { name: "Ethereum", level: 70 },
    ],
  },
  {
    name: "AI & Data",
    icon: <Zap className="w-5 h-5" />,
    color: "#EC4899",
    skills: [
      { name: "Machine Learning & Generative AI", level: 75 },
      { name: "OpenCV and Gen-AI APIs", level: 75 },
      { name: "Data Analysis – Pandas, NumPy", level: 80 },
    ],
  },
  {
    name: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5" />,
    color: "#22D3EE",
    skills: [
      { name: "Tableau", level: 70 },
      { name: "Git", level: 80 },
      { name: "GitHub", level: 80 },
      { name: "Google Colab", level: 75 },
      { name: "MetaMask", level: 70 },
      { name: "XlsxWriter", level: 70 },
      { name: "OpenPyXL", level: 70 },
      { name: "Figma", level: 70 },
      { name: "Canva", level: 75 },
      { name: "Microsoft Office", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "OpenCV", level: 80 },
      { name: "Stable Diffusion", level: 70 },
      { name: "Gen-AI APIs", level: 75 },
      { name: "NumPy", level: 80 },
      { name: "Pandas", level: 80 },
    ],
  },
  {
    name: "AI Tools",
    icon: <Brain className="w-5 h-5" />,
    color: "#34D399",
    skills: [
      { name: "Midjourney", level: 70 },
      { name: "Kling AI", level: 70 },
      { name: "Veo3", level: 65 },
      { name: "Jasper", level: 70 },
      { name: "Claude", level: 80 },
      { name: "Perplexity", level: 80 },
      { name: "Gemini", level: 80 },
      { name: "OpenAI", level: 80 },
      { name: "Notion AI", level: 75 },
      { name: "Cursor AI", level: 85 },
    ],
  },
  {
    name: "Deployment Platforms",
    icon: <Rocket className="w-5 h-5" />,
    color: "#F59E0B",
    skills: [
      { name: "Vercel", level: 80 },
      { name: "Netlify", level: 75 },
      { name: "Render", level: 70 },
      { name: "Railway", level: 70 },
    ],
  },
  {
    name: "Most Common OS/Platforms",
    icon: <Monitor className="w-5 h-5" />,
    color: "#60A5FA",
    skills: [
      { name: "Windows", level: 90 },
      { name: "Ubuntu (Basic)", level: 60 },
      { name: "Linux (Basic)", level: 60 },
    ],
  },
];

const SkillBar = ({ level, color }: { level: number; color: string }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${level}%` }}
      transition={{ duration: 1, delay: 0.3 }}
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
    />
  </div>
);

export default function SkillsTabs() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 pt-4 pb-10">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#38F9D7] to-[#43E97B]">
          Technical Skills
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          A collection of technologies and tools I work with
        </p>
      </div>

      <div className="mt-6">
        {/* Category Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
          >
            {(() => {
              const ordered = [...skillCategories];
              const iTools = ordered.findIndex(c => c.name === 'Tools & Platforms');
              const iDeploy = ordered.findIndex(c => c.name === 'Deployment Platforms');
              if (iTools !== -1 && iDeploy !== -1) {
                const tmp = ordered[iTools];
                ordered[iTools] = ordered[iDeploy];
                ordered[iDeploy] = tmp;
              }
              return ordered.slice(0, 10).map((category, idx) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className={`skill-card bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-5 md:p-6 hover:border-white/30 transition-all duration-300 min-h-[220px] ${category.name === 'Tools & Platforms' ? 'xl:col-span-2 2xl:col-span-3' : ''}`}
                >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                    {React.isValidElement(category.icon)
                      ? React.cloneElement(category.icon as React.ReactElement<any>, { className: 'w-5 h-5', color: category.color })
                      : null}
                  </div>
                  <h3 className={`${category.name === 'Tools & Platforms' ? 'text-lg md:text-xl' : 'text-base md:text-lg'} font-semibold text-white leading-snug break-words whitespace-normal`} title={category.name}>{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className={`${category.name === 'Tools & Platforms' ? 'px-3 py-1.5 text-xs sm:text-sm' : 'px-2.5 py-1 text-[11px] sm:text-xs'} rounded-full bg-white/5 border border-white/10 text-white/80 break-words whitespace-normal leading-tight`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
              ));
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
