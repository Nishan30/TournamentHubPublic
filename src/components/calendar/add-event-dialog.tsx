import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@/types/event";

interface AddEventDialogProps {
  selectedDate: Date | null;
  onAddEvent: (event: Omit<Event, "id">) => void;
}

export function AddEventDialog({ selectedDate, onAddEvent }: AddEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Event["type"]>("tournament");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && title && description) {
      onAddEvent({
        title,
        description,
        date: selectedDate,
        type,
      });
      setOpen(false);
      setTitle("");
      setDescription("");
      setType("tournament");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={selectedDate ? format(selectedDate, "PPP") : ""}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as Event["type"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tournament">Tournament</SelectItem>
                <SelectItem value="match">Match</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}