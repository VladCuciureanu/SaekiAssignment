import { CameraOff } from "lucide-react";

export function FakePhoto() {
  return (
    <div className="fake-photo bg-foreground/10 border-foreground/10 flex aspect-[4/3] h-24 cursor-pointer items-center justify-center rounded-lg border">
      <CameraOff color="gray" />
    </div>
  );
}
