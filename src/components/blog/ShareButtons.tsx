"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Check } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hud-label text-neon-muted mr-1">Share</span>

      <motion.button
        onClick={copyLink}
        className="p-2 clip-corners-sm bg-card/70 border border-neon-violet/25 text-neon-muted hover:text-neon-pink hover:border-neon-pink/50 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-neon-lime" /> : <Link className="w-4 h-4" />}
      </motion.button>

      <motion.a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 clip-corners-sm bg-card/70 border border-neon-violet/25 text-neon-muted hover:text-neon-pink hover:border-neon-pink/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on Twitter"
      >
        <FaTwitter className="w-4 h-4" />
      </motion.a>

      <motion.a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 clip-corners-sm bg-card/70 border border-neon-violet/25 text-neon-muted hover:text-neon-pink hover:border-neon-pink/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="w-4 h-4" />
      </motion.a>
    </div>
  );
}
