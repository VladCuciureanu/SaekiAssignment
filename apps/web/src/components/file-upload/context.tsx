"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { createComponent } from "@/lib/components";
import { createProject } from "@/lib/projects";

import { ModelConfirmationDialog } from "./model-confirmation-dialog";

type FileUploadContextProps = {
  files: File[];
  prepFilesForUpload: (files: File[]) => void;
  startUpload: () => Promise<void>;
};

export const FileUploadContext = React.createContext<FileUploadContextProps>(
  {} as any,
);

const AllowedFileExtensions = [".step", ".iges"];

export const useFileUpload = () => React.useContext(FileUploadContext);

type FileUploadProviderProps = {
  projectId?: string;
  children: React.ReactNode;
};

export function FileUploadProvider({
  children,
  projectId,
}: FileUploadProviderProps) {
  const router = useRouter();
  const [files, setFiles] = React.useState<File[]>([]);

  async function handleUpload() {
    if (projectId) {
      await Promise.all(
        files.map(async (file) => {
          await createComponent({
            projectId: projectId!,
            assetUrl: `https://google.com/${encodeURIComponent(file.name)}`,
          });
        }),
      ).catch(console.error);
    } else {
      const project = await createProject({
        components: files.map((file) => ({
          assetUrl: `https://google.com/${encodeURIComponent(file.name)}`,
        })),
      });
      projectId = project.id;
    }

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    setFiles([]);
    router.push(`/projects/${projectId}`);
  }

  function prepFilesForUpload(files: File[]) {
    const filteredFiles = files.filter((f) =>
      AllowedFileExtensions.some((ext) => f.name.endsWith(ext)),
    );

    setFiles(filteredFiles);
  }

  return (
    <FileUploadContext.Provider
      value={{
        files,
        prepFilesForUpload,
        startUpload: handleUpload,
      }}
    >
      {children}
      <ModelConfirmationDialog />
    </FileUploadContext.Provider>
  );
}
