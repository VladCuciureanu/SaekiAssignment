import { Metadata } from "next";
import { ProjectsSection } from "./_sections/projects-section";
import { QuickProjectCreationSection } from "./_sections/quick-project-creation-section";
import { NewsSection } from "./_sections/news-section";
import { OrdersSection } from "./_sections/orders-section";

export const metadata: Metadata = {
  title: "Home | Saeki",
};

export default function Home() {
  return (
    <main>
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-1 flex-col space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              What can we help you with today?
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="flex w-full flex-col gap-4">
            <QuickProjectCreationSection />
            <ProjectsSection />
            <OrdersSection />
          </div>
          <div className="w-full">
            <NewsSection />
          </div>
        </div>
      </div>
    </main>
  );
}