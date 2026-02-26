import Hero from "../components/Hero";
import PerformanceSection from "../components/PerformanceSection";
import InnovationSection from "../components/InnovationSection";
import WhyChoose from "../components/WhyChoose";
import ModernSaaSSection from "../components/ExpertApprovedPerformance";
import SpacesSection from "../components/SpacesSection/SpacesSection";
import ThoughtfulReadsSection from "../components/ThoughtfulReadsSection";
import ExploreHero from "../components/ExploreHero";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";




export default function Home() {
  return (
    <>
      <Hero />
      <PerformanceSection />
      <InnovationSection />
      <WhyChoose />
      <SpacesSection />
      <ModernSaaSSection />
      <ThoughtfulReadsSection />
       <ExploreHero />
       <FAQSection />
       <Footer />


    </>
  );
}