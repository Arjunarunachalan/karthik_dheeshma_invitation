import gsap from "gsap";

const CINEMA_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setIntroEntranceState(elements) {
  const {
    emblem,
    envelope,
    seal,
    hint,
    arrow,
    flap,
    card,
    inner,
    back,
    pocket,
    initialA,
    ampersand,
    initialR,
    subtitle,
    divider,
    inviteText,
    details,
    fragments,
  } = elements;

  if (emblem) {
    gsap.set(emblem, { opacity: 0, scale: 0.9, filter: "blur(6px)" });
  }

  gsap.set(envelope, {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.94,
    y: 36,
  });

  if (seal) {
    gsap.set(seal, {
      opacity: 0,
      scale: 0.6,
      rotate: -14,
      y: 10,
    });
  }

  if (hint) {
    gsap.set(hint, { opacity: 0, y: 8 });
  }
  if (arrow) {
    gsap.set(arrow, { opacity: 0.75, y: 0 });
  }

  gsap.set(flap, { rotateX: 0, zIndex: 20 });
  // Card is safely tucked inside pocket and hidden by closed flap
  gsap.set(card, { y: "0%", opacity: 1, scale: 1, zIndex: 10 });
  gsap.set(inner, { opacity: 0.6 });

  gsap.set([initialA, initialR, subtitle, inviteText, details], {
    opacity: 0,
    y: 10,
  });
  gsap.set(ampersand, { opacity: 0, scale: 0.8, y: 0 });
  if (divider) {
    gsap.set(divider, { opacity: 0, scaleX: 0 });
  }

  if (fragments?.length) {
    gsap.set(fragments, { opacity: 0, scale: 1, x: 0, y: 0, rotate: 0 });
  }

  gsap.set([back, pocket], { opacity: 1 });
}

export function setIntroOpenedState(elements) {
  const {
    emblem,
    envelope,
    seal,
    hint,
    flap,
    card,
    inner,
    back,
    pocket,
    initialA,
    ampersand,
    initialR,
    subtitle,
    divider,
    inviteText,
    details,
    fragments,
  } = elements;

  if (emblem) {
    gsap.set(emblem, { opacity: 0 });
  }

  gsap.set(envelope, {
    opacity: 1,
    filter: "blur(0px)",
    scale: 0.98,
    y: 20,
  });

  gsap.set(seal, { opacity: 0 });
  gsap.set(hint, { opacity: 0 });
  gsap.set(flap, { rotateX: 175, zIndex: 1 });
  gsap.set(card, {
    y: "-50%",
    opacity: 1,
    scale: 1,
    zIndex: 25,
    boxShadow:
      "0 24px 50px -10px rgba(0, 0, 0, 0.65), 0 8px 20px -4px rgba(0, 0, 0, 0.4)",
  });
  gsap.set([inner, back, pocket], { opacity: 1 });
  gsap.set([initialA, initialR, subtitle, inviteText, details], {
    opacity: 1,
    y: 0,
  });
  gsap.set(ampersand, { opacity: 1, scale: 1, y: 0 });
  if (divider) {
    gsap.set(divider, { opacity: 1, scaleX: 1 });
  }
  if (fragments?.length) {
    gsap.set(fragments, { opacity: 0 });
  }
}

export function createEntranceTimeline(elements) {
  const { emblem, envelope, seal, hint } = elements;
  const tl = gsap.timeline();

  // Step 1: Dark screen (starts dark)
  // Step 2: Subtle gold emblem reveal
  if (emblem) {
    tl.to(
      emblem,
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
      },
      0.2,
    ).to(
      emblem,
      {
        opacity: 0,
        scale: 1.04,
        filter: "blur(4px)",
        duration: 0.6,
        ease: "power2.inOut",
      },
      2.0,
    );
  }

  // Step 3: Envelope appears with a smooth cinematic entrance
  const envelopeStart = emblem ? 2.3 : 0.4;
  tl.to(
    envelope,
    {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      duration: 1.35,
      ease: CINEMA_EASE,
    },
    envelopeStart,
  )
    // Step 4: Wax seal appears and settles
    .to(
      seal,
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        duration: 0.85,
        ease: "back.out(1.8)",
      },
      envelopeStart + 0.7,
    )
    // Step 5: "TAP TO OPEN" and a subtle animated arrow appear
  if (hint) {
    tl.to(
      hint,
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
      },
      envelopeStart + 1.25,
    );
  }

  return tl;
}

export function createSealBreathing(seal) {
  if (!seal) return null;

  return gsap.to(seal, {
    scale: 1.035,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    transformOrigin: "50% 50%",
  });
}

export function createHintPulse(hint, arrow) {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });

  if (hint) {
    tl.to(hint, {
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
        y: -4,
        duration: 1.2,
        yoyo: true,
        repeat: 1,
      },
      0,
    );
  }

  return tl;
}

export function createParticleMotion(nodes) {
  if (!nodes?.length) return null;

  const tl = gsap.timeline();

  nodes.forEach((node, index) => {
    if (!node) return;
    const driftX = index % 2 === 0 ? 8 : -10;
    const driftY = -14 - (index % 5) * 3;

    tl.to(
      node,
      {
        x: driftX,
        y: driftY,
        duration: 7.0 + (index % 5) * 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (index % 6) * 0.2,
      },
      0,
    );
  });

  return tl;
}

export function createIntroTimeline(elements, callbacks = {}) {
  const {
    envelope,
    flap,
    seal,
    fragments,
    inner,
    card,
    hint,
    initialA,
    ampersand,
    initialR,
    subtitle,
    divider,
    inviteText,
    details,
  } = elements;

  const [fragA, fragB, fragC, fragD] = fragments || [];
  const tl = gsap.timeline({
    defaults: { ease: CINEMA_EASE },
    onComplete: () => callbacks.onComplete?.(),
  });

  // Step 6 / 7: Tap feedback & seal reacts and disappears convincingly
  if (hint) {
    tl.to(
      hint,
      {
        opacity: 0,
        y: -6,
        duration: 0.25,
        ease: "power2.out",
      },
      0,
    );
  }

  // Seal tactile press / crack reaction
  tl.to(
    seal,
    {
      scale: 1.07,
      duration: 0.14,
      ease: "power2.out",
    },
    0.06,
  );

  // Seal cracks into 4 fragments
  if (fragA && fragB && fragC && fragD) {
    tl.set([fragA, fragB, fragC, fragD], { opacity: 1 }, 0.2);

    tl.to(
      fragA,
      {
        x: -18,
        y: -12,
        rotate: -25,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      0.22,
    )
      .to(
        fragB,
        {
          x: 20,
          y: -10,
          rotate: 22,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.22,
      )
      .to(
        fragC,
        {
          x: -12,
          y: 16,
          rotate: -15,
          opacity: 0,
          duration: 0.48,
          ease: "power2.out",
        },
        0.24,
      )
      .to(
        fragD,
        {
          x: 14,
          y: 18,
          rotate: 18,
          opacity: 0,
          duration: 0.48,
          ease: "power2.out",
        },
        0.24,
      );
  }

  // Central seal dissolves
  tl.to(
    seal,
    {
      scale: 0.85,
      opacity: 0,
      filter: "blur(2px)",
      duration: 0.35,
      ease: "power2.in",
    },
    0.22,
  );

  // Step 8: Envelope flap opens around its correct hinge
  tl.to(
    flap,
    {
      rotateX: 175,
      duration: 1.05,
      ease: "power2.inOut",
    },
    0.38,
  );

  // When flap is halfway open (~85 degrees), drop its zIndex behind the card/pocket
  tl.set(flap, { zIndex: 1 }, 0.85);

  tl.to(
    inner,
    {
      opacity: 0.85,
      duration: 0.5,
      ease: "power2.out",
    },
    0.65,
  );

  // Step 9: The invitation paper slides out
  // Envelope gently settles downward to frame the card
  tl.to(
    envelope,
    {
      y: 20,
      scale: 0.98,
      duration: 1.25,
      ease: CINEMA_EASE,
    },
    0.85,
  );

  // Card slides upward out of pocket
  tl.to(
    card,
    {
      y: "-50%",
      duration: 1.35,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    0.85,
  );

  // Elevated card zIndex and dimensional shadow
  tl.set(card, { zIndex: 25 }, 1.1);
  tl.to(
    card,
    {
      boxShadow:
        "0 24px 50px -10px rgba(0, 0, 0, 0.65), 0 8px 20px -4px rgba(0, 0, 0, 0.4)",
      duration: 0.9,
      ease: "power2.out",
    },
    1.1,
  );

  // Step 10: Initials appear sequentially
  tl.fromTo(
    initialA,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6, ease: CINEMA_EASE },
    1.65,
  );

  tl.fromTo(
    ampersand,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
    1.85,
  );

  tl.fromTo(
    initialR,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6, ease: CINEMA_EASE },
    2.05,
  );

  // Step 11: Supporting invitation text reveals
  tl.fromTo(
    subtitle,
    { opacity: 0, y: 8, letterSpacing: "0.42em" },
    { opacity: 1, y: 0, letterSpacing: "0.32em", duration: 0.65, ease: "power2.out" },
    2.3,
  );

  if (divider) {
    tl.fromTo(
      divider,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.55, ease: "power2.out" },
      2.5,
    );
  }

  tl.fromTo(
    inviteText,
    { opacity: 0, y: 8, letterSpacing: "0.3em" },
    { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 0.65, ease: "power2.out" },
    2.65,
  );

  if (details) {
    tl.fromTo(
      details,
      { opacity: 0, y: 8, letterSpacing: "0.34em" },
      { opacity: 1, y: 0, letterSpacing: "0.26em", duration: 0.65, ease: "power2.out" },
      2.85,
    );
  }

  // Step 12: The sequence settles into a beautiful final state
  // Notice: The card remains proudly displayed in its final state.
  // It does NOT fade to opacity: 0 or vanish!

  return tl;
}

export function transitionCardToHero(elements, callbacks = {}) {
  const { root, envelope, card } = elements;
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => callbacks.onComplete?.(),
  });

  if (envelope) {
    tl.to(
      envelope,
      {
        opacity: 0,
        y: 35,
        duration: 0.75,
      },
      0,
    );
  }

  if (card) {
    tl.to(
      card,
      {
        opacity: 0,
        scale: 1.12,
        duration: 0.85,
      },
      0.08,
    );
  }

  if (root) {
    tl.to(
      root,
      {
        opacity: 0,
        duration: 0.55,
      },
      0.35,
    );
  }

  return tl;
}
