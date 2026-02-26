import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function PropertySection() {
  const items = useMemo(
    () => [
      {
        title: "Runwal Nirwana",
        subtitle: "54 Storey Luxury Tower",
        image: "/images/p1.jpg",
        logo: "/icons/logo1.png",
      },
      {
        title: "Rustomjee Reserve",
        subtitle: "22 Storey High Rise Tower",
        image: "/images/p1.png",
        logo: "/icons/logo2.png",
      },
      {
        title: "L&T Seawoods",
        subtitle: "40 acre Development",
        image: "/images/p2.png",
        logo: "/icons/logo3.png",
      },
      {
        title: "Birla Vanya",
        subtitle: "23 Storeys Tower",
        image: "/images/p3.png",
        logo: "/icons/logo4.png",
      },
    ],
    []
  );

  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);

  const viewportRef = useRef(null);
  const [viewportW, setViewportW] = useState(0);

  const GAP = 24;

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportW(el.clientWidth || 0));
    ro.observe(el);
    setViewportW(el.clientWidth || 0);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [perView]);

  const maxIndex = Math.max(0, items.length - perView);
  const itemW =
    perView > 0 ? Math.max(0, (viewportW - GAP * (perView - 1)) / perView) : 0;

  const translateX = index * (itemW + GAP);

  const prev = () => setIndex((p) => Math.max(0, p - 1));
  const next = () => setIndex((p) => Math.min(maxIndex, p + 1));

  const dots = Math.max(1, maxIndex + 1);

  return (
    <section className="relative w-full overflow-hidden bg-[url('/images/pattern.png')] bg-cover bg-center bg-no-repeats">
      <div className="absolute inset-x-0 top-0 h-[340px] opacity-40 pointer-events-none bg-[linear-gradient(135deg,#dbe6ec_1px,transparent_1px),linear-gradient(45deg,#dbe6ec_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[#073b46]" />

      <div className="relative left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] max-w-7xl  sm:pt-[52px] pb-[50px] sm:pb-[54px]">
        <div className="text-center">
          <h2 className="font-normal text-[34px] sm:text-[42px] lg:text-[56px] leading-[1.15] text-[#003946]">
            Crafted or Iconic Spaces
          </h2>
          <div className="mx-auto mt-[14px] h-[1px] w-[70%] sm:w-[58%] lg:w-[46%] bg-[#003946]" />
        </div>

        <div ref={viewportRef} className="mt-[30px] sm:mt-[36px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ gap: `${GAP}px`, transform: `translateX(-${translateX}px)` }}
          >
            {items.map((it, i) => (
              <div key={i} className="shrink-0" style={{ width: `${itemW}px` }}>
                <div className="relative h-[320px] sm:h-[360px] lg:h-[380px] rounded-[12px] overflow-hidden bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute left-[14px] right-[14px] bottom-[14px]">
                    <div className="flex items-center gap-[10px] h-[64px] px-[14px] rounded-[10px] border border-white/40 bg-white/20 backdrop-blur-[10px] shadow-[0_10px_25px_rgba(0,0,0,0.16)]">
                      <div className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={it.logo}
                          alt="logo"
                          className="w-[30px] h-[30px] object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          draggable="false"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-white text-[15px] font-semibold leading-[18px] truncate">
                          {it.title}
                        </div>
                        <div className="text-white/90 text-[13px] leading-[16px] truncate">
                          {it.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:hidden h-[14px]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-[14px] mt-[22px] sm:mt-[26px]">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.12)] disabled:opacity-40"
            aria-label="Previous"
          >
            <HiChevronLeft className="text-[#073b46]" size={20} />
          </button>

          <div className="flex items-center gap-[10px]">
            {Array.from({ length: dots }).map((_, d) => (
              <button
                key={d}
                onClick={() => setIndex(d)}
                className={[
                  "w-[10px] h-[10px] rounded-full transition",
                  d === index
                    ? "bg-white"
                    : "bg-transparent border border-white/80",
                ].join(" ")}
                aria-label={`Go to slide ${d + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={index === maxIndex}
            className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.12)] disabled:opacity-40"
            aria-label="Next"
          >
            <HiChevronRight className="text-[#073b46]" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}