import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import coffeeImage from "@/assets/coffee-ceremony.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary-light to-earth py-24 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 pattern-ethiopian" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Discover Ethiopia with <span className="text-secondary">Etxplore</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                We're passionate about sharing Ethiopia's incredible beauty, ancient heritage, 
                and vibrant culture with travelers from around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded by a team of Ethiopian adventure enthusiasts and experienced tour guides, 
                    Etxplore was born from a simple mission: to showcase the extraordinary diversity 
                    and beauty of Ethiopia to the world.
                  </p>
                  <p>
                    From the dramatic peaks of the Simien Mountains to the otherworldly landscapes 
                    of the Danakil Depression, from the ancient rock churches of Lalibela to the 
                    vibrant markets of Addis Ababa, we believe Ethiopia offers experiences unlike 
                    anywhere else on Earth.
                  </p>
                  <p>
                    With years of local expertise and a deep love for our country, we craft authentic, 
                    immersive experiences that go beyond typical tourism. We partner with local communities, 
                    support sustainable practices, and ensure every journey creates lasting positive impact.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl animate-slide-in">
                <img 
                  src={coffeeImage} 
                  alt="Ethiopian coffee ceremony"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                What drives us to create exceptional travel experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Authentic Experiences",
                  description: "We prioritize genuine cultural connections and immersive local interactions",
                  color: "text-accent"
                },
                {
                  icon: Users,
                  title: "Community Focus",
                  description: "Supporting local communities and ensuring tourism benefits everyone",
                  color: "text-primary"
                },
                {
                  icon: Award,
                  title: "Expert Guides",
                  description: "Knowledgeable, passionate local guides who bring Ethiopia's stories to life",
                  color: "text-secondary"
                },
                {
                  icon: Globe,
                  title: "Sustainable Travel",
                  description: "Responsible tourism practices that protect Ethiopia's natural and cultural heritage",
                  color: "text-earth"
                }
              ].map((value, index) => (
                <Card key={index} className="text-center hover-lift border-2 hover:border-primary/20 transition-all">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center ${value.color}`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary via-primary-light to-earth text-primary-foreground border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 pattern-ethiopian" />
              <CardContent className="p-12 md:p-16 text-center relative z-10">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  Ready to Explore Ethiopia?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Join us on an unforgettable journey through one of Africa's most captivating destinations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="hero" size="xl">
                    <Link to="/tours">
                      Browse Tours
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="xl" className="bg-background/10 backdrop-blur-sm text-primary-foreground border-primary-foreground/30 hover:bg-background/20">
                    <a href="mailto:hello@etxplore.com">
                      Contact Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
