/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Assuming DOCS is imported from your constant file
import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";
import { Input } from "@/components/ui/input";

export default function EnhancedSidebar() {
  const [openGroups, setOpenGroups] = useState<string[]>(
    DOCS.map((group) => group.groupKey)
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    children: group.children
      .filter((child) =>
        child.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.label.localeCompare(b.label)),
  })).filter((group) => group.children.length > 0);

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800">
      {/* Search Input with clear button */}
      <div className="relative hidden md:block p-3 max-w-fit mx-auto">
        <Input
          placeholder="search for components"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </button>
        )}
      </div>

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
              <CollapsibleContent className="space-y-1 ml-2 dark:text-gray-400">
                {group.children.map((child) => (
                  <Link
                    key={child.value}
                    href={child.url}
                    onClick={() => setSearchTerm("")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors",
                      pathname === child.url
                        ? "dark:text-gray-200"
                        : "hover:text-gray-500 dark:hover:text-gray-200"
                    )}
                  >
                    {child.label}
                    {child.new && (
                      <span className="text-xs text-black bg-lime-400 px-1.5 py-0.5 rounded-full">
                        New
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
