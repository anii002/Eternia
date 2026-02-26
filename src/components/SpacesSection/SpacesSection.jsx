import React from "react";
import BeforeAfterSection from "./BeforeAfterSection";
import PropertySection from "./PropertySection";
import TestimonialsSection from "./TestimonialsSection";

export default function SpacesSection() {
  return (
    <main className="w-full">
      <BeforeAfterSection />
      <PropertySection />
      <TestimonialsSection />
    </main>
  );
}