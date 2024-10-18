import Image from "next/image";
import { UserNav } from "../_components/shell/user-nav";
import { ProjectsProvider } from "./_components/context";
import { DataTable } from "./_components/data-table";
import { Metadata } from "next";
import { LogoIcon } from "@/components/vector/logo-icon";
import Link from "next/link";
import { Logo } from "@/components/vector/logo";

export const metadata: Metadata = {
  title: "Home | Saeki",
};

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your projects!
            </p>
          </div>
        </div>
        <ProjectsProvider>
          <DataTable />
        </ProjectsProvider>
      </div>
    </>
  );
}
