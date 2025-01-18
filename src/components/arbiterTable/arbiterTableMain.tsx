"use client";

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
import { columns } from "@/components/arbiterTable/column";
import { DataTableToolbar } from "@/components/arbiterTable/arbiterTable";

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

interface ArbriterTableProps {
  data: Arbriter[];
  onAddArbiter: () => void;
  onEdit: (arbriter: Arbriter) => void;
  onRemove: (arbriterId: string) => void;
}

export function ArbriterTable({
  data: initialData,
  onAddArbiter,
  onEdit,
  onRemove,
}: ArbriterTableProps) {
  const [data, setData] = useState<Arbriter[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(initialData); // Sync data state with initialData prop
  }, [initialData]);

  const table = useReactTable({
    data,
    columns: columns({ onEdit, onRemove }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportArbiters = () => {
    const csvHeaders = ["ID,Name,Email,Question,walletAddress,paymentDetails,phoneNumber,tournamentId"];
    const csvRows = data.map(
      (arbriter) =>
        `${arbriter.id},${arbriter.name},${arbriter.email},${arbriter.questions},${arbriter.walletAddress},${arbriter.paymentDetails},${arbriter.phoneNumber},${arbriter.tournamentId}`
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "arbiters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importArbiters = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target?.result as string;
      const rows = csvData.split("\n").slice(1); // Skip header
      const importedData = rows.map((row) => {
        const [id, name, email, questions,walletAddress,paymentDetails,phoneNumber,tournamentId] = row.split(",");
        return { id, name, email, questions,walletAddress,paymentDetails,phoneNumber,tournamentId } as Arbriter;
      });

      setData((prevData) => [...prevData, ...importedData]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        onAddArbiter={onAddArbiter}
        onExport={exportArbiters}
        onImport={(file) => importArbiters(file)}
      />
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
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
                  className="h-24 text-center text-muted-foreground"
                >
                  No arbiters found.
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
