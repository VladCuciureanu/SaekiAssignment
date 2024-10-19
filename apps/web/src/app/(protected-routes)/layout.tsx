import { AuthProvider } from "@/components/providers/auth-provider";
import { cookies } from "next/headers";
import { Shell } from "./_components/shell";

export default function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : [4, 8];
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false;
  return (
    <AuthProvider>
      <Shell defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
        {children}
      </Shell>
    </AuthProvider>
  );
}
