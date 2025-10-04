import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Filter, Loader2, AlertCircle } from "lucide-react";
import { toursAPI } from "@/lib/api";
import { motion } from "framer-motion";
import ethiopianToursData from "@/data/ethiopian-tours.json";

const Tours = () => {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [tours, setTours] = useState<Array<Record<string, unknown>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useLocalData, setUseLocalData] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: Record<string, unknown> = {};
        if (difficulty !== "all") params.difficulty = difficulty;
        if (sort) params.sort = sort;
        params.page = page;
        params.limit = limit;
        const response = await toursAPI.getAll(params);
        setTours(response.data.data);
      } catch (err: unknown) {
        console.error("Failed to fetch tours:", err);
        setError("Failed to load tours from server. Please try again later.");
        setTours([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [difficulty, sort, page, limit]);

  // Tours are already filtered in useEffect
  const filteredTours = tours;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-primary via-primary-light to-earth py-24 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 pattern-ethiopian" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Discover Your Next{" "}
                <span className="text-secondary">Adventure</span>
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Browse our carefully curated collection of tours showcasing
                Ethiopia's most spectacular destinations, from ancient
                historical sites to dramatic natural wonders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter by difficulty:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={difficulty === "all" ? "adventure" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty("all")}
                >
                  All Tours
                </Button>
                <Button
                  variant={difficulty === "easy" ? "adventure" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty("easy")}
                >
                  Easy
                </Button>
                <Button
                  variant={difficulty === "medium" ? "adventure" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty("medium")}
                >
                  Medium
                </Button>
                <Button
                  variant={difficulty === "difficult" ? "adventure" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty("difficult")}
                >
                  Difficult
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-secondary/10 border border-secondary rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                <p className="text-sm text-foreground">{error}</p>
              </motion.div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredTours.length}
                </span>{" "}
                tour
                {filteredTours.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-2 py-1 border"
                >
                  <option value="">Sort</option>
                  <option value="-ratingsAverage,price">Top rated</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-createdAt">Newest</option>
                </select>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="px-2 py-1 border"
                >
                  <option value={6}>6 / page</option>
                  <option value={9}>9 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={24}>24 / page</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours.map((tour) => (
                    <TourCard key={tour._id ?? tour.id} tour={tour} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    className="px-3 py-1 border"
                  >
                    Prev
                  </button>
                  <span>Page {page}</span>
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border"
                  >
                    Next
                  </button>
                </div>

                {filteredTours.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground">
                      No tours found with the selected filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tours;
