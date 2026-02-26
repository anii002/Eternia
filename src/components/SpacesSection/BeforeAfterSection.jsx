import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function BeforeAfterSection() {
  return (
    <section className="w-full overflow-hidden bg-[url('/images/pattern.png')] bg-cover bg-center bg-no-repeat">

      <div className="relative left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] max-w-7xl py-12 sm:py-14 md:py-16 flex flex-col items-center">

        <h2 className="relative inline-block font-sans font-normal text-[34px] sm:text-[42px] md:text-[48px] leading-[1.15] text-center text-[#003946] pb-4 mb-8 sm:mb-10">
          Where Spaces Come Alive
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[70%] sm:w-[60%] h-[1px] bg-[#003946]" />
        </h2>

        <div
          className="relative w-full flex flex-col md:flex-row items-stretch justify-center"
          style={{ gap: "10px" }}
        >

          <div className="relative w-full md:flex-1 h-[240px] sm:h-[320px] md:h-[420px] rounded-[10px] overflow-hidden">
            <img
              src="/images/left.png"
              alt="Before"
              className="w-full h-full object-cover"
              draggable={false}
            />

            <span className="absolute top-4 left-4 sm:top-5 sm:left-5 w-[80px] h-[32px] flex items-center justify-center text-[14px] font-medium bg-white/60 backdrop-blur-sm border border-white rounded-[5px] text-[#003946]">
              Before
            </span>
          </div>

          <div className="relative w-full md:flex-1 h-[240px] sm:h-[320px] md:h-[420px] rounded-[10px] overflow-hidden">
            <img
              src="/images/right.png"
              alt="After"
              className="w-full h-full object-cover"
              draggable={false}
            />

            <span className="absolute top-4 right-4 sm:top-5 sm:right-5 w-[80px] h-[32px] flex items-center justify-center text-[14px] font-medium bg-white/60 backdrop-blur-sm border border-white rounded-[5px] text-[#003946]">
              After
            </span>
          </div>

          <div className="hidden md:flex absolute w-[80px] h-[80px] bg-white rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.12)] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center -space-x-2 text-[#003946]">
              <HiChevronLeft size={34} strokeWidth={1.6} />
              <HiChevronRight size={34} strokeWidth={1.6} />
            </div>
          </div>

          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] bg-white rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.14)] flex items-center justify-center">
            <div className="flex items-center -space-x-2 text-[#003946]">
              <HiChevronLeft size={28} strokeWidth={1.6} />
              <HiChevronRight size={28} strokeWidth={1.6} />
            </div>
          </div>

        </div>

        <button className="mt-8 sm:mt-10 font-bold text-[14px] underline underline-offset-[6px] text-[#1A3C3C] hover:opacity-80 transition">
          View All
        </button>

      </div>

    </section>
  );
}