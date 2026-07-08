import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Typewriter from '@/components/Typewriter';
import { ChevronDown } from 'lucide-react';
import ResumePreview from './ResumePreview';
import { useInteractiveEffects } from '@/hooks/useInteractiveEffects';
import '../styles/hero-animations.css';

interface HeroSectionProps {
  profile: {
    name: string;
    title: string;
    imageUrl: string;
    resumeUrl?: string;
  };
  company: {
    name: string;
    url: string;
  };
  onViewWork: () => void;
  onContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  company,
  onViewWork,
  onContact,
}) => {
  useInteractiveEffects();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden interactive-element">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1e5a6b]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#1e5a6b]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-[#1e5a6b]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          {/* Profile Image */}
          <motion.div
            className="profile-image-container interactive-element"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              src={profile.imageUrl}
              alt="Profile"
              className="profile-image interactive-element"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.name}
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            className="h-16 flex items-center justify-center my-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typewriter
              words={['AI/ML DEVELOPER', 'AI AUTOMATION']}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
              loop={true}
            />
          </motion.div>

          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge className="skill-badge bg-[#1e5a6b]/20 text-[#1e5a6b] border-[#1e5a6b]/30 interactive-element">
              AI & Data Science
            </Badge>
            <Badge className="skill-badge bg-[#144552]/20 text-[#144552] border-[#144552]/30 interactive-element">
              AI/ML Developing
            </Badge>
            <Badge className="skill-badge bg-[#144552]/20 text-[#144552] border-[#144552]/30 interactive-element">
              API
            </Badge>
            <motion.a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex interactive-element"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Badge className="skill-badge bg-white/10 border-black/20 text-black hover:bg-white/20 interactive-element">
                COO @ {company.name}
              </Badge>
            </motion.a>
          </motion.div>

          {/* Title */}
          <motion.p
            className="text-lg md:text-xl text-black/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.title}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="interactive-element">
              <Button
                onClick={onViewWork}
                className="hero-button primary px-8 py-6 text-lg interactive-element"
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="interactive-element">
              <Button
                onClick={onContact}
                variant="outline"
                className="hero-button outline px-8 py-6 text-lg interactive-element"
              >
                Get In Touch
              </Button>
            </motion.div>

            {profile.resumeUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="interactive-element">
                <ResumePreview
                  resumeUrl={profile.resumeUrl}
                  className="w-full interactive-element"
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator interactive-element"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-8 h-8 text-black/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
