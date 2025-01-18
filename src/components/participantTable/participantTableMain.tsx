"use client"

import { useState, useEffect } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/participantTable/column";
import { DataTableToolbar } from "@/components/participantTable/participantTable";
import { saveParticipantData } from "@/services/mongoDB/mongodb";

interface Participant {
  id: string
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

interface ParticipantsTableProps {
  data: Participant[];
  isIndividual:boolean;
  onAddParticipant: () => void;
  onEdit: (participant: Participant) => void;
  onRemove: (participantId: string) => void;
}


export function ParticipantsTable({data: initialData,isIndividual, onAddParticipant, onEdit, onRemove }: ParticipantsTableProps) {
  const [data, setData] = useState<Participant[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  console.log("data" + initialData);
  useEffect(() => {
    setData(initialData); // Ensure table updates when initialData is provided
  }, [initialData]);

  const table = useReactTable({
    data,
    columns: columns(isIndividual, { onEdit, onRemove}),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection
  });
  const exportParticipants = () => {
    const csvHeaders = ["id,Name,Email,Team Name,Wallet Address,entryFeeDetails,paymentDetails,phoneNumber,questions,tournamentId"];
    const csvRows = data.map(
      (p) =>
        `${p.id || "—"},${p.name},${p.email},${p.teamName || "—"},${p.walletAddress || "—"},${p.entryFeeDetails || "—"},${p.paymentDetails || "—"},${p.phoneNumber || "—"},${p.questions || "—"},${p.tournamentId || "—"}`
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "participants.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveParticipant = async (participant: Participant) => {
    try {
      await saveParticipantData(participant);
      console.log("Participant saved:", participant.name);
    } catch (error) {
      console.error("Error saving participant:", error);
    }
  };

  const importParticipants = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target?.result as string;
      
      // Split rows and remove any empty rows at the end or in-between
      const rows = csvData.split("\n").slice(1); // Skip the header row
      const filteredRows = rows.filter(row => row.trim() !== ''); // Filter out empty rows
  
      const importedData = filteredRows.map((row) => {
        const [
          id,
          Name,
          Email,
          TeamName,
          WalletAddress,
          entryFeeDetails,
          paymentDetails,
          phoneNumber,
          questions,
          tournamentId,
        ] = row.split(",");
        return {
          id: id,
          name: Name,
          email: Email,
          teamName: TeamName || "",
          questions: questions || "",
          walletAddress: WalletAddress || "",
          paymentDetails: paymentDetails || "",
          entryFeeDetails: entryFeeDetails || "",
          phoneNumber: phoneNumber || "",
          tournamentId: tournamentId.trim(),
        } as Participant;
      });
  
      console.log("Imported Participants:", importedData);
  
      // Save each participant and refresh the table
      const saveResults = await Promise.all(
        importedData.map(async (participant) => {
          try {
            await saveParticipant(participant);
            return participant;
          } catch {
            return null;
          }
        })
      );
  
      // Filter out any failed saves and update the table data
      const successfullySavedParticipants = saveResults.filter(
        (participant): participant is Participant => participant !== null
      );
      setData((prevData) => [...prevData, ...successfullySavedParticipants]);
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} onAddParticipant={onAddParticipant} 
              onExport={exportParticipants}
              onImport={(file) => importParticipants(file)}/>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}