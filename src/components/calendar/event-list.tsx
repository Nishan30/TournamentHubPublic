import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/badge";

interface EventListProps {
  events: Event[];
  onEventClick: (id: string) => void; 
}

export function EventList({ events,onEventClick }: EventListProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-white">Upcoming events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 rounded-lg bg-neutral-900/50 p-4"
            onClick={() => onEventClick(event.id)}
          >
            <div className="rounded-lg bg-neutral-800 p-2">
              <CalendarDays className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-medium text-white">{event.title}</h3>
                <Badge variant="secondary">
                  {format(event.date, "MMM d, yyyy")}
                </Badge>
              </div>
              <p className="text-sm text-neutral-400">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}