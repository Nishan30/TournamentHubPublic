import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { EventList } from "./event-list";
import { AddEventDialog } from "./add-event-dialog";
import { Event } from "@/types/event";
import { EditMatchDialog } from "../EditMatch/editMatch";
import { updateMatch } from "@/services/tournament/match";
import toast from "react-hot-toast";
import { MatchDetails } from "../MatchDetails/matchDetail";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface TournamentCalendarProps {
  matches: Match[]; 
}
export interface ParticipantData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}
export interface ArbiterData {
  _id: string
  name: string;
  email: string;
  teamName:string;
}
interface IScore {
  participantId: string; 
  score: number; 
}
interface Match {
  _id: string;
  participants: ParticipantData[];
  arbiter: ArbiterData;
  teamName: string[];
  round: number;
  matchDate: Date;
  tournamentId: string;
  type:string;
  status: string;
  scores: IScore[]; 
  arbiterComment: string;
}


export function TournamentCalendar({ matches }: TournamentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Automatically set today's date
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null); // State for editing
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // To show MatchDetails

  console.log("MatchCount" + matches.length);

  const handleSubmit = async (updatedMatch: Match) => {
    console.log(selectedMatch);
      try {
        const result = await updateMatch({
          matchId:updatedMatch._id,
          updateData: updatedMatch , // Replace `score` with the actual fields you're updating
        });
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedMatch._id
              ? {
                  ...event,
                  title: `Match ${updatedMatch.round}: ${updatedMatch.participants
                    .map((p) => p.name)
                    .join(" vs ")}`,
                  description: `Arbiter: ${updatedMatch.arbiter.name}`,
                  date: new Date(updatedMatch.matchDate),
                }
              : event
          )
        );
        console.log('Match updated successfully:', result);
        toast.success("Match updated successfully");
      } catch (err: any) {
        console.log(err.error || 'Failed to update match');
        toast.error("Failed to update match");
      }
    };

  useEffect(() => {
    if(events.length < 1)
      {
        const matchEvents: Event[] = matches.map((match) => ({
          id: match._id,
          title: `Match ${match.round}: ${match.participants.map((p: any) => p.name).join(" vs ")}`,
          description: `Arbiter: ${match.arbiter.name}`,
          date: new Date(match.matchDate),
          type: "match",
          match, // Add raw match data for easy access
        }));
        setEvents(matchEvents);
      }
  }, [matches]);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleEventClick = (id: string) => {
    const match = matches.find((match) => match._id === id);
    if (match) {
      setSelectedMatch(match);
      setIsDetailsOpen(true); // Show MatchDetails
    }
  };

  const handleEditMatch = () => {
    setIsDetailsOpen(false); // Close MatchDetails
    setIsDialogOpen(true); // Open EditMatchDialog
  };

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: crypto.randomUUID(),
    };
    setEvents([...events, event]);
  };


  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      <Card className="p-4 bg-neutral-900/50 border-neutral-800">
        <div className="space-y-4">
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
          />
          <Separator className="bg-neutral-800" />
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <Separator className="bg-neutral-800" />
          <AddEventDialog selectedDate={selectedDate} onAddEvent={handleAddEvent} />
        </div>
      </Card>

      <Card className="bg-neutral-900/50 border-neutral-800">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="ml-2">
            <EventList events={events} onEventClick={handleEventClick} />
          </div>
        </ScrollArea>
      </Card>

      {selectedMatch && isDialogOpen &&(
        <EditMatchDialog
          match={selectedMatch}
          onClose={() => setIsDialogOpen(false)}
          onSave={(updatedMatch) => {
            handleSubmit(updatedMatch);
            setIsDialogOpen(false);
          }}
        />
      )}

      {selectedMatch && isDetailsOpen && (
        <MatchDetails
          match={selectedMatch}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={handleEditMatch}
        />
      )}
    </div>
  );
}
