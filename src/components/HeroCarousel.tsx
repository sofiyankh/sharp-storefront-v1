import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import smartwatchHero from "@/assets/smartwatch-hero.png";

const slides = [
  {
    title: "Best Deal Online on smart watches",
    subtitle: "SMART WEARABLE.",
    discount: "UP TO 80% OFF",
    image: smartwatchHero,
  },
  {
    title: "Latest Smartphones",
    subtitle: "PREMIUM DEVICES.",
    discount: "UP TO 70% OFF",
    image: smartwatchHero,
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative bg-hero rounded-2xl overflow-hidden mx-4 my-6 max-w-7xl lg:mx-auto">
      <div className="relative h-[300px] md:h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-full flex items-center px-8 md:px-16">
              <div className="text-white max-w-xl">
                <p className="text-sm md:text-base mb-2">{slide.title}</p>
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.subtitle}</h2>
                <p className="text-xl md:text-2xl font-semibold">{slide.discount}</p>
              </div>
              <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2">
                <img
                  src={slide.image}
                  alt="Product"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
