"use client";

export default function WaxSeal({
  sealRef,
  fragmentARef,
  fragmentBRef,
  fragmentCRef,
  fragmentDRef,
  initials = "K & D",
  letter,
}) {
  const displayText = initials || letter || "K & D";

  return (
    <div className="relative pointer-events-none select-none">
      <div
        ref={sealRef}
        className="wax-seal relative z-30 grid h-[64px] w-[64px] place-items-center will-change-transform"
        aria-hidden="true"
      >
        {/* Organic wax outer lip highlight */}
        <div className="wax-seal-outer-lip absolute inset-0 rounded-full pointer-events-none" />

        {/* Debossed stamp ring inside the wax pool */}
        <div className="wax-seal-inner-bed absolute inset-[8px] rounded-full flex items-center justify-center pointer-events-none px-1">
          {/* Stamped serif initials K & D */}
          <span className="wax-seal-letter relative font-serif text-[0.95rem] font-medium leading-none select-none tracking-tight flex items-center justify-center gap-0.5">
            {displayText}
          </span>
        </div>

        {/* Crack fragments (hidden until tap) */}
        <span ref={fragmentARef} className="wax-fragment wax-fragment-a opacity-0" />
        <span ref={fragmentBRef} className="wax-fragment wax-fragment-b opacity-0" />
        <span ref={fragmentCRef} className="wax-fragment wax-fragment-c opacity-0" />
        <span ref={fragmentDRef} className="wax-fragment wax-fragment-d opacity-0" />
      </div>
    </div>
  );
}
