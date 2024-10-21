import { ComponentDto, OrderDto } from "@saeki/schema";
import Link from "next/link";
import { Fragment } from "react";
import React from "react";

import { getComponentsByOrderId } from "@/lib/components";

import { ComponentCard } from "../../../../../components/component-card";
import { MessageCard } from "../../../message-card";

export function OrderCard(props: { data: OrderDto }) {
  const [components, setComponents] = React.useState<ComponentDto[]>([]);

  React.useEffect(() => {
    getComponentsByOrderId(props.data.id).then(setComponents);
  }, [props.data.id]);

  return (
    <Link href={`/orders/${props.data.id}`}>
      <article className="flex flex-col w-full gap-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Order {props.data.id}</h3>
        {/* <p className="text-sm">{props.data.createdAt.toLocaleDateString()}</p> */}
        {components.length < 1 && (
          <MessageCard message="No components in this order" />
        )}
        {components.map((it) => (
          <Fragment key={it.id}>
            <ComponentCard data={it} />
          </Fragment>
        ))}
      </article>
    </Link>
  );
}
