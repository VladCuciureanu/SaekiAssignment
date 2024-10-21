import { FakePhoto } from "@/components/fake-photo";
import { Badge } from "@/components/ui/badge";
import { ComponentDto, ComponentStatus } from "@/types/saeki/component.dto";

export function ComponentCard(props: { data: ComponentDto }) {
  return (
    <article className="flex w-full flex-row gap-2 p-3 rounded-lg border">
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
              {!props.data.unitPrice && <i>Calculating...</i>}
              {props.data.unitPrice && (
                <>
                  $
                  {props.data.unitPrice *
                    props.data.material.price *
                    props.data.quantity +
                    props.data.servicePackage.price}
                </>
              )}
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
