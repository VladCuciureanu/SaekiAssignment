"use client";

import { ProjectDto } from "@saeki/schema";
import { Loader } from "lucide-react";
import React, { useState } from "react";

import { FileUploadProvider } from "@/components/file-upload/context";
import { getProject } from "@/lib/projects";

import { AddMoreFilesSection } from "./_sections/add-more-files";
import { ComponentsSection } from "./_sections/components";
import { OrderFormSection } from "./_sections/order-form";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectDto | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    getProject(params.id)
      .then((res) => {
        setProject(res);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <main>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <Loader className="animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto flex h-full w-full flex-1 flex-col space-y-6 p-8 max-w-[1280px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Project {params.id}
            </h2>
            {/* <p className="text-muted-foreground">
              What can we help you with today?
            </p> */}
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="flex w-full flex-col gap-4">
            <ComponentsSection projectId={params.id} />
            <FileUploadProvider projectId={params.id}>
              <AddMoreFilesSection />
            </FileUploadProvider>
          </div>
          <div className="w-full">
            <OrderFormSection projectId={params.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
