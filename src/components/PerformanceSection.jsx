import { useState, useMemo } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

export default function PerformanceSection() {
  const features = useMemo(
    () => [
      {
        title: "Energy Efficient",
        desc: "Designed to enhance thermal performance while maintaining year-round indoor comfort.",
        icon: "/icons/energy.png",
      },
      {
        title: "Rainwater Insulation",
        desc: "Precision sealing systems prevent water ingress, even during intense monsoon conditions.",
        icon: "/icons/rain.png",
      },
      {
        title: "Noise Insulation",
        desc: "Carefully engineered to significantly reduce external noise and create serene living spaces.",
        icon: "/icons/noise.png",
      },
      {
        title: "Storm Resistant",
        desc: "Tested to endure high wind loads and extreme weather with lasting reliability.",
        icon: "/icons/storm.png",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const nextSlide = () => setActive((p) => (p + 1) % features.length);
  const prevSlide = () => setActive((p) => (p === 0 ? features.length - 1 : p - 1));

  const canPrev = active !== 0;
  const canNext = active !== features.length - 1;

  return (
    <section className="bg-[#E6F4FA] py-16 px-4 md:py-20 md:px-6 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="relative font-normal text-[34px] md:text-[48px] leading-[120%] text-center text-[#003946] inline-block pb-4">
          Design. Performance. Longevity.
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[55%] md:w-[60%] h-[1px] bg-[#003946]" />
        </h2>

        <div className="mt-14 hidden md:grid grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`p-8 rounded-[12px] border transition-all duration-300 cursor-pointer ${
                index === active
                  ? "bg-[#2BAAE1] text-white border-[#2BAAE1] shadow-lg"
                  : "bg-[#E6F4FA] text-[#003946] border-[#003946]/60 hover:shadow-md"
              }`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-[85px] h-[80px] mx-auto mb-4 object-contain"
              />
              <h3 className="font-bold text-[20px] leading-[140%] text-center">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[140%] text-center mt-3">
                {item.desc}
              </p>
              <p className="mt-4 text-[14px] underline text-center">Learn More</p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <div className="w-[90%] p-6 rounded-[12px] border bg-[#2BAAE1] text-white border-[#2BAAE1] shadow-lg">
            <img
              src={features[active].icon}
              alt={features[active].title}
              className="w-[80px] h-[74px] mx-auto mb-4 object-contain"
            />
            <h3 className="font-bold text-[18px] leading-[140%] text-center">
              {features[active].title}
            </h3>
            <p className="text-[15px] leading-[140%] text-center mt-3">
              {features[active].desc}
            </p>
            <p className="mt-4 text-[14px] underline text-center">Learn More</p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 gap-6">
          <button
            onClick={prevSlide}
            disabled={!canPrev}
            className={`w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-md transition-all duration-200 select-none ${
              canPrev
                ? "bg-white cursor-pointer active:scale-95 hover:bg-[#f2f5f6]"
                : "bg-white/60 cursor-not-allowed opacity-50"
            }`}
          >
            <HiArrowLeft className="text-[#003946] text-[22px]" />
          </button>

          <div className="flex items-center gap-3">
            {features.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer transition ${
                  active === i ? "bg-[#003946]" : "border-2 border-[#003946]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={!canNext}
            className={`w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-md transition-all duration-200 select-none ${
              canNext
                ? "bg-white cursor-pointer active:scale-95 hover:bg-[#f2f5f6]"
                : "bg-white/60 cursor-not-allowed opacity-50"
            }`}
          >
            <HiArrowRight className="text-[#003946] text-[22px]" />
          </button>
        </div>
      </div>
    </section>
  );
}