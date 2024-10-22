import { ComponentDto, MaterialDto, ServicePackageDto } from "@saeki/schema";
import { useEffect, useState } from "react";

import { MessageCard } from "@/app/(protected-routes)/message-card";
import { updateComponent } from "@/lib/components";
import { getManyMaterials } from "@/lib/materials";
import { getManyServicePackages } from "@/lib/service-packages";
import { cn } from "@/lib/utils";

import { FakePhoto } from "./fake-photo";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ComponentEditor(props: {
  data: ComponentDto;
  open: boolean;
  onClose: () => void;
}) {
  const [materials, setMaterials] = useState<MaterialDto[]>([]);
  const [servicePackages, setServicePackages] = useState<ServicePackageDto[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // TODO: Switch to Tanstack forms

  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
    props.data.materialId,
  );

  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    props.data.quantity,
  );

  const [selectedServicePackageId, setSelectedServicePackageId] =
    useState<string>(props.data.servicePackageId);

  const dirty =
    selectedMaterialId !== props.data.materialId ||
    selectedQuantity !== props.data.quantity ||
    selectedServicePackageId !== props.data.servicePackageId;

  useEffect(() => {
    if (!props.open) return;
    Promise.all([
      getManyMaterials().then(setMaterials),
      getManyServicePackages().then(setServicePackages),
    ]).then(() => setLoading(false));
  }, [props.open]);

  function handleSubmit() {
    setSubmitting(true);
    if (submitting) return;
    updateComponent(props.data.id, {
      materialId: selectedMaterialId,
      quantity: selectedQuantity,
      servicePackageId: selectedServicePackageId,
    }).then(() => window.location.reload());
  }

  function handleCancel() {
    setSelectedMaterialId(props.data.materialId);
    setSelectedQuantity(props.data.quantity);
    setSelectedServicePackageId(props.data.servicePackageId);
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
    >
      <DialogContent>
        <DialogTitle>Edit component {props.data.id}</DialogTitle>
        <DialogDescription>
          Edit the component details below. Click submit to save changes.
        </DialogDescription>
        <div className="flex flex-col gap-2">
          <Label id="label-quantity">Quantity</Label>
          <Input
            type="number"
            aria-labelledby="label-quantity"
            value={selectedQuantity}
            onChange={(ev) =>
              setSelectedQuantity(parseInt(ev.currentTarget.value))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label id="label-material">Material</Label>
          {materials.length < 1 && (
            <MessageCard message="Loading materials..." />
          )}
          <div className="w-full flex items-center gap-2">
            {materials.map((material) => {
              const isSelected = material.id === selectedMaterialId;
              return (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() => setSelectedMaterialId(material.id)}
                  selected={isSelected}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label id="label-service-package">Service Package</Label>
          {servicePackages.length < 1 && (
            <MessageCard message="Loading service packages..." />
          )}
          <div className="w-full flex items-center gap-2">
            {servicePackages.map((servicePackage) => {
              const isSelected = servicePackage.id === selectedServicePackageId;
              return (
                <ServicePackageCard
                  key={servicePackage.id}
                  servicePackage={servicePackage}
                  onClick={() => setSelectedServicePackageId(servicePackage.id)}
                  selected={isSelected}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-4">
          <Button
            onClick={handleSubmit}
            disabled={!dirty || submitting || loading}
          >
            Submit
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MaterialCard(props: {
  material: MaterialDto;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <Button
      onClick={props.onClick}
      className={cn(
        "h-full w-min flex flex-col items-start gap-2 px-2",
        props.selected && "outline outline-primary",
      )}
      variant="outline"
    >
      <FakePhoto />
      <div className="flex flex-col items-start gap-1">
        <h3>"{props.material.name}"</h3>
        <div className="text-sm">
          <p>
            Price: <b>${props.material.price}</b>
          </p>
        </div>
      </div>
    </Button>
  );
}

function ServicePackageCard(props: {
  servicePackage: ServicePackageDto;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <Button
      onClick={props.onClick}
      className={cn(
        "h-full w-min flex flex-col items-start gap-2 px-2",
        props.selected && "outline outline-primary",
      )}
      variant="outline"
    >
      <FakePhoto />
      <div className="flex flex-col items-start gap-1">
        <h3>"{props.servicePackage.name}"</h3>
        <div className="text-sm">
          <p>
            Price: <b>${props.servicePackage.price}</b>
          </p>
        </div>
      </div>
    </Button>
  );
}
