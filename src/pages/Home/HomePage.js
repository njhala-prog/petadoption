import { Testimonials } from "./components/Testimonials"
import { Hero } from "./components/Hero"
import { FeaturedPets } from "./components/FeaturedPets"
import { Faq } from "./components/Faq"
export const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedPets />
      <Faq />
      <Testimonials />
    </main>
  )
}
