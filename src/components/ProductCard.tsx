import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  description?: string;
}

const ProductCard = ({ id, name, image, price, discountPrice, description }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const hasDiscount = discountPrice && discountPrice < price;
  const savings = hasDiscount ? price - discountPrice : 0;
  const discount = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const displayPrice = hasDiscount ? discountPrice : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(id);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="relative mb-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <button className="absolute top-2 right-2 bg-card rounded-full p-2 shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="h-4 w-4" />
          </button>
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="font-medium mb-2 text-sm line-clamp-2 h-10">{name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-foreground">₹{displayPrice.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{price.toLocaleString()}
              </span>
            )}
          </div>
          <div className="h-6 mb-2">
            {hasDiscount && (
              <p className="text-sm text-success font-medium">Save - ₹{savings.toLocaleString()}</p>
            )}
          </div>
        </div>
        <Button 
          size="sm" 
          className="w-full mt-auto"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
