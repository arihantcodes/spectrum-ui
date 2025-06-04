import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FomoButton } from "./UI/MovingBorder";
import { ArrowRight } from "lucide-react";

export function Fomo() {
  return (
    <Link href={siteConfig.links.twitter}>
      <div>
        <FomoButton
          borderRadius="1.75rem"
          className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 px-4"
        >
          Everyone’s Using Spectrum UI. Are You?
          <ArrowRight className="h-4 w-4 ml-2" />
        </FomoButton>
      </div>
    </Link>
  );
}
