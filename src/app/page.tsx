import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Archetypes } from "@/components/sections/Archetypes";
import { Calculator } from "@/components/sections/Calculator";
import { Contact } from "@/components/sections/Contact";
import { CostOfRenting } from "@/components/sections/CostOfRenting";
import { Engagement } from "@/components/sections/Engagement";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Outcomes } from "@/components/sections/Outcomes";
import { Positioning } from "@/components/sections/Positioning";
import { Systems } from "@/components/sections/Systems";
import { ThirdPath } from "@/components/sections/ThirdPath";

/**
 * Page order is the argument: the problem (cost), the idea (third path),
 * the payoff (outcomes), the method, the scope, the numbers, the category,
 * the fit, the commercial shape, the objections, then the ask.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CostOfRenting />
        <ThirdPath />
        <Outcomes />
        <Method />
        <Systems />
        <Calculator />
        <Positioning />
        <Archetypes />
        <Engagement />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
