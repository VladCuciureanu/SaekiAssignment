import { OrderDto, OrderStatus } from "@saeki/schema";
import {
  BadgeAlert,
  Ban,
  Binary,
  HandCoins,
  Package,
  PackageCheck,
  TruckIcon,
  Undo,
} from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function OrderStatusSection(props: { order: OrderDto }) {
  const status = props.order.status;

  const title = StatusMap[status].title;
  const description = StatusMap[status].description;
  const animate = StatusMap[status].animate;
  const icon = StatusMap[status].icon;

  return (
    <section
      id="order-status-section"
      className="flex w-full max-w-[1200px] flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Status</h2>
      <article
        className={cn(
          "w-full p-[3px] rounded-lg border",
          animate && "animated-card-wrapper",
        )}
      >
        <div className="w-full bg-background rounded-[calc(var(--radius)-3px)] flex flex-col justify-center items-center gap-4 h-[192px]">
          {icon}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold tracking-tight">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </article>
    </section>
  );
}

const StatusMap: Record<
  OrderStatus,
  { title: string; description: string; animate: boolean; icon: ReactNode }
> = {
  PaymentDue: {
    title: "Payment Due",
    description: "Please pay for your order to continue.",
    animate: false,
    icon: <HandCoins className="h-8 w-8" />,
  },
  Processing: {
    title: "Processing",
    description: "We are preparing your order.",
    animate: true,
    icon: <Binary className="h-8 w-8" />,
  },
  Cancelled: {
    title: "Cancelled",
    description: "Your order has been cancelled.",
    animate: false,
    icon: <Ban className="h-8 w-8" />,
  },
  Problem: {
    title: "Problem",
    description: "There is a problem with your order.",
    animate: false,
    icon: <BadgeAlert className="h-8 w-8" />,
  },
  InTransit: {
    title: "In Transit",
    description: "Your order is on the way.",
    animate: true,
    icon: <TruckIcon className="h-8 w-8" />,
  },
  PickupAvailable: {
    title: "Pickup Available",
    description: "Your order can be picked up from it's destination.",
    animate: false,
    icon: <Package className="h-8 w-8" />,
  },
  Delivered: {
    title: "Delivered",
    description: "Your order has been delivered.",
    animate: false,
    icon: <PackageCheck className="h-8 w-8" />,
  },
  Returned: {
    title: "Returned",
    description: "Your order has been returned.",
    animate: false,
    icon: <Undo className="h-8 w-8" />,
  },
};
