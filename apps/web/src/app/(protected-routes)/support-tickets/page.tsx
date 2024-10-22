"use client";

import { SupportTicketDto } from "@saeki/schema";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table";
import { getManySupportTickets } from "@/lib/support-tickets";

import { supportTicketsTableColumns } from "./_table/columns";

export default function SupportTicketsTablePage() {
  const [supportTickets, setSupportTickets] = useState<SupportTicketDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManySupportTickets()
      .then((res) => {
        setSupportTickets(res);
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
            <h2 className="text-2xl font-bold tracking-tight">
              Support Tickets
            </h2>
          </div>
        </div>
        <DataTable columns={supportTicketsTableColumns} data={supportTickets}>
          <></>
        </DataTable>
      </div>
    </main>
  );
}
