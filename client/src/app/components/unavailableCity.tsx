import Image from "next/image";
interface City {
    slug: string;
    title: string;
    desc: string;
    image: string;
  }
const UnavailableCity = ({city, index}: {city:City, index:number}) => {
    
  return (
    <div key={index} className="relative flex gap-4 items-center p-2 ">
      <Image src={city.image} alt={city.title} className="w-48" />
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold font-sans text-text-foreground">
          {city.title}
        </h1>
        <p className="text-primary font-sans font-medium text-sm">
          {city.desc}
        </p>
      </div>
    </div>
  );
};

export default UnavailableCity;
