"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { SupportTicketDto, SupportTicketStatus } from "@saeki/schema";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSupportTicket } from "@/lib/support-tickets";

interface SupportTicketsDataTableRowActionsProps {
  row: Row<SupportTicketDto>;
}

export function SupportTicketsDataTableRowActions({
  row,
}: SupportTicketsDataTableRowActionsProps) {
  function handleCloseTicket() {
    deleteSupportTicket(row.original.id).then(() => {
      location.reload();
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted ml-auto"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          dangerous
          onClick={handleCloseTicket}
          disabled={row.original.status !== SupportTicketStatus.Open}
        >
          Close
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
