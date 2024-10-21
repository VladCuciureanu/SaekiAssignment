import {
  ComponentDto,
  ComponentStatus,
  MaterialDto,
  ServicePackageDto,
} from "@saeki/schema";
import { useEffect, useState } from "react";

import { FakePhoto } from "@/components/fake-photo";
import { Badge } from "@/components/ui/badge";

type ComponentCardProps = {
  data: ComponentDto;
  editable?: boolean;
};
export function ComponentCard(props: ComponentCardProps) {
  const [material, setMaterial] = useState<MaterialDto | undefined>(undefined);
  const [servicePackage, setServicePackage] = useState<
    ServicePackageDto | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const totalPrice =
    (props.data.unitPrice ?? 0) * (material?.price ?? 0) * props.data.quantity +
    (servicePackage?.price ?? 0);

  useEffect(() => {
    Promise.all([]);
  }, []);

  return (
    <article className="flex w-full flex-row gap-2 p-4 rounded-lg border">
      <div className="w-full">
        <h3 className="font-semibold">Component {props.data.id}</h3>
        <div className="text-sm flex flex-col gap-2 mt-2">
          <div className="flex gap-1 items-center">
            <p>Status:</p> <ComponentStatusBadge status={props.data.status} />
          </div>
          <div className="flex gap-1 items-center">
            <p>Quantity:</p> <b>{props.data.quantity}</b>
          </div>
          <div className="flex gap-1 items-center">
            <p>Total:</p>
            <b>
              {loading && <i>Calculating...</i>}
              {props.data.unitPrice && !loading && <>${totalPrice}</>}
            </b>
          </div>
        </div>
      </div>
      <FakePhoto />
    </article>
  );
}

function ComponentStatusBadge(props: { status: ComponentStatus }) {
  return <Badge variant="outline">{props.status}</Badge>;
}
