import {
  CreateOrderRequest,
  OrderDto,
  UpdateOrderRequest,
} from "@saeki/schema";

export async function createOrder(dto: CreateOrderRequest): Promise<OrderDto> {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dto),
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

export async function updateOrder(
  id: string,
  dto: UpdateOrderRequest,
): Promise<OrderDto> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
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
