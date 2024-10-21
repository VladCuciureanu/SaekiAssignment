import { AuthProvider } from "@/components/providers/auth-provider";

import { Shell } from "../../components/shell";
import { ShellProvider } from "../../components/shell/context";

export default function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ShellProvider
        sidebarCollapsedCutoff={64}
        sidebarWidthValues={[64, 256]}
        sidebarDefaultWidth={256}
      >
        <Shell>{children}</Shell>
      </ShellProvider>
    </AuthProvider>
  );
}
