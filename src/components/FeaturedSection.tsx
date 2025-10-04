import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Coffee, Church, Flame } from "lucide-react";
import lalibela from "@/assets/lalibela-church.jpg";
import danakil from "@/assets/danakil-depression.jpg";
import bluenile from "@/assets/blue-nile-falls.jpg";
import coffee from "@/assets/coffee-ceremony.jpg";

const features = [
  {
    icon: Church,
    title: "Ancient Heritage",
    description: "Explore rock-hewn churches and historical sites dating back thousands of years",
    image: lalibela,
    color: "text-accent"
  },
  {
    icon: Mountain,
    title: "Dramatic Landscapes",
    description: "Trek through stunning highlands, volcanic formations, and pristine wilderness",
    image: bluenile,
    color: "text-primary"
  },
  {
    icon: Flame,
    title: "Unique Geology",
    description: "Witness otherworldly volcanic landscapes in the Danakil Depression",
    image: danakil,
    color: "text-secondary"
  },
  {
    icon: Coffee,
    title: "Rich Culture",
    description: "Experience authentic Ethiopian traditions, cuisine, and coffee ceremonies",
    image: coffee,
    color: "text-earth"
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Explore <span className="text-primary">Ethiopia</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a land where ancient history meets breathtaking natural beauty, 
            offering adventures unlike anywhere else on Earth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover-lift border-2 hover:border-primary/20 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-full bg-background flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
