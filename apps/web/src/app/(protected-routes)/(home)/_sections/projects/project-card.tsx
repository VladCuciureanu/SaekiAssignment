import { ProjectDto } from "@saeki/schema";
import Link from "next/link";
import { Fragment } from "react";

import { ComponentCard } from "../component-card";
import { MessageCard } from "../message-card";

export function ProjectCard(props: { data: ProjectDto }) {
  return (
    <Link href={`/projects/${props.data.id}`}>
      <article className="flex flex-col w-full gap-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Project {props.data.id}</h3>
        {/* <p className="text-sm">{props.data.createdAt.toLocaleDateString()}</p> */}
        {props.data.components.length < 1 && (
          <MessageCard message="No components in this project" />
        )}
        {props.data.components.map((it) => (
          <Fragment key={it.id}>
            <ComponentCard data={it} />
          </Fragment>
        ))}
      </article>
    </Link>
  );
}
