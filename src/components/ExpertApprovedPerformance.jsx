import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Dot({ active }) {
  return (
    <span
      className={[
        "inline-block rounded-full transition-all duration-300",
        active
          ? "w-[6px] h-[6px] bg-[#0b3f4a]"
          : "w-[6px] h-[6px] border border-[#0b3f4a]/40 bg-transparent",
      ].join(" ")}
    />
  );
}

function VideoCard({ item, variant }) {
  const base =
    "relative overflow-hidden rounded-[12px] shadow-[0_22px_46px_rgba(0,0,0,0.18)] border border-black/5 bg-white transition-all duration-500 ease-out";

  const map = {
    center: "w-[420px] h-[520px] opacity-100 scale-100",
    near: "w-[360px] h-[460px] opacity-95 scale-[0.96]",
    far: "w-[300px] h-[400px] opacity-85 scale-[0.92]",

    mCenter:
      "w-[min(340px,calc(100vw-40px))] h-[520px] opacity-100 scale-100",
  };

  return (
    <div className={[base, map[variant] || map.center].join(" ")}>
      <img
        src={item.img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_38%,rgba(0,0,0,0.28)_100%)]" />

      <button
        type="button"
        aria-label="Play"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px] rounded-full bg-white/20 backdrop-blur-md border border-white/65 grid place-items-center shadow-[0_12px_26px_rgba(0,0,0,0.22)]"
      >
        <span className="ml-[3px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[16px] border-l-white/95" />
      </button>

      <div className="absolute left-4 bottom-4 flex items-center gap-2">
        <img
          src={item.avatar}
          alt=""
          className="w-9 h-9 rounded-full object-cover border border-white/80"
          draggable={false}
        />
        <div className="text-white text-[13px] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {item.name}
        </div>
      </div>

      <div className="absolute right-4 bottom-4 w-[34px] h-[34px] rounded-full bg-white/18 backdrop-blur-md border border-white/60 grid place-items-center">
        <div className="w-[14px] h-[14px] rounded-[5px] border border-white/90 relative">
          <div className="absolute right-[2px] top-[2px] w-[2px] h-[2px] rounded-full bg-white/90" />
        </div>
      </div>
    </div>
  );
}

export default function ExpertApprovedPerformance() {
  const items = useMemo(
    () => [
      {
        img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=70",
        avatar: "https://i.pravatar.cc/90?img=11",
        name: "Ms Vidi Duggal",
      },
      {
        img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=1400&q=70",
        avatar: "https://i.pravatar.cc/90?img=32",
        name: "Ms Ridhi Khosla Jalan",
      },
      {
        img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=70",
        avatar: "https://i.pravatar.cc/90?img=59",
        name: "Mr Krsna Mehta",
      },
      {
        img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=70",
        avatar: "https://i.pravatar.cc/90?img=47",
        name: "Rohina",
      },
      {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=70",
        avatar: "https://i.pravatar.cc/90?img=14",
        name: "A Gandhi",
      },
    ],
    []
  );

  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  const startXRef = useRef(0);
  const dxRef = useRef(0);
  const draggingRef = useRef(false);

  const lockRef = useRef({
    overflow: "",
    touchAction: "",
    overscrollBehavior: "",
  });

  const idx = (n) => (n + items.length) % items.length;
  const prev = () => setActive((p) => idx(p - 1));
  const next = () => setActive((p) => idx(p + 1));

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => idx(p + 1)), 3500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const lockScroll = () => {
    const b = document.body;
    lockRef.current = {
      overflow: b.style.overflow,
      touchAction: b.style.touchAction,
      overscrollBehavior: b.style.overscrollBehavior,
    };
    b.style.overflow = "hidden";
    b.style.touchAction = "none";
    b.style.overscrollBehavior = "none";
  };

  const unlockScroll = () => {
    const b = document.body;
    b.style.overflow = lockRef.current.overflow;
    b.style.touchAction = lockRef.current.touchAction;
    b.style.overscrollBehavior = lockRef.current.overscrollBehavior;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    setPaused(true);
    startXRef.current = e.clientX;
    dxRef.current = 0;
    lockScroll();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    dxRef.current = e.clientX - startXRef.current;
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const dx = dxRef.current;
    if (dx > 60) prev();
    else if (dx < -60) next();

    unlockScroll();
    setTimeout(() => setPaused(false), 250);
  };

  useEffect(() => {
    return () => {
      if (draggingRef.current) unlockScroll();
    };
  }, []);

  const center = items[active];
  const left1 = items[idx(active - 1)];
  const left2 = items[idx(active - 2)];
  const right1 = items[idx(active + 1)];
  const right2 = items[idx(active + 2)];

  return (
    <section className="w-full bg-[#dfeff5]">
      <div className="w-full px-5 sm:px-7 md:w-[85%] md:max-w-[1400px] md:mx-auto py-10 md:py-16">
        <div className="text-center">
          <h2 className="font-sans font-normal text-[#0b3f4a] text-[26px] sm:text-[34px] md:text-[56px] leading-[1.12]">
            <span className="md:hidden block">Expert-Approved</span>
            <span className="md:hidden block">Performance</span>
            <span className="hidden md:inline">Expert-Approved Performance</span>
          </h2>
          <div className="h-[2px] w-[150px] sm:w-[220px] md:w-[520px] bg-[#0b3f4a]/35 mx-auto mt-3 md:mt-4" />
        </div>

        <div
          className="mt-8 md:mt-14 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop */}
          <div
            className="hidden md:block relative h-[560px] select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ touchAction: "pan-y" }}
          >
            <div className="absolute left-0 top-[94px] z-[1]">
              <VideoCard item={left2} variant="far" />
            </div>

            <div className="absolute left-[170px] top-[48px] z-[2]">
              <VideoCard item={left1} variant="near" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-[5]">
              <VideoCard item={center} variant="center" />
            </div>

            <div className="absolute right-[170px] top-[48px] z-[2]">
              <VideoCard item={right1} variant="near" />
            </div>

            <div className="absolute right-0 top-[94px] z-[1]">
              <VideoCard item={right2} variant="far" />
            </div>
          </div>

          {/* Mobile: ONLY ONE BIG CARD (reference jaisa) */}
          <div
            className="md:hidden relative h-[560px] flex items-center justify-center select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ touchAction: "none" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <VideoCard item={center} variant="mCenter" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 md:mt-6">
            <button
              onClick={prev}
              type="button"
              className="w-[34px] h-[34px] rounded-full bg-[#0b3f4a] text-white grid place-items-center shadow-[0_10px_22px_rgba(0,0,0,0.18)] active:scale-[0.98] transition"
              aria-label="Previous"
            >
              <HiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  type="button"
                  className="h-6 w-6 grid place-items-center"
                  aria-label={`Go to ${i + 1}`}
                >
                  <Dot active={i === active} />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              type="button"
              className="w-[34px] h-[34px] rounded-full bg-[#0b3f4a] text-white grid place-items-center shadow-[0_10px_22px_rgba(0,0,0,0.18)] active:scale-[0.98] transition"
              aria-label="Next"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}