"use client";

import { ProjectDto } from "@saeki/schema";
import { useEffect, useState } from "react";

import { getManyProjects } from "@/lib/projects";

import { MessageCard } from "../../../message-card";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManyProjects().then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  }, []);
  return (
    <section id="projects-section" className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">Projects</h2>
      {loading && <MessageCard message="Loading projects..." />}
      {!loading && projects.length === 0 && (
        <MessageCard message="You don't have any projects yet." />
      )}
      {projects.map((project) => (
        <ProjectCard data={project} key={project.id} />
      ))}
    </section>
  );
}
