import { CreateOrderDto } from "@/types/saeki/create-order.dto";
import { OrderDto } from "@/types/saeki/order.dto";
import { UpdateOrderDto } from "@/types/saeki/update-order.dto";

export async function createOrder(dto: CreateOrderDto): Promise<OrderDto> {
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
  dto: UpdateOrderDto,
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
