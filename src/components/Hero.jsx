import { useEffect, useRef, useState } from "react";

export default function HeroCarousel() {
  const slides = [
    {
      image: "/images/hero1.png",
      title: "Imagine Windows. Not Walls.",
      description:
        "Luxury aluminium windows and doors designed to bring in light, views and lasting strength.",
    },
    {
      image: "/images/hero2.png",
      title: "Built To Withstand Every Season.",
      description:
        "Luxury aluminium windows and doors designed to bring in light, views and lasting strength.",
    },
    {
      image: "/images/hero3.png",
      title: "Quiet Homes. Cleaner interiors",
      description:
        "Premium quality frames crafted for durability and modern architectural beauty.",
    },
    {
      image: "/images/hero4.png",
      title: "Design to Match Your Styles ",
      description:
        "Premium quality frames crafted for durability and modern architectural beauty.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 4000);
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  const goTo = (idx) => {
    setCurrent(idx);
    startAuto();
  };

  const renderTitle = (title, index) => {
    if (index === 0) {
      return (
        <>
          Imagine <span className="font-semibold">Windows</span>.

          Not <span className="font-semibold">Walls</span>.
        </>
      );
    }
    if (index === 1) {
      return (
        <>
          Built To <span className="font-semibold">Withstand</span> Every
          <span className="font-semibold">Season</span>.
        </>
      );
    }
    if (index === 2) {
      return (
        <>
          Quiet <span className="font-semibold">Homes</span>. Cleaner
          <span className="font-semibold">Interiors</span>
        </>
      );
    }
    if (index === 3) {
      return (
        <>
          Design to Match <span className="font-semibold">Your Styles</span>
        </>
      );
    }
    return title;
  };

  return (
    <section className="relative w-full overflow-hidden h-[600px] sm:h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <img
            src={slide.image}
            alt="Hero"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/60" />

      <div className="relative z-10 h-full w-full">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-6">
          <div className="w-full  text-center text-white">
            <h1 className="font-light leading-[1.08] tracking-[-0.02em] text-[44px] sm:text-5xl md:text-6xl">
              {renderTitle(slides[current].title, current)}
            </h1>

            <p className="mx-auto mt-5 text-white/80 text-[14px] leading-[1.6] sm:text-base md:text-lg">
              {slides[current].description}
            </p>

            <button
              className="mt-20 inline-flex items-center justify-center rounded-[10px] border border-white/50 bg-white/15 px-7 py-3 text-[14px] font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              onClick={() => { }}
            >
              Book a Window Consultation
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
          <div className="flex items-center gap-3">
            {slides.map((_, i) => {
              const active = i === current;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="p-1"
                >
                  <span
                    className={[
                      "block rounded-full transition-all duration-300",
                      active
                        ? "h-[7px] w-[7px] bg-white"
                        : "h-[7px] w-[7px] border border-white/70 bg-transparent",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}