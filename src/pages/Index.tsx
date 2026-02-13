import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryIcon from "@/components/CategoryIcon";
import BrandCard from "@/components/BrandCard";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import vegetables from "@/assets/vegetables.png";
import fruits from "@/assets/fruits.png";
import strawberry from "@/assets/strawberry.png";

const Index = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: "Mobile", image: "/categories/mobile.png", slug: "mobile" },
    { name: "Cosmetics", image: "/categories/cosmetics.png", slug: "cosmetics" },
    { name: "Electronics", image: "/categories/electronics.png", slug: "electronics" },
    { name: "Furniture", image: "/categories/furniture.png", slug: "furniture" },
    { name: "Watches", image: "/categories/watches.png", slug: "watches" },
    { name: "Decor", image: "/categories/decor.png", slug: "decor" },
    { name: "Accessories", image: "/categories/accessories.png", slug: "accessories" },
  ];

  const brands = [
    { name: "IPHONE", discount: "UP to 80% OFF", image: "/brands/iphone.png", bgColor: "#2D3436" },
    { name: "REALME", discount: "UP to 80% OFF", image: "/brands/realme.png", bgColor: "#F7DC6F" },
    { name: "ONEPLUS", discount: "UP to 80% OFF", image: "/brands/oneplus.png", bgColor: "#27AE60" },
    { name: "XIAOMI", discount: "UP to 80% OFF", image: "/brands/xiaomi.png", bgColor: "#E67E22" },
    { name: "SAMSUNG", discount: "UP to 80% OFF", image: "/brands/samsung.png", bgColor: "#3498DB" },
  ];

  const essentials = [
    { name: "Daily Essentials", discount: "UP to 50% OFF", image: vegetables },
    { name: "Vegetables", discount: "UP to 50% OFF", image: vegetables },
    { name: "Fruits", discount: "UP to 50% OFF", image: fruits },
    { name: "Strawberry", discount: "UP to 50% OFF", image: strawberry },
    { name: "Tropical Fruits", discount: "UP to 50% OFF", image: fruits },
    { name: "Fresh Berries", discount: "UP to 50% OFF", image: strawberry },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      <HeroCarousel />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* View All Products Button */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/products")}
            className="text-lg px-8"
          >
            View All Products
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Shop From <span className="text-primary">Top Categories</span>
          </h2>
          <button 
            className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
            onClick={() => navigate("/products")}
          >
            View All
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <div key={index} onClick={() => navigate(`/products?category=${category.slug}`)}>
              <CategoryIcon {...category} />
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Top <span className="text-primary">Electronics Brands</span>
          </h2>
          <button 
            className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
            onClick={() => navigate("/products?category=mobile")}
          >
            View All
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {brands.map((brand, index) => (
            <BrandCard key={index} {...brand} />
          ))}
        </div>
      </section>

      {/* Daily Essentials Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Daily <span className="text-primary">Essentials</span>
          </h2>
          <button 
            className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
            onClick={() => navigate("/products?category=grocery")}
          >
            View All
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {essentials.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square bg-muted p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <p className="font-medium text-sm mb-1">{item.name}</p>
                <p className="text-xs text-success">{item.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
