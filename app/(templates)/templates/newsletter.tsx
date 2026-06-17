import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SubscriberDataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { subscriberData } from "./data";

import Newsletter from "@/components/newsletter";

export default function NewsletterDashboard() {
  return (
    <>
      <div className="">
        <SidebarProvider>
          <AppSidebar variant="inset" className="" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col ">
              <div className=" flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4  md:gap-6 w-full">
                  <SectionCards />
                  <div className=" grid md:grid-cols-2">
                    <ChartAreaInteractive />
                    <Newsletter />
                  </div>
                  <SubscriberDataTable data={subscriberData} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
}
