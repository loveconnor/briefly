"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { buttonVariants, Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const data: Project[] = [
  {
    id: 1,
    name: "Homepage Redesign",
    client: {
      name: "Acme Studio"
    },
    phase: "Design Review",
    status: "waiting",
    waitingOn: "Client Approval",
    progress: 68
  },
  {
    id: 2,
    name: "Brand Portal",
    client: {
      name: "Nova Collective"
    },
    phase: "Content Intake",
    status: "blocked",
    waitingOn: "Assets",
    progress: 34
  },
  {
    id: 3,
    name: "Landing Page",
    client: {
      name: "Brightside"
    },
    phase: "Client Review",
    status: "review",
    waitingOn: "Copy Feedback",
    progress: 82
  },
  {
    id: 4,
    name: "Website Launch",
    client: {
      name: "Northstar Labs"
    },
    phase: "Final QA",
    status: "active",
    waitingOn: "Development",
    progress: 91
  },
  {
    id: 5,
    name: "SEO Audit",
    client: {
      name: "Luma Works"
    },
    phase: "Delivery Prep",
    status: "active",
    waitingOn: "Internal Review",
    progress: 76
  },
  {
    id: 6,
    name: "Product Photography",
    client: {
      name: "Fieldstone"
    },
    phase: "Asset Collection",
    status: "waiting",
    waitingOn: "Client Upload",
    progress: 28
  },
  {
    id: 7,
    name: "Membership Checkout",
    client: {
      name: "Atlas Club"
    },
    phase: "Build",
    status: "active",
    waitingOn: "Development",
    progress: 54
  },
  {
    id: 8,
    name: "Case Study Page",
    client: {
      name: "Evergreen"
    },
    phase: "Copy Review",
    status: "review",
    waitingOn: "Client Approval",
    progress: 73
  },
  {
    id: 9,
    name: "Booking Flow",
    client: {
      name: "Harbor House"
    },
    phase: "Scope Review",
    status: "blocked",
    waitingOn: "Decision",
    progress: 39
  },
  {
    id: 10,
    name: "Services Page",
    client: {
      name: "Mosaic"
    },
    phase: "Design",
    status: "active",
    waitingOn: "Design Review",
    progress: 47
  },
  {
    id: 11,
    name: "Launch Checklist",
    client: {
      name: "Cedar & Co."
    },
    phase: "Final QA",
    status: "active",
    waitingOn: "Final QA",
    progress: 88
  },
  {
    id: 12,
    name: "About Page Refresh",
    client: {
      name: "Horizon"
    },
    phase: "Complete",
    status: "complete",
    waitingOn: "None",
    progress: 100
  }
];

type Client = {
  avatar?: string;
  name: string;
};

type Project = {
  id: number;
  name?: string;
  client?: Client;
  phase?: string;
  waitingOn?: string;
  status: "active" | "blocked" | "complete" | "review" | "waiting";
  progress?: number;
};

const statusCopy: Record<Project["status"], string> = {
  active: "Active",
  blocked: "Blocked",
  complete: "Complete",
  review: "In review",
  waiting: "Waiting"
};

const statusDotClassMap: Record<Project["status"], string> = {
  active: "bg-success",
  blocked: "bg-destructive",
  complete: "bg-info",
  review: "bg-warning",
  waiting: "bg-muted-foreground"
};

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
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
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Project",
    cell: ({ row }) => row.getValue("name")
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const client = row.getValue("client") as Client;
      const initials = client.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-7">
            <AvatarImage src={client.avatar} alt="" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {client.name}
        </div>
      );
    }
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => row.getValue("phase")
  },
  {
    accessorKey: "status",
    header: "Signal",
    cell: ({ row }) => {
      const status = row.getValue("status") as Project["status"];
      const waitingOn = row.original.waitingOn;

      return (
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", statusDotClassMap[status])} />
          <span className="text-sm">
            {statusCopy[status]}
            {waitingOn && waitingOn !== "None" ? (
              <span className="text-muted-foreground"> · {waitingOn}</span>
            ) : null}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex min-w-24 items-center gap-3">
        <span className="text-sm tabular-nums">{row.getValue("progress")}%</span>
        <span className="bg-muted hidden h-px w-12 overflow-hidden rounded-full sm:block">
          <span
            className="bg-muted-foreground/50 block h-px"
            style={{ width: `${row.getValue("progress")}%` }}
          />
        </span>
      </div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 p-0")}
            >
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Project</DropdownMenuItem>
              <DropdownMenuItem>Members</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];

export function TableRecentProjects() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
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
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize: 6
      }
    }
  });

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-medium tracking-tight">Recent Projects</h2>
          <p className="text-muted-foreground mt-1 text-sm">Active delivery work and the next point of movement.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Filter projects..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="w-full sm:w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }))}>
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border-y">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="[&:has([role=checkbox])]:pl-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="[&:has([role=checkbox])]:pl-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
