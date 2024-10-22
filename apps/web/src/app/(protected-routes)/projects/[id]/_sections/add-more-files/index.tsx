"use client";

import { File } from "lucide-react";
import React from "react";

import { useFileUpload } from "@/components/file-upload/context";

export function AddMoreFilesSection() {
  const { prepFilesForUpload } = useFileUpload();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (ev: React.DragEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    let files: File[] = [];

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      files = [...ev.dataTransfer.items]
        .filter((item) => item.kind === "file")
        .map((it) => it.getAsFile())
        .filter((f) => f !== null);
    } else {
      // Use DataTransfer interface to access the file(s)
      files = [...ev.dataTransfer.files];
    }

    prepFilesForUpload(files);
  };

  const handleDragOver = (ev: React.DragEvent<HTMLButtonElement>) => {
    ev.preventDefault();
  };

  const handleChangeFiles = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (!ev.target.files) return;

    const files = [...ev.target.files];

    prepFilesForUpload(files);
  };

  return (
    <section
      id="quick-project-creation-section"
      className="flex w-full flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Add more files</h2>
      <div className="flex h-36 w-full flex-row gap-2 rounded-lg border p-4">
        <input
          id="file-input"
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".step, .iges"
          onChange={handleChangeFiles}
        />
        <button
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-primary/15 border-primary/50 hover:border-primary hover:bg-primary/25 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition-all ease-linear"
        >
          <File />
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium">
              Drag files here or click to upload files
            </h3>
            <p className="text-sm">.step, .iges | 128 MB limit</p>
          </div>
        </button>
      </div>
    </section>
  );
}
