import { AppSidebar } from "@/components/AppSidebar";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { SubscriberDataTable } from "@/components/DataTable";
import { SectionCards } from "@/components/SectionCards";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { subscriberData } from "./data";

import Newsletter from "@/components/Newsletter";

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
