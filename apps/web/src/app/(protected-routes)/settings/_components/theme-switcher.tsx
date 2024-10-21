"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  return (
    <div className="flex gap-2 h-full">
      <ThemeButton
        theme="light"
        label="Light"
        src="/theme-light.png"
        alt="Light theme example"
      />
      <ThemeButton
        theme="dark"
        label="Dark"
        src="/theme-dark.png"
        alt="Dark theme example"
      />
      <ThemeButton
        theme="system"
        label="System"
        src="/theme-system.png"
        alt="System theme example"
      />
    </div>
  );
}

function ThemeButton(props: {
  label: string;
  theme: string;
  src: string;
  alt: string;
}) {
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Button
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-full px-2",
        currentTheme === props.theme && "outline-blue-400 outline",
      )}
      onClick={() => setTheme(props.theme)}
    >
      <Image
        src={props.src}
        width={1920}
        height={1050}
        alt={props.alt}
        className="border rounded w-[128px]"
      />
      {props.label}
    </Button>
  );
}
