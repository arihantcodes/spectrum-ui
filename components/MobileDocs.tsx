"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { ScrollArea } from "@/components/UI/ScrollArea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";

// Assuming DOCS is imported from your constant file
import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";

export default function Mobiledocs() {
  const [openGroups, setOpenGroups] = useState<string[]>(
    DOCS.map((group) => group.groupKey)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Ensure the group of the active link is open
    const activeGroup = DOCS.find((group) =>
      group.children.some((child) => child.url === pathname)
    );
    if (activeGroup && !openGroups.includes(activeGroup.groupKey)) {
      setOpenGroups((prev) => [...prev, activeGroup.groupKey]);
    }
  }, [pathname]);

  const toggleGroup = (groupKey: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupKey)
        ? prev.filter((key) => key !== groupKey)
        : [...prev, groupKey]
    );
  };

  const filteredDocs = DOCS.map((group) => ({
    ...group,
    children: group.children.filter((child) =>
      child.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((group) => group.children.length > 0);

  return (
    <aside className="flex lg:hidden flex-col items-center   top-0 ">
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {filteredDocs.map((group) => (
            <Collapsible
              key={group.groupKey}
              open={openGroups.includes(group.groupKey)}
              onOpenChange={() => toggleGroup(group.groupKey)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between font-semibold mb-2"
                >
                  {group.groupValue}
                  {openGroups.includes(group.groupKey) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-2">
                {group.children.map((child) => (
                  <Link
                    key={child.value}
                    href={child.url}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors",
                      pathname === child.url
                        ? "text-green-400"
                        : "hover:text-green-400"
                    )}
                  >
                    {child.label}
                    {child.new && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
