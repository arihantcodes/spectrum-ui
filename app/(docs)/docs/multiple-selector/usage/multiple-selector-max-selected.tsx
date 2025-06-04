"use client";
import React from "react";
import MultipleSelector, { Option } from "@/components/UI/MultipleSelector";
import { toast } from "@/components/UI/UseToast";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

const MultipleSelectorWithMaxSelected = () => {
  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <MultipleSelector
        maxSelected={3}
        onMaxSelected={(maxLimit) => {
          toast({
            title: `You have reached max selected: ${maxLimit}`,
          });
        }}
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorWithMaxSelected;
