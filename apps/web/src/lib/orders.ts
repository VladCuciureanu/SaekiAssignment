import { OrderDto } from "@/types/saeki/order.dto";

export async function createOrder(order: OrderDto): Promise<OrderDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order),
  }).then((res) => res.json());
}

export async function getManyOrders(): Promise<OrderDto[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    credentials: "include",
  }).then((res) => {
    if (res.status / 100 === 2) return res.json();
    return [];
  });
}

export async function getOrder(id: string): Promise<OrderDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json());
}

export async function updateOrder(order: OrderDto): Promise<OrderDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${order.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(order),
    },
  ).then((res) => res.json());
}

export async function deleteOrder(id: string): Promise<OrderDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  ).then((res) => res.json());
}
