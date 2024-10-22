"use client";

import React, { useState } from "react";
import { ReactNode } from "react";

import { Basic3DViewer } from "../model-viewer/basic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

export type ModelViewerContextProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  url: string | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
};
export const ModelViewerContext = React.createContext<ModelViewerContextProps>(
  {} as any,
);
export const useModelViewer = () => React.useContext(ModelViewerContext);

export function ModelViewerProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  return (
    <ModelViewerContext.Provider value={{ file, setFile, url, setUrl }}>
      {children}
      <ViewerDialog file={file} setFile={setFile} url={url} setUrl={setUrl} />
    </ModelViewerContext.Provider>
  );
}

function ViewerDialog({
  file,
  setFile,
  url,
  setUrl,
}: {
  url: string | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  if (!file && !url) {
    return <></>;
  }
  return (
    <Dialog
      open={file !== null || url !== null}
      onOpenChange={(open) => {
        if (!open) {
          setFile(null);
          setUrl(null);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogTitle>Model Viewer</DialogTitle>
        <DialogDescription>{url ? url : file?.name}</DialogDescription>

        <div className="w-full aspect-video rounded-lg overflow-hidden border">
          <Basic3DViewer file={file} url={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
