import { NewsEntryCard } from "./news-entry-card";

export function NewsSection() {
  return (
    <section id="news-section" className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">News</h2>
      <NewsEntryCard />
      <NewsEntryCard />
      <NewsEntryCard />
    </section>
  );
}
