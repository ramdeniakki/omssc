import { Wrench, Truck, Users, HeartHandshake } from "lucide-react"

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Expert Maintenance",
    description:
      "Our certified technicians provide professional maintenance and repair services to keep your bike in top condition.",
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Free Delivery",
    description:
      "Enjoy free delivery on all bicycle purchases within the city limits. We ensure your bike arrives safely and on time.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Personalized Fitting",
    description: "Get a personalized bike fitting session with our experts to ensure maximum comfort and performance.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Warranty & Support",
    description: "All our bicycles come with comprehensive warranty coverage and dedicated customer support.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a range of services to enhance your cycling experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

