"use client";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { createContext, useContext, useState } from "react";
import { columns } from "./columns";
import { ProjectDto, ProjectStatus } from "@/types/saeki/project.dto";

type ProjectsContextProps = {
  table: Table<any>;
};

export const ProjectsContext = createContext<ProjectsContextProps>({} as any);

export const useProjects = () => useContext(ProjectsContext);

export function ProjectsProvider(props: { children: React.ReactNode }) {
  const [data, setData] = useState<ProjectDto[]>([
    {
      id: "a",
      status: ProjectStatus.Created,
      items: [],
      createdAt: new Date(),
    },
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <ProjectsContext.Provider value={{ table }}>
      {props.children}
    </ProjectsContext.Provider>
  );
}
