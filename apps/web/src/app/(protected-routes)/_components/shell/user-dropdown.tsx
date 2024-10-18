"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function UserDropdown(props: { isCollapsed?: boolean }) {
  const { user, logOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative ml-1 mr-2 h-fit w-full select-none py-1.5"
        >
          <div
            className={cn(
              "flex h-8 w-full min-w-full flex-row items-center gap-2",
              props.isCollapsed ? "justify-center" : "justify-start",
            )}
          >
            <Avatar className={"h-8 w-8"}>
              <AvatarImage src="/avatars/03.png" alt="@shadcn" />
              <AvatarFallback className="bg-foreground text-background dark:bg-primary dark:text-background">
                {user?.email.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!props.isCollapsed && (
              <div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
                {user?.email}
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
        sideOffset={12}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="space-y-1">
            <span className="text-sm font-medium leading-none">
              {user?.email.slice(0, user?.email.indexOf("@"))}
            </span>
            <span className="text-muted-foreground text-sm leading-none">
              {user?.email.slice(user?.email.indexOf("@"))}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem dangerous onClick={() => logOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
