import { ComponentDto } from "@saeki/schema";
import { useEffect, useState } from "react";

import { MessageCard } from "@/app/(protected-routes)/message-card";
import { ComponentCard } from "@/components/component-card";
import { getComponentsByProjectId } from "@/lib/components";

export function ComponentsSection(props: { projectId: string }) {
  const [components, setComponents] = useState<ComponentDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponentsByProjectId(props.projectId)
      .then((res) => {
        setComponents(res);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="components-section"
      className="flex w-full max-w-[1200px] flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Components</h2>
      {loading && <MessageCard message="Loading components..." />}
      {!loading && components.length === 0 && (
        <MessageCard message="You don't have any components yet." />
      )}
      {components.map((component) => (
        <ComponentCard data={component} key={component.id} editable extended />
      ))}
    </section>
  );
}