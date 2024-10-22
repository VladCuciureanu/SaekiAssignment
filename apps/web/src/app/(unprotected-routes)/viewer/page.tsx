"use client";

import { useState } from "react";

import { Basic3DViewer } from "@/components/model-viewer/basic";

export default function ViewerSandbox() {
  const [file, setFile] = useState<File | null>(null);

  if (!file) {
    return (
      <input
        type="file"
        onChange={(ev) => {
          const file = ev.target.files?.[0];
          setFile(file ?? null);
        }}
      />
    );
  }
  return (
    <div>
      <Basic3DViewer url={null} file={file} />
    </div>
  );
}
