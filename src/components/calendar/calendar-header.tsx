import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <h2 className="text-lg font-semibold text-white">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousMonth}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}