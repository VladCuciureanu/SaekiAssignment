import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Basic3DViewer } from "../model-viewer/basic";
import { Button } from "../ui/button";
import { useFileUpload } from "./context";

export function ModelConfirmationDialog() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { files, prepFilesForUpload: setFiles, startUpload } = useFileUpload();
  const [submitted, setSubmitted] = useState(false);
  const lastIdx = files.length - 1;

  const handleCancel = () => {
    setFiles([]);
  };

  function handleSubmit() {
    setSubmitted(true);
    startUpload();
  }

  useEffect(() => {
    setCurrentIdx(0);
    setSubmitted(false);
  }, [files]);

  return (
    <Dialog
      open={files.length > 0}
      onOpenChange={(open: boolean) => {
        if (!open) handleCancel();
      }}
    >
      <DialogContent className="max-w-2xl">
        <div>
          <div className="flex flex-row items-center gap-2">
            <DialogTitle>Create new project</DialogTitle>
            <p className="text-sm tracking-tight">
              {currentIdx + 1}/{lastIdx + 1}
            </p>
          </div>
          <DialogDescription>
            Review the files before uploading
          </DialogDescription>
        </div>
        <div className="relative">
          <div className="border rounded-lg overflow-hidden aspect-video w-full">
            <Basic3DViewer url={null} file={files[currentIdx]!} />
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            disabled={currentIdx < 1}
            onClick={() => setCurrentIdx((prev) => prev - 1)}
          >
            <ArrowLeft />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={currentIdx >= lastIdx}
            onClick={() => setCurrentIdx((prev) => prev + 1)}
          >
            <ArrowRight />
          </Button>
        </div>
        <div className="flex flex-row-reverse items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            {currentIdx < lastIdx && (
              <Button onClick={() => setCurrentIdx((prev) => prev + 1)}>
                Continue
              </Button>
            )}
            {currentIdx >= lastIdx && (
              <Button onClick={handleSubmit} disabled={submitted}>
                Submit
              </Button>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            {files.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "bg-foreground/10 h-2.5 w-2.5 shrink-0 rounded-full",
                  idx <= currentIdx && "bg-primary",
                )}
                onClick={() => setCurrentIdx(idx)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
