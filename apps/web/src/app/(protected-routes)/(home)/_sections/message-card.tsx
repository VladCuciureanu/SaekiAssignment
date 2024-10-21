export function MessageCard({ message }: { message: string }) {
  return (
    <div className="from-border to-border text-foreground/50 h-32 w-full rounded-lg bg-gradient-to-b p-px">
      <div className="bg-background flex h-full w-full items-center justify-center rounded-[calc(var(--radius)-1px)] p-4 text-sm italic">
        {message}
      </div>
    </div>
  );
}
