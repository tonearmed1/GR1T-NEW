"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SpecsSectionsG1X from "@/app/G1X/components/specs";

interface SpecsModalProps {
  onClose: () => void;
}

const SpecsModal: React.FC<SpecsModalProps> = ({ onClose }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-lg shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-4 sm:p-6">
          <SpecsSectionsG1X />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SpecsModal;
