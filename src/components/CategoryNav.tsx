import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CategoryNav = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-card border-b sticky top-[120px] z-40 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 overflow-x-auto">
          <Button 
            variant={!currentCategory ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => navigate("/products")}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={currentCategory === category.slug ? "default" : "ghost"}
              className="whitespace-nowrap hover:bg-muted rounded-full"
              onClick={() => navigate(`/products?category=${category.slug}`)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
