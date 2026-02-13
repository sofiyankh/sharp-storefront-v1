import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price: number | null;
  image_url: string | null;
  description: string | null;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("All Products");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from("products").select("*");

      // Filter by category
      if (categorySlug) {
        const { data: category } = await supabase
          .from("categories")
          .select("id, name")
          .eq("slug", categorySlug)
          .maybeSingle();

        if (category) {
          setCategoryName(category.name);
          query = query.eq("category_id", category.id);
        }
      } else if (searchQuery) {
        setCategoryName(`Search results for "${searchQuery}"`);
        query = query.ilike("name", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        let filtered = data || [];

        // Apply price filter
        if (priceRange !== "all") {
          if (priceRange === "0-50") {
            filtered = filtered.filter(p => p.price <= 50);
          } else if (priceRange === "50-100") {
            filtered = filtered.filter(p => p.price > 50 && p.price <= 100);
          } else if (priceRange === "100-500") {
            filtered = filtered.filter(p => p.price > 100 && p.price <= 500);
          } else if (priceRange === "500+") {
            filtered = filtered.filter(p => p.price > 500);
          }
        }

        // Apply sorting
        if (sortBy === "price-low") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        setProducts(filtered);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categorySlug, searchQuery, sortBy, priceRange]);

  const clearFilters = () => {
    setSortBy("name");
    setPriceRange("all");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CategoryNav />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">{categoryName}</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>

            {(sortBy !== "name" || priceRange !== "all" || searchQuery || categorySlug) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discount_price || undefined}
                image={product.image_url || "/placeholder.svg"}
                description={product.description || undefined}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
