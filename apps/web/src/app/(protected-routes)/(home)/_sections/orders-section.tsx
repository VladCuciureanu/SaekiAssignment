"use client";
import { getManyOrders } from "@/lib/orders";
import { OrderDto } from "@/types/saeki/order.dto";
import { useEffect, useState } from "react";

export function OrdersSection() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManyOrders().then((orders) => {
      setOrders(orders);
      setLoading(false);
    });
  }, []);
  return (
    <section id="orders-section" className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">Orders</h2>
      {loading && <MessageCard message="Loading orders..." />}
      {!loading && orders.length === 0 && (
        <MessageCard message="You don't have any orders yet." />
      )}
      {orders.map((order) => (
        <OrderCard data={order} key={order.id} />
      ))}
    </section>
  );
}

function MessageCard({ message }: { message: string }) {
  return (
    <div className="from-border to-border text-foreground/50 h-32 w-full rounded-lg bg-gradient-to-b p-px">
      <div className="bg-background flex h-full w-full items-center justify-center rounded-[calc(var(--radius)-1px)] p-4 text-sm italic">
        {message}
      </div>
    </div>
  );
}

function OrderCard({ data }: { data: OrderDto }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-4 shadow-md">
      <h3 className="font-medium">{data.id}</h3>
      <p>{data.createdAt.toLocaleDateString()}</p>
    </div>
  );
}
