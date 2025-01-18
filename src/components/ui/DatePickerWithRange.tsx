"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  selected?: DateRange; // For controlled component
  onChange?: (range: DateRange | undefined) => void; // For external state handling
}

export function DatePickerWithRange({
  className,
  selected,
  onChange,
}: DatePickerWithRangeProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }
  );

  // Use controlled props if provided, fallback to internal state otherwise
  const date = selected ?? internalDate;
  const handleChange = (range: DateRange | undefined) => {
    if (onChange) {
      onChange(range); // Invoke external change handler
    } else {
      setInternalDate(range); // Update internal state
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
