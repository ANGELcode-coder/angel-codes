"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Cpu, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  gallery,
  accomplishments,
  type GalleryItem,
} from "@/lib/data.community";
import { cn } from "@/lib/utils";

const CATEGORY_ICON = {
  community: Users,
  professional: Award,
  engineering: Cpu,
} as const;

/** Photo card. Clicking opens a native lightbox with keyboard support. */
function PhotoCard({
  item,
  index,
  isInView,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  isInView: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.figure
      className={cn(
        "group relative overflow-hidden clip-corners-sm border border-neon-violet/20 hover:border-neon-pink/50 transition-all duration-300 cursor-zoom-in bg-void-3/60",
        item.span === "wide" ? "sm:col-span-2" : ""
      )}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -3 }}
      onClick={() => onOpen(index)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Caption reveal */}
      <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-void via-void/85 to-transparent">
        <p className="hud-label text-neon-cyan mb-1">{item.year}</p>
        <p className="font-heading font-semibold text-sm text-neon-text">
          {item.caption}
        </p>
      </figcaption>

      <span
        aria-hidden="true"
        className="absolute top-3 right-3 w-2 h-2 rotate-45 bg-neon-pink opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.figure>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  if (!item) return null;

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }}
      tabIndex={-1}
    >
      <div
        className="absolute inset-0 bg-void/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative max-w-4xl w-full clip-corners border border-neon-pink/40 bg-void-2 overflow-hidden"
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className="w-full max-h-[70vh] object-contain"
        />

        <div className="p-5 border-t border-neon-violet/20">
          <h3 className="font-heading font-bold uppercase tracking-wide text-neon-text mb-1.5">
            {item.caption}
          </h3>
          <p className="text-sm text-muted-foreground">{item.context}</p>
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous photo"
            className="w-8 h-8 clip-corners-sm bg-void/80 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-void transition-colors cursor-pointer"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            onClick={onNext}
            aria-label="Next photo"
            className="w-8 h-8 clip-corners-sm bg-void/80 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-void transition-colors cursor-pointer"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 clip-corners-sm bg-void/80 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink hover:text-void transition-colors cursor-pointer"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Accomplishments() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = lightbox === null ? null : gallery[lightbox];

  const openPrev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const openNext = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <SectionWrapper id="accomplishments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Beyond the Code"
          subtitle="Community work, events, and what I've accomplished outside the editor"
        />

        {/* Accomplishments */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {accomplishments.map((item, i) => {
            const Icon = CATEGORY_ICON[item.category];
            return (
              <motion.article
                key={item.id}
                className="group relative p-6 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm hover:border-neon-cyan/50 hover:shadow-[0_0_28px_-6px_rgba(0,245,255,0.45)] transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan to-transparent opacity-40 group-hover:opacity-100 transition-opacity"
                />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 clip-corners-sm bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-neon-cyan" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    {item.metric && (
                      <span className="hud-label text-neon-lime mb-1.5 inline-block">
                        {item.metric}
                      </span>
                    )}
                    <h3 className="text-base font-heading font-bold uppercase tracking-wide text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <MapPin className="w-4 h-4 text-neon-pink" aria-hidden="true" />
            <h3 className="hud-label text-neon-muted">
              In the field — Yaoundé, Cameroon
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
            {gallery.map((item, i) => (
              <PhotoCard
                key={item.src}
                item={item}
                index={i}
                isInView={isInView}
                onOpen={setLightbox}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        item={current}
        onClose={() => setLightbox(null)}
        onPrev={openPrev}
        onNext={openNext}
      />
    </SectionWrapper>
  );
}