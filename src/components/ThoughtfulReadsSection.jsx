import React, { useEffect, useMemo, useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

function ReadCard({ item }) {
  return (
    <article
      className="relative overflow-hidden rounded-[12px] bg-white"
      style={{
        width: 298,
        height: 380,
        boxShadow: "0 20px 52px rgba(0,0,0,0.18)",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover select-none"
        style={{ transform: "scale(1.03)" }}
        draggable={false}
      />

      <div className="absolute inset-x-0 bottom-0 h-[132px] overflow-hidden rounded-b-[12px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.20)_45%,rgba(0,0,0,0.40)_100%)]" />
        <div className="absolute inset-0 bg-[rgba(156,120,80,0.34)] backdrop-blur-[16px]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/25" />

        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 14px 24px -18px rgba(255,255,255,0.28), inset 0 -18px 30px -22px rgba(0,0,0,0.55)",
          }}
        />

        <div className="relative px-5 pt-5">
          <h3 className="text-white text-[15px] leading-[22px] font-normal drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]">
            {item.title}
          </h3>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 text-white text-[14px] font-normal underline underline-offset-[4px] decoration-[1px] drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]"
          >
            Read More <HiArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ThoughtfulReadsSection() {
  const items = useMemo(
    () => [
      {
        title:
          "Beyond the Basics: Exploring Unique Window Types for Your Dream Home",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=70",
      },
      {
        title:
          "Beyond the Basics: Exploring Unique Window Types for Your Dream Home",
        image:
          "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=70",
      },
      {
        title:
          "Beyond the Basics: Exploring Unique Window Types for Your Dream Home",
        image:
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=70",
      },
      {
        title:
          "Beyond the Basics: Exploring Unique Window Types for Your Dream Home",
        image:
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=70",
      },
    ],
    []
  );

  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children);
      const left = el.scrollLeft;
      const w = el.clientWidth;

      let best = 0;
      let bestDist = Infinity;

      children.forEach((c, i) => {
        const cx = c.offsetLeft + c.clientWidth / 2;
        const viewportCenter = left + w / 2;
        const dist = Math.abs(cx - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const isMobile = () => window.innerWidth < 1024;
    let id;

    const stop = () => {
      if (id) window.clearInterval(id);
      id = undefined;
    };

    const scrollToIndex = (i) => {
      const child = el.children[i];
      if (!child) return;

      const targetLeft =
        child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;

      el.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    };

    const start = () => {
      stop();
      if (!isMobile()) return;
      if (!inView) return;

      id = window.setInterval(() => {
        const next = (activeRef.current + 1) % items.length;
        scrollToIndex(next);
      }, 3200);
    };

    start();
    window.addEventListener("resize", start);
    window.addEventListener("scroll", start, { passive: true });

    const pause = () => stop();
    const resume = () => start();

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", resume);
    el.addEventListener("pointercancel", resume);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      stop();
      window.removeEventListener("resize", start);
      window.removeEventListener("scroll", start);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resume);
      el.removeEventListener("pointercancel", resume);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [items.length, inView]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[url('/images/pattern.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[320px] opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(135deg,#dbe6ec 1px,transparent 1px),linear-gradient(45deg,#dbe6ec 1px,transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-[#073b46]" />
      </div>

      <div className="relative w-[95%] md:w-[85%] max-w-[1400px] mx-auto px-4 md:px-0 pt-[56px] pb-[56px]">
        <div className="text-center">
          <h2 className="font-sans font-normal text-[#003946] text-[34px] sm:text-[44px] md:text-[56px] leading-[1.12]">
            Thoughtful Reads for Modern Living
          </h2>
          <div className="mx-auto mt-4 h-[1px] w-[62%] sm:w-[52%] md:w-[46%] bg-[#003946]/55" />
        </div>

        <div className="mt-[34px] hidden lg:flex items-stretch justify-between">
          {items.map((it, i) => (
            <ReadCard key={i} item={it} />
          ))}
        </div>

        <div className="mt-[34px] lg:hidden">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
          >
            {items.map((it, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{ width: 298, scrollSnapAlign: "center" }}
              >
                <ReadCard item={it} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-5">
            {items.map((_, i) => (
              <span
                key={i}
                className={[
                  "rounded-full transition-all duration-300",
                  i === active
                    ? "w-[18px] h-[6px] bg-[#073b46]"
                    : "w-[6px] h-[6px] bg-[#073b46]/35",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-[14px]">
          <button
            type="button"
            className="font-sans font-semibold text-[14px] leading-[1.4] underline underline-offset-[8px] decoration-[1px] text-white hover:opacity-85 transition"
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}