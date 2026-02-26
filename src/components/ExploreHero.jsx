import React from "react";

export default function ExploreHero() {
  return (
    <section className="relative w-full h-[451px] overflow-hidden">
      
      <img
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=80"
        alt="Explore Windows"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        <h1
          className="
            text-white
            font-normal
            text-[32px]
            md:text-[44px]
            lg:text-[56px]
            leading-[120%]
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]
          "
        >
          Explore the Windows That Mirror You !.
        </h1>

        <button
          className="
            mt-6
            px-6
            py-3
            text-white
            text-[15px]
            rounded-[8px]
            border border-white/60
            bg-white/10
            backdrop-blur-[6px]
            hover:bg-white/20
            transition
          "
        >
          Connect with Design Experts
        </button>

      </div>
    </section>
  );
}