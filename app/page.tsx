import AboutSection from "@/components/AboutSection"
import CategorySection from "@/components/CategorySection"
import FeaturedProducts from "@/components/FeaturedProducts"
import Hero from "@/components/Hero"
import ServicesSection from "@/components/ServicesSection"
import { getFeaturedProducts } from "@/lib/products"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <CategorySection />
      <FeaturedProducts products={featuredProducts} />
      <AboutSection />
      <ServicesSection />
    </div>
  )
}
