"use client";

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import Envelope from "./Envelope";
import GoldEmblem from "./GoldEmblem";
import IntroParticles from "./IntroParticles";
import {
  createEntranceTimeline,
  createHintPulse,
  createIntroTimeline,
  createParticleMotion,
  createSealBreathing,
  prefersReducedMotion,
  setIntroEntranceState,
  setIntroOpenedState,
  transitionCardToHero,
} from "../../animations/introAnimations";
import { fireGoldenCelebration } from "../../animations/confetti";
import { invitationData } from "../../data/invitation";
import "./opening.css";

const subscribeToReducedMotion = (callback) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

export default function OpeningExperience({
  onOpeningComplete,
  onTransitionComplete,
  data = invitationData,
}) {
  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const emblemRef = useRef(null);
  const envelopeRef = useRef(null);
  const backRef = useRef(null);
  const pocketRef = useRef(null);
  const flapRef = useRef(null);
  const innerRef = useRef(null);
  const cardRef = useRef(null);
  const sealRef = useRef(null);
  const fragmentARef = useRef(null);
  const fragmentBRef = useRef(null);
  const fragmentCRef = useRef(null);
  const fragmentDRef = useRef(null);
  const hintRef = useRef(null);
  const arrowRef = useRef(null);
  const initialARef = useRef(null);
  const ampersandRef = useRef(null);
  const initialRRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const inviteTextRef = useRef(null);
  const detailsRef = useRef(null);
  const particlesRef = useRef([]);
  const lockedRef = useRef(false);
  const loopsRef = useRef([]);
  const openTlRef = useRef(null);
  const delayedTransitionRef = useRef(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isExited, setIsExited] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const collectElements = useCallback(
    () => ({
      root: rootRef.current,
      emblem: emblemRef.current,
      envelope: envelopeRef.current,
      back: backRef.current,
      pocket: pocketRef.current,
      flap: flapRef.current,
      inner: innerRef.current,
      card: cardRef.current,
      seal: sealRef.current,
      fragments: [
        fragmentARef.current,
        fragmentBRef.current,
        fragmentCRef.current,
        fragmentDRef.current,
      ].filter(Boolean),
      hint: hintRef.current,
      arrow: arrowRef.current,
      initialA: initialARef.current,
      ampersand: ampersandRef.current,
      initialR: initialRRef.current,
      subtitle: subtitleRef.current,
      divider: dividerRef.current,
      inviteText: inviteTextRef.current,
      details: detailsRef.current,
    }),
    [],
  );

  useLayoutEffect(() => {
    const isReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const elements = collectElements();

      if (isReduced) {
        setIntroEntranceState(elements);
        gsap.set(elements.envelope, { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 });
        gsap.set(elements.seal, { opacity: 1, scale: 1, rotate: 0, y: 0 });
        gsap.set(elements.hint, { opacity: 1, y: 0 });
        return;
      }

      setIntroEntranceState(elements);
      const entrance = createEntranceTimeline(elements);
      const particles = createParticleMotion(particlesRef.current);

      entrance.eventCallback("onComplete", () => {
        loopsRef.current = [
          createSealBreathing(elements.seal),
          createHintPulse(hintRef.current, arrowRef.current),
        ].filter(Boolean);
      });

      loopsRef.current = [entrance, particles].filter(Boolean);
    }, rootRef);

    return () => {
      delayedTransitionRef.current?.kill?.();
      delayedTransitionRef.current = null;
      loopsRef.current.forEach((tween) => tween?.kill?.());
      loopsRef.current = [];
      openTlRef.current?.kill?.();
      openTlRef.current = null;
      ctx.revert();
    };
  }, [collectElements]);

  const handleOpen = useCallback(() => {
    if (lockedRef.current || isOpening || isOpened) return;
    lockedRef.current = true;
    setIsOpening(true);
    fireGoldenCelebration();

    loopsRef.current.forEach((tween) => tween?.kill?.());
    loopsRef.current = [];

    const elements = collectElements();

    if (prefersReducedMotion()) {
      setIntroOpenedState(elements);
      setIsOpening(false);
      setIsOpened(true);
      onOpeningComplete?.();

      delayedTransitionRef.current = gsap.delayedCall(0.5, () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.35,
          onComplete: () => {
            setIsExited(true);
            onTransitionComplete?.();
          },
        });
      });
      return;
    }

    openTlRef.current = createIntroTimeline(elements, {
      onComplete: () => {
        setIsOpening(false);
        setIsOpened(true);
        onOpeningComplete?.();

        // 3: The invitation card transitions naturally into the hero
        delayedTransitionRef.current = gsap.delayedCall(0.85, () => {
          transitionCardToHero(
            {
              root: rootRef.current,
              envelope: envelopeRef.current,
              card: cardRef.current,
            },
            {
              onComplete: () => {
                setIsExited(true);
                onTransitionComplete?.();
              },
            },
          );
        });
      },
    });
  }, [collectElements, isOpened, isOpening, onOpeningComplete, onTransitionComplete]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    },
    [handleOpen],
  );

  if (isExited) return null;

  return (
    <section
      ref={rootRef}
      className="opening-scene fixed inset-0 z-50 flex h-[100svh] w-full max-w-[430px] mx-auto flex-col items-center justify-center overflow-hidden bg-[#0d0b0a] select-none"
    >
      <div
        ref={sceneRef}
        className="relative flex h-[100svh] w-full flex-col items-center justify-center px-4 py-4 overflow-hidden"
      >
        {/* Subtle background gold dust particles */}
        <IntroParticles particlesRef={particlesRef} reducedMotion={reducedMotion} />

        {/* Step 2: Subtle Gold Emblem Reveal */}
        <GoldEmblem
          emblemRef={emblemRef}
          leftInitial={data?.couple?.leftInitial || "K"}
          rightInitial={data?.couple?.rightInitial || "D"}
        />

        {/* Envelope Stage with Touch / Keyboard trigger */}
        <button
          type="button"
          className={`relative flex w-full max-w-[370px] flex-col items-center border-0 bg-transparent p-0 text-inherit transition-all duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#a88955]/60 rounded-lg ${
            isOpened ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
          }`}
          aria-label={isOpened ? "Wedding Invitation" : "Open wedding invitation"}
          aria-busy={isOpening}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          disabled={isOpening || isOpened}
          tabIndex={isOpened ? -1 : 0}
        >
          <Envelope
            envelopeRef={envelopeRef}
            backRef={backRef}
            pocketRef={pocketRef}
            flapRef={flapRef}
            innerRef={innerRef}
            cardRef={cardRef}
            sealRef={sealRef}
            fragmentARef={fragmentARef}
            fragmentBRef={fragmentBRef}
            fragmentCRef={fragmentCRef}
            fragmentDRef={fragmentDRef}
            initialARef={initialARef}
            ampersandRef={ampersandRef}
            initialRRef={initialRRef}
            subtitleRef={subtitleRef}
            dividerRef={dividerRef}
            inviteTextRef={inviteTextRef}
            detailsRef={detailsRef}
            invitation={data.opening}
            isOpening={isOpening}
          />

          {/* Step 5: "TAP TO OPEN" and subtle animated arrow */}
          <div
            ref={hintRef}
            className={`mt-7 flex flex-col items-center gap-1 font-serif text-[0.66rem] uppercase tracking-[0.38em] text-[#c5a869] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-opacity duration-300 ${
              isOpened ? "opacity-0 pointer-events-none" : ""
            }`}
            aria-hidden="true"
          >
            <span ref={arrowRef} className="opening-hint-arrow text-[0.8rem] leading-none mb-0.5">
              ↑
            </span>
            <span>TAP TO OPEN</span>
          </div>
        </button>
      </div>
    </section>
  );
}
