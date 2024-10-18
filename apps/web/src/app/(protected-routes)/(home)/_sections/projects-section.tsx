"use client";
import { getManyProjects } from "@/lib/projects";
import { ProjectDto } from "@/types/saeki/project.dto";
import { useEffect, useState } from "react";

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

function MessageCard({ message }: { message: string }) {
  return (
    <div className="from-border to-border text-foreground/50 h-32 w-full rounded-lg bg-gradient-to-b p-px">
      <div className="bg-background flex h-full w-full items-center justify-center rounded-[calc(var(--radius)-1px)] p-4 text-sm italic">
        {message}
      </div>
    </div>
  );
}

function ProjectCard({ data }: { data: ProjectDto }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-4 shadow-md">
      <h3 className="font-medium">{data.id}</h3>
      <p>{data.createdAt.toLocaleDateString()}</p>
    </div>
  );
}