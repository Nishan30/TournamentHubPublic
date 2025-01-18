import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { Event } from "@/types/event";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  selectedDate: Date | string;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({
  currentDate,
  events,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1 px-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-neutral-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 px-4">
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(day, event.date)
          );
          
          return (
            <Button
              key={day.toISOString()}
              variant="ghost"
              className={cn(
                "h-12 text-white hover:bg-neutral-800",
                !isSameMonth(day, currentDate) && "text-neutral-600",
                isSameDay(day, selectedDate) && "bg-neutral-800 text-white font-medium",
                dayEvents.length > 0 &&
                  "relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-blue-500"
              )}
              onClick={() => onSelectDate(day)}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
    </div>
  );
}