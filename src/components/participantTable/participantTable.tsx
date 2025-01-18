import { Table } from "@tanstack/react-table";
import { X, Plus, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps {
  table: Table<Participant>;
  onAddParticipant: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

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

export function DataTableToolbar({
  table,
  onAddParticipant,
  onExport,
  onImport,
}: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search participants..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8"
          onClick={() => document.getElementById("importFileInput")?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <input
          id="importFileInput"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
          }}
        />
        <Button variant="outline" className="h-8" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="green"  onClick={onAddParticipant} className="h-8">
          <Plus className="mr-2 h-4 w-4" />
          Add Participant
        </Button>
      </div>
    </div>
  );
}
