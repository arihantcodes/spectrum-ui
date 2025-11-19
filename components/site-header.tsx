import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RiLayoutGridFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CommandIcon, SearchIcon } from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { ThemeToggle } from "./theme-toggle";
export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex  items-center  gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium flex items-center gap-2">
            <RiLayoutGridFill className="" />
            <span>Dashboard</span>
          </h1>
        </div>
        <div className="relative flex-1 max-w-sm cursor-pointer">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
          <Input
            className="w-full rounded-md bg-muted border h-9 pl-10 pr-4 text-sm shadow-sm dark:bg-neutral-900"
            placeholder="Search anything here..."
            type="search"
            aria-label="Search dashboard"
          />
          <CommandIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-4">
          <Button className="flex items-center">
            <FaCrown />
            Upgrade
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
