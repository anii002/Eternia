import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const featuresTop = [
  { title: "Storm-Proof Strength", desc: "Designed to withstand cyclonic winds" },
  { title: "Wider Views", desc: "Larger panel sizes" },
  { title: "No Rattling", desc: "Sturdy accessories with premium woolpile" },
];

const featuresBottom = [
  { title: "Made for Indian Conditions", desc: "Integrated collapsible insect-proof mesh" },
  { title: "Smooth Operation", desc: "Rollers and hinges tested for over 1 lakh cycles" },
  { title: "High-Quality Sealing", desc: "Silicated fin-based woolpile blocks water, dust, and sound" },
];

const featuresLeft = [
  { title: "Rugged Reliability", desc: "40% stronger than standard aluminium" },
  { title: "Enhanced Security", desc: "Multi-point locking mechanisms for added protection" },
];

const featuresRight = [
  { title: "Noise Insulation", desc: "High-quality gaskets with fin-based woolpile" },
  { title: "No Drips or Leaks", desc: "Efficient and intelligent water drainage system" },
  { title: "Peace of Mind", desc: "12-year warranty on aluminium profiles + 5-year warranty on hardware" },
];

const mobileSlides = [
  {
    topCard: { title: "Rugged Reliability", desc: "40% stronger than standard aluminium" },
    topGrid: [
      { title: "Storm-Proof Strength", desc: "Designed to withstand cyclonic winds" },
      { title: "Wider Views", desc: "Larger panel sizes" },
    ],
    botGrid: [
      { title: "Enhanced Security", desc: "Multi-point locking mechanisms for added protection" },
      { title: "Smooth Operation", desc: "Rollers and hinges tested for over 1 lakh cycles" },
    ],
    botCard: { title: "Made for Indian Conditions", desc: "Integrated collapsible insect-proof mesh" },
  },
  {
    topCard: { title: "Noise Insulation", desc: "High-quality gaskets with fin-based woolpile" },
    topGrid: [
      { title: "No Rattling", desc: "Sturdy accessories with premium woolpile" },
      { title: "No Drips or Leaks", desc: "Efficient and intelligent water drainage system" },
    ],
    botGrid: [
      { title: "High-Quality Sealing", desc: "Silicated fin-based woolpile blocks water, dust, and sound" },
      { title: "Peace of Mind", desc: "12-year warranty on profiles + 5-year on hardware" },
    ],
    botCard: { title: "High-Quality Sealing", desc: "Silicated fin-based woolpile blocks water, dust, and sound" },
  },
];

const CONNECTOR_COLOR = "#0b4f5e";

const Dot = () => <span className="inline-block size-2 rounded-full bg-[#0b4f5e] shrink-0" />;

const VConnector = ({ height = 44 }) => (
  <div className="flex flex-col items-center">
    <Dot />
    <div className="w-[1.5px] bg-[#0b4f5e]" style={{ height }} />
    <Dot />
  </div>
);

const HConnector = () => (
  <div className="flex-1 min-w-[30px] flex items-center">
    <Dot />
    <div className="flex-1 h-[1.5px] bg-[#0b4f5e]" />
    <Dot />
  </div>
);

const LConnDownRight = ({ vH = 28, hW = 80 }) => (
  <div className="flex flex-col">
    <Dot />
    <div
      className="border-l-[1.5px] border-b-[1.5px] border-[#0b4f5e]"
      style={{ width: hW, height: vH }}
    />
    <div className="self-end">
      <Dot />
    </div>
  </div>
);

const LConnDownLeft = ({ vH = 28, hW = 80 }) => (
  <div className="flex flex-col items-end">
    <Dot />
    <div
      className="border-r-[1.5px] border-b-[1.5px] border-[#0b4f5e]"
      style={{ width: hW, height: vH }}
    />
    <div className="self-start">
      <Dot />
    </div>
  </div>
);

const LConnUpRight = ({ vH = 28, hW = 80 }) => (
  <div className="flex flex-col">
    <div className="self-end">
      <Dot />
    </div>
    <div
      className="border-l-[1.5px] border-t-[1.5px] border-[#0b4f5e]"
      style={{ width: hW, height: vH }}
    />
    <Dot />
  </div>
);

const LConnUpLeft = ({ vH = 28, hW = 80 }) => (
  <div className="flex flex-col items-end">
    <div className="self-start">
      <Dot />
    </div>
    <div
      className="border-r-[1.5px] border-t-[1.5px] border-[#0b4f5e]"
      style={{ width: hW, height: vH }}
    />
    <Dot />
  </div>
);

const TopBottomCard = ({ title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center rounded-[40px] border border-[#9cbacb] bg-[#dbeaf4] px-5 py-2.5 shadow-sm text-center min-w-[185px] max-w-[280px]"
  >
    <p className="text-sm font-semibold text-gray-800 leading-tight">{title}</p>
    <p className="text-xs text-[#000000] mt-0.5 leading-relaxed">{desc}</p>
  </motion.div>
);

const SideCard = ({ title, desc, align, maxWidth = 320 }) => (
  <motion.div
    initial={{ opacity: 0, x: align === "left" ? -18 : 18 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col rounded-[40px] border border-[#9cbacb] bg-[#dbeaf4] px-5 py-2.5 shadow-sm text-left min-w-[190px] w-full"
    style={{ maxWidth }}
  >
    <p className="text-sm font-semibold text-gray-800 leading-tight">{title}</p>
    <p className="text-xs text-[#000000] mt-0.5 leading-relaxed">{desc}</p>
  </motion.div>
);

const MobileCard = ({ title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
    className="flex flex-col items-center rounded-[40px] border border-[#9cbacb] bg-[#dbeaf4] px-3 py-2 shadow-sm text-center w-full"
  >
    <p className="text-[11px] font-extrabold text-slate-900 leading-[1.25]">{title}</p>
    <p className="text-[10.5px] text-slate-600 mt-0.5 leading-[1.3]">{desc}</p>
  </motion.div>
);

export default function InnovationSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const touchStartX = useRef(null);
  const TOTAL_SLIDES = mobileSlides.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prevSlide = () => setSlideIdx((p) => (p - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  const nextSlide = () => setSlideIdx((p) => (p + 1) % TOTAL_SLIDES);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    touchStartX.current = null;
  };

  if (isMobile) {
    const slide = mobileSlides[slideIdx];

    return (
      <section
        className="relative w-full overflow-hidden bg-[url('/images/background_image.jpeg')] bg-cover bg-center bg-no-repeat px-3 py-7"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-white/55 pointer-events-none" />

        <div className="relative z-[1] mx-auto w-full max-w-[520px]">
          <div className="text-center mb-3.5">
            <h2 className="relative font-normal text-[34px] md:text-[48px] leading-[120%] text-center text-[#003946] inline-block pb-4">
          Where Innovation Meets Precision
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[55%] md:w-[60%] h-[1px] bg-[#003946]" />
        </h2>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.32 }}
          >
            <div className="mb-2.5">
              <MobileCard title={slide.topCard.title} desc={slide.topCard.desc} />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 flex flex-col items-center">
                <Dot />
                <div className="w-[1.5px] h-[104px] bg-[#0b4f5e]" />
                <Dot />
              </div>

              <div className="relative z-[2] -mb-[58px] flex gap-2">
                <div className="flex-1 flex flex-col items-end">
                  <MobileCard title={slide.topGrid[0].title} desc={slide.topGrid[0].desc} />
                  <LConnDownRight vH={36} hW={62} />
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <MobileCard title={slide.topGrid[1].title} desc={slide.topGrid[1].desc} />
                  <LConnDownLeft vH={36} hW={62} />
                </div>
              </div>
            </div>

            <div className="w-full aspect-[16/9] overflow-hidden rounded-[12px] bg-transparent shadow-none ring-0 outline-none">
              <img
                src="/images/window.png"
                alt="Eternia Window"
                className="block h-full w-full object-cover shadow-none ring-0 outline-none border-0"
                style={{ boxShadow: "none", filter: "none" }}
                loading="lazy"
              />
            </div>

            <div className="relative -mt-[58px]">
              <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 flex flex-col items-center">
                <Dot />
                <div className="w-[1.5px] h-[128px] bg-[#0b4f5e]" />
                <Dot />
              </div>

              <div className="relative z-[2] flex gap-2">
                <div className="flex-1 flex flex-col items-end">
                  <LConnUpRight vH={36} hW={62} />
                  <MobileCard title={slide.botGrid[0].title} desc={slide.botGrid[0].desc} />
                </div>
                <div className="flex-1 flex flex-col items-start">
                  <LConnUpLeft vH={36} hW={62} />
                  <MobileCard title={slide.botGrid[1].title} desc={slide.botGrid[1].desc} />
                </div>
              </div>

              <div className="relative z-[2] mt-4 mb-[18px]">
                <MobileCard title={slide.botCard.title} desc={slide.botCard.desc} />
              </div>
            </div>
          </motion.div>

          <div className="mt-1.5 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="grid size-[56px] place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
              aria-label="Previous"
            >
              <HiArrowLeft className="text-[22px] text-[#0b4f5e]" />
            </button>

            <div className="flex items-center gap-3">
              {mobileSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  className={`size-[10px] rounded-full border-2 ${
                    i === slideIdx ? "bg-[#0b4f5e] border-[#0b4f5e]" : "bg-transparent border-[#0b4f5e]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="grid size-[56px] place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
              aria-label="Next"
            >
              <HiArrowRight className="text-[22px] text-[#0b4f5e]" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-[url('/images/background_image.jpeg')] bg-cover bg-center bg-no-repeat py-15 px-6">
      <div className="absolute inset-0 bg-white/55 pointer-events-none" />

      <div className="relative z-[1] mx-auto max-w-[1220px]">
        <div className="text-center mb-20">
           <h2 className="relative font-normal text-[34px] md:text-[48px] leading-[120%] text-center text-[#003946] inline-block pb-4">
          Where Innovation Meets Precision
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[55%] md:w-[60%] h-[1px] bg-[#003946]" />
        </h2>
        </div>

        <div className="relative z-[2] -mb-7 flex justify-center gap-12">
          {featuresTop.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <TopBottomCard title={f.title} desc={f.desc} />
              {i === 0 && <LConnDownRight vH={28} hW={88} />}
              {i === 1 && <VConnector height={44} />}
              {i === 2 && <LConnDownLeft vH={28} hW={88} />}
            </div>
          ))}
        </div>

        <div className="flex items-stretch">
          <div className="relative z-[2] flex-[1.2_1_0] min-w-0 -mr-[34px] flex flex-col justify-around">
            {featuresLeft.map((f, i) => (
              <div key={i} className="flex items-center w-full">
                <SideCard title={f.title} desc={f.desc} align="left" />
                <HConnector />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[560px] h-[275px] shrink-0 overflow-hidden rounded-[12px] bg-transparent shadow-none ring-0 outline-none"
          >
            <img
              src="/images/window.png"
              alt="Eternia Window"
              className="block h-full w-full object-cover shadow-none ring-0 outline-none border-0"
              style={{ boxShadow: "none", filter: "none" }}
              loading="lazy"
            />
          </motion.div>

          <div className="relative z-[2] flex-[1.2_1_0] min-w-0 -ml-[34px] flex flex-col justify-between">
            {featuresRight.map((f, i) => (
              <div key={i} className="flex items-center w-full">
                <HConnector />
                <SideCard title={f.title} desc={f.desc} align="right" maxWidth={320} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[2] -mt-7 flex justify-center gap-12">
          {featuresBottom.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              {i === 0 && <LConnUpRight vH={28} hW={88} />}
              {i === 1 && <VConnector height={44} />}
              {i === 2 && <LConnUpLeft vH={28} hW={88} />}
              <TopBottomCard title={f.title} desc={f.desc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}