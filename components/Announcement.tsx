import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Blocks, PieChart } from "lucide-react";

import { Separator } from "@/components/ui/Separator";

export function Announcement() {
  return (
    <Link
      href="/docs/components/sidebar"
      className="group inline-flex items-center px-0.5 text-sm font-medium"
    >
      <PieChart className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="underline-offset-4 group-hover:underline"></span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
