import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Loader2,
  AlertCircle,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import { toursAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const TourManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    summary: '',
    price: '',
    duration: '',
    maxGroupSize: '',
    difficulty: 'easy',
    startLocation: '',
    locations: '',
    startDates: '',
    imageCover: '',
    images: '',
    guides: '',
    secretTour: false
  });

  useEffect(() => {
    // Redirect if not admin or lead-guide
    if (!['admin', 'lead-guide'].includes(user?.role)) {
      navigate('/');
      toast({
        title: 'Access Denied',
        description: 'Admin access required',
        variant: 'destructive',
      });
      return;
    }

    fetchTours();
  }, [user, navigate, toast]);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await toursAPI.getAll();
      // If current user is a lead-guide, only show tours they're assigned to
      let toursList = response.data.data || [];
      if (user?.role === 'lead-guide') {
        const userId = (user as any)._id ?? (user as any).id;
        toursList = toursList.filter((t: any) =>
          (t.guides || []).some((g: any) => String(g._id ?? g) === String(userId))
        );
      }
      setTours(toursList);
    } catch (err: any) {
      console.error('Failed to fetch tours:', err);
      setError('Failed to load tours');
      toast({
        title: 'Error',
        description: 'Failed to load tours',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTour(null);
    setFormData({
      name: '',
      description: '',
      summary: '',
      price: '',
      duration: '',
      maxGroupSize: '',
      difficulty: 'easy',
      startLocation: '',
      locations: '',
      startDates: '',
      imageCover: '',
      images: '',
      guides: '',
      secretTour: false
    });
    setShowForm(true);
  };

  const handleEdit = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name || '',
      description: tour.description || '',
      summary: tour.summary || '',
      price: tour.price?.toString() || '',
      duration: tour.duration?.toString() || '',
      maxGroupSize: tour.maxGroupSize?.toString() || '',
      difficulty: tour.difficulty || 'easy',
      startLocation: tour.startLocation?.description || '',
      locations: tour.locations?.map((loc: any) => loc.description).join(', ') || '',
      startDates: tour.startDates?.join(', ') || '',
      imageCover: tour.imageCover || '',
      images: tour.images?.join(', ') || '',
      guides: tour.guides?.join(', ') || '',
      secretTour: tour.secretTour || false
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const tourData = {
        name: formData.name,
        description: formData.description,
        summary: formData.summary,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration) || 1,
        maxGroupSize: parseInt(formData.maxGroupSize) || 10,
        difficulty: formData.difficulty,
        startLocation: formData.startLocation ? {
          type: 'Point',
          coordinates: [0, 0], // Default coordinates
          address: formData.startLocation,
          description: formData.startLocation
        } : undefined,
        locations: formData.locations ? formData.locations.split(',').map(loc => ({
          type: 'Point',
          coordinates: [0, 0],
          address: loc.trim(),
          description: loc.trim()
        })) : [],
        startDates: formData.startDates ? formData.startDates.split(',').map(date => new Date(date.trim())) : [],
        imageCover: formData.imageCover || undefined,
        images: formData.images ? formData.images.split(',').map(img => img.trim()).filter(img => img) : [],
        guides: formData.guides ? formData.guides.split(',').map(guide => guide.trim()).filter(guide => guide) : [],
        secretTour: formData.secretTour
      };

      if (editingTour) {
        await toursAPI.update(editingTour.id, tourData);
        toast({
          title: 'Success',
          description: 'Tour updated successfully',
        });
      } else {
        await toursAPI.create(tourData);
        toast({
          title: 'Success',
          description: 'Tour created successfully',
        });
      }

      setShowForm(false);
      setEditingTour(null);
      fetchTours();
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to save tour',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await toursAPI.delete(id);
      toast({
        title: 'Success',
        description: 'Tour deleted successfully',
      });
      setTours(tours.filter(tour => tour.id !== id));
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to delete tour',
        variant: 'destructive',
      });
    }
    setDeleteId(null);
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || tour.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg">Loading tours...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-primary via-primary-light to-earth py-24 text-primary-foreground">
          <div className="absolute inset-0 pattern-ethiopian opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 flex items-center gap-4">
                <MapPin className="w-12 h-12" />
                Tour Management
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Create, update, and manage all tours on the platform.
              </p>
              {/* show current user role for debugging/clarity */}
              <p className="mt-3 text-sm text-primary-foreground/80">Role: <span className="font-medium">{(user as any)?.role ?? 'guest'}</span></p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>
                {['admin', 'lead-guide'].includes(user?.role) && (
                  <Button onClick={handleCreate} variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Tour
                  </Button>
                )}
              </div>
            </div>

            {/* Tour Form */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>
                      {editingTour ? 'Edit Tour' : 'Create New Tour'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Tour Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration (days)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxGroupSize">Max Group Size</Label>
                          <Input
                            id="maxGroupSize"
                            type="number"
                            value={formData.maxGroupSize}
                            onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="difficulty">Difficulty</Label>
                          <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="difficult">Difficult</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="startLocation">Start Location</Label>
                          <Input
                            id="startLocation"
                            value={formData.startLocation}
                            onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                          id="summary"
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="startDates">Start Dates (comma separated)</Label>
                          <Input
                            id="startDates"
                            value={formData.startDates}
                            onChange={(e) => setFormData({ ...formData, startDates: e.target.value })}
                            placeholder="2024-01-15, 2024-02-15"
                          />
                        </div>
                        <div>
                          <Label htmlFor="imageCover">Cover Image URL</Label>
                          <Input
                            id="imageCover"
                            value={formData.imageCover}
                            onChange={(e) => setFormData({ ...formData, imageCover: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="images">Image URLs (comma separated)</Label>
                        <Input
                          id="images"
                          value={formData.images}
                          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                          placeholder="url1, url2, url3"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" disabled={submitting} variant="hero">
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              {editingTour ? 'Update Tour' : 'Create Tour'}
                            </>
                          )}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Tours List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:border-primary/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{tour.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{tour.summary}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {(() => {
                            const userId = (user as any)?._id ?? (user as any)?.id;
                            const canModify =
                              user?.role === 'admin' ||
                              (user?.role === 'lead-guide' &&
                                (tour.guides || []).some((g: any) =>
                                  String(g._id ?? g) === String(userId)
                                ));
                            if (!canModify) return null;
                            return (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(tour)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDeleteId(tour.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-semibold text-primary">${tour.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{tour.duration} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Difficulty:</span>
                          <span className="capitalize">{tour.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Group:</span>
                          <span>{tour.maxGroupSize} people</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {searchTerm || difficultyFilter !== 'all' 
                    ? 'No tours match your filters' 
                    : 'No tours available'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tour? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default TourManagement;
