import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumePreviewProps {
  resumeUrl: string;
  page1?: string;
  page2?: string;
  className?: string;
}

export default function ResumePreview({ resumeUrl, page1, page2, className = '' }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className={`border-[#144552]/40 text-black hover:bg-[#144552]/10 px-8 py-3 rounded-full interactive-element ${className}`}
              onTouchStart={(e) => e.currentTarget.classList.add('touch-active')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touch-active')}
              onTouchCancel={(e) => e.currentTarget.classList.remove('touch-active')}
            >  
              <Download className="w-4 h-4 mr-2" />
              View Resume
            </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-0.5rem)] sm:w-[calc(100vw-1rem)] md:w-[calc(100vw-2rem)] h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] md:h-[92vh] max-w-6xl bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-2xl border border-[#144552]/20 rounded-lg sm:rounded-xl md:rounded-2xl p-0 overflow-hidden shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4, type: 'spring', damping: 20, stiffness: 300 }}
          className="w-full h-full flex flex-col"
        >
          {/* Header - Close button only */}
          <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-gradient-to-r from-[#144552]/5 via-transparent to-[#144552]/5 border-b border-[#144552]/10 flex items-center justify-end flex-shrink-0">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#144552]/60 hover:text-[#144552] transition-colors hover:bg-[#144552]/10 p-1 sm:p-1.5 rounded-md interactive-element flex-shrink-0"
              onTouchStart={(e) => e.currentTarget.classList.add('touch-active')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touch-active')}
              onTouchCancel={(e) => e.currentTarget.classList.remove('touch-active')}
            >
              <X className="w-4 h-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
            </button>
          </div>

          {/* Resume Content - PDF Viewer */}
          <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 relative min-h-0">
            <style>{`
              iframe {
                scrollbar-width: none !important;
              }
              iframe::-webkit-scrollbar {
                display: none !important;
              }
            `}</style>
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Resume PDF"
              className="w-full h-full"
              style={{ border: 'none', overflow: 'hidden' }}
              allow="fullscreen"
            />
          </div>

          {/* Footer - Minimal spacing */}
          <div className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#144552]/5 via-transparent to-[#144552]/5 border-t border-[#144552]/10 flex-shrink-0">
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
