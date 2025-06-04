"use client";

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  GripVerticalIcon,
  MoreVerticalIcon,
  SearchIcon,
  XCircleIcon,
  UserIcon,
  MailIcon,
} from "lucide-react";

import { z } from "zod";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Tabs, TabsContent } from "@/components/ui/Tabs";
import Image from "next/image";
import { IoNavigate } from "react-icons/io5";
import { RiLayoutGridFill } from "react-icons/ri";

export const subscriberSchema = z.object({
  id: z.number(),
  subscriberId: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.enum(["Active", "Inactive", "Pending", "Unsubscribed"]),
  signupDate: z.string(),
  source: z.enum([
    "Website",
    "Social Media",
    "Email Campaign",
    "Referral",
    "Direct",
    "Advertisement",
  ]),
});

export type Subscriber = z.infer<typeof subscriberSchema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<Subscriber>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subscriberId",
    header: "Subscriber ID",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600 dark:text-sky-400">
        {row.original.subscriberId}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MailIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        Active: {
          color:
            "dark:bg-teal-950 bg-sky-100 text-sky-500 dark:text-teal-500 border-teal-900",
        },
        Inactive: {
          color:
            "bg-orange-100 dark:bg-orange-950 text-orange-500 border-orange-900",
        },
        Pending: {
          color:
            " bg-yellow-100  dark:bg-yellow-950 text-yellow-700 dark:text-yellow-500 border-yellow-900",
        },
        Unsubscribed: {
          color:
            "bg-rose-100 dark:bg-red-950 text-rose-500 dark:text-red-500 border-red-900 ",
        },
      };

      const config = statusConfig[status];

      return (
        <div
          className={`flex items-center rounded-md text-sm font-medium py-1 px-3 ${config.color} `}
        >
          {status}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "signupDate",
    header: "Signup Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.signupDate).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`flex items-center rounded-md text-sm font-medium py-1 px-3  `}
      >
        {row.original.source}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Send Email</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 ">
            Unsubscribe
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<Subscriber> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function SubscriberDataTable({
  data: initialData,
}: {
  data: Subscriber[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = React.useState<string[]>([]);
  const [dateFilter, setDateFilter] = React.useState("allTime");

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  // Apply filters
  React.useEffect(() => {
    const filters: ColumnFiltersState = [];

    if (statusFilter.length > 0) {
      filters.push({ id: "status", value: statusFilter });
    }

    if (sourceFilter.length > 0) {
      filters.push({ id: "source", value: sourceFilter });
    }

    setColumnFilters(filters);
  }, [statusFilter, sourceFilter]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: "includesString",
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const activeSubscribers = data.filter(
    (sub) => sub.status === "Active"
  ).length;

  return (
    <>
      <div className="border-y border-neutral-200 dark:border-neutral-800 flex items-center gap-2 px-6 py-3 text-sm">
        <Image src="/dashboard/users.svg" height={20} width={20} alt="" />
        <span>Subscribers</span>
        <span className="text-neutral-800 dark:text-neutral-400">
          . {activeSubscribers.toLocaleString()} active subscribers
        </span>
      </div>

      <Tabs
        defaultValue="outline"
        className="flex w-full flex-col justify-start gap-3"
      >
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            {/* Search Filter */}
            <div className="relative flex-1 max-w-[260px] cursor-pointer">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <Input
                className="rounded-md bg-muted border h-9 pl-10 pr-4 text-sm shadow-sm dark:bg-neutral-900"
                placeholder="Search subscribers..."
                type="search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900 outline-none">
              <CalendarDays className="h-4 w-4 mr-2 outline-none" />
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-none bg-transparent p-0 h-auto shadow-none outline-none">
                  <SelectValue
                    placeholder="Signup Date"
                    className="border-none outline-none "
                  />
                </SelectTrigger>
                <SelectContent className="outline-none">
                  <SelectItem value="allTime" className="outline-none">
                    All Time
                  </SelectItem>
                  <SelectItem value="today" className="outline-none">
                    Today
                  </SelectItem>
                  <SelectItem value="week" className="outline-none">
                    This Week
                  </SelectItem>
                  <SelectItem value="month" className="outline-none">
                    This Month
                  </SelectItem>
                  <SelectItem value="quarter" className="outline-none">
                    This Quarter
                  </SelectItem>
                  <SelectItem value="year" className="outline-none">
                    This Year
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900">
              <IoNavigate className="h-4 w-4 mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto font-normal">
                    Status{" "}
                    {statusFilter.length > 0 && `(${statusFilter.length})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {["Active", "Inactive", "Pending", "Unsubscribed"].map(
                    (status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStatusFilter([...statusFilter, status]);
                          } else {
                            setStatusFilter(
                              statusFilter.filter((s) => s !== status)
                            );
                          }
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Source Filter */}
            <div className="flex items-center rounded-md bg-muted border h-9 px-3 text-sm shadow-sm dark:bg-neutral-900">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto font-normal">
                    Source{" "}
                    {sourceFilter.length > 0 && `(${sourceFilter.length})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {[
                    "Website",
                    "Social Media",
                    "Email Campaign",
                    "Referral",
                    "Direct",
                    "Advertisement",
                  ].map((source) => (
                    <DropdownMenuCheckboxItem
                      key={source}
                      checked={sourceFilter.includes(source)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSourceFilter([...sourceFilter, source]);
                        } else {
                          setSourceFilter(
                            sourceFilter.filter((s) => s !== source)
                          );
                        }
                      }}
                    >
                      {source}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <RiLayoutGridFill className="text-green-500" />
                  <span className="hidden lg:inline">Table View</span>
                  <span className="lg:hidden">Columns</span>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <span className="hidden lg:inline">Show: All subscribers</span>
            </Button>
          </div>
        </div>

        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <div className="overflow-hidden rounded-lg border">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No subscribers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
