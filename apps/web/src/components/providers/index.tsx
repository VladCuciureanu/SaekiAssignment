import { TooltipProvider } from "../ui/tooltip";
import { ModelViewerProvider } from "./model-viewer-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ModelViewerProvider>{children}</ModelViewerProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
