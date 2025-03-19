"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [remainingSubmissions, setRemainingSubmissions] = useState<number | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {

        if (response.status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: data.error,
            variant: "destructive",
          })
          return
        }

        throw new Error(data.error || 'Failed to send message')
      }


      if (data.remaining !== undefined) {
        setRemainingSubmissions(data.remaining)
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "success",
        duration: 10000, // Show for 10 seconds
      })

    
      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Something went wrong!",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6 text-muted-foreground">
              Have questions about our products or services? Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Address</h3>
                <address className="not-italic text-muted-foreground">
                  <p>Near Bus stand Main Road</p>
                  <p>Gadchandur, Chandrapur</p>
                </address>
              </div>

              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">(+91) 9860224423</p>
              </div>

              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">workingwithakki@gmail.com</p>
              </div>

              {remainingSubmissions !== null && (
                <div className="mt-6 p-3 bg-muted rounded-md">
                  <p className="text-sm">
                    You have <span className="font-bold">{remainingSubmissions}</span> message submissions
                    remaining today. Our system allows a maximum of 10 messages per user every 3 hours.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
