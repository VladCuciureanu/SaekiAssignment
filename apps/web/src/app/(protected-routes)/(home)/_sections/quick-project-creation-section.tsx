import { File } from "lucide-react";

export function QuickProjectCreationSection() {
  return (
    <section
      id="quick-project-creation-section"
      className="flex w-full flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Quick start</h2>
      <div className="flex h-36 w-full flex-row gap-2 rounded-lg border p-4">
        <div className="bg-primary/15 border-primary/50 hover:border-primary hover:bg-primary/25 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition-all ease-linear">
          <File />
          <div className="flex flex-col items-center">
            <h3 className="font-medium">
              Click to upload a file or drop it here
            </h3>
            <p className="text-sm">
              You can add more files to the project later on
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
