import {
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Participant {
  id: string;
  name: string;
  email: string;
  teamName: string;
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  entryFeeDetails: string;
  phoneNumber: string;
  tournamentId: string;
}

type ParticipantActionProps = {
  onEdit: (participant: Participant) => void;
  onRemove: (participantId: string) => void;
};

export const columns = (isIndividual: boolean, { onEdit, onRemove }: ParticipantActionProps): ColumnDef<Participant>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  ...(isIndividual
    ? []
    : [
        {
          accessorKey: "teamName",
          header: "Team",
          cell: ({ row }: { row: Row<Participant> }) =>
            row.getValue("teamName") || "—",
        },
      ]),
  {
    accessorKey: "walletAddress",
    header: "Wallet Address",
    cell: ({ row }) => row.getValue("walletAddress") || "—",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const participant = row.original;
      console.log(participant);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(participant)}>
              <UserCog className="mr-2 h-4 w-4" />
              Edit Participant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("View", participant.id)}>
              <Users className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete", onRemove(participant.id))}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Participant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
