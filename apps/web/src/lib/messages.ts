import { CreateMessageRequest, MessageDto } from "@saeki/schema";

export async function createMessage(
  dto: CreateMessageRequest,
): Promise<MessageDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dto),
  }).then((res) => res.json());
}

export async function getMessagesBySupportTicketId(
  id: string,
): Promise<MessageDto[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support-tickets/${id}/messages`,
    {
      credentials: "include",
    },
  ).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}
