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
    skills: ["FastAPI", "Node.js", "Express.js", "Django", "Streamlit", "Uvicorn"],
  },
  {
    name: "Databases",
    icon: <Database className="w-4 h-4" />,
    skills: [
      "MySQL",
      "SQLAlchemy",
      "Vector Databases",
      "SQLite",
      "MongoDB",
      "Firebase Firestore",
      "ETL Pipelines",
    ],
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
    name: "AI & Machine Learning",
    icon: <Zap className="w-4 h-4" />,
    skills: [
      "Large Language Models (LLMs)",
      "RAG (Retrieval-Augmented Generation)",
      "Ollama",
      "Google Gemini API",
      "Text-to-SQL",
      "XGBoost",
      "Scikit-Learn (Clustering)",
      "Time Series Forecasting (Statsmodels)",
      "Stable Diffusion",
      "OpenCV",
      "Pandas",
      "NumPy",
      "Generative AI APIs",
      "Vertex AI",
      "Data analysis",
      "Data visualisation",
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
      "Jupiter Notebook",
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
    name: "Deployment platforms",
    icon: <Rocket className="w-4 h-4" />,
    skills: ["Vercel", "Netlify", "Render", "Railway"],
  },
  {
    name: "Most common OS/platform exposure",
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
            className="border-[#1e5a6b]/40 text-black hover:bg-[#1e5a6b]/10 px-8 py-6 rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-[#1e5a6b]/20 transition-all duration-300"
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
        className="w-80 bg-gradient-to-br from-black/95 via-[#0F2027]/95 to-black/95 backdrop-blur-md border border-[#1e5a6b]/30 shadow-2xl rounded-2xl p-3 max-h-[600px] overflow-y-auto"
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
                  className="text-black hover:bg-gradient-to-r hover:from-[#144552]/20 hover:to-[#1e5a6b]/20 hover:text-[#144552] data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#144552]/20 data-[state=open]:to-[#1e5a6b]/20 data-[state=open]:text-[#144552] rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 focus:bg-[#144552]/20 focus:text-[#144552] group w-full [&>svg]:hidden"
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
                        className="text-[#144552] group-hover:text-[#1e5a6b]"
                      >
                        {category.icon}
                      </motion.div>
                      <span className="font-semibold text-sm">{category.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        openSubMenus[category.name] ? "rotate-90 text-[#1e5a6b]" : "text-black/60"
                      }`}
                    />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  className="bg-gradient-to-br from-black/98 via-[#0F2027]/98 to-black/98 backdrop-blur-md border border-[#1e5a6b]/40 shadow-2xl rounded-xl p-3 min-w-[300px] max-w-[350px]"
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
                        <div className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#144552]/25 hover:to-[#1e5a6b]/25 text-black/90 hover:text-black transition-all duration-200 cursor-default border border-transparent hover:border-[#144552]/40 hover:shadow-lg hover:shadow-[#144552]/20 group/item">
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
