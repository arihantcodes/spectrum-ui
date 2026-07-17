"use client";
import React from "react";
import { PageSubTitle } from "@/app/(docs)/docs/components/page-template";
import PropInfo from "@/app/(docs)/docs/components/props-table/prop-info";
import { InlineCode } from "@/components/ui/inline-code";

export interface Props {
  prop: string;
  required: boolean;
  description: React.ReactNode;
  type: string;
  typeInfo?: React.ReactNode;
  default?: string;
}

interface PropsTableProps {
  title?: string;
  props: Props[];
  /** Hide the auto "Properties" heading (when the page renders its own) */
  withTitle?: boolean;
}

export const PropsTable = ({ title, props, withTitle = true }: PropsTableProps) => {
  return (
    <>
      {withTitle && <PageSubTitle>{title || "Properties"}</PageSubTitle>}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/[0.08] dark:border-white/10">
              <th className="w-[110px] px-4 py-2 text-sm font-medium leading-5 text-[#262626] dark:text-neutral-200">
                Prop
              </th>
              <th className="w-[300px] px-0 py-2 text-sm font-medium leading-5 text-[#262626] dark:text-neutral-200">
                Type
              </th>
              <th className="w-[115px] px-0 py-2 text-sm font-medium leading-5 text-[#262626] dark:text-neutral-200">
                Default
              </th>
              <th className="px-4 py-2 text-sm font-medium leading-5 text-[#262626] dark:text-neutral-200">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr
                key={prop.prop}
                className="border-b border-black/[0.08] dark:border-white/10"
              >
                <td className="px-4 py-2 align-middle">
                  <span className="flex items-center gap-[2px]">
                    {prop.required && (
                      <span className="text-destructive">*</span>
                    )}
                    <InlineCode>{prop.prop}</InlineCode>
                  </span>
                </td>
                <td className="py-2 pr-4 align-middle">
                  <span className="flex items-center gap-[2px]">
                    <InlineCode>{prop.type}</InlineCode>
                    {prop.typeInfo && (
                      <PropInfo className="ml-2">{prop.typeInfo}</PropInfo>
                    )}
                  </span>
                </td>
                <td className="py-2 pr-4 align-middle">
                  {prop.default ? (
                    <InlineCode>{prop.default}</InlineCode>
                  ) : (
                    <span className="text-sm text-[#686868] dark:text-neutral-500">
                      -
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 align-middle text-sm leading-5 text-[#262626] dark:text-neutral-200">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
