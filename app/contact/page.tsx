import { Metadata } from 'next'
import Header from '@/components/header'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import { Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Arckijoe Designs | Get in Touch',
  description: 'Reach out to us for architectural design consultation or building material inquiries.',
}

export default function Contact() {
  return (
    <>
      <Header />
      <main className="w-full">
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-border bg-gradient-to-br from-primary to-primary/90 p-8 text-primary-foreground sm:p-10 lg:p-14">
              <div className="max-w-3xl">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                    Get in Touch
                  </p>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Let&apos;s work together
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/85">
                    Have a project in mind? Reach out to discuss your architectural goals, material needs, or the right next step for your build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>

        {/* Additional Info */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary">Additional Information</h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* Business Hours */}
              <div className="rounded-xl border border-border bg-white p-8 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">Business Hours</h3>
                <div className="space-y-2 text-foreground/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-foreground/70">
                  For urgent consultations outside business hours, please contact us via WhatsApp.
                </p>
              </div>

              {/* Location */}
              <div className="rounded-xl border border-border bg-white p-8 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">Location</h3>
                <div className="space-y-3">
                  <p className="text-foreground/80">
                    <span className="block font-medium text-primary">Arckijoe Designs</span>
                    <span>Lagos, Nigeria</span>
                  </p>
                  <p className="text-sm text-foreground/70">
                    We serve clients across Nigeria and beyond for design consultations and material supply.
                  </p>
                  <p className="text-sm text-foreground/70">
                    Flexible meeting options available including on-site consultations and virtual meetings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
              <p className="mt-4 text-foreground/70">
                Common questions about our services and process
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'How long does a typical project take?',
                  answer: 'Project timelines vary based on scope and complexity. A residential design consultation typically takes 2-4 weeks, while full architectural projects can take 3-6 months or longer depending on scale and approvals required.'
                },
                {
                  question: 'Do you offer consultations remotely?',
                  answer: 'Yes! We offer virtual consultations via video call or WhatsApp for initial discussions and ongoing project management. On-site consultations are also available for detailed assessments.'
                },
                {
                  question: 'What is your design process?',
                  answer: 'Our process includes: initial consultation, site analysis, concept development, detailed design, client feedback and revisions, final documentation, and project oversight during construction.'
                },
                {
                  question: 'Can you help with material selection?',
                  answer: 'Absolutely! Our expert architects provide guidance on selecting quality materials that match your project requirements, budget, and aesthetic preferences. We have relationships with trusted suppliers.'
                },
                {
                  question: 'Do you work with contractors?',
                  answer: 'Yes, we work seamlessly with contractors and can recommend reliable professionals. We also provide project oversight to ensure quality construction and adherence to design specifications.'
                },
                {
                  question: 'What areas do you serve?',
                  answer: 'While based in Lagos, we serve clients across Nigeria for design consultations, material supply, and project management. We offer flexible engagement models including remote consultations.'
                }
              ].map((item, index) => (
                <div key={index} className="rounded-lg border border-border bg-white p-6">
                  <h3 className="font-semibold text-primary mb-3">{item.question}</h3>
                  <p className="text-foreground/70">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-xl border-2 border-accent bg-accent/5 p-8 text-center">
              <p className="text-foreground/80">
                Didn't find your answer? <span className="font-semibold text-primary">Contact us directly</span> — we're always happy to discuss your specific needs and questions.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Why Clients Trust Us</h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-white p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <p className="text-primary font-semibold">Projects Completed</p>
                <p className="text-sm text-foreground/70 mt-2">Satisfied clients across Nigeria</p>
              </div>
              <div className="rounded-lg border border-border bg-white p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">15+</div>
                <p className="text-primary font-semibold">Years Experience</p>
                <p className="text-sm text-foreground/70 mt-2">Proven expertise in architecture</p>
              </div>
              <div className="rounded-lg border border-border bg-white p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
                <p className="text-primary font-semibold">Client Rating</p>
                <p className="text-sm text-foreground/70 mt-2">Based on client satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90">
              Fill out the form above or reach out directly via phone or WhatsApp
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center items-center">
              <a
                href="tel:+2349028115562"
                className="text-primary-foreground hover:text-accent transition-colors font-medium"
              >
                📞 Call: +234 902 811 5562
              </a>
              <span className="hidden sm:inline text-primary-foreground/50">•</span>
              <a
                href="https://wa.me/2347060630685"
                className="text-primary-foreground hover:text-accent transition-colors font-medium"
              >
                💬 WhatsApp: +234 706 063 0685
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
