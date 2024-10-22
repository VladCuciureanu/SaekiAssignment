import { CameraOff } from "lucide-react";

export function FakePhoto({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="fake-photo bg-foreground/10 border-foreground/10 flex aspect-[4/3] h-24 cursor-pointer items-center justify-center rounded-lg border"
      onClick={onClick}
    >
      <CameraOff color="gray" />
    </div>
  );
}
