"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { ROUTES } from "@/lib/routes-config";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useEffect, useMemo, useState } from "react";
import Anchor from "./Anchor";

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredResults = useMemo(() => {
    return ROUTES.map((group) => {
      const matchingChildren = group.children.filter((item) =>
        item.label.toLowerCase().includes(searchedInput.toLowerCase())
      );

      return {
        ...group,
        children: matchingChildren,
      };
    }).filter((group) => group.children.length > 0);
  }, [searchedInput]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setSearchedInput("");
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <div className="relative flex-1 max-w-md cursor-pointer">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <Input
              className="w-full rounded-md bg-muted border h-9 pl-10 pr-2 text-sm shadow-sm dark:bg-neutral-900"
              placeholder="Search Components..."
              type="search"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="p-2 max-w-[650px] sm:top-[38%] top-[45%] z-[5000]">
          <DialogHeader>
            <input
              value={searchedInput}
              onChange={(e) => setSearchedInput(e.target.value)}
              placeholder="Type something to search..."
              autoFocus
              className="h-14 px-4 bg-transparent border-b text-[15px] outline-none"
            />
          </DialogHeader>
          {filteredResults.length == 0 && searchedInput && (
            <p className="text-muted-foreground mx-auto mt-2 text-sm">
              No results found for{" "}
              <span className="text-primary">{`"${searchedInput}"`}</span>
            </p>
          )}
          <ScrollArea className="max-h-[350px]">
            <div className="flex flex-col items-start overflow-y-auto sm:px-3 px-1 pb-4 gap-0.5">
              {filteredResults.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.groupKey} className="w-full">
                    <p className="text-xs text-muted-foreground my-2">
                      {group.groupValue}
                    </p>
                    {group.children.map((child) => (
                      <DialogClose key={child.url} asChild>
                        <Anchor
                          className="dark:hover:bg-neutral-900 hover:bg-neutral-100 w-full p-2.5 px-3 rounded-sm text-[14px] flex items-center gap-2.5"
                          href={`${child.url}`}
                          activeClassName="dark:bg-neutral-900 bg-neutral-100"
                        >
                          <Icon className="h-[1.1rem] w-[1.1rem]" />
                          {child.label}
                          {child.tag && child.tag.label && (
                            <span
                              className={`text-xs text-black ${child.tag.color} px-1.5 py-0.5 rounded-full`}
                            >
                              {child.tag.label.charAt(0).toUpperCase() +
                                child.tag.label.slice(1)}
                            </span>
                          )}
                        </Anchor>
                      </DialogClose>
                    ))}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
