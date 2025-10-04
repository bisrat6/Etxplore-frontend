import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Booking functionality not yet implemented in backend
        setBookings([]);
        setError('Booking functionality is not yet available. This feature will be added in a future update.');
      } catch (err: any) {
        console.error('Failed to fetch bookings:', err);
        setError('Booking functionality is not yet available.');
        toast({
          title: 'Feature Coming Soon',
          description: 'Booking functionality will be available in a future update',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <section className="relative bg-gradient-to-br from-primary via-primary-light to-earth py-24 text-primary-foreground">
          <div className="absolute inset-0 pattern-ethiopian opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl font-bold text-center"
            >
              My Bookings
            </motion.h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="border-2 border-destructive">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-destructive">
                    <AlertCircle className="w-6 h-6" />
                    <p>{error}</p>
                  </div>
                </CardContent>
              </Card>
            ) : bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-xl text-muted-foreground mb-6">
                  You haven't made any bookings yet.
                </p>
                <Button variant="adventure" onClick={() => navigate('/tours')}>
                  Browse Tours
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 hover:border-primary/20 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-2xl">{booking.tour?.name || 'Tour Name'}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Booking Date</p>
                              <p className="font-semibold">{new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Group Size</p>
                              <p className="font-semibold">{booking.tour?.maxGroupSize || 'N/A'} people</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Price</p>
                              <p className="font-semibold text-primary">${booking.price || booking.tour?.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => navigate(`/tours/${booking.tour?.id || booking.tour}`)}
                          >
                            View Tour
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
