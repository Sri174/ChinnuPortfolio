import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  ChevronDown,
  ChevronRight,
  Zap,
} from "lucide-react";

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: <Code className="w-4 h-4" />,
    skills: ["Python", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    name: "Web Development",
    icon: <Globe className="w-4 h-4" />,
    skills: ["React.js", "MERN Stack"],
  },
  {
    name: "Backend & Frameworks",
    icon: <Server className="w-4 h-4" />,
    skills: ["Node.js", "Express.js", "Django", "Streamlit"],
  },
  {
    name: "Databases",
    icon: <Database className="w-4 h-4" />,
    skills: ["SQLite", "MongoDB", "Firebase Firestore"],
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud className="w-4 h-4" />,
    skills: [
      "Oracle Cloud (OCI)",
      "Google Cloud – Vertex AI Prompt Design",
      "IPFS (Inter-Planetary File System)",
    ],
  },
  {
    name: "Blockchain & Web3",
    icon: <Brain className="w-4 h-4" />,
    skills: ["Solidity", "Hardhat", "Ethereum"],
  },
  {
    name: "AI & Data",
    icon: <Zap className="w-4 h-4" />,
    skills: [
      "Machine Learning & Generative AI",
      "OpenCV and Gen-AI APIs",
      "Data Analysis – Pandas, NumPy",
    ],
  },
  {
    name: "Tools & Platforms",
    icon: <Wrench className="w-4 h-4" />,
    skills: [
      "Tableau",
      "Git",
      "GitHub",
      "Google Colab",
      "MetaMask",
      "XlsxWriter",
      "OpenPyXL",
      "Figma",
      "Canva",
      "Microsoft Office",
      "VS Code",
      "OpenCV",
      "Stable Diffusion",
      "Gen-AI APIs",
      "NumPy",
      "Pandas",
    ],
  },
  {
    name: "AI Tools",
    icon: <Brain className="w-4 h-4" />,
    skills: [
      "Midjourney",
      "Kling AI",
      "Veo3",
      "Jasper",
      "Claude",
      "Perplexity",
      "Gemini",
      "OpenAI",
      "Notion AI",
      "Cursor AI",
    ],
  },
  {
    name: "Deployment Platforms",
    icon: <Rocket className="w-4 h-4" />,
    skills: ["Vercel", "Netlify", "Render", "Railway"],
  },
  {
    name: "Most Common OS/Platforms",
    icon: <Monitor className="w-4 h-4" />,
    skills: ["Windows", "Ubuntu(Basic)", "Linux(Basic)"],
  },
];

export default function SkillsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const clickRef = useRef<Record<string, boolean>>({});

  const toggleSubMenu = (categoryName: string, fromClick: boolean = false) => {
    if (fromClick) {
      clickRef.current[categoryName] = true;
      setOpenSubMenus((prev) => ({
        ...prev,
        [categoryName]: !prev[categoryName],
      }));
      setTimeout(() => {
        clickRef.current[categoryName] = false;
      }, 200);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="border-[#38F9D7]/40 text-white hover:bg-[#38F9D7]/10 px-8 py-6 rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-[#38F9D7]/20 transition-all duration-300"
          >
            <Zap className="w-5 h-5 mr-2" />
            Browse All Skills by Category
            <ChevronDown
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-80 bg-gradient-to-br from-black/95 via-[#0F2027]/95 to-black/95 backdrop-blur-md border border-[#38F9D7]/30 shadow-2xl rounded-2xl p-3 max-h-[600px] overflow-y-auto"
        sideOffset={10}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(56, 249, 215, 0.3) transparent',
        }}
      >
        <div className="space-y-1">
          {skillCategories.map((category, index) => (
            <div key={category.name}>
              <DropdownMenuSub
                open={openSubMenus[category.name] || false}
                onOpenChange={(open) => {
                  // Only update if this was triggered by a click
                  if (clickRef.current[category.name]) {
                    setOpenSubMenus((prev) => ({
                      ...prev,
                      [category.name]: open,
                    }));
                  }
                }}
              >
                <DropdownMenuSubTrigger
                  className="text-white hover:bg-gradient-to-r hover:from-[#38F9D7]/20 hover:to-[#43E97B]/20 hover:text-[#38F9D7] data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#38F9D7]/20 data-[state=open]:to-[#43E97B]/20 data-[state=open]:text-[#38F9D7] rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 focus:bg-[#38F9D7]/20 focus:text-[#38F9D7] group w-full [&>svg]:hidden"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleSubMenu(category.name, true);
                  }}
                >
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: hoveredCategory === category.name ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-[#38F9D7] group-hover:text-[#43E97B]"
                      >
                        {category.icon}
                      </motion.div>
                      <span className="font-semibold text-sm">{category.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        openSubMenus[category.name] ? "rotate-90 text-[#38F9D7]" : "text-white/60"
                      }`}
                    />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  className="bg-gradient-to-br from-black/98 via-[#0F2027]/98 to-black/98 backdrop-blur-md border border-[#38F9D7]/40 shadow-2xl rounded-xl p-3 min-w-[300px] max-w-[350px]"
                  sideOffset={8}
                  alignOffset={-5}
                >
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.03, duration: 0.2 }}
                      >
                        <div className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#38F9D7]/25 hover:to-[#43E97B]/25 text-white/90 hover:text-white transition-all duration-200 cursor-default border border-transparent hover:border-[#38F9D7]/40 hover:shadow-lg hover:shadow-[#38F9D7]/20 group/item">
                          <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200 inline-block">
                            {skill}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {index < skillCategories.length - 1 && (
                <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-white/10 to-transparent my-1.5 h-px" />
              )}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
