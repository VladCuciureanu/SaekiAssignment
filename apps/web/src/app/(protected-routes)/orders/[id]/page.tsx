"use client";

import { OrderDto } from "@saeki/schema";
import React, { useState } from "react";

import { getOrder } from "@/lib/orders";

import { OrderComponentsSection } from "./_sections/components";
import { OrderDetailsSection } from "./_sections/order-details";
import { OrderStatusSection } from "./_sections/order-status";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    getOrder(params.id)
      .then((res) => {
        setOrder(res);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  return (
    <main>
      <div className="mx-auto flex h-full w-full flex-1 flex-col space-y-6 p-8 max-w-[1280px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Order {params.id}
            </h2>
            {/* <p className="text-muted-foreground">
              What can we help you with today?
            </p> */}
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="flex w-full flex-col gap-4">
            {order && <OrderStatusSection order={order} />}
            <OrderComponentsSection orderId={params.id} />
          </div>
          <div className="w-full flex flex-col gap-4">
            {order && <OrderDetailsSection order={order} />}
          </div>
        </div>
      </div>
    </main>
  );
}
