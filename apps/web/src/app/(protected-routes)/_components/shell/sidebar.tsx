"use client";
import { Logo } from "@/components/vector/logo";
import { LogoIcon } from "@/components/vector/logo-icon";
import { NavLinkGroup } from "@/app/(protected-routes)/_components/shell/nav-link-group";
import { ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  MessagesSquare,
  Settings,
  Container,
} from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type SidebarProps = {
  defaultLayout: number[];
  defaultCollapsed: boolean;
  navCollapsedSize: number;
};
export function Sidebar({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <ResizablePanel
      defaultSize={defaultLayout[0]}
      collapsedSize={navCollapsedSize}
      collapsible={true}
      minSize={4}
      maxSize={20}
      onCollapse={() => {
        setIsCollapsed(true);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          true,
        )}`;
      }}
      onResize={() => {
        setIsCollapsed(false);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          false,
        )}`;
      }}
      className={cn(
        "sticky top-0 max-h-screen",
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
      )}
    >
      <div className="flex h-screen flex-col justify-between">
        <div className="flex w-full flex-col justify-between">
          <Link
            href="/"
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            {!isCollapsed && (
              <Logo className="text-foreground dark:text-primary h-5" />
            )}
            {isCollapsed && (
              <LogoIcon className="text-foreground dark:text-primary w-6" />
            )}
          </Link>
          <Separator />
          <NavLinkGroup
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/",
                variant: "default",
              },
              {
                title: "Projects",
                label: "99",
                href: "/projects",
                icon: FolderOpen,
                variant: "ghost",
              },
              {
                title: "Orders",
                label: "99",
                href: "/orders",
                icon: Container,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
        </div>
        <div className="flex w-full flex-col">
          <Separator />
          <NavLinkGroup
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Support",
                href: "/support",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Settings",
                href: "/settings",
                icon: Settings,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <div className="flex h-16 flex-row items-center justify-center px-2">
            <UserDropdown isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </ResizablePanel>
  );
}
