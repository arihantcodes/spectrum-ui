import Image, { StaticImageData } from "next/image";

const AnimatedCard = ({
  imgSrc,
  title,

  aboutProduct,
}: {
  imgSrc: StaticImageData | string;
  title: string;

  aboutProduct: string;
}) => {
  return (
    <div className="md:w-72 border rounded-2xl shadow-lg border-white dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-4 flex flex-col items-center">
        <Image
          className="w-32 h-32 object-contain mb-2"
          src={imgSrc}
          alt={`${title} logo`}
          width={128}
          height={128}
        />
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold tracking-tight text-foreground">{title}</div>

          <p className="text-sm text-muted-foreground mt-2">{aboutProduct}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
