import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Tickets | Saeki",
};
export default function SupportTicketsTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
