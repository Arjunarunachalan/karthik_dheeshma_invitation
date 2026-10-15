"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { invitationData as defaultData } from "../../data/invitation";

export default function PhotoGallery({ data = defaultData }) {
  const gallery = data.gallery;
  const items = gallery.items;

  const [activePhoto, setActivePhoto] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (!activePhoto) return;
      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        const nextIdx = (activePhoto.index + 1) % items.length;
        setActivePhoto({ item: items[nextIdx], index: nextIdx });
      } else if (e.key === "ArrowLeft") {
        const prevIdx = (activePhoto.index - 1 + items.length) % items.length;
        setActivePhoto({ item: items[prevIdx], index: prevIdx });
      }
    },
    [activePhoto, items],
  );

  useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto, handleKeyDown]);

  return (
    <section
      id="gallery"
      className="relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center"
      aria-label="Pinterest-Style Couple Photo Gallery"
    >
      <div className="card-gold-sheen editorial-hover-card relative mx-auto rounded-[6px] bg-[#F7F1E8] p-6 sm:p-8 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/30"
          aria-hidden="true"
        />

        {/* Cinematic Soft Gold Aura */}
        <div className="cinematic-glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Section Heading */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            aria-hidden="true"
          >
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
            <span className="text-[0.6rem] text-[#C5A66A]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
          </div>

          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
            {gallery.heading}
          </h2>

          <p className="script-float font-script text-[1.85rem] sm:text-[2.15rem] text-[#C5A66A] mt-0.5">
            {gallery.subheading}
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery Layout */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5">
          {items.map((item, index) => {
            const isWide = item.orientation === "landscape";
            const isArch = item.frame === "arch";
            const isOval = item.frame === "oval";

            return (
              <button
                key={item.id}
                onClick={() => setActivePhoto({ item, index })}
                className={`group relative overflow-hidden rounded-[5px] border border-[#C5A66A]/35 bg-[#FFFDF9] p-1.5 shadow-[0_4px_12px_rgba(51,42,39,0.06)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(51,42,39,0.14)] hover:scale-[1.02] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A66A] ${
                  isWide ? "col-span-2 aspect-[16/10]" : "col-span-1 aspect-[3/4]"
                }`}
                aria-label={`View photo: ${item.title}`}
              >
                <div
                  className={`relative w-full h-full overflow-hidden bg-[#EDE5D8] ${
                    isArch
                      ? "rounded-t-[60px] rounded-b-[3px]"
                      : isOval
                        ? "rounded-[40px]"
                        : "rounded-[3px]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 430px) 50vw, 200px"
                  />

                  {/* Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#332A27]/75 via-[#332A27]/30 to-transparent p-2 text-center opacity-90 transition-opacity group-hover:opacity-100">
                    <p className="font-serif text-[0.66rem] font-medium text-[#FFFDF9] truncate">
                      {item.title}
                    </p>
                    <p className="font-sans text-[0.52rem] text-[#DFC896] tracking-wider truncate">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="relative z-10 mt-5 font-serif text-[0.68rem] italic text-[#7B866D]">
          Tap any photograph to view in full resolution
        </p>
      </div>

      {/* Lightbox Modal with Keyboard & Touch Support */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo Lightbox: ${activePhoto.item.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0b0a]/92 backdrop-blur-md p-4 transition-opacity duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-[380px] w-full rounded-[6px] bg-[#F7F1E8] p-4 text-[#332A27] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#C5A66A]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3.5 -right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#332A27] text-[#FFFDF9] shadow-md border border-[#C5A66A]/50 transition hover:bg-[#C5A66A] cursor-pointer"
              aria-label="Close photo preview"
            >
              ✕
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[4px] border border-[#C5A66A]/30 bg-[#EDE5D8]">
              <Image
                src={activePhoto.item.src}
                alt={activePhoto.item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 430px) 100vw, 380px"
              />
            </div>

            {/* Lightbox Caption & Nav Controls */}
            <div className="mt-3.5 flex items-center justify-between text-left">
              <div>
                <h4 className="font-serif text-[0.95rem] font-medium text-[#332A27]">
                  {activePhoto.item.title}
                </h4>
                <p className="font-sans text-[0.68rem] text-[#7B866D]">
                  {activePhoto.item.caption}
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const prevIdx =
                      (activePhoto.index - 1 + items.length) % items.length;
                    setActivePhoto({ item: items[prevIdx], index: prevIdx });
                  }}
                  className="rounded-full border border-[#C5A66A]/40 bg-[#FFFDF9] p-1.5 text-xs text-[#332A27] transition hover:bg-[#C5A66A] hover:text-[#FFFDF9] cursor-pointer"
                  aria-label="Previous photo"
                >
                  ◀
                </button>
                <button
                  onClick={() => {
                    const nextIdx = (activePhoto.index + 1) % items.length;
                    setActivePhoto({ item: items[nextIdx], index: nextIdx });
                  }}
                  className="rounded-full border border-[#C5A66A]/40 bg-[#FFFDF9] p-1.5 text-xs text-[#332A27] transition hover:bg-[#C5A66A] hover:text-[#FFFDF9] cursor-pointer"
                  aria-label="Next photo"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
