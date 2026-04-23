import EdTechHeroSection       from "@/components/sections/edtech/EdTechHeroSection";
import TechTracksSection       from "@/components/sections/edtech/TechTracksSection";
import FeaturedBenefitsSection from "@/components/sections/edtech/FeaturedBenefitsSection";
import RoadmapSection          from "@/components/sections/edtech/RoadmapSection";
import VoicesSection           from "@/components/sections/edtech/VoicesSection";
import CareerOutcomesSection   from "@/components/sections/edtech/CareerOutcomesSection";
import EdTechClosingSection    from "@/components/sections/edtech/EdTechClosingSection";
import { getAllTracks }         from "@/lib/course/api";

export const metadata = {
  title: "EdTech · Lanos IT Solutions",
  description:
    "Lanos is not a training institute — it is a structured Tech Career Ecosystem. Build beyond coding.",
};

export default async function EdTechPage() {
  const tracks = await getAllTracks();
  return (
    <>
      <EdTechHeroSection />
      <TechTracksSection tracks={tracks} />
      <FeaturedBenefitsSection />
      <RoadmapSection />
      <CareerOutcomesSection />
      <VoicesSection />
      <EdTechClosingSection />
    </>
  );
}