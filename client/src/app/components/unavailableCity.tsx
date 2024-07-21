import Image from "next/image";
import Translation from "./translation";
interface City {
  id: number;
  name: string;
  imageUrl: string;
}
const UnavailableCity = ({ city, index }: { city: City; index: number }) => {
  return (
    <div key={index} className=" flex bg-secondary-foreground gap-4 items-center p-2 ">
      <div className="w-44 h-40 relative">
        <Image
          src={city.imageUrl}
          alt={city.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold font-sans text-text-foreground">
          {city.name}
        </h1>
        <p className="text-primary font-sans font-medium text-sm">
          <Translation translationKey="citypage_unavailable_city" />
        </p>
      </div>
    </div>
  );
};

export default UnavailableCity;
