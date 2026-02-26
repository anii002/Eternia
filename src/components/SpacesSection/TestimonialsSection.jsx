import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function TestimonialCard({ t, faded }) {
  return (
    <div
      className={[
        "relative w-full",
        "h-[250px] sm:h-[280px] md:h-[300px]",
        "rounded-[8px] border border-white/18",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)]",
        "backdrop-blur-[8px]",
        "px-6 sm:px-7 py-6 flex flex-col",
        "overflow-hidden",
        faded ? "opacity-45" : "opacity-100",
      ].join(" ")}
      style={{
        boxShadow:
          "inset 0 14px 28px -22px rgba(255,255,255,0.65), inset 0 -14px 28px -22px rgba(255,255,255,0.35), 0 14px 34px rgba(0,0,0,0.22)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(120%_90%_at_35%_5%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_55%)]" />

      <div className="relative text-white/95 text-[64px] sm:text-[76px] leading-none font-black -mt-3">
        “
      </div>

      <p className="relative mt-1 text-white/85 text-[13px] sm:text-[14px] leading-[20px] sm:leading-[24px]">
        {t.text}
      </p>

      <div className="relative mt-auto">
        <div className="h-px w-full bg-white/16 my-3 sm:my-4" />
        <p className="text-white font-semibold text-[13px] sm:text-[14px]">{t.name}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const items = useMemo(
    () => [
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
      {
        text:
          "Eternia is a good product and very attractive in design and also durable and is supplemented with brand image and trust of Aditya Birla Group. Absolute windows, Gurgaon is very hard working and nice person.",
        name: "Mr. Vinod Mittal",
      },
    ],
    []
  );

  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(0);

  const [visible, setVisible] = useState(4);
  const [index, setIndex] = useState(1);

  const GAP = 24;

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 1024) setVisible(2);
      else setVisible(4);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWrapW(el.clientWidth || 0));
    ro.observe(el);
    setWrapW(el.clientWidth || 0);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex(1);
  }, [visible]);

  const isMobile = visible === 1;

  const cardW =
    visible === 1
      ? Math.min(320, Math.max(260, wrapW - 56))
      : visible === 2
      ? Math.min(420, (wrapW - GAP) / 2)
      : Math.min(440, (wrapW - GAP * 3) / 4);

  const maxIndex = Math.max(0, items.length - visible);
  const safeIndex = Math.max(0, Math.min(index, maxIndex));
  const translateX = safeIndex * (cardW + GAP);

  const prev = () => setIndex((p) => Math.max(0, p - 1));
  const next = () => setIndex((p) => Math.min(maxIndex, p + 1));

  const dots = maxIndex + 1;

  const leftFade = safeIndex === 0 ? 0 : 1;
  const rightFade = safeIndex === maxIndex ? 0 : 1;

  return (
    <section className="w-full bg-[#073b46]">
      <div className="w-full px-5 sm:px-8 lg:px-12 pt-10 sm:pt-12 md:pt-16 pb-10 sm:pb-12">
        <div className="text-center">
          <h2 className="relative inline-block font-sans font-normal text-[34px] sm:text-[44px] md:text-[54px] leading-[1.08] text-white pb-4">
            What Our Customers
            <br className="sm:hidden" />
            Have to Say
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[62%] h-[1px] bg-white/38" />
          </h2>
        </div>

        <div className="mt-8 sm:mt-10" ref={wrapRef}>
          <div className="relative overflow-hidden w-full">
            <div
              className="flex items-stretch transition-transform duration-500 ease-out"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${translateX}px)`,
                paddingLeft: isMobile ? "28px" : "0px",
                paddingRight: isMobile ? "28px" : "0px",
              }}
            >
              {items.map((t, i) => (
                <div key={i} className="shrink-0" style={{ width: `${cardW}px` }}>
                  <TestimonialCard
                    t={t}
                    faded={
                      (i === safeIndex - 1 && leftFade) ||
                      (i === safeIndex + visible && rightFade)
                    }
                  />
                </div>
              ))}
            </div>

            <div
              className="pointer-events-none absolute left-0 top-0 h-full"
              style={{
                width: isMobile ? "64px" : "90px",
                background:
                  "linear-gradient(90deg, rgba(7,59,70,1) 0%, rgba(7,59,70,0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-full"
              style={{
                width: isMobile ? "64px" : "90px",
                background:
                  "linear-gradient(270deg, rgba(7,59,70,1) 0%, rgba(7,59,70,0) 100%)",
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-7 sm:mt-10">
            <button
              onClick={prev}
              disabled={safeIndex === 0}
              className={[
                isMobile ? "w-[40px] h-[40px]" : "w-[48px] h-[48px]",
                "rounded-full flex items-center justify-center transition shadow-[0_10px_22px_rgba(0,0,0,0.14)]",
                safeIndex === 0 ? "bg-white/35 opacity-55" : "bg-white hover:bg-white",
              ].join(" ")}
              aria-label="Previous"
            >
              <HiChevronLeft size={isMobile ? 18 : 22} className="text-[#073b46]" />
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: dots }).map((_, d) => (
                <button
                  key={d}
                  onClick={() => setIndex(d)}
                  className={[
                    isMobile ? "w-[8px] h-[8px]" : "w-[10px] h-[10px]",
                    "rounded-full transition",
                    d === safeIndex ? "bg-white" : "bg-white/35",
                  ].join(" ")}
                  aria-label={`Go to ${d + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={safeIndex === maxIndex}
              className={[
                isMobile ? "w-[40px] h-[40px]" : "w-[48px] h-[48px]",
                "rounded-full flex items-center justify-center transition shadow-[0_10px_22px_rgba(0,0,0,0.14)]",
                safeIndex === maxIndex ? "bg-white/35 opacity-55" : "bg-white hover:bg-white",
              ].join(" ")}
              aria-label="Next"
            >
              <HiChevronRight size={isMobile ? 18 : 22} className="text-[#073b46]" />
            </button>
          </div>

          <div className="flex justify-center mt-7 sm:mt-10">
            <a
              href="#"
              className="font-sans font-semibold text-[14px] sm:text-[16px] underline underline-offset-[8px] decoration-[1px] text-white hover:opacity-85 transition"
            >
              Explore More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}