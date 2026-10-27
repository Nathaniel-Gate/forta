import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Contact } from "@/components/sections/Contact";
import { Engagement } from "@/components/sections/Engagement";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Team } from "@/components/sections/Team";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyNow } from "@/components/sections/WhyNow";

/**
 * Built for a 10-second visit: the hero alone carries the offer and three
 * numbers. Then proof, the offer, the method, the savings, the people, the
 * commercial shape, objections, and the ask.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WhyNow />
        <WhatWeDo />
        <Method />
        <Team />
        <Engagement />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
