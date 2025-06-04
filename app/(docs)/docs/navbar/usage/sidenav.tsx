"use client";
import { Button } from "@/components/UI/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import { ScrollArea } from "@/components/UI/ScrollArea";
import {
  ChevronRight,
  Home,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Sidenavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    //add h-screen to the div class name to make the sidebar full height
    <div className="flex ">
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } flex flex-col border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span
            className={`${isOpen ? "block" : "hidden"} text-lg font-semibold`}
          >
            Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              {isOpen && "Home"}
            </Button>
            {isOpen ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    {isOpen && (
                      <>
                        Products
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 1
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 2
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 3
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button variant="ghost">
                <Package className="mr-2 h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              {isOpen && "Users"}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              {isOpen && "Settings"}
            </Button>
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
      </main>
    </div>
  );
}
