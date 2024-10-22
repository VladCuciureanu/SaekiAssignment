import {
  Container,
  FolderOpen,
  GripVertical,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/vector/logo";
import { LogoIcon } from "@/components/vector/logo-icon";
import { cn } from "@/lib/utils";

import { useShell } from "./context";
import { NavLinkGroup } from "./nav-link-group";
import { UserDropdown } from "./user-dropdown";

export function Sidebar() {
  const { sidebarWidth, grabbing, sidebarCollapsed, setGrabbing } = useShell();

  const handleHandleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setGrabbing(true);
  };

  const handleHandleMouseUp = () => {
    setGrabbing(false);
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleHandleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleHandleMouseUp);
    };
  }, []);

  return (
    <aside
      className="bg-background fixed inset-y-0 left-0 hidden h-full border-r transition-all ease-in-out md:block"
      style={{ width: sidebarWidth }}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-between">
        <section className="flex w-full flex-col items-center">
          <Link href="/" className="text-foreground dark:text-primary my-2 h-8">
            {sidebarCollapsed && <LogoIcon className="h-full" />}
            {!sidebarCollapsed && <Logo className="h-full" />}
          </Link>
          <Separator />
          <NavLinkGroup
            isCollapsed={sidebarCollapsed}
            links={[
              {
                href: "/",
                title: "Dashboard",
                icon: LayoutDashboard,
              },
              {
                title: "Projects",
                // label: "99",
                href: "/projects",
                icon: FolderOpen,
              },
              {
                title: "Orders",
                // label: "99",
                href: "/orders",
                icon: Container,
              },
            ]}
          />
          <Separator />
          <NavLinkGroup
            isCollapsed={sidebarCollapsed}
            links={[
              {
                href: "/support-tickets",
                title: "Support",
                icon: MessageSquare,
              },
            ]}
          />
        </section>
        <section className="flex w-full flex-col items-center">
          <NavLinkGroup
            isCollapsed={sidebarCollapsed}
            links={[
              {
                href: "/settings",
                title: "Settings",
                icon: Settings,
              },
            ]}
          />
          <Separator />
          <div className="h-full w-full p-2">
            <UserDropdown />
          </div>
        </section>
        <div
          id="sidebar-drag-strip"
          className={cn(
            "absolute inset-y-0 left-full h-full w-3 -translate-x-1/2 cursor-grab",
            grabbing && "cursor-grabbing",
          )}
          onMouseDown={handleHandleMouseDown}
        >
          <SidebarHandle className="absolute top-[50%] -translate-y-1/2" />
        </div>
      </div>
    </aside>
  );
}

function SidebarHandle(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        props.className,
        "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border",
      )}
    >
      <GripVertical className="h-2.5 w-2.5" />
    </div>
  );
}
