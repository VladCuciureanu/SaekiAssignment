import {
  ComponentDto,
  ComponentStatus,
  MaterialDto,
  ServicePackageDto,
} from "@saeki/schema";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { FakePhoto } from "@/components/fake-photo";
import { Badge } from "@/components/ui/badge";
import { deleteComponent } from "@/lib/components";
import { getMaterial } from "@/lib/materials";
import { getServicePackage } from "@/lib/service-packages";

import { ComponentEditor } from "./component-editor";
import { Button } from "./ui/button";

type ComponentCardProps = {
  data: ComponentDto;
  editable?: boolean;
  extended?: boolean;
};
export function ComponentCard(props: ComponentCardProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [material, setMaterial] = useState<MaterialDto | undefined>(undefined);
  const [servicePackage, setServicePackage] = useState<
    ServicePackageDto | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const totalPrice =
    (props.data.unitPrice ?? 0) * (material?.price ?? 0) * props.data.quantity +
    (servicePackage?.price ?? 0);

  useEffect(() => {
    Promise.all([
      getMaterial(props.data.materialId).then(setMaterial),
      getServicePackage(props.data.servicePackageId).then(setServicePackage),
    ]).then(() => setLoading(false));
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
          {props.extended && (
            <>
              <div className="flex gap-1 items-center">
                <p>Material:</p>
                <b>
                  {loading && <i>Loading...</i>}
                  {!loading && <>{material?.name}</>}
                </b>
              </div>
              <div className="flex gap-1 items-center">
                <p>Shipping:</p>
                <b>
                  {loading && <i>Loading...</i>}
                  {!loading && <>{servicePackage?.name}</>}
                </b>
              </div>
            </>
          )}
          <div className="flex gap-1 items-center">
            <p>Total:</p>
            <b>
              {loading && <i>Calculating...</i>}
              {!loading && <>${totalPrice}</>}
            </b>
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <FakePhoto />
        {props.editable && (
          <div className="flex flex-row-reverse gap-2 items-center">
            <Button
              size="sm"
              variant="destructive"
              className="w-min flex flex-row items-center gap-1.5"
              onClick={() =>
                deleteComponent(props.data.id).then(() =>
                  window.location.reload(),
                )
              }
            >
              <Trash className="h-3 w-3 -ml-0.5" />
              Delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-min flex flex-row items-center gap-1.5"
              onClick={() => setEditorOpen(true)}
            >
              <Pencil className="h-3 w-3 -ml-0.5" />
              Edit
            </Button>
          </div>
        )}
      </div>
      {props.editable && (
        <ComponentEditor
          data={props.data}
          open={props.editable && editorOpen}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </article>
  );
}

function ComponentStatusBadge(props: { status: ComponentStatus }) {
  return <Badge variant="outline">{props.status}</Badge>;
}
