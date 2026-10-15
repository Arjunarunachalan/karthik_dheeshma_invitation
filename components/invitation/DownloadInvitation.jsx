"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { fireGoldenCelebration } from "../../animations/confetti";
import { invitationData as defaultData } from "../../data/invitation";

export default function DownloadInvitation({ data = defaultData }) {
  const download = data.invitationDownload;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleDownloadClick = () => {
    fireGoldenCelebration();
  };

  const handleShare = async () => {
    fireGoldenCelebration();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        const shareData = {
          title: download.shareTitle,
          text: download.shareText,
          url: window.location.href,
        };

        // If device supports file sharing, attach the wedding preview photo
        try {
          const res = await fetch("/og-image.jpg");
          const blob = await res.blob();
          const file = new File([blob], "karthik-dheeshma-wedding.jpg", {
            type: "image/jpeg",
          });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        } catch {
          // Fall back gracefully to URL + text share
        }

        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const text = encodeURIComponent(
      `${download.shareText}\n\nView online invitation: ${window.location.href}`,
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 3000);
      });
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (isModalOpen && e.key === "Escape") {
        setIsModalOpen(false);
      }
    },
    [isModalOpen],
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  return (
    <section
      id="download"
      className="relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center"
      aria-label="Traditional Malayalam Wedding Invitation Card"
    >
      <div className="card-gold-sheen editorial-hover-card relative mx-auto rounded-[6px] bg-[#F7F1E8] p-6 sm:p-8 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Double Hairline Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/30"
          aria-hidden="true"
        />

        {/* Cinematic Soft Gold Aura */}
        <div className="cinematic-glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Section Heading */}
        <div className="relative z-10 flex flex-col items-center mb-5">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            aria-hidden="true"
          >
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
            <span className="text-[0.6rem] text-[#C5A66A]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
          </div>

          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
            {download.heading}
          </h2>

          <p className="script-float font-script text-[1.8rem] sm:text-[2.1rem] text-[#C5A66A] mt-0.5">
            {download.subheading}
          </p>
        </div>

        {/* Real Invitation Card Interactive Preview */}
        <div className="relative z-10 mx-auto my-3 max-w-[310px]">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              fireGoldenCelebration();
            }}
            className="group relative block w-full overflow-hidden rounded-[6px] border border-[#C5A66A]/50 bg-[#EFE9DD] p-1.5 shadow-[0_8px_25px_rgba(51,42,39,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_35px_rgba(197,166,106,0.35)] focus:outline-none focus:ring-2 focus:ring-[#C5A66A]"
            aria-label="Click to view full traditional wedding invitation card"
          >
            {/* Card Thumbnail Image */}
            <div className="relative aspect-[1496/1732] w-full overflow-hidden rounded-[4px]">
              <Image
                src={download.previewImage || "/invitation/karthik-dheeshma-wedding-card.jpg"}
                alt="Original Traditional Wedding Invitation Card of Karthik & Dheeshma"
                fill
                sizes="(max-width: 430px) 100vw, 310px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Hover / Tap to View Fullscreen Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/75 via-transparent to-transparent flex flex-col justify-end p-3 text-center opacity-90 transition-opacity group-hover:opacity-100">
                <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1A1613]/85 px-3 py-1 font-serif text-[0.62rem] uppercase tracking-[0.2em] text-[#DFC896] backdrop-blur-sm border border-[#C5A66A]/40 mx-auto shadow-sm">
                  <span>🔍</span>
                  <span>Tap to Expand Card</span>
                </span>
              </div>
            </div>
          </button>

          <p className="font-serif text-[0.64rem] text-[#7B866D] mt-2 italic">
            Official Malayalam Postcard Invitation
          </p>
        </div>

        {/* Action Buttons: Download PDF, Save Image & Share */}
        <div className="relative z-10 mt-6 flex flex-col gap-2.5 max-w-[290px] mx-auto">
          {/* Primary Action: Download Original PDF */}
          <a
            href={download.downloadUrl}
            download={download.fileName}
            onClick={handleDownloadClick}
            className="group flex items-center justify-center gap-2 rounded-[5px] border border-[#C5A66A] bg-gradient-to-r from-[#C5A66A] to-[#8F6F33] px-4 py-2.5 font-serif text-[0.72rem] uppercase tracking-[0.22em] text-[#FFFDF9] shadow-[0_4px_14px_rgba(197,166,106,0.35)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">📥</span>
            <span className="font-medium">Download Card (PDF)</span>
          </a>

          {/* Secondary Action: Save Image (JPG) */}
          <a
            href={download.imageDownloadUrl || download.previewImage}
            download="Karthik-Dheeshma-Wedding-Invitation-Card.jpg"
            onClick={handleDownloadClick}
            className="flex items-center justify-center gap-2 rounded-[5px] border border-[#C5A66A]/45 bg-[#FFFDF9] px-4 py-2 font-serif text-[0.68rem] uppercase tracking-[0.18em] text-[#332A27] shadow-sm transition hover:border-[#C5A66A] hover:bg-[#F2ECE1] active:scale-[0.98]"
          >
            <span>🖼️</span>
            <span>Save Card Image (JPG)</span>
          </a>

          {/* Share Action */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-[5px] border border-[#7B866D]/40 bg-transparent px-4 py-2 font-serif text-[0.68rem] uppercase tracking-[0.18em] text-[#7B866D] transition hover:bg-[#A8B5A0]/15 active:scale-[0.98]"
          >
            <span>💌</span>
            <span>Share with Family &amp; Friends</span>
          </button>

          {copyFeedback && (
            <p className="font-sans text-[0.65rem] text-[#7B866D] transition-opacity animate-fade-in">
              ✓ Link copied to clipboard &amp; WhatsApp opened!
            </p>
          )}
        </div>
      </div>

      {/* Fullscreen Modal Lightbox to view the real card */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 select-none"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full Wedding Invitation Card"
        >
          <div
            className="relative max-h-[92vh] max-w-[430px] w-full overflow-y-auto rounded-[8px] bg-[#F7F1E8] p-3 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#C5A66A]/30 mb-2">
              <span className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-[#7B866D]">
                Official Malayalam Wedding Invitation
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full w-7 h-7 flex items-center justify-center bg-[#332A27] text-[#FFFDF9] text-xs hover:bg-[#8F6F33] transition"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Complete Invitation Card in Modal */}
            <div className="relative w-full aspect-[1496/1732] rounded-[4px] overflow-hidden border border-[#C5A66A]/40 shadow-inner">
              <Image
                src={download.previewImage || "/invitation/karthik-dheeshma-wedding-card.jpg"}
                alt="Full Wedding Invitation Card of Karthik & Dheeshma"
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-3 flex gap-2">
              <a
                href={download.downloadUrl}
                download={download.fileName}
                onClick={handleDownloadClick}
                className="flex-1 rounded-[4px] bg-[#C5A66A] py-2 font-serif text-[0.68rem] uppercase tracking-[0.16em] text-[#FFFDF9] hover:bg-[#8F6F33] transition"
              >
                📥 Download PDF
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-[4px] border border-[#332A27]/40 px-3 py-2 font-serif text-[0.68rem] uppercase tracking-[0.16em] text-[#332A27]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
