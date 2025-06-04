"use client";
import React, { useState } from "react";
import { DateTimePicker } from "@/components/UI/DatetimePicker";

const DatetimePickerDemo = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <DateTimePicker
      value={date}
      onChange={setDate}
      className="w-[280px]"
      locale={undefined}
      weekStartsOn={undefined}
      showWeekNumber={undefined}
      showOutsideDays={undefined}
    />
  );
};

export default DatetimePickerDemo;
