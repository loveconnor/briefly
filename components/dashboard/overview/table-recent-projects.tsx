"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, ChevronLeft, ChevronRight, Ellipsis, Trash2Icon, UserPlusIcon } from "lucide-react";
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
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
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
import type { OverviewProject } from "@/lib/app-data";

type Client = {
  avatar?: string;
  name: string;
};

type Project = OverviewProject;

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
    cell: ({ row }) => <ProjectActions project={row.original} />
  }
];

function ProjectActions({ project }: { project: Project }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [membersOpen, setMembersOpen] = React.useState(false);
  const [membersOverride, setMembersOverride] = React.useState<Project["team"] | null>(null);
  const [memberName, setMemberName] = React.useState("");
  const [memberRole, setMemberRole] = React.useState("Member");
  const [memberError, setMemberError] = React.useState("");
  const [memberPending, setMemberPending] = React.useState(false);
  const projectHref = `/dashboard/projects/${project.slug}`;
  const members = membersOverride ?? project.team;

  async function deleteProject() {
    if (isDeleting) return;

    const confirmed = window.confirm(`Delete ${project.name}? This will remove its tasks, approvals, files, updates, and portal.`);

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(project.slug)}`, {
        method: "DELETE"
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to delete project.");
      }

      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to delete project.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function addMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMemberError("");
    setMemberPending(true);

    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(project.slug)}/members`, {
        body: JSON.stringify({
          name: memberName,
          role: memberRole,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to add member.");
      }

      setMembersOverride((current) => [...(current ?? project.team).filter((member) => member.id !== "owner"), payload.member]);
      setMemberName("");
      setMemberRole("Member");
      router.refresh();
    } catch (error) {
      setMemberError(error instanceof Error ? error.message : "Unable to add member.");
    } finally {
      setMemberPending(false);
    }
  }

  async function removeMember(memberId: string) {
    setMemberError("");
    setMemberPending(true);

    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(project.slug)}/members`, {
        body: JSON.stringify({ memberId }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to remove member.");
      }

      setMembersOverride((current) => (current ?? project.team).filter((member) => member.id !== memberId));
      router.refresh();
    } catch (error) {
      setMemberError(error instanceof Error ? error.message : "Unable to remove member.");
    } finally {
      setMemberPending(false);
    }
  }

  return (
    <>
      <div className="text-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`More actions for ${project.name}`}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 p-0")}
          >
            <span className="sr-only">Open menu</span>
            <Ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={projectHref} />}>View Project</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setMembersOverride(null);
                setMembersOpen(true);
              }}
            >
              Members
            </DropdownMenuItem>
            <DropdownMenuItem disabled={isDeleting} onClick={deleteProject} variant="destructive">
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Sheet open={membersOpen} onOpenChange={setMembersOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Project members</SheetTitle>
            <SheetDescription>{project.name}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4">
            <div className="space-y-2">
              {members.map((member) => (
                <div className="flex items-center justify-between gap-3 rounded-md border p-3" key={member.id}>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{member.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{member.role}</div>
                  </div>
                  {member.removable ? (
                    <Button
                      aria-label={`Remove ${member.name}`}
                      disabled={memberPending}
                      onClick={() => removeMember(member.id)}
                      size="icon-sm"
                      type="button"
                      variant="ghost"
                    >
                      <Trash2Icon className="size-4 text-destructive" />
                    </Button>
                  ) : null}
                </div>
              ))}
              {members.length === 0 ? (
                <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                  No members assigned yet.
                </div>
              ) : null}
            </div>
            <form className="space-y-3 border-t pt-4" onSubmit={addMember}>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor={`member-name-${project.slug}`}>
                  Add member
                </label>
                <Input
                  id={`member-name-${project.slug}`}
                  onChange={(event) => setMemberName(event.target.value)}
                  placeholder="Name or email"
                  required
                  value={memberName}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor={`member-role-${project.slug}`}>
                  Role
                </label>
                <Input
                  id={`member-role-${project.slug}`}
                  onChange={(event) => setMemberRole(event.target.value)}
                  placeholder="Member"
                  required
                  value={memberRole}
                />
              </div>
              {memberError ? <p className="text-sm text-destructive">{memberError}</p> : null}
              <Button disabled={memberPending} type="submit">
                <UserPlusIcon className="size-4" />
                {memberPending ? "Saving..." : "Add member"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function TableRecentProjects({ data }: { data: Project[] }) {
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
                <TableCell colSpan={columns.length}>
                  <DashboardEmptyState
                    className="my-4"
                    title="No projects match the current filters"
                  />
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
