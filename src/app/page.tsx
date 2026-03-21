import HeroSection   from "@/components/sections/HeroSection";
import WhatIsLanos   from "@/components/sections/WhatIsLanos";
import BlogTrailer    from "@/components/sections/BlogTrailer";
import BrandCollabs   from "@/components/sections/BrandCollabs";
import Testimonials   from "@/components/sections/Testimonials";
import Contact        from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatIsLanos />
      <BlogTrailer />
      <Testimonials />
      <BrandCollabs />
      <Contact />
    </>
  );
}
