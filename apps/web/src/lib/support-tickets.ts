import { CreateSupportTicketRequest, SupportTicketDto } from "@saeki/schema";

export async function createSupportTicket(
  dto: CreateSupportTicketRequest,
): Promise<SupportTicketDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support-tickets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
    },
  ).then((res) => res.json());
}

export async function getManySupportTickets(): Promise<SupportTicketDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support-tickets`,
    {
      credentials: "include",
    },
  ).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getSupportTicket(id: string): Promise<SupportTicketDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support-tickets/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json());
}

export async function deleteSupportTicket(
  id: string,
): Promise<SupportTicketDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support-tickets/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
