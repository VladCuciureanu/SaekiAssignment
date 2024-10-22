"use client";

import { OrderDto } from "@saeki/schema";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table";
import { getManyOrders } from "@/lib/orders";

import { OrdersTableColumns } from "./_table/columns";

export default function OrdersTablePage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManyOrders()
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <main>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <Loader className="animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto flex h-full w-full flex-1 flex-col space-y-6 p-8 max-w-[1280px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          </div>
        </div>
        <DataTable columns={OrdersTableColumns} data={orders}>
          <></>
        </DataTable>
      </div>
    </main>
  );
}
