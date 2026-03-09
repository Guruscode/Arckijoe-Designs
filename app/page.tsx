import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Hero from '@/components/hero'
import ServiceCard from '@/components/service-card'
import ProductCard from '@/components/product-card'
import Footer from '@/components/footer'
import ProjectsGallery from '@/components/projects-gallery'
import PlansGallery from '@/components/plans-gallery'
import ProcessVisualization from '@/components/process-visualization'
import { ArrowRight, Hammer, Home as HomeIcon, Zap, Award, Users, ShoppingCart } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <Hero
          title="Designing spaces that inspire, perform, and stand the test of time."
          subtitle="Welcome to Arckijoe Designs"
          description="Expert architectural design and premium building materials for your dream home or commercial development."
          ctaText="Book a Consultation"
          ctaHref="/contact"
          secondaryCtaText="Explore Services"
          secondaryCtaHref="/services"
          background="gradient"
          align="center"
        />

        {/* About Section */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left - CEO Bio */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Meet the Visionary Behind Our Success
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-foreground/80">
                    <span className="font-semibold text-primary">I'm an architect</span> — a problem solver passionate about transforming ideas into elegant, functional, and structurally sound spaces.
                  </p>
                  <p className="text-foreground/70">
                    From dream homes to commercial developments, I believe every project tells a story. My mission is to create spaces where form meets function, where aesthetics inspire confidence, and where every structure stands the test of time.
                  </p>
                  <p className="text-foreground/70">
                    With a commitment to innovation and sustainable design, I work closely with clients to bring their visions to life with integrity, creativity, and expertise.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Link href="/about">
                      Learn More About Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Placeholder Image */}
              <div className="relative h-96 w-full overflow-hidden rounded-xl bg-secondary shadow-soft-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">🏗️</div>
                    <p className="text-sm text-foreground/50">Professional Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                What We Offer
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
                Comprehensive solutions for all your architectural and building needs
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={<HomeIcon className="h-6 w-6" />}
                title="Architectural Design"
                description="Custom design solutions tailored to your vision and requirements."
                features={['3D Visualization', 'Structural Plans', 'Site Analysis', 'Sustainable Design']}
              />
              <ServiceCard
                icon={<ShoppingCart className="h-6 w-6" />}
                title="Building Materials"
                description="Premium quality materials for strong and beautiful buildings."
                features={['Original Products', 'Expert Guidance', 'Affordable Pricing', 'Reliable Supply']}
              />
              <ServiceCard
                icon={<Award className="h-6 w-6" />}
                title="Expert Consultation"
                description="Professional guidance from experienced architects."
                features={['Project Planning', 'Budget Optimization', 'Timeline Management', 'Quality Assurance']}
              />
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Link href="/services">
                  Explore All Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Why Choose Arckijoe Designs
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
                Excellence in every project, dedication to your vision
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Hammer className="h-6 w-6" />,
                  title: 'Quality Craftsmanship',
                  description: 'Meticulous attention to detail in every project'
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: 'Innovation',
                  description: 'Modern solutions for contemporary needs'
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Client-Focused',
                  description: 'Your vision is our priority'
                },
                {
                  icon: <Award className="h-6 w-6" />,
                  title: 'Professional Team',
                  description: 'Experienced architects and consultants'
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3 rounded-lg border border-border bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-primary text-center">{item.title}</h3>
                  <p className="text-center text-sm text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Gallery Section */}
        <ProjectsGallery />

        {/* Plans Gallery Section */}
        <PlansGallery />

        {/* Process Visualization Section */}
        <ProcessVisualization />

        {/* Contact CTA Section */}
        <section className="border-b border-border bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Transform Your Space?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90">
              Let's discuss your project and bring your vision to life
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-accent text-primary hover:bg-accent/90"
              >
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="https://wa.me/2347060630685" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-4 justify-center sm:flex-row">
              <a
                href="tel:+2349028115562"
                className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
              >
                📞 +234 902 811 5562
              </a>
              <span className="hidden sm:inline text-primary-foreground/50">•</span>
              <a
                href="https://wa.me/2347060630685"
                className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
              >
                💬 +234 706 063 0685
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
