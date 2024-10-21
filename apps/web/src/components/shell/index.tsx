"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { useShell } from "./context";
import { Sidebar } from "./sidebar";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { sidebarWidth, grabbing } = useShell();

  return (
    <div
      style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
      className={cn(
        "transition-all ease-in-out md:pl-[var(--sidebar-width)]",
        grabbing && "cursor-grabbing",
      )}
    >
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
