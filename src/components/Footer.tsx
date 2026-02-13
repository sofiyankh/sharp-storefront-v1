import { Phone, Smartphone, Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const popularCategories = [
    "Staples",
    "Beverages",
    "Personal Care",
    "Home Care",
    "Baby Care",
    "Vegetables & Fruits",
    "Snacks & Foods",
    "Dairy & Bakery",
  ];

  const customerServices = [
    "About Us",
    "Terms & Conditions",
    "FAQ",
    "Privacy Policy",
    "E-waste Policy",
    "Cancellation & Return Policy",
  ];

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">MegaMart</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4" />
                  <div>
                    <p>Whats App</p>
                    <p>+1 202-918-2132</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <div>
                  <p>Call Us</p>
                  <p>+1 202-918-2132</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Download App</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 px-3 rounded-full bg-black border-white/30 hover:bg-white/10 text-white justify-start gap-2"
                >
                  <Apple className="h-4 w-4" />
                  <span className="text-xs font-medium">App Store</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 px-3 rounded-full bg-black border-white/30 hover:bg-white/10 text-white justify-start gap-2"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span className="text-xs font-medium">Google Play</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-semibold mb-4">Most Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              {popularCategories.map((category) => (
                <li key={category}>
                  <a href="#" className="hover:underline">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h4 className="font-semibold mb-4">Customer Services</h4>
            <ul className="space-y-2 text-sm">
              {customerServices.map((service) => (
                <li key={service}>
                  <a href="#" className="hover:underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-sm">
          <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
