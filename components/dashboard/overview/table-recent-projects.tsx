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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
        <div className="flex items-center gap-4">
          <Avatar>
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
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Project["status"];

      const statusClassMap: Record<typeof status, string> = {
        active: "bg-success/8 text-success-foreground dark:bg-success/16",
        blocked: "bg-destructive/8 text-destructive-foreground dark:bg-destructive/16",
        complete: "bg-info/8 text-info-foreground dark:bg-info/16",
        review: "bg-warning/8 text-warning-foreground dark:bg-warning/16",
        waiting: "bg-muted text-muted-foreground"
      };

      return <Badge className={`capitalize ${statusClassMap[status]}`}>{status}</Badge>;
    }
  },
  {
    accessorKey: "waitingOn",
    header: "Waiting On",
    cell: ({ row }) => {
      const waitingOn = row.getValue("waitingOn") as string;

      return <Badge variant={waitingOn === "None" ? "outline" : "secondary"}>{waitingOn}</Badge>;
    }
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
        <Progress value={row.getValue("progress")} className="h-2" />
        <span className="text-muted-foreground text-sm">%{row.getValue("progress")}</span>
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
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Filter projects..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
            >
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
        <div className="rounded-md border">
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
      </CardContent>
    </Card>
  );
}
