import { ThemeProvider as _ThemeProvider } from "next-themes";

export function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <_ThemeProvider attribute="class" enableSystem>
      {props.children}
    </_ThemeProvider>
  );
}
