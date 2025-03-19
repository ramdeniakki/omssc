import { CheckCircle } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">About OMSSC</h2>
          <p className="text-muted-foreground mb-6">
            At , we're passionate about bicycles and committed to providing our customers with the highest
            quality bikes and exceptional service. With over 15 years of experience in the industry, we've built a
            reputation for excellence and reliability.
          </p>
          <p className="text-muted-foreground mb-6">
            Our team of experienced technicians ensures that every bicycle we sell is meticulously assembled and tuned
            to perfection. We believe that a great biking experience starts with a properly set up bicycle.
          </p>
          <ul className="space-y-3">
            {[
              "Wide selection of premium bicycles",
              "Expert assembly and maintenance",
              "Personalized fitting services",
              "Lifetime free adjustments",
              "Competitive pricing and financing options",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Bicycle shop interior"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
