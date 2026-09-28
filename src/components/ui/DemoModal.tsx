"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface DemoModalProps {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function DemoModal({ url, title, open, onClose }: DemoModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-void/85 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-5xl h-[80vh] clip-corners overflow-hidden bg-void-2 border border-neon-pink/40 shadow-[0_0_60px_-10px_rgba(255,45,120,0.5)]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-neon-violet/25 bg-void-2">
            <span className="hud-label text-neon-cyan truncate">{title}</span>
            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 clip-corners-sm hover:bg-neon-cyan/10 text-neon-muted hover:text-neon-cyan transition-colors"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 clip-corners-sm hover:bg-neon-pink/10 text-neon-muted hover:text-neon-pink transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <iframe
            src={url}
            className="w-full h-[calc(100%-48px)] bg-white"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
