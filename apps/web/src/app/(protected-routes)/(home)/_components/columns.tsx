"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ProjectDto } from "@/types/saeki/project.dto";
import { projectStatusFilterOptions } from "./statuses";

export const columns: ColumnDef<ProjectDto>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onClick={(event) => event.stopPropagation()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //     maxSize: 1,
  //     minSize: 1,
  //   },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
    maxSize: 17,
    minSize: 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.getValue("name") ?? row.getValue("id")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    maxSize: 25,
    minSize: 1,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = projectStatusFilterOptions.find(
        (status) => status.value === row.getValue("status"),
      );
      if (!status) {
        return null;
      }
      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    maxSize: 1,
    minSize: 1,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const dateString = (row.getValue("createdAt") as Date).toLocaleDateString(
        "de-DE",
      );
      return <div className="w-[150px]">{dateString}</div>;
    },
    maxSize: 1,
    minSize: 1,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
