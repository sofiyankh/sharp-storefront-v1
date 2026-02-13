import { Card, CardContent } from "@/components/ui/card";

interface BrandCardProps {
  name: string;
  discount: string;
  image: string;
  bgColor: string;
}

const BrandCard = ({ name, discount, image, bgColor }: BrandCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-6" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center justify-between h-32 md:h-40">
          <div className="text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{name}</h3>
            <p className="text-sm md:text-base font-medium">{discount}</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <img
              src={image}
              alt={name}
              className="h-24 md:h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
