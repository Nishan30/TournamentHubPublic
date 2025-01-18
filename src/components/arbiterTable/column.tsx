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

interface Arbriter {
  id: string;
  name: string;
  email: string
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  phoneNumber:string;
  tournamentId:string
}

type ArbiterActionProps = {
  onEdit: (arbiter: Arbriter) => void;
  onRemove: (arbiterId: string) => void;
};

export const columns = ({
  onEdit,
  onRemove,
}: ArbiterActionProps): ColumnDef<Arbriter>[] => [
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
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }: { row: Row<Arbriter> }) =>
      row.getValue("position") || "—",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.getValue("phoneNumber") || "—",
  },
  {
    accessorKey: "tournamentId",
    header: "Tournament ID",
    cell: ({ row }) => row.getValue("tournamentId") || "—",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const arbiter = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(arbiter)}>
              <UserCog className="mr-2 h-4 w-4" />
              Edit Arbiter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("View", arbiter.id)}>
              <Users className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onRemove(arbiter.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Arbiter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
