import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import DatetimePickerDemo from "@/app/(docs)/docs/datetime-picker/datetime-picker-demo";
import Usage from "@/app/(docs)/docs/components/usage";
import DatetimePickerHourCycle from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-hour-cycle";
import DatePickerAndTimeInput from "@/app/(docs)/docs/datetime-picker/usage/date-picker-and-time-input";
import {
  Reference,
  ReferenceBorder,
} from "@/app/(docs)/docs/components/reference";
import { P } from "@/components/ui/heading-with-anchor";
import { InlineCode } from "@/components/ui/inline-code";
import { PropLink } from "@/app/(docs)/docs/components/props-table/prop-link";
import DatetimePickerForm from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-form";
import DatetimePickerRef from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-ref";
import DatetimePickerCalendarSettings from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-calendar-settings";
import DatetimePickerGranularity from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-granularity";
import DatetimePickerYearRange from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-year-range";
import DatetimePickerDisplayFormat from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-display-format";
import DatetimePickerLocale from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-locale";
import DatetimePickerDisabled from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-disabled";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { datetimePickerProp } from "@/app/(docs)/docs/datetime-picker/datetime-picker-prop";
import DatetimePickerPlaceholder from "@/app/(docs)/docs/datetime-picker/usage/datetime-picker-placeholder";
import YearDropdownDesc from "@/app/(docs)/docs/datetime-picker/year-dropdown-desc";

export const metadata: Metadata = baseMetadata({
  title: "Datetime Picker",
  description:
    "A datetime picker built on top of shadcn-ui and no additional library needed.",
});

const DatetimePickerPage = () => {
  return (
    <PageTemplate
      title="Datetime Picker"
      description="A datetime picker built on top of shadcn-ui and no additional library needed."
    >
      <ReferenceBorder>
        <Reference href="https://ui.shadcn.com/docs/components/calendar" />
      </ReferenceBorder>

      <PreviewCodeCard
        path="app/(docs)/docs/datetime-picker/datetime-picker-demo.tsx"
        cli="@spectrumui/datetime-picker-demo"
      >
        <DatetimePickerDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall={true}
        codePath="components/ui/datetime-picker.tsx"
        withEnd
        installScript="npx shadcn@latest add calendar select input popover"
        steps={[{ title: "Update react-day-picker to ^9.*" }]}
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Hour cycle - 12H / 24H"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-hour-cycle.tsx"
        cli="@spectrumui/datetime-picker-hour-cycle"
      >
        <DatetimePickerHourCycle />
      </Usage>
      <Usage
        title="Date picker or Time picker"
        path="app/(docs)/docs/datetime-picker/usage/date-picker-and-time-input.tsx"
        cli="@spectrumui/datetime-picker-and-time-input"
      >
        <DatePickerAndTimeInput />
      </Usage>

      <Usage
        title="Year Dropdown Range"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-year-range.tsx"
        description={<YearDropdownDesc />}
        cli="@spectrumui/datetime-picker-year-range"
      >
        <DatetimePickerYearRange />
      </Usage>

      <Usage
        title="Locale"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-locale.tsx"
        cli="@spectrumui/datetime-picker-locale"
        description={
          <>
            <P className="text-muted-foreground">
              Import locale from{" "}
              <PropLink href="https://date-fns.org/v3.6.0/docs/I18n-Contribution-Guide">
                <InlineCode>date-fns</InlineCode>
              </PropLink>
            </P>
          </>
        }
      >
        <DatetimePickerLocale />
      </Usage>

      <Usage
        title="Week start on Monday, Show week number, Disable outside days"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-calendar-settings.tsx"
        cli="@spectrumui/datetime-picker-calendar-settings"
      >
        <DatetimePickerCalendarSettings />
      </Usage>

      <Usage
        title="Display Format"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-display-format.tsx"
        cli="@spectrumui/datetime-picker-display-format"
        description={
          <>
            <P className="text-muted-foreground">
              Visit{" "}
              <PropLink href="https://date-fns.org/v3.6.0/docs/format">
                <InlineCode>date-fns</InlineCode>
              </PropLink>{" "}
              to customize the format.
            </P>
          </>
        }
      >
        <DatetimePickerDisplayFormat />
      </Usage>

      <Usage
        title="Placeholder"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-placeholder.tsx"
        cli="@spectrumui/datetime-picker-placeholder"
      >
        <DatetimePickerPlaceholder />
      </Usage>

      <Usage
        title="Granularity"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-granularity.tsx"
        cli="@spectrumui/datetime-picker-granularity"
      >
        <DatetimePickerGranularity />
      </Usage>

      <Usage
        title="Disabled"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-disabled.tsx"
        cli="@spectrumui/datetime-picker-disabled"
      >
        <DatetimePickerDisabled />
      </Usage>

      <Usage
        title="Ref"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-ref.tsx"
        cli="@spectrumui/datetime-picker-ref"
      > 
        <DatetimePickerRef />
      </Usage>

      <Usage
        title="Form"
        path="app/(docs)/docs/datetime-picker/usage/datetime-picker-form.tsx"
        cli="@spectrumui/datetime-picker-form"
      >
        <DatetimePickerForm />
      </Usage>

      <PropsTable props={datetimePickerProp} />
    </PageTemplate>
  );
};

export default DatetimePickerPage;
