import { Metadata } from "next";

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <main>Hello World {params.id}</main>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    title: `${id} | Saeki`,
  };
}
