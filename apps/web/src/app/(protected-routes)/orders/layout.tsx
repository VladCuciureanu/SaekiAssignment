import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Saeki",
};
export default function SupportTicketsTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
