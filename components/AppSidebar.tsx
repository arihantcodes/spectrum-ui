"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  LayoutGrid,
  UsersIcon,
  Wallet,
} from "lucide-react";
import { RiLayoutGridFill } from "react-icons/ri";
import { IoLayers } from "react-icons/io5";
import { TbUsb } from "react-icons/tb";
import { GiPriceTag } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/UI/Sidebar";
import { Icons } from "./Icon";

const data = {
  user: {
    name: "Arihant Jain",
    email: "m@example.com",
    avatar: "/arihanticon.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: RiLayoutGridFill,
    },
    {
      title: "Subscribers",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Template",
      url: "#",
      icon: IoLayers,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Automation",
      url: "#",
      icon: TbUsb,
    },
    {
      title: "Monetization",
      url: "#",
      icon: GiPriceTag,
    },
    {
      title: "Integration",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Wallet",
      url: "#",
      icon: Wallet,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Learn & Training",
      url: "#",
      icon: FaGraduationCap,
    },
    {
      title: "Request Feature",
      url: "#",
      icon: FaWandMagicSparkles,
    },
    {
      title: "Affiliate Program",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="bg-[#f4f4f4] dark:bg-black border border-zinc-100 dark:border-[#18181B]"
    >
      <SidebarHeader className="bg-[#f4f4f4] dark:bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 dark:bg-black"
            >
              <a href="#">
                <Icons.logo />
                <span className="text-base font-semibold">Spectrum UI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#f4f4f4] dark:bg-black flex justify-between flex-col">
        <NavMain items={data.navMain} />
        <div>
          <div className="w-[238px] rounded-lg overflow-hidden shadow">
            <div className="h-[60px] p-4 bg-gradient-to-b from-[#0AA6FA]/30 to-[#0AA6FA]/0 dark:from-[#141414] dark:to-[#141414] dark:bg-gradient-to-b">
              <h1 className="font-semibold  text-base flex gap-2 items-center">
                <svg
                  data-testid="geist-icon"
                  height="16"
                  stroke-linejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Scale Plan
              </h1>
              <p className="text-zink-950 text-sm font-medium  mt-2">
                Free Trial Version
              </p>
            </div>

            <div className="bg-white dark:bg-[#141414] px-4 pb-4 pt-2">
              {/* Progress bar */}
              <div className="relative h-4 w-full bg-sky-100 rounded-full overflow-hidden my-2">
                <div className="absolute h-full w-[70%] bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 rounded-full"></div>
              </div>

              <p className="text-zink-950 text-sm font-medium">4 days left</p>
            </div>
          </div>

          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </div>
      </SidebarContent>
      <SidebarFooter className="bg-[#f4f4f4] dark:bg-black">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
