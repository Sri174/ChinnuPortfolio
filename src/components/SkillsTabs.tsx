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
  Terminal,
  Users,
  MessageCircle,
  Lightbulb,
  Award
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

const technicalSkillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    color: "#1e5a6b",
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
    color: "#1e5a6b",
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
      { name: "MySQL", level: 85 },
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
      { name: "Google Generative AI", level: 85 },
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
      { name: "Antigravity", level: 85 },
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
];

const softSkillCategories: SkillCategory[] = [
  {
    name: "Communication",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "#1e5a6b",
    skills: [
      { name: "Presentation Skills", level: 85 },
      { name: "Written Communication", level: 88 },
      { name: "Active Listening", level: 90 },
    ],
  },
  {
    name: "Leadership & Teamwork",
    icon: <Users className="w-5 h-5" />,
    color: "#1e5a6b",
    skills: [
      { name: "Team Leadership", level: 85 },
      { name: "Collaboration", level: 90 },
      { name: "Mentoring", level: 80 },
    ],
  },
  {
    name: "Problem Solving",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "#1e5a6b",
    skills: [
      { name: "Critical Thinking", level: 88 },
      { name: "Analytical Skills", level: 87 },
      { name: "Creative Problem Solving", level: 85 },
      { name: "Decision Making", level: 86 },
    ],
  },
  {
    name: "Professional Qualities",
    icon: <Award className="w-5 h-5" />,
    color: "#1e5a6b",
    skills: [
      { name: "Adaptability", level: 90 },
      { name: "Time Management", level: 88 },
      { name: "Self-Motivation", level: 90 },
      { name: "Public Speaking & Mentoring", level: 92 }
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
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 pt-4 pb-10">

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={() => setActiveTab('technical')}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
            activeTab === 'technical'
              ? 'bg-[#1e5a6b] text-white shadow-lg'
              : 'bg-white/10 text-black border border-white/20 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Technical Skills
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('soft')}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
            activeTab === 'soft'
              ? 'bg-[#1e5a6b] text-white shadow-lg'
              : 'bg-white/10 text-black border border-white/20 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Soft Skills
        </motion.button>
      </div>

      {/* Skills Grid */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={activeTab === 'soft' ? "flex flex-wrap justify-center gap-3" : "flex flex-col gap-6"}
          >
            {(() => {
              if (activeTab === 'soft') {
                // Flatten all soft skills into a single array for button display
                const allSoftSkills: { skill: string; category: string; color: string }[] = [];
                softSkillCategories.forEach(category => {
                  category.skills.forEach(skill => {
                    allSoftSkills.push({
                      skill: skill.name,
                      category: category.name,
                      color: category.color,
                    });
                  });
                });

                return allSoftSkills.map((item, idx) => (
                  <motion.div 
                    key={`${item.category}-${item.skill}`}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: 0,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: idx * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <button className="px-4 py-2 rounded-full bg-white/10 border-2 border-[#1e5a6b] text-black/90 text-sm font-medium hover:bg-white/15 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                      {item.skill}
                    </button>
                  </motion.div>
                ));
              } else {
                // Technical skills - reorganized layout
                // First 9 cards (1-7 + 8-9 Deployment & OS)
                const firstNineCards = technicalSkillCategories.slice(0, 9);
                
                // Cards 10-11 for bottom row
                const card10 = technicalSkillCategories[9]; // Tools & Platforms
                const card11 = technicalSkillCategories[10]; // AI Tools

                return (
                  <>
                    {/* First 9 cards grid - continuous layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                      {firstNineCards.map((category, idx) => (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: idx * 0.03 }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.08 } }}
                          whileTap={{ scale: 1.02 }}
                          className="skill-card relative bg-white backdrop-blur-sm rounded-2xl p-5 md:p-6 transition-all duration-100 min-h-[220px] shadow-lg hover:shadow-2xl overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                              backgroundSize: '200% 100%',
                            }}
                            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                            whileTap={{ opacity: 0.8 }}
                          />
                          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ borderColor: `${category.color}40` }} />
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <motion.div
                              className="p-2 rounded-lg transition-all duration-100"
                              style={{ backgroundColor: `${category.color}20` }}
                              whileHover={{ backgroundColor: `${category.color}35`, scale: 1.1 }}
                              whileTap={{ backgroundColor: `${category.color}25`, scale: 1.05 }}
                            >
                              {React.isValidElement(category.icon)
                                ? React.cloneElement(category.icon as React.ReactElement<any>, { className: 'w-5 h-5', color: category.color })
                                : null}
                            </motion.div>
                            <h3 className="text-base md:text-lg font-semibold text-[#1e5a6b] leading-snug break-words whitespace-normal" title={category.name}>{category.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2.5 relative z-10">
                            {category.skills.map((skill) => (
                              <span key={skill.name} className="px-2.5 py-1 text-[11px] sm:text-xs rounded-full bg-white border-2 border-[#1e5a6b] text-black break-words whitespace-normal leading-tight font-medium">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Cards 10 & 11 in a row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                      {card10 && (
                        <motion.div
                          key={card10.name}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: 0.3 }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.08 } }}
                          whileTap={{ scale: 1.02 }}
                          className="skill-card relative bg-white backdrop-blur-sm rounded-2xl p-5 md:p-6 transition-all duration-100 min-h-[220px] shadow-lg hover:shadow-2xl overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${card10.color}, transparent)`,
                              backgroundSize: '200% 100%',
                            }}
                            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                            whileTap={{ opacity: 0.8 }}
                          />
                          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ borderColor: `${card10.color}40` }} />
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <motion.div
                              className="p-2 rounded-lg transition-all duration-100"
                              style={{ backgroundColor: `${card10.color}20` }}
                              whileHover={{ backgroundColor: `${card10.color}35`, scale: 1.1 }}
                              whileTap={{ backgroundColor: `${card10.color}25`, scale: 1.05 }}
                            >
                              {React.isValidElement(card10.icon)
                                ? React.cloneElement(card10.icon as React.ReactElement<any>, { className: 'w-5 h-5', color: card10.color })
                                : null}
                            </motion.div>
                            <h3 className="text-base md:text-lg font-semibold text-[#1e5a6b] leading-snug break-words whitespace-normal" title={card10.name}>{card10.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2.5 relative z-10">
                            {card10.skills.map((skill) => (
                              <span key={skill.name} className="px-2.5 py-1 text-[11px] sm:text-xs rounded-full bg-white border-2 border-[#1e5a6b] text-black break-words whitespace-normal leading-tight font-medium">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {card11 && (
                        <motion.div
                          key={card11.name}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: 0.35 }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.08 } }}
                          whileTap={{ scale: 1.02 }}
                          className="skill-card relative bg-white backdrop-blur-sm rounded-2xl p-5 md:p-6 transition-all duration-100 min-h-[220px] shadow-lg hover:shadow-2xl overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${card11.color}, transparent)`,
                              backgroundSize: '200% 100%',
                            }}
                            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                            whileTap={{ opacity: 0.8 }}
                          />
                          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ borderColor: `${card11.color}40` }} />
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <motion.div
                              className="p-2 rounded-lg transition-all duration-100"
                              style={{ backgroundColor: `${card11.color}20` }}
                              whileHover={{ backgroundColor: `${card11.color}35`, scale: 1.1 }}
                              whileTap={{ backgroundColor: `${card11.color}25`, scale: 1.05 }}
                            >
                              {React.isValidElement(card11.icon)
                                ? React.cloneElement(card11.icon as React.ReactElement<any>, { className: 'w-5 h-5', color: card11.color })
                                : null}
                            </motion.div>
                            <h3 className="text-base md:text-lg font-semibold text-[#1e5a6b] leading-snug break-words whitespace-normal" title={card11.name}>{card11.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2.5 relative z-10">
                            {card11.skills.map((skill) => (
                              <span key={skill.name} className="px-2.5 py-1 text-[11px] sm:text-xs rounded-full bg-white border-2 border-[#1e5a6b] text-black break-words whitespace-normal leading-tight font-medium">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                );
              }
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
