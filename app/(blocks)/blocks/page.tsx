"use client";
import { BlocksPage } from "@/components/BlocksPage";

import { useTheme } from "next-themes";
import NewsletterDashboard from "./newsletter";
import Dashboardblock from "./dashboard";
import Link from "next/link";
import { Icons } from "@/components/Icon";

const sampleFiles = [
  {
    name: "app",
    path: "app",
    type: "folder" as const,
    children: [
      {
        name: "dashboard",
        path: "app/dashboard",
        type: "folder" as const,
        children: [
          {
            name: "page.tsx",
            path: "app/dashboard/page.tsx",
            type: "file" as const,
            content: `import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import  {SubscriberDataTable}  from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import  {subscriberData} from "./data"

import Newsletter from "@/components/newsletter"

export default function NewsletterDashboard() {
  return (
    <>
    <div className="">
    <SidebarProvider>
      <AppSidebar variant="inset" className=""/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col ">
          <div className=" flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4  md:gap-6 w-full">
              <SectionCards />
              <div className=" grid md:grid-cols-2">
                <ChartAreaInteractive />
                <Newsletter/>
              </div>
              <SubscriberDataTable data={subscriberData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
    </>
  )
}
`,
            language: "tsx",
          },

          {
            name: "data.tsx",
            path: "app/dashboard/data.tsx",
            type: "file" as const,
            content: `import { Subscriber } from "@/components/data-table";


export const subscriberData: Subscriber[] = [
  {
    id: 1,
    subscriberId: "SUB-001",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "Active",
    signupDate: "2024-01-15",
    source: "Website",
  },
  {
    id: 2,
    subscriberId: "SUB-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    status: "Active",
    signupDate: "2024-01-20",
    source: "Social Media",
  },
  {
    id: 3,
    subscriberId: "SUB-003",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    status: "Pending",
    signupDate: "2024-02-01",
    source: "Email Campaign",
  },
  {
    id: 4,
    subscriberId: "SUB-004",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    status: "Active",
    signupDate: "2024-02-05",
    source: "Referral",
  },
  {
    id: 5,
    subscriberId: "SUB-005",
    name: "David Wilson",
    email: "david.wilson@email.com",
    status: "Inactive",
    signupDate: "2024-02-10",
    source: "Direct",
  },
  {
    id: 6,
    subscriberId: "SUB-006",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    status: "Active",
    signupDate: "2024-02-15",
    source: "Advertisement",
  },
  {
    id: 7,
    subscriberId: "SUB-007",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    status: "Unsubscribed",
    signupDate: "2024-02-20",
    source: "Website",
  },
  {
    id: 8,
    subscriberId: "SUB-008",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@email.com",
    status: "Active",
    signupDate: "2024-02-25",
    source: "Social Media",
  },
  {
    id: 9,
    subscriberId: "SUB-009",
    name: "Christopher Lee",
    email: "christopher.lee@email.com",
    status: "Active",
    signupDate: "2024-03-01",
    source: "Email Campaign",
  },
  {
    id: 10,
    subscriberId: "SUB-010",
    name: "Amanda White",
    email: "amanda.white@email.com",
    status: "Pending",
    signupDate: "2024-03-05",
    source: "Referral",
  },
  {
    id: 11,
    subscriberId: "SUB-011",
    name: "James Garcia",
    email: "james.garcia@email.com",
    status: "Active",
    signupDate: "2024-03-10",
    source: "Direct",
  },
  {
    id: 12,
    subscriberId: "SUB-012",
    name: "Michelle Rodriguez",
    email: "michelle.rodriguez@email.com",
    status: "Active",
    signupDate: "2024-03-15",
    source: "Advertisement",
  },
  {
    id: 13,
    subscriberId: "SUB-013",
    name: "Kevin Thompson",
    email: "kevin.thompson@email.com",
    status: "Inactive",
    signupDate: "2024-03-20",
    source: "Website",
  },
  {
    id: 14,
    subscriberId: "SUB-014",
    name: "Nicole Clark",
    email: "nicole.clark@email.com",
    status: "Active",
    signupDate: "2024-03-25",
    source: "Social Media",
  },
  {
    id: 15,
    subscriberId: "SUB-015",
    name: "Daniel Lewis",
    email: "daniel.lewis@email.com",
    status: "Active",
    signupDate: "2024-04-01",
    source: "Email Campaign",
  },
  {
    id: 16,
    subscriberId: "SUB-016",
    name: "Rachel Walker",
    email: "rachel.walker@email.com",
    status: "Pending",
    signupDate: "2024-04-05",
    source: "Referral",
  },
  {
    id: 17,
    subscriberId: "SUB-017",
    name: "Mark Hall",
    email: "mark.hall@email.com",
    status: "Active",
    signupDate: "2024-04-10",
    source: "Direct",
  },
  {
    id: 18,
    subscriberId: "SUB-018",
    name: "Stephanie Allen",
    email: "stephanie.allen@email.com",
    status: "Active",
    signupDate: "2024-04-15",
    source: "Advertisement",
  },
  {
    id: 19,
    subscriberId: "SUB-019",
    name: "Brian Young",
    email: "brian.young@email.com",
    status: "Unsubscribed",
    signupDate: "2024-04-20",
    source: "Website",
  },
  {
    id: 20,
    subscriberId: "SUB-020",
    name: "Laura King",
    email: "laura.king@email.com",
    status: "Active",
    signupDate: "2024-04-25",
    source: "Social Media",
  },
  {
    id: 21,
    subscriberId: "SUB-021",
    name: "Gregory Wright",
    email: "gregory.wright@email.com",
    status: "Active",
    signupDate: "2024-05-01",
    source: "Email Campaign",
  },
  {
    id: 22,
    subscriberId: "SUB-022",
    name: "Kimberly Lopez",
    email: "kimberly.lopez@email.com",
    status: "Active",
    signupDate: "2024-05-05",
    source: "Referral",
  },
  {
    id: 23,
    subscriberId: "SUB-023",
    name: "Anthony Hill",
    email: "anthony.hill@email.com",
    status: "Inactive",
    signupDate: "2024-05-10",
    source: "Direct",
  },
  {
    id: 24,
    subscriberId: "SUB-024",
    name: "Melissa Scott",
    email: "melissa.scott@email.com",
    status: "Active",
    signupDate: "2024-05-15",
    source: "Advertisement",
  },
  {
    id: 25,
    subscriberId: "SUB-025",
    name: "Steven Green",
    email: "steven.green@email.com",
    status: "Active",
    signupDate: "2024-05-20",
    source: "Website",
  },
]

  `,
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    name: "components",
    path: "components",
    type: "folder" as const,
    children: [
      {
        name: "app-sidebar.tsx",
        path: "components/app-sidebar.tsx",
        type: "file" as const,
        content: `"use client";

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
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icons } from "./icon";

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
    <Sidebar collapsible="offcanvas" {...props} className="bg-[#f4f4f4] dark:bg-black border border-zinc-100 dark:border-[#18181B]">
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
      <SidebarContent className="bg-[#f4f4f4] dark:bg-black flex justify-between flex-col" >
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
`,
        language: "tsx",
      },
      {
        name: "chart-area-interactive.tsx",
        path: "components/chart-area-interactive.tsx",
        type: "file" as const,
        content: `"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Circle } from "lucide-react"
import { FaCircle } from "react-icons/fa"
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card p-0 rounded-none">
      <CardHeader className="relative">
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Overall performance of your email campaign trends</span>
        </CardDescription>
        <div className="flex items-center gap-4">
        <div className="mt-4 flex items-center gap-1">
          <FaCircle 
          className="h-3 w-3 text-sky-400"  />
          <p className="text-[12px]">
          Email open rate
          </p>
        </div>
        <div className="mt-4 flex items-center gap-1">
          <FaCircle 
          className="h-3 w-3 text-sky-400"  />
          <p className="text-[12px]">
          Avg click rate
          </p>
        </div>
        </div>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
`,
        language: "tsx",
      },
      {
        name: "data-table.tsx",
        path: "components/data-table.tsx",
        type: "file" as const,
        content: `"use client"

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  GripVerticalIcon,
  MoreVerticalIcon,
  SearchIcon,
  XCircleIcon,
  UserIcon,
  MailIcon,
} from "lucide-react";

import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { IoNavigate } from "react-icons/io5";
import { RiLayoutGridFill } from "react-icons/ri";

export const subscriberSchema = z.object({
  id: z.number(),
  subscriberId: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.enum(["Active", "Inactive", "Pending", "Unsubscribed"]),
  signupDate: z.string(),
  source: z.enum([
    "Website",
    "Social Media",
    "Email Campaign",
    "Referral",
    "Direct",
    "Advertisement",
  ]),
});

export type Subscriber = z.infer<typeof subscriberSchema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<Subscriber>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subscriberId",
    header: "Subscriber ID",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600 dark:text-sky-400">
        {row.original.subscriberId}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MailIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        Active: {
          color: "dark:bg-teal-950 bg-sky-100 text-sky-500 dark:text-teal-500 border-teal-900"
        },
        Inactive: {
          color: "bg-orange-100 dark:bg-orange-950 text-orange-500 border-orange-900"
        },
        Pending: {
          color: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-500 border-yellow-900"
        },
        Unsubscribed: {
          color: "bg-rose-100 dark:bg-red-950 text-rose-500 dark:text-red-500 border-red-900"
        }
      };

      const config = statusConfig[status];

      return (
        <div className={\`flex items-center rounded-md text-sm font-medium py-1 px-3 \${config.color}\`}>
          {status}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "signupDate",
    header: "Signup Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.signupDate).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center rounded-md text-sm font-medium py-1 px-3"
      >
        {row.original.source}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Send Email</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            Unsubscribe
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<Subscriber> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function SubscriberDataTable({
  data: initialData,
}: {
  data: Subscriber[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = React.useState<string[]>([]);
  const [dateFilter, setDateFilter] = React.useState("allTime");

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  // Apply filters
  React.useEffect(() => {
    const filters: ColumnFiltersState = [];

    if (statusFilter.length > 0) {
      filters.push({ id: "status", value: statusFilter });
    }

    if (sourceFilter.length > 0) {
      filters.push({ id: "source", value: sourceFilter });
    }

    setColumnFilters(filters);
  }, [statusFilter, sourceFilter]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: "includesString",
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const activeSubscribers = data.filter(
    (sub) => sub.status === "Active"
  ).length;

  return (
    <>
      <div className="border-y border-neutral-200 dark:border-neutral-800 flex items-center gap-2 px-6 py-3 text-sm">
        <Image src="/dashboard/users.svg" height={20} width={20} alt="" />
        <span>Subscribers</span>
        <span className="text-neutral-800 dark:text-neutral-400">
          . {activeSubscribers.toLocaleString()} active subscribers
        </span>
      </div>

      <Tabs
        defaultValue="outline"
        className="flex w-full flex-col justify-start gap-3"
      >
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            {/* Search Filter */}
            <div className="relative flex-1 max-w-[260px] cursor-pointer">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <Input
                className="rounded-md bg-muted border h-9 pl-10 pr-4 text-sm shadow-sm dark:bg-neutral-900"
                placeholder="Search subscribers..."
                type="search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900 outline-none">
              <CalendarDays className="h-4 w-4 mr-2 outline-none" />
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-none bg-transparent p-0 h-auto shadow-none outline-none">
                  <SelectValue
                    placeholder="Signup Date"
                    className="border-none outline-none"
                  />
                </SelectTrigger>
                <SelectContent className="outline-none">
                  <SelectItem value="allTime" className="outline-none">
                    All Time
                  </SelectItem>
                  <SelectItem value="today" className="outline-none">
                    Today
                  </SelectItem>
                  <SelectItem value="week" className="outline-none">
                    This Week
                  </SelectItem>
                  <SelectItem value="month" className="outline-none">
                    This Month
                  </SelectItem>
                  <SelectItem value="quarter" className="outline-none">
                    This Quarter
                  </SelectItem>
                  <SelectItem value="year" className="outline-none">
                    This Year
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900">
              <IoNavigate className="h-4 w-4 mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto font-normal">
                    Status{" "}
                    {statusFilter.length > 0 && \`(\${statusFilter.length})\`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {["Active", "Inactive", "Pending", "Unsubscribed"].map(
                    (status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStatusFilter([...statusFilter, status]);
                          } else {
                            setStatusFilter(
                              statusFilter.filter((s) => s !== status)
                            );
                          }
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Source Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto font-normal">
                    Source{" "}
                    {sourceFilter.length > 0 && \`(\${sourceFilter.length})\`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {[
                    "Website",
                    "Social Media",
                    "Email Campaign",
                    "Referral",
                    "Direct",
                    "Advertisement",
                  ].map((source) => (
                    <DropdownMenuCheckboxItem
                      key={source}
                      checked={sourceFilter.includes(source)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSourceFilter([...sourceFilter, source]);
                        } else {
                          setSourceFilter(
                            sourceFilter.filter((s) => s !== source)
                          );
                        }
                      }}
                    >
                      {source}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <RiLayoutGridFill className="text-green-500" />
                  <span className="hidden lg:inline">Table View</span>
                  <span className="lg:hidden">Columns</span>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <span className="hidden lg:inline">Show: All subscribers</span>
            </Button>
          </div>
        </div>

        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <div className="overflow-hidden rounded-lg border">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No subscribers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={\`\${table.getState().pagination.pageSize}\`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={\`\${pageSize}\`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
`,
        language: "tsx",
      },
      {
        name: "section-cards.tsx",
        path: "components/section-cards.tsx",
        type: "file" as const,
        content: `
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function SectionCards() {
  return (
    <div className="
    grid grid-cols-1 md:grid-cols-5 rounded-none
    ">
      <Card className="@container/card rounded-none ">
        <CardHeader className="relative">
          <Image src="/dashboard/users.svg" alt="" height={30} width={30} />

          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            202,123
          </CardTitle>
          <p className="text-sky-400 text-xs">
          +22,325 (12.2%) <span className="text-gray-400">. Last 12 Months</span>
          </p>
         
        </CardHeader>
     
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
        <Image src="/dashboard/email.svg" alt="" height={30} width={30} />


          <CardDescription>Email open rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            78,500
          </CardTitle>
          <p className="text-sky-400 text-xs">
          +8,500 (12.1%) <span className="text-gray-400">. Last 12 Months</span>
          </p>
         
        </CardHeader>
     
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
        <Image src="/dashboard/cursor.svg" alt="" height={30} width={30} />


          <CardDescription>Avg click rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            26.2%
          </CardTitle>
          <p className="text-red-600 text-xs">
          -2.3% (-8.1%) <span className="text-gray-400">. Last 12 Months</span>
          </p>
         
        </CardHeader>
     
      </Card>
     
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
        <Image src="/dashboard/message.svg" alt="" height={30} width={30} />


          <CardDescription>Replied</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            23,212
          </CardTitle>
          <p className="text-red-600 text-xs">
          -2,123 (12.3%) <span className="text-gray-400">. Last 12 Months</span>
          </p>
         
        </CardHeader>
     
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
        <Image src="/dashboard/user-minus.svg" alt="" height={30} width={30} />


          <CardDescription>Email open rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            14,000
          </CardTitle>
          <p className="text-sky-400 text-xs">
          +1,500 (12.3%) <span className="text-gray-400">. Last 12 Months</span>
          </p>
         
        </CardHeader>
     
      </Card>
     
    </div>
  )
}
`,
        language: "tsx",
      },
      {
        name: "site-header.tsx",
        path: "components/site-header.tsx",
        type: "file" as const,
        content: `import { Separator } from "@/components/ui/separator";
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
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          <Input
            className="w-full rounded-md bg-muted border h-9 pl-10 pr-4 text-sm shadow-sm dark:bg-neutral-900"
            placeholder="Search anything here..."
            type="search"
          />
          <CommandIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
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
`,
        language: "tsx",
      },
      {
        name: "sidebar.tsx",
        path: "components/sidebar.tsx",
        type: "file" as const,
        content: `Install 👉🏻 npx shadcn@latest add sidebar`,
        language: "tsx",
      },
      {
        name: "newsletter.tsx",
        path: "components/newsletter.tsx",
        type: "file" as const,
        content: `import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Check, FileText, Mail, MessageSquare, Users } from "lucide-react";
const Newsletter = () => {
  return (
    <>
      <Card className="rounded-none border-none ">
        <div className="mb-4 w-full p-6 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-medium">Newsletter Post</h3>
          <p className="text-sm text-neutral-400">
            View existing posts, create new posts, and edit templates
          </p>
        </div>
        <div className="grid grid-cols-1 ">
          <div className="border-y border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              This newsletter focuses on the best productivity tools
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-[#E0FAEC] dark:bg-green-950 rounded-sm text-green-500 border-green-200 dark:border-green-800 text-xs"
              >
                <Check className="h-4 w-4 mr-2" />
                Published
              </Badge>
              <span className="text-neutral-500">•</span>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Mail className="h-3 w-3" />
                13342
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Users className="h-3 w-3" />
                2313 (17.7%)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <MessageSquare className="h-3 w-3" />
                1222 (58%)
              </div>
            </div>
          </div>
          <div className="border-b border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              This newsletter focuses on the best productivity tools
            </p>
            <Badge
              variant="outline"
              className="bg-sky-100 dark:bg-sky-950 rounded-sm text-sky-500 border-sky-200 dark:border-sky-800 text-xs"
            >
              <FileText className="h-4 w-4 mr-2" />
              Draft
            </Badge>
          </div>
          <div className=" border-b border-neutral-300  dark:border-neutral-800 p-6">
            <h4 className="font-medium">
              Maximizing Your Productivity: Tools for Success
            </h4>
            <p className="text-sm text-neutral-400">
              This newsletter focuses on the best productivity tools
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Newsletter;
`,
        language: "tsx",
      },
    ],
  },
];

const sampleFiles2 = [
  {
    name: "app",
    path: "app",
    type: "folder" as const,
    children: [
      {
        name: "dashboard",
        path: "app/dashboard",
        type: "folder" as const,
        children: [
          {
            name: "page.tsx",
            path: "app/dashboard/page.tsx",
            type: "file" as const,
            content: `"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  Calendar,
  Users,
  Truck,
  Pill,
  GitBranch,
  UserCheck,
  Shield,
  Settings,
  Globe,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Clock,
  Package,
  Filter,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  ChevronsLeft,
  CircleDashed,
  Circle,
  Gauge,
  Clock4,
  KeyRound,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icon";

interface Order {
  id: string;
  location: string;
  time?: string;
  packages: number;
  type: string;
  assignee?: string;
  status: string;
  secondType?: string;
  image?: string;
  duration?: string;
  assignShelf?: boolean;
  weight?: string;
  code?: string;
}

interface Vehicle {
  id: string;
  type: string;
  maxWeight: string;
  dimensions: string;
  tags: string[];
  available: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notification?: boolean;
  collapsed?: boolean;
}

interface OrderColumnProps {
  title: string;
  count: number;
  orders: Order[];
  onOrderClick: (order: Order) => void;
  selectedOrder: Order | undefined;
  isActive?: boolean;
}

interface OrderCardProps {
  order: Order;
  isSelected: boolean;
}

interface AssignmentPanelProps {
  order: Order;
  vehicles: Vehicle[];
  onClose: () => void;
  onAssign: () => void;
  onAutoAssign: () => void;
  isMobile?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
}

interface SidebarContentProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const orders = [
  {
    id: "#SJP24",
    location: "St. John's Ph...",
    time: "22:00",
    packages: 2,
    type: "EXPRESS",
    assignee: "Jake F.",
    image: "/02.png",
    status: "to-be-fulfilled",
  },
  {
    id: "#WLS392496",
    location: "Wells Minho Cent...",
    time: "22:00",
    packages: 56,
    type: "HEAVY",
    status: "to-be-fulfilled",
  },
  {
    id: "#DKJ24",
    location: "DonnaKaren",
    time: "22:00",
    packages: 34,
    type: "EXPRESS",
    status: "to-be-fulfilled",
  },
  {
    id: "#TNK504",
    location: "Tanaka II",
    time: "23:30",
    packages: 29,
    type: "LATE PICKUP",
    status: "to-be-fulfilled",
  },
  {
    id: "#LOS12094",
    location: "Lou & Sons",
    time: "17:00",
    packages: 14,
    type: "REFRIGERATED",
    secondType: "EXPRESS",
    assignee: "Lory K.",
    image: "/01.png",
    duration: "27min",
    status: "open",
  },
  {
    id: "#WLS392494",
    location: "Wells Minho Cent...",
    time: "21:30",
    packages: 23,
    type: "HEAVY",
    assignee: "Jake F.",
    image: "/03.png",
    duration: "2h57min",
    status: "open",
  },
  {
    id: "#WLS392495",
    location: "Wells Minho Cent...",
    time: "22:30",
    packages: 0,
    type: "REFRIGERATED",
    assignee: "Darren A.",
    duration: "3h57min",
    image: "/04.png",
    assignShelf: true,
    status: "open",
  },
  {
    id: "#CHA109763",
    location: "Chadwick I",
    packages: 35,
    type: "EXPRESS",
    assignee: "Darren A.",
    image: "/04.png",
    status: "ready",
  },
  {
    id: "#WLS392493",
    location: "Wells Minho Center",
    packages: 396,
    weight: "2455kg",
    code: "A02503",
    type: "HEAVY",
    assignee: "Jake F.",
    image: "/02.png",
    time: "16:30",
    status: "ready",
  },
  {
    id: "#CHB2049",
    location: "Chadwick II",
    packages: 46,
    type: "EXPRESS",
    assignee: "Lory K.",
    image: "/05.png",
    status: "ready",
  },
];

const vehicles = [
  {
    id: "BA-02-AS",
    type: "Medium-Duty Box Truck",
    maxWeight: "3200 kg",
    dimensions: "15-20 m³",
    tags: ["HEAVY LOAD", "GPS"],
    available: true,
  },
  {
    id: "BC-67-XZ",
    type: "Medium-Duty Box Truck",
    maxWeight: "3500 kg",
    dimensions: "20 m³",
    tags: ["HEAVY LOAD", "GPS"],
    available: true,
  },
];

export default function Dashboardblock() {
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    orders.find((order) => order.id === "#WLS392493")
  );
  const [collapsed, setCollapsed] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { theme, setTheme } = useTheme();

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    if (isMobile) {
      setAssignmentOpen(true);
    }
  };

  const handleAssign = () => {
    if (!selectedOrder) return;
    toast({
      title: "Vehicle assigned",
      description: "Vehicle assigned to order " + selectedOrder.id,
    });
    setAssignmentOpen(false);
  };

  const handleAutoAssign = () => {
    if (!selectedOrder) return;
    toast({
      title: "Auto-assignment complete",
      description: "Vehicle and driver automatically assigned to order " + selectedOrder.id,
    });
  };

  const handleNewOrder = () => {
    toast({
      title: "New order",
      description: "Creating a new order...",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen bg-background w-full border ">
        {/* Mobile Sidebar Toggle */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger
            asChild
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent collapsed={false} toggleSidebar={toggleSidebar} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-[#F8F8F8] dark:bg-card flex-col">
          <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div
          className={
            "flex-1 flex flex-col overflow-hidden bg-[#F8F8F8] dark:bg-card " +
            (collapsed ? "w-full" : "w-full") +
            " transition-width duration-300 ease-in-out"
          }
        >
          {/* Header */}
          <header className=" border-b border-border flex items-center px-4 h-14 bg-[##F8F8F8] dark:bg-card">
            <div className="md:flex items-center space-x-2 hidden">
              <Home className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">/ Orders /</span>
              <span className="text-muted-foreground text-sm font-medium">
                Board
              </span>
            </div>

            <div className="ml-auto flex items-center space-x-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"
                    />
                  )}
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="relative md:block hidden">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-9 pr-4 py-2 w-64 rounded-xl"
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden bg-white dark:bg-black p-4 rounded-3xl">
            {/* Order Columns */}
            <div className="flex-1 flex overflow-x-auto">
              <OrderColumn
                title="To-be fulfilled"
                count={
                  orders.filter((o) => o.status === "to-be-fulfilled").length
                }
                orders={orders.filter((o) => o.status === "to-be-fulfilled")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
              />

              <OrderColumn
                title="Open"
                count={orders.filter((o) => o.status === "open").length}
                orders={orders.filter((o) => o.status === "open")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
              />

              <OrderColumn
                title="Ready for Shipment"
                count={orders.filter((o) => o.status === "ready").length}
                orders={orders.filter((o) => o.status === "ready")}
                onOrderClick={handleOrderClick}
                selectedOrder={selectedOrder}
                isActive={true}
              />
            </div>

            {/* Assignment Panel - Desktop */}
            <AnimatePresence>
              {selectedOrder && !isMobile && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 400, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-l border-border bg-card flex flex-col overflow-hidden"
                >
                  <AssignmentPanel
                    order={selectedOrder}
                    vehicles={vehicles}
                    onClose={() => setSelectedOrder(undefined)}
                    onAssign={handleAssign}
                    onAutoAssign={handleAutoAssign}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Assignment Panel - Mobile */}
            <Sheet open={assignmentOpen} onOpenChange={setAssignmentOpen}>
              <SheetContent side="right" className="p-0 sm:max-w-md w-full">
                {selectedOrder && (
                  <AssignmentPanel
                    order={selectedOrder}
                    vehicles={vehicles}
                    onClose={() => setAssignmentOpen(false)}
                    onAssign={handleAssign}
                    onAutoAssign={handleAutoAssign}
                    isMobile={true}
                  />
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
function NavItem({
  icon,
  label,
  active = false,
  notification = false,
  collapsed = false,
}: NavItemProps) {
  return (
    <div
      className={
        "flex items-center " +
        (collapsed ? "justify-center" : "px-3") +
        " py-2 " +
        (active ? "bg-accent" : "hover:bg-accent/50") +
        " relative"
      }
    >
      <div
        className={
          collapsed ? "flex-col items-center" : "flex items-center"
        }
      >
        <span
          className={
            (notification ? "relative" : "") +
            " " +
            (collapsed ? "mb-1" : "mr-3")
          }
        >
          {notification && !collapsed && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          )}
          {icon}
        </span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    </div>
  );
}

function SidebarContent({ collapsed, toggleSidebar }: SidebarContentProps) {
  return (
    <div
      className={
        "bg-background h-full flex flex-col " +
        (collapsed ? "w-16" : "w-64") +
        " transition-all duration-300 ease-in-out"
      }
    >
      {/* Logo */}
      <div
        className={
          "flex " +
          (collapsed ? "justify-center" : "justify-between") +
          " items-center gap-3 py-3"
        }
      >
        <div className="flex items-center gap-2 ml-3" onClick={toggleSidebar}>
          <Icons.logo className="w-8 h-8" />
          <span className={collapsed ? "hidden" : ""}>PharmX</span>
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-transparent hidden md:flex"
          >
            <ChevronsLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 pr-4 py-2 rounded-xl" />
            <span className="absolute right-3 top-3 text-xs text-muted-foreground">
              ⌘K
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={
          "flex-1 overflow-y-auto " +
          (collapsed ? "flex flex-col items-center" : "")
        }
      >
        <div className="py-2">
          {!collapsed && (
            <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
              MAIN
            </div>
          )}
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Package className="w-4 h-4" />}
            label="Orders"
            active
            collapsed={collapsed}
          />
          <NavItem
            icon={<Clock4 className="w-4 h-4" />}
            label="Scheduler"
            notification
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4 px-3 py-1 text-xs font-medium text-muted-foreground">
              ADMIN
            </div>
          )}
          <NavItem
            icon={<Users className="w-4 h-4" />}
            label="Users"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Truck className="w-4 h-4" />}
            label="Freight"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Pill className="w-4 h-4" />}
            label="Pharmacies"
            collapsed={collapsed}
          />
          <NavItem
            icon={<GitBranch className="w-4 h-4" />}
            label="Workflows"
            notification
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4 px-3 py-1 text-xs font-medium text-muted-foreground">
              SETTINGS
            </div>
          )}
          <NavItem
            icon={<UserCheck className="w-4 h-4" />}
            label="User Roles"
            collapsed={collapsed}
          />
          <NavItem
            icon={<KeyRound className="w-4 h-4" />}
            label="Permissions"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4">
              <NavItem
                icon={<Globe className="w-4 h-4" />}
                label="Global Settings"
                collapsed={collapsed}
              />
              <NavItem
                icon={<HelpCircle className="w-4 h-4" />}
                label="Help"
                collapsed={collapsed}
              />
            </div>
          )}
        </div>
      </nav>

      {/* User Profile */}
      <div
        className={
          "p-4 border-t border-border flex " +
          (collapsed ? "flex-col items-center" : "items-center")
        }
      >
        <Avatar className={"h-8 w-8 " + (collapsed ? "mb-2" : "")}>
          <AvatarImage src="/02.png" />
          <AvatarFallback>LF</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium">Arihant Jain</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </>
        )}
      </div>
    </div>
  );
}

function OrderColumn({
  title,
  count,
  orders,
  onOrderClick,
  selectedOrder,
  isActive = false,
}: OrderColumnProps): JSX.Element {
  return (
    <div className="flex-1 min-w-[350px] flex flex-col border-r border-border bg-[#F8F8F8] dark:bg-card">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {title === "Ready for Shipment" && (
            <Gauge className="w-5 h-5 text-muted-foreground mr-2" />
          )}
          {title === "To-be fulfilled" && (
            <CircleDashed className="w-5 h-5 text-muted-foreground mr-2" />
          )}

          {title === "Open" && (
            <Circle className="w-5 h-5 text-muted-foreground mr-2" />
          )}

          <span className="font-medium">{title}</span>
          {count > 0 && (
            <span className="ml-1 text-muted-foreground text-sm">{count}</span>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {orders.map((order: Order, index: number) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => onOrderClick(order)}
            >
              <OrderCard
                order={order}
                isSelected={selectedOrder?.id === order.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrderCard({ order, isSelected }: OrderCardProps): JSX.Element {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "EXPRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "REFRIGERATED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "HEAVY":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "LATE PICKUP":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Card
        className={cn(
          "mb-2 cursor-pointer",
          isSelected ? "border-primary shadow-sm" : "border-border"
        )}
      >
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-medium">{order.id}</div>
            <div className="flex items-center">
              {order.duration && (
                <div className="flex items-center text-muted-foreground text-sm mr-2">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>{order.duration}</span>
                </div>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{order.location}</span>
            {order.time && (
              <>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>Today</span>
                <span className="mx-2">•</span>
                <span>{order.time}</span>
              </>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Package className="w-4 h-4 mr-1" />
            <span>{order.packages} packages</span>
            <span className="mx-2">•</span>
            <span>EST</span>
            {order.assignShelf && (
              <>
                <span className="mx-2">•</span>
                <span>Assign shelf</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getTypeColor(order.type)}>
              {order.type}
            </Badge>
            {order.secondType && (
              <Badge
                variant="outline"
                className={getTypeColor(order.secondType)}
              >
                {order.secondType}
              </Badge>
            )}
          </div>

          {order.assignee ? (
            <div className="flex items-center border border-dotted px-3 py-1 rounded-md">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={order.image} />
                <AvatarFallback>{order.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{order.assignee}</span>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 border border-dotted "
            >
              <Plus className="w-3 h-3 mr-1" />
              <span>Assign staff</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function AssignmentPanel({
  order,
  vehicles,
  onClose,
  onAssign,
  onAutoAssign,
  isMobile = false,
}: AssignmentPanelProps): JSX.Element {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="font-medium">Assign vehicle and driver</div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-medium">{order.id}</div>
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            READY
          </Badge>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{order.location}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>Today</span>
          <span className="mx-2">•</span>
          <span>{order.time || "16:30"}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="w-4 h-4 mr-1" />
          <span>{order.packages} packages</span>
          {order.weight && (
            <>
              <span className="mx-2">•</span>
              <span>{order.weight}</span>
            </>
          )}
          {order.code && (
            <>
              <span className="mx-2">•</span>
              <span>{order.code}</span>
            </>
          )}
        </div>

        <div className="mt-2">
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          >
            {order.type}
          </Badge>
        </div>
      </div>
      <Button className="w-full mb-4" onClick={onAutoAssign}>
        Auto-assign vehicle and driver
      </Button>

      <div className="mt-5">
        <Tabs defaultValue="vehicle" className="">
          <div className="flex justify-between ">
            <TabsList>
              <div>
                <TabsTrigger value="vehicle">
                  <Truck className="w-4 h-4 mr-1" />
                  Vehicle
                </TabsTrigger>
                <TabsTrigger value="driver">
                  <Icons.driver className=" " />
                  <span>
                    <span className="ml-2">Driver</span>
                  </span>
                </TabsTrigger>
              </div>
            </TabsList>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              <span>Add vehicle</span>
            </Button>
          </div>
          <TabsContent value="vehicle" className="mt-2 p-2">
            <AnimatePresence>
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <VehicleCard
                    vehicle={vehicle}
                    isSelected={selectedVehicle === vehicle.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="driver">
            <div className="p-4 text-center text-muted-foreground">
              No drivers available at the moment
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-border   flex justify-end items-center mb-12">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onAssign} disabled={!selectedVehicle}>
          Assign
        </Button>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, isSelected }: VehicleCardProps): JSX.Element {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Card
        className={cn(
          "mb-4 cursor-pointer",
          isSelected ? "border-primary shadow-sm" : "border-border"
        )}
      >
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-medium">{vehicle.id}</div>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              AVAILABLE
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="text-sm text-muted-foreground mb-1">
            {vehicle.type}
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vehicle.maxWeight}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.27002 6.96002L12 12.01L20.73 6.96002"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22.08V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {vehicle.dimensions}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {vehicle.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className={
                  index === 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
`,
            language: "tsx",
          },
        ],
      },
    ],
  },
];

export default function BlocksPageDemo() {
  const { resolvedTheme } = useTheme();

  const currentShikiTheme = resolvedTheme === "dark" ? "vesper" : "min-light";

  return (
    <div className="container-wrapper h-full p-12">
      <div className="w-full flex justify-end mb-12 ">
        <Link
          href="https://shadcnblocks.com"
          className="hidden md:flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-md px-5 h-12  hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <Icons.shadcnblock className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-sm font-medium ">Shadcnblocks.com</span>
            <span className="text-xs text-neutral-400">
              600+ extra shadcn blocks
            </span>
          </div>
        </Link>
      </div>
      <BlocksPage
        title="A Newsletter Dashboard"
        previewComponent={<NewsletterDashboard />}
        files={sampleFiles}
        defaultFile="app/dashboard/page.tsx"
        theme={resolvedTheme as "light" | "dark"}
        shikiTheme={currentShikiTheme}
      />
      <div className="mt-12">
        <BlocksPage
          title="A Pharmacy Dashboard"
          previewComponent={<Dashboardblock />}
          files={sampleFiles2}
          defaultFile="app/dashboard/page.tsx"
          theme={resolvedTheme as "light" | "dark"}
          shikiTheme={currentShikiTheme}
        />
      </div>
    </div>
  );
}
