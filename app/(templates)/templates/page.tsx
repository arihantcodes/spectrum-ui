"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Layout as LayoutIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import RequestComponents from "@/components/requestcomponets";
import { BookmarkButton } from "@/components/bookmark-button";

const templatesList = [
  { 
    name: "Newsletter Dashboard", 
    description: "A comprehensive dashboard for managing newsletter subscribers, campaigns, and analytics.", 
    href: "/templates/newsletter-dashboard",
    image: "/examples/mail-dark.png",
    imageLight: "/examples/mail-light.png",
  },
  { 
    name: "Pharmacy Dashboard", 
    description: "A dashboard tailored for pharmacies to manage inventory, prescriptions, and sales.", 
    href: "/templates/pharmacy-dashboard",
    image: "/examples/dashboard-dark.png",
    imageLight: "/examples/dashboard-light.png",
  },
];

export default function TemplatesIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templatesList.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full py-8 px-4 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse and search through all available Spectrum UI templates.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <div className="relative max-w-lg flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10 h-11 text-base bg-background shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <RequestComponents />
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground flex flex-col items-center">
          <LayoutIcon className="h-12 w-12 mb-4 opacity-20" />
          <p>No templates found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => {
            const slug = template.href.replace('/templates/', '');
            return (
              <div key={template.href} className="relative group/card">
                <Link href={template.href}>
                  <div className="group relative rounded-xl border bg-card h-full transition-all hover:border-foreground/30 hover:shadow-md overflow-hidden">
                    <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-900 border-b flex items-center justify-center transition-colors overflow-hidden group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900/50">
                      {template.image ? (
                        <>
                          <img src={template.image} alt={template.name} className="hidden dark:block object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105" />
                          <img src={template.imageLight || template.image} alt={template.name} className="block dark:hidden object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <LayoutIcon className="relative z-10 h-8 w-8 text-neutral-400 dark:text-neutral-600 transition-all duration-300 group-hover:scale-125 group-hover:text-foreground" />
                        </>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="font-semibold text-foreground tracking-tight">{template.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  <BookmarkButton
                    slug={slug}
                    type="template"
                    title={template.name}
                    className="bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
