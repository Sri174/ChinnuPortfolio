import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CertificateModalProps {
  certification: { title: string; issuer: string };
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certification, isOpen, onClose }) => {
  if (!certification) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-lg sm:max-w-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl">{certification.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Issuer: </span>
            {certification.issuer}
          </p>
          {/* You can add an image of the certificate here if you have it */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
