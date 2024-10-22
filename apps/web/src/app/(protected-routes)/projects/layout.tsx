import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Saeki",
};
export default function ProjectsTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
