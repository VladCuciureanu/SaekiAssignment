import Link from "next/link";
import { Fragment } from "react";

import { ProjectDto } from "@/types/saeki/project.dto";

import { MessageCard } from "../message-card";
import { ProjectItemCard } from "./project-item-card";

export function ProjectCard(props: { data: ProjectDto }) {
  return (
    <Link href={`/projects/${props.data.id}`}>
      <article className="flex flex-col w-full gap-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Project {props.data.id}</h3>
        {/* <p className="text-sm">{props.data.createdAt.toLocaleDateString()}</p> */}
        {props.data.items.length < 1 && (
          <MessageCard message="No items in this project" />
        )}
        {props.data.items.map((item) => (
          <Fragment key={item.id}>
            <ProjectItemCard data={item} />
          </Fragment>
        ))}
      </article>
    </Link>
  );
}
