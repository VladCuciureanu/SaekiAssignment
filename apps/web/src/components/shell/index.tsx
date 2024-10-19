"use client";
import * as React from "react";
import { useShell } from "./context";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { sidebarWidth, grabbing } = useShell();

  return (
    <div
      style={{ marginLeft: sidebarWidth }}
      className={cn(
        "transition-all ease-in-out",
        grabbing && "cursor-grabbing",
      )}
    >
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
