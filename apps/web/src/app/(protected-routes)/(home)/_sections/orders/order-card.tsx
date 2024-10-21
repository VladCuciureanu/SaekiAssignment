import { OrderDto } from "@saeki/schema";

export function OrderCard(props: { data: OrderDto }) {
  return (
    <article className="flex w-full flex-col gap-2 rounded-lg border p-4 shadow-md">
      <h3 className="text-lg font-semibold">{props.data.id}</h3>
      <p>{props.data.createdAt.toLocaleDateString()}</p>
    </article>
  );
}
