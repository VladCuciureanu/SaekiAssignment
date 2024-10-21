import { Metadata } from "next";

import { ThemeSwitcher } from "./_components/theme-switcher";

export const metadata: Metadata = {
  title: "Settings | Saeki",
};

export default function SettingsPage() {
  return (
    <main>
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-1 flex-col space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight">General</h3>
          <section className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold tracking-tight">Theme</h4>
            <ThemeSwitcher />
          </section>
        </div>
      </div>
    </main>
  );
}
