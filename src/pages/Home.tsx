import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import TourCard from "@/components/TourCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import toursData from "@/data/tours-simple.json";

const Home = () => {
  // Get first 3 tours for featured section
  const featuredTours = toursData.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <Hero />

      <FeaturedSection />

      {/* Compact CTA to view all tours (tours grid removed) */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Looking for tours?</h3>
          <div className="flex justify-center">
            <Button asChild variant="adventure" size="lg">
              <Link to="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Traveler <span className="text-primary">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear what our adventurers have to say about their unforgettable
              Ethiopian experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                location: "United States",
                text: "The Simien Mountains trek was absolutely breathtaking. Our guide was knowledgeable and the landscapes were unlike anything I've ever seen!",
                rating: 5,
              },
              {
                name: "James Chen",
                location: "Singapore",
                text: "Visiting Lalibela's rock churches was a spiritual experience. The history and craftsmanship are incredible. Etxplore made everything seamless.",
                rating: 5,
              },
              {
                name: "Emma Wilson",
                location: "United Kingdom",
                text: "An adventure of a lifetime! From the Danakil Depression to the coffee ceremonies, every moment was magical. Highly recommend!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-lg border-2 hover:border-primary/20 transition-all hover-lift"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
