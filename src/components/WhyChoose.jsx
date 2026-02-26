import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiCheck } from "react-icons/hi";

export default function WhyChoose() {
  const cards = useMemo(
    () => [
      {
        icon: "/icons/diffrence.png",
        title: "Stronger. Sleeker. Smarter.",
        points: [
          "Patented alloy, 40% stronger than standard aluminium.",
          "Enables larger windows with slimmer profiles.",
          "Cyclone-tested for extreme durability & reliability.",
        ],
      },
      {
        icon: "/icons/diffrence.png",
        title: "Tested. Trusted. Strong.",
        points: [
          "Windows tested for wind, water, and air performance.",
          "Leak-proof, rattle-free & weather-resistant windows.",
          "Transparent scoring system for consumer confidence.",
        ],
      },
      {
        icon: "/icons/diffrence.png",
        title: "Assured Service Guarantee",
        points: [
          "12-Year Warranty coverage.",
          "Dedicated 7-Day Call Center for support.",
          "Rigorous post-installation checks for satisfaction.",
        ],
      },
      {
        icon: "/icons/diffrence.png",
        title: "Greener Homes Promise",
        points: [
          "Aluminium – eternally recyclable material.",
          "GreenPro Certified products.",
          "Sustainable production for eco-conscious living.",
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [vw, setVw] = useState(0);
  const gap = 16;
  const peek = 64;

  const slideW = Math.max(270, vw - peek);

  const startXRef = useRef(0);
  const startTxRef = useRef(0);
  const dxRef = useRef(0);

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  const goTo = (i) => setActive((_) => (i + cards.length) % cards.length);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVw(el.clientWidth || 0));
    ro.observe(el);
    setVw(el.clientWidth || 0);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % cards.length);
    }, 3500);
    return () => clearInterval(id);
  }, [paused, cards.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tx = -(active * (slideW + gap));
    track.style.transition = "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translate3d(${tx}px,0,0)`;
  }, [active, slideW]);

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    setPaused(true);
    startXRef.current = e.clientX;
    dxRef.current = 0;
    startTxRef.current = -(active * (slideW + gap));
    track.style.transition = "none";
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!paused) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - startXRef.current;
    dxRef.current = dx;

    const maxIndex = cards.length - 1;
    const minTx = -(maxIndex * (slideW + gap));
    const maxTx = 0;

    const nextTx = clamp(startTxRef.current + dx, minTx - 40, maxTx + 40);
    track.style.transform = `translate3d(${nextTx}px,0,0)`;
  };

  const onPointerUp = () => {
    const dx = dxRef.current;
    const thresh = 60;

    if (dx > thresh) setActive((p) => (p - 1 + cards.length) % cards.length);
    else if (dx < -thresh) setActive((p) => (p + 1) % cards.length);

    const track = trackRef.current;
    if (track)
      track.style.transition = "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";

    setTimeout(() => setPaused(false), 220);
  };

  return (
    <section className="relative bg-[#003946] overflow-hidden px-4 sm:px-6 py-10 md:py-12">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -left-24 top-28 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-black/30 blur-3xl" />
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(900px_500px_at_70%_40%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_55%)]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative">
        <h2 className="relative inline-block font-sans font-normal text-[42px] sm:text-[56px] leading-[1.15] text-white pb-3 tracking-[0px]">
          Why Choose Eternia
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[72%] sm:w-[78%] h-[1px] bg-white/80" />
        </h2>

        <div className="mt-12 hidden lg:grid grid-cols-4 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        <div className="mt-10 lg:hidden">
          <div
            className="relative mx-auto max-w-[420px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={viewportRef}
              className="relative overflow-hidden"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ touchAction: "pan-y" }}
            >
              <div
                ref={trackRef}
                className="flex"
                style={{
                  gap: `${gap}px`,
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  willChange: "transform",
                }}
              >
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="shrink-0"
                    style={{ width: `${slideW}px` }}
                  >
                    <Card card={card} mobile />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {cards.map((_, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="h-5 w-5 grid place-items-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-[7px] h-[7px] bg-white"
                          : "w-[6px] h-[6px] bg-white/45"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card, mobile }) {
  return (
    <div
      className={[
        "relative overflow-hidden",
        "rounded-[10px]",
        "border border-white/25",
        "bg-[linear-gradient(180deg,rgba(15,74,86,0.92)_0%,rgba(6,47,56,0.95)_100%)]",
        "text-left",
        mobile ? "px-6 py-7" : "px-5 py-8",
      ].join(" ")}
      style={{
        boxShadow:
          "inset 0 18px 30px -22px rgba(255,255,255,0.95), inset 0 -18px 30px -22px rgba(255,255,255,0.95), 0 18px 40px rgba(0,0,0,0.35)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(120%_90%_at_35%_8%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0)_52%)]" />

      <div className="relative">
        <img
          src={card.icon}
          alt=""
          className="h-[44px] w-auto mb-4 opacity-95"
          draggable={false}
        />

        <h3 className="font-sans font-normal text-[18px] leading-[1.25] text-white mb-5">
          {card.title}
        </h3>

        <div className="h-px w-full bg-white/10 mb-5" />

        <ul className="space-y-5">
          {card.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-4 text-white/90 text-[15px] leading-[1.55]"
            >
              <span
                className="shrink-0 w-[26px] h-[26px] rounded-[7px] bg-white/10 grid place-items-center"
                style={{
                  boxShadow:
                    "inset 0 2px 10px rgba(255,255,255,0.18), 0 2px 10px rgba(0,0,0,0.22)",
                }}
              >
                <HiCheck className="text-[#35E0D0]" size={16} />
              </span>
              <span className="font-sans">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}