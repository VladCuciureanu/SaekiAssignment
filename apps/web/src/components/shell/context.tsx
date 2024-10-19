"use client";
import React from "react";
import { createContext } from "react";

type ShellContextProps = {
  sidebarCollapsed: boolean;
  grabbing: boolean;
  setGrabbing: (grabbing: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
};

export const ShellContext = createContext<ShellContextProps>({} as any);
export const useShell = () => React.useContext(ShellContext);

type ShellProviderProps = {
  children: React.ReactNode;
  sidebarWidthValues: number[];
  sidebarCollapsedCutoff: number;
  sidebarDefaultWidth: number;
};

export function ShellProvider({
  children,
  sidebarWidthValues,
  sidebarCollapsedCutoff,
  sidebarDefaultWidth,
}: ShellProviderProps) {
  const [sidebarWidth, setSidebarWidth] = React.useState(sidebarDefaultWidth);
  const [grabbing, setGrabbing] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleMousePosition = (event: {
    clientX: React.SetStateAction<number>;
  }) => {
    if (grabbing) {
      const mousePos = event.clientX as number;
      const closestWidth = sidebarWidthValues.reduce((prev, curr) =>
        Math.abs(curr - mousePos) < Math.abs(prev - mousePos) ? curr : prev,
      );
      const isCollapsed = closestWidth <= sidebarCollapsedCutoff;
      setSidebarCollapsed(isCollapsed);
      setSidebarWidth(closestWidth);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMousePosition);
    return () => {
      document.removeEventListener("mousemove", handleMousePosition);
    };
  }, [grabbing]);

  return (
    <ShellContext.Provider
      value={{
        sidebarWidth,
        setSidebarWidth,
        grabbing,
        setGrabbing,
        sidebarCollapsed,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}
