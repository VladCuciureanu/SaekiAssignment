"use client";

import { useEffect, useState } from "react";

import { getManyOrders } from "@/lib/orders";
import { OrderDto } from "@/types/saeki/order.dto";

import { MessageCard } from "../message-card";
import { OrderCard } from "./order-card";

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
