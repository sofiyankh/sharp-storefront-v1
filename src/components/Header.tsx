import { useState } from "react";
import { MapPin, Package, Gift, User, ShoppingCart, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "@/components/MobileMenu";
import NotificationDialog from "@/components/NotificationDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { setIsOpen, itemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <header className="w-full bg-card border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-muted/50 py-2 px-4 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>Welcome to worldwide MegaMart!</span>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              Deliver to <strong className="text-foreground">423651</strong>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Package className="h-4 w-4" />
              Track your order
            </button>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Gift className="h-4 w-4" />
              All Offers
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity">
                MegaMart
              </h1>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search essentials, groceries and more..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            {user && <NotificationDialog />}
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden lg:flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hidden lg:flex items-center gap-2"
                  onClick={() => navigate("/auth")}
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => navigate("/auth")}
                >
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search essentials..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
