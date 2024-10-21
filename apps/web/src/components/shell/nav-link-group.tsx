"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributeAnchorTarget } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
    label?: string;
    icon: LucideIcon;
  }[];
}

export function NavLinkGroup({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex w-full flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <CollapsedNavLink key={index} {...link} />
          ) : (
            <NavLink key={index} {...link} />
          ),
        )}
      </nav>
    </div>
  );
}

function NavLink(link: NavProps["links"][0]) {
  const pathname = usePathname();
  return (
    <Link
      href={link.href}
      className={cn(
        buttonVariants({
          variant: pathname === link.href ? "default" : "ghost",
          size: "sm",
        }),
        pathname === link.href &&
          "dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white",
        "justify-start",
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      {link.title}
      {link.label && (
        <span
          className={cn(
            "ml-auto",
            pathname === link.href && "text-background dark:text-white",
          )}
        >
          {link.label}
        </span>
      )}
    </Link>
  );
}

function CollapsedNavLink(link: NavProps["links"][0]) {
  const pathname = usePathname();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={link.href}
          className={cn(
            buttonVariants({
              variant: pathname === link.href ? "default" : "ghost",
              size: "icon",
            }),
            "h-9 w-9",
            pathname === link.href &&
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
          )}
        >
          <link.icon className="h-4 w-4" />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {link.title}
        {link.label && (
          <span className="text-muted-foreground ml-auto">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
