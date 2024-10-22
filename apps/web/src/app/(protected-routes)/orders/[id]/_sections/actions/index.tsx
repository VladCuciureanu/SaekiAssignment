"use client";

import { OrderDto, OrderStatus } from "@saeki/schema";
import { Ban, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/lib/orders";
import { createSupportTicket } from "@/lib/support-tickets";

export function OrderActionsSection(props: { order: OrderDto }) {
  const router = useRouter();

  function handleCancel() {
    deleteOrder(props.order.id)
      .then(() => location.reload())
      .catch(console.error);
  }

  function handleOpenSupportTicket() {
    createSupportTicket({ orderId: props.order.id }).then((res) =>
      router.push(`/support-tickets/${res.id}`),
    );
  }

  return (
    <section
      id="order-actions-section"
      className="flex w-full max-w-[1200px] flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Actions</h2>
      <div className="w-full p-3 rounded-lg border">
        <div className="flex flex-row w-full gap-2 items-center">
          <Button
            size="sm"
            variant="destructive"
            className="w-min flex flex-row items-center gap-1.5"
            onClick={handleCancel}
            disabled={props.order.status !== OrderStatus.PaymentDue}
          >
            <Ban className="h-3 w-3 -ml-0.5" />
            Cancel
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-min flex flex-row items-center gap-1.5"
            onClick={handleOpenSupportTicket}
          >
            <Ticket className="h-3 w-3 -ml-0.5" />
            Open Support Ticket
          </Button>
        </div>
      </div>
    </section>
  );
}
