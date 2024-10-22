"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { OrderDto, OrderStatus } from "@saeki/schema";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteOrder } from "@/lib/orders";

interface OrdersTableRowActionsProps {
  row: Row<OrderDto>;
}

export function OrdersTableRowActions({ row }: OrdersTableRowActionsProps) {
  function handleCancelOrder() {
    deleteOrder(row.original.id).then(() => {
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
        <DropdownMenuItem
          dangerous
          onClick={handleCancelOrder}
          disabled={row.original.status !== OrderStatus.PaymentDue}
        >
          Cancel
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
