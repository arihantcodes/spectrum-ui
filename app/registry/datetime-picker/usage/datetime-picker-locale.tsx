"use client";
import React, { useState } from "react";
import { DateTimePicker } from "@/components/UI/DatetimePicker";
import { zhTW } from "date-fns/locale";
import { InlineCode } from "@/components/UI/InlineCode";
const DatetimePickerLocale = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex w-72 flex-col gap-3">
      <p>
        The following example is <InlineCode>zhTW</InlineCode> from{" "}
        <InlineCode>date-fns</InlineCode>.
      </p>
      <DateTimePicker
        locale={zhTW}
        value={date}
        onChange={setDate}
        weekStartsOn={undefined}
        showWeekNumber={undefined}
        showOutsideDays={undefined}
      />
    </div>
  );
};

export default DatetimePickerLocale;
