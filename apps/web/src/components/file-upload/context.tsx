"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { createComponent } from "@/lib/components";
import { createFile } from "@/lib/files";
import { createProject } from "@/lib/projects";

import { ModelConfirmationDialog } from "./model-confirmation-dialog";

type FileUploadContextProps = {
  files: File[];
  prepFilesForUpload: (files: File[]) => void;
  startUpload: () => Promise<void>;
  routeOnSuccessfulUpload?: string;
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
  const pathName = usePathname();
  const [files, setFiles] = React.useState<File[]>([]);

  async function handleUpload() {
    if (projectId) {
      await Promise.all(
        files.map(async (file) => {
          const res = await createFile(file);
          await createComponent({
            projectId: projectId!,
            fileId: res.id,
          });
        }),
      ).catch(console.error);
    } else {
      const createdFiles = await Promise.all(
        files.map(async (file) => {
          return await createFile(file);
        }),
      );
      const project = await createProject({
        components: createdFiles.map((file) => ({
          fileId: file.id,
        })),
      });
      projectId = project.id;
    }

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    setFiles([]);

    const targetPathName = `/projects/${projectId}`;
    if (pathName === targetPathName) {
      location.reload();
    } else {
      console.log("Pushed");
      router.push(targetPathName);
    }
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
