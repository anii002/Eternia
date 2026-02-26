import React, { useMemo, useState } from "react";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Chevron({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="rgba(11,42,51,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialPlain({ icon, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0b2a33]/25 text-[#0b2a33] hover:bg-white/40 transition"
    >
      <span className="text-[16px] leading-none">{icon}</span>
    </a>
  );
}

function Group({ title, items, linkCls }) {
  if (!items?.length) return null;
  return (
    <div className="mt-4">
      <p className="text-[#0b2a33] font-semibold text-[13px] mb-2">{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((l) => (
          <a key={l} href="#" className={linkCls}>
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

function DesktopCols({ data, titleCls, linkCls }) {
  const products = data.find((d) => d.title === "Products");
  const why = data.find((d) => d.title === "Why Eternia");
  const features = data.find((d) => d.title === "Features");
  const quick = data.find((d) => d.title === "Quick links");

  return (
    <>
      <div>
        <h4 className={titleCls}>Products</h4>
        <Group title="By range" linkCls={linkCls} items={products?.groups?.[0]?.links || []} />
        <Group title="By type" linkCls={linkCls} items={products?.groups?.[1]?.links || []} />
        <Group title="By room" linkCls={linkCls} items={products?.groups?.[2]?.links || []} />
      </div>

      <div>
        <h4 className={titleCls}>Why Eternia</h4>
        <div className="mt-4 flex flex-col gap-2.5">
          {(why?.groups?.[0]?.links || []).map((l) => (
            <a key={l} href="#" className={linkCls}>
              {l}
            </a>
          ))}
        </div>

        <div className="mt-8">
          <h4 className={titleCls}>Find the right window</h4>
          <div className="mt-4">
            <a href="#" className={linkCls}>
              Find the right window
            </a>
          </div>
        </div>
      </div>

      <div>
        <h4 className={titleCls}>Features</h4>
        <div className="mt-4 flex flex-col gap-2.5">
          {(features?.groups?.[0]?.links || []).map((l) => (
            <a key={l} href="#" className={linkCls}>
              {l}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className={titleCls}>Contact & Support</h4>
        <div className="mt-4 flex flex-col gap-2.5">
          {(quick?.groups?.[0]?.links || []).map((l) => (
            <a key={l} href="#" className={linkCls}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default function EterniaFooter() {
  const data = useMemo(
    () => [
      {
        id: "products",
        title: "Products",
        groups: [
          { heading: "By range", links: ["Eternia Duraslim Edge", "Eternia Duraslim", "Eternia Essentials"] },
          { heading: "By type", links: ["Sliding Windows and Doors", "Openable Windows and Doors"] },
          {
            heading: "By room",
            links: ["Living room windows and doors", "Bedroom windows and doors", "Balcony windows and doors", "Kitchen windows and doors"],
          },
        ],
      },
      { id: "find-1", title: "Find the right window", groups: [{ heading: "", links: ["Find the right window"] }] },
      { id: "why", title: "Why Eternia", groups: [{ heading: "", links: ["Duranium™", "WIWA®", "Service and support", "About Us"] }] },
      {
        id: "features",
        title: "Features",
        groups: [
          {
            heading: "",
            links: ["Sound Proof", "Energy Efficient", "Waterproof", "Enhanced Security", "Dust and Pollution Proof", "Large Openings", "Storm Resistant", "Low Maintenance"],
          },
        ],
      },
      { id: "downloads", title: "Downloads", groups: [{ heading: "", links: ["Brochure", "Catalogue", "Warranty"] }] },
      { id: "quick", title: "Quick links", groups: [{ heading: "", links: ["Contact Us", "FAQ", "Privacy Policy", "Terms of use"] }] },
    ],
    []
  );

  const [open, setOpen] = useState("");

  const fontFamily =
    "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, sans-serif";

  const titleCls = "text-[#0b2a33] font-semibold text-[15px]";
  const linkCls =
    "font-normal text-[14px] leading-[145%] text-[#0b2a33]/85 hover:text-[#0b2a33] transition";

  return (
    <footer className="w-full bg-[#dfeaf0]" style={{ fontFamily }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');`}</style>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-[60px] pt-6 md:pt-[48px] pb-7 md:pb-[40px]">
        <div className="hidden md:flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-6 md:gap-[40px]">
            <img src="/icons/mainlogo-dark.png" alt="Eternia" className="h-[36px] md:h-[52px] object-contain" />
            <img src="/icons/birla.png" alt="Aditya Birla" className="h-[42px] md:h-[70px] object-contain" />
          </div>

          <p className="mt-3 md:mt-[18px] max-w-[860px] text-[#0b2a33]/90 text-[12px] sm:text-[13px] md:text-[15px] leading-[18px] md:leading-[24px]">
            Eternia is the latest product offering from Hindalco (Aditya Birla Group): India’s first WIWA® tested and
            certified windows made with a specially invented Duranium™ alloy
          </p>

          <div className="mt-4 md:mt-[22px] flex gap-3 md:gap-[16px]">
            <SocialPlain icon={<FaLinkedinIn />} label="LinkedIn" />
            <SocialPlain icon={<FaFacebookF />} label="Facebook" />
            <SocialPlain icon={<FaInstagram />} label="Instagram" />
            <SocialPlain icon={<FaYoutube />} label="YouTube" />
          </div>
        </div>

        <div className="md:hidden">
          <div className="rounded-[10px] overflow-hidden">
            <div className="flex">
              <div className="flex-1 bg-[#dfeaf0] px-4 pt-4 pb-3">
                <img
                  src="/icons/mainlogo-dark.png"
                  alt="Eternia"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <div className="w-[68px]  flex items-center justify-center px-2">
                <img
                  src="/icons/birla.png"
                  alt="Aditya Birla"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="bg-[#dfeaf0] px-4 pb-4">
              <p className="text-[#0b2a33]/90 text-[13px] leading-[19px] font-normal">
                Eternia is the latest product offering from Hindalco (Aditya Birla Group): India’s first WIWA® tested and
                certified windows made with a specially invented Duranium™ alloy
              </p>

              <div className="mt-4 flex items-center gap-3">
                <SocialPlain icon={<FaYoutube />} label="YouTube" />
                <SocialPlain icon={<FaFacebookF />} label="Facebook" />
                <SocialPlain icon={<FaInstagram />} label="Instagram" />
                <SocialPlain icon={<FaLinkedinIn />} label="LinkedIn" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-[40px] border-t border-[#0b2a33]/35 pt-0 md:pt-[40px]">
          <div className="hidden md:grid grid-cols-4 gap-[80px]">
            <DesktopCols data={data} titleCls={titleCls} linkCls={linkCls} />
          </div>

          <div className="md:hidden">
            <div className="divide-y divide-[#0b2a33]/35">
              {data.map((sec) => {
                const isOpen = open === sec.id;
                return (
                  <div key={sec.id} className="bg-transparent">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? "" : sec.id)}
                      className="w-full flex items-center justify-between px-4 py-[16px] active:scale-[0.99] transition"
                    >
                      <span className="text-[#0b2a33] font-semibold text-[14px] leading-[140%]">
                        {sec.title}
                      </span>
                      <Chevron open={isOpen} />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4">
                          {sec.groups.map((g, idx) => (
                            <div key={idx} className={idx ? "mt-4" : ""}>
                              {g.heading ? (
                                <p className="text-[#0b2a33] font-semibold text-[13px] leading-[140%] mb-2">
                                  {g.heading}
                                </p>
                              ) : null}
                              <div className="flex flex-col gap-2">
                                {g.links.map((l) => (
                                  <a key={l} href="#" className={linkCls}>
                                    {l}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#063c46]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-[60px] py-4">
          <p className="text-white/70 text-[11px] leading-[16px] text-center">
            “Eternia”, “Duranium™” and WIWA® are proprietary to Hindalco Industries Limited. Images are indicative.
          </p>
        </div>
      </div>
    </footer>
  );
}