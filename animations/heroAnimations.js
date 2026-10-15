import gsap from "gsap";

const CINEMA_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setHeroInitialState(elements) {
  const {
    imageWrapper,
    image,
    darkOverlay,
    introLine,
    firstName,
    ampersand,
    secondName,
    divider,
    weddingDate,
    scrollIndicator,
  } = elements;

  if (imageWrapper) {
    gsap.set(imageWrapper, {
      opacity: 0,
      scale: 0.96,
      clipPath: "inset(4% 4% 4% 4% round 4px)",
    });
  }

  if (image) {
    gsap.set(image, {
      scale: 1.1,
    });
  }

  if (darkOverlay) {
    gsap.set(darkOverlay, {
      opacity: 0.2,
    });
  }

  if (introLine) {
    gsap.set(introLine, {
      opacity: 0,
      y: 12,
      letterSpacing: "0.38em",
    });
  }

  if (firstName) {
    gsap.set(firstName, {
      opacity: 0,
      y: 18,
    });
  }

  if (ampersand) {
    gsap.set(ampersand, {
      opacity: 0,
      scale: 0.75,
      y: 0,
    });
  }

  if (secondName) {
    gsap.set(secondName, {
      opacity: 0,
      y: 18,
    });
  }

  if (divider) {
    gsap.set(divider, {
      opacity: 0,
      scaleX: 0,
    });
  }

  if (weddingDate) {
    gsap.set(weddingDate, {
      opacity: 0,
      y: 12,
      letterSpacing: "0.36em",
    });
  }

  if (scrollIndicator) {
    gsap.set(scrollIndicator, {
      opacity: 0,
      y: 10,
    });
  }
}

export function setHeroSettledState(elements) {
  const {
    imageWrapper,
    image,
    darkOverlay,
    introLine,
    firstName,
    ampersand,
    secondName,
    divider,
    weddingDate,
    scrollIndicator,
  } = elements;

  if (imageWrapper) {
    gsap.set(imageWrapper, {
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 0px)",
    });
  }

  if (image) {
    gsap.set(image, { scale: 1 });
  }

  if (darkOverlay) {
    gsap.set(darkOverlay, { opacity: 0.5 });
  }

  if (introLine) {
    gsap.set(introLine, { opacity: 1, y: 0, letterSpacing: "0.28em" });
  }

  if (firstName) {
    gsap.set(firstName, { opacity: 1, y: 0 });
  }

  if (ampersand) {
    gsap.set(ampersand, { opacity: 1, scale: 1, y: 0 });
  }

  if (secondName) {
    gsap.set(secondName, { opacity: 1, y: 0 });
  }

  if (divider) {
    gsap.set(divider, { opacity: 1, scaleX: 1 });
  }

  if (weddingDate) {
    gsap.set(weddingDate, { opacity: 1, y: 0, letterSpacing: "0.28em" });
  }

  if (scrollIndicator) {
    gsap.set(scrollIndicator, { opacity: 0.85, y: 0 });
  }
}

export function createHeroEntranceTimeline(elements, callbacks = {}) {
  const {
    imageWrapper,
    image,
    darkOverlay,
    introLine,
    firstName,
    ampersand,
    secondName,
    divider,
    weddingDate,
    scrollIndicator,
  } = elements;

  const tl = gsap.timeline({
    defaults: { ease: CINEMA_EASE },
    onComplete: () => callbacks.onComplete?.(),
  });

  // 1 & 2: Reveal photograph with subtle clip-path and scale animation
  if (imageWrapper) {
    tl.to(
      imageWrapper,
      {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        duration: 1.45,
        ease: "power2.inOut",
      },
      0,
    );
  }

  // 3: Gentle image zoom that settles naturally
  if (image) {
    tl.to(
      image,
      {
        scale: 1.0,
        duration: 2.4,
        ease: "power2.out",
      },
      0,
    );
  }

  // Subtle dark overlay to ensure readable typography
  if (darkOverlay) {
    tl.to(
      darkOverlay,
      {
        opacity: 0.55,
        duration: 1.2,
        ease: "power1.inOut",
      },
      0.3,
    );
  }

  // 4: Reveal introductory line
  if (introLine) {
    tl.to(
      introLine,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.28em",
        duration: 0.75,
        ease: "power2.out",
      },
      0.65,
    );
  }

  // 5: Reveal first name
  if (firstName) {
    tl.to(
      firstName,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: CINEMA_EASE,
      },
      0.95,
    );
  }

  // 6: Reveal ampersand in antique gold
  if (ampersand) {
    tl.to(
      ampersand,
      {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "back.out(1.5)",
      },
      1.25,
    );
  }

  // 7: Reveal second name
  if (secondName) {
    tl.to(
      secondName,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: CINEMA_EASE,
      },
      1.5,
    );
  }

  // Subtle ornamental gold divider
  if (divider) {
    tl.to(
      divider,
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      1.8,
    );
  }

  // 8: Reveal wedding date
  if (weddingDate) {
    tl.to(
      weddingDate,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.28em",
        duration: 0.75,
        ease: "power2.out",
      },
      2.0,
    );
  }

  // 9: Animate scroll indicator
  if (scrollIndicator) {
    tl.to(
      scrollIndicator,
      {
        opacity: 0.85,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      2.35,
    );
  }

  return tl;
}

export function createScrollIndicatorPulse(indicator, arrow) {
  if (!indicator && !arrow) return null;

  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });

  if (indicator) {
    tl.to(indicator, {
      opacity: 0.45,
      duration: 1.6,
      yoyo: true,
      repeat: 1,
    });
  }

  if (arrow) {
    tl.to(
      arrow,
      {
        y: 4,
        duration: 1.3,
        yoyo: true,
        repeat: 1,
      },
      0,
    );
  }

  return tl;
}
