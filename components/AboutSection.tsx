import { CheckCircle } from "lucide-react"

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
        <div className="relative h-[450px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.4160222768323!2d79.1678674752222!3d19.737471681608014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2c5c6ea6fdff9%3A0x86ff940ffae429b6!2sOM%20SRI%20SAI%20CYCLE%20STORES!5e0!3m2!1sen!2sin!4v1742452758630!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
