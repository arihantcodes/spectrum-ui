import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import EventCalendar from "./demoevent";
import { Snippet } from "@/components/snippet";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Event Calendar",
  description:
    "An interactive calendar for displaying events, appointments, and daily schedules. A free React and Next.js component built with date-fns and Framer Motion.",
  keywords: [
    "event calendar",
    "calendar component",
    "React calendar",
    "Next.js calendar",
    "event scheduler",
    "appointment calendar",
    "booking calendar",
    "schedule component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/eventcalendar",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Event Calendar"
      description="An interactive calendar for displaying events, appointments, and daily schedules."
      url="https://ui.spectrumhq.in/docs/eventcalendar"
      keywords={[
        "event calendar",
        "calendar component",
        "React calendar",
        "Next.js calendar",
        "event scheduler",
        "appointment calendar",
        "booking calendar",
        "schedule component",
      ]}
    >
      <div>
        <PageTemplate
          title="Event Calendar"
          description="An interactive calendar for displaying events, appointments, and daily schedules."
          className="mt-5"
        >
        <PreviewCodeCard
          path="app/(docs)/docs/eventcalendar/demoevent.tsx"
          cli="@spectrumui/event-calendar"
        
        installScript="npm i lucide-react framer-motion date-fns"
        installCodePath="lib/utils.ts"
      >
          <EventCalendar />
        </PreviewCodeCard>
      <div className="p-0 md:p-4">
          <p className="mb-4">
            Create a new file called <code>Eventcalendar.tsx</code> in the
            {" components"} & install the following components
          </p>
          <Snippet
            text="npx shadcn@latest add input button dialog label
"
            width="500px"
          />
        </div>

      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
