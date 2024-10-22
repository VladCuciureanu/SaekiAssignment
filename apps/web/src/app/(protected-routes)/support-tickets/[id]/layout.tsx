import { Metadata } from "next";

export default function SupportTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    title: `Ticket ${id} | Saeki`,
  };
}
