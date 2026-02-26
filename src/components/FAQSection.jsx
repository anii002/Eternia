import React, { useMemo, useState } from "react";

function PlusIcon({ open }) {
  return (
    <span className="relative inline-block w-[20px] h-[20px]">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white" />
      {!open && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-white" />
      )}
    </span>
  );
}

function XIcon() {
  return (
    <span className="relative inline-block w-[20px] h-[20px]">
      <span className="absolute left-1/2 top-1/2 w-[20px] h-[2px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-45" />
      <span className="absolute left-1/2 top-1/2 w-[20px] h-[2px] bg-white -translate-x-1/2 -translate-y-1/2 -rotate-45" />
    </span>
  );
}

export default function FAQSection() {
  const answerContent = (
    <div className="text-white/90 text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] md:leading-[28px] space-y-4 font-normal">
      <p>
        Eternia offers aluminium windows and doors of every type, size and colour! Our main offerings include:
      </p>

      <div className="space-y-1">
        <p>Sliding aluminium windows and doors</p>
        <p>Openable/casement aluminium windows and doors.</p>
        <p>
          We also offer aluminium windows and doors for all rooms: including living rooms, kitchens and bedrooms.
        </p>
      </div>

      <p>
        Our aluminium windows and doors can be classified into Duraslim Edge, Duraslim and Essentials - which are three ranges of high-quality products designed to ensure that every Indian home can have aluminium windows.
      </p>
    </div>
  );

  const faqs = useMemo(
    () => [
      "What are the different windows offered by Eternia?",
      "Which window is better for me: aluminium, wood or uPVC?",
      "Do you manufacture aluminium windows and doors?",
      "What are the different colours you offer in aluminium windows?",
    ],
    []
  );

  const [open, setOpen] = useState(0);

  return (
    <section className="w-full bg-[#083f47] py-[60px] md:py-[80px]">
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10">

        <div className="text-center">
          <h2 className="text-white font-normal text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[120%]">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-4 md:mt-6 h-[1px] w-[180px] sm:w-[280px] md:w-[420px] bg-white/50" />
        </div>

        <div className="mt-[40px] md:mt-[60px]">

          {faqs.map((question, i) => {
            const isOpen = open === i;

            return (
              <div key={i} className="border-b border-white/40">

                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex justify-between items-center py-[16px] md:py-[22px] gap-6"
                >
                  <span className="text-white font-semibold text-[15px] sm:text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-left">
                    {question}
                  </span>

                  {isOpen ? <XIcon /> : <PlusIcon />}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] pb-[20px] md:pb-[24px]" : "max-h-0"
                  }`}
                >
                  {answerContent}
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}