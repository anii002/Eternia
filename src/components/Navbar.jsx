import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const toggleAcc = (key) => setMobileAcc((prev) => (prev === key ? null : key));

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className={`mx-auto transition-all duration-300 w-full md:w-[85%] md:mt-6 md:rounded-2xl ${scrolled ? "md:mt-3" : ""}`}>
        <div
          className={`flex items-center justify-between px-4 md:px-8 py-3 md:py-4 transition-all duration-300 rounded-none md:rounded-2xl ${
            scrolled
              ? "bg-white text-[#003946] shadow-2xl border border-gray-200"
              : "bg-white/95 md:bg-white/10 md:backdrop-blur-xl border border-white/20 text-[#003946] md:text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <img src="/icons/mainlogo-dark.png" alt="Eternia Logo" className="h-8 md:h-10 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8 relative text-[16px]">
            <div className="relative" onMouseEnter={() => setOpenMenu("products")} onMouseLeave={() => setOpenMenu(null)}>
              <button className="flex items-center gap-1 font-semibold text-[16px]">
                Products
                <ChevronDown size={16} className={`transition-transform duration-300 ${openMenu === "products" ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute top-10 left-0 bg-white text-black rounded-xl shadow-xl w-52 py-3 transition-all duration-300 origin-top ${
                  openMenu === "products" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Sliding Windows
                </a>
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Casement Windows
                </a>
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Slimline Systems
                </a>
              </div>
            </div>

            <div className="relative" onMouseEnter={() => setOpenMenu("why")} onMouseLeave={() => setOpenMenu(null)}>
              <button className="flex items-center gap-1 text-[16px]">
                Why Eternia
                <ChevronDown size={16} className={`transition-transform duration-300 ${openMenu === "why" ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute top-10 left-0 bg-white text-black rounded-xl shadow-xl w-52 py-3 transition-all duration-300 origin-top ${
                  openMenu === "why" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Our Legacy
                </a>
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Innovation
                </a>
                <a href="#" className="block px-5 py-2 hover:bg-gray-100 text-[16px]">
                  Impact Metrics
                </a>
              </div>
            </div>

            <a
              href="#"
              className={`transition text-[16px] ${scrolled ? "text-gray-700 hover:text-black" : "hover:text-gray-300"}`}
            >
              Services & Supports
            </a>

            <a
              href="#"
              className={`transition text-[16px] ${scrolled ? "text-gray-700 hover:text-black" : "hover:text-gray-300"}`}
            >
              News and Events
            </a>

            <a
              href="#"
              className={`transition text-[16px] ${scrolled ? "text-gray-700 hover:text-black" : "hover:text-gray-300"}`}
            >
              Help
            </a>
          </div>

          <button
            className={`hidden md:block px-5 py-2 rounded-md text-[16px] font-medium transition ${
              scrolled ? "bg-[#003946] text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Book a Consultation →
          </button>

          <div className="md:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center">
              <img src="/icons/birla.png" alt="Aditya Birla" className="h-9 w-auto" />
            </div>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="w-9 h-9 grid place-items-center rounded-md border border-gray-200 bg-white shadow-sm active:scale-95 transition"
            >
              {mobileOpen ? <X size={20} className="text-[#003946]" /> : <Menu size={20} className="text-[#003946]" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-gray-200 ${
            mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2 text-[#003946] text-[14px]">
            <button
              onClick={() => toggleAcc("products")}
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 text-[14px]"
            >
              <span className="font-medium">Products</span>
              <ChevronDown size={18} className={`transition-transform ${mobileAcc === "products" ? "rotate-180" : ""}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileAcc === "products" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden pl-3 pr-2 pb-2">
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Sliding Windows
                </a>
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Casement Windows
                </a>
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Slimline Systems
                </a>
              </div>
            </div>

            <button
              onClick={() => toggleAcc("why")}
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 text-[14px]"
            >
              <span className="font-medium">Why Eternia</span>
              <ChevronDown size={18} className={`transition-transform ${mobileAcc === "why" ? "rotate-180" : ""}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileAcc === "why" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden pl-3 pr-2 pb-2">
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Our Legacy
                </a>
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Innovation
                </a>
                <a href="#" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
                  Impact Metrics
                </a>
              </div>
            </div>

            <a href="#" className="block py-3 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
              Services & Supports
            </a>

            <a href="#" className="block py-3 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
              News and Events
            </a>

            <a href="#" className="block py-3 px-3 rounded-lg hover:bg-gray-50 text-[14px]">
              Help
            </a>

            <button className="w-full mt-2 py-3 rounded-xl bg-[#003946] text-white font-medium text-[14px]">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}