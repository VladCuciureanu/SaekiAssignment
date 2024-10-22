import { MessageDto } from "@saeki/schema";

import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

export function MessageGroupRenderer(props: { messages: MessageDto[] }) {
  const { messages } = props;
  const { user: currentUser } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        {messages.map((message, idx) => {
          const isCurrentUser = message.senderId === currentUser?.id;
          return (
            <div
              key={message.id}
              className={`flex flex-col gap-2 w-full ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              {idx === 0 && !isCurrentUser && (
                <p className="font-bold text-sm tracking-tight -mb-2.5 ml-1">
                  Saeki
                </p>
              )}
              <div className="flex flex-col items-end w-fit">
                <div
                  className={cn(
                    "w-full flex flex-col gap-1 p-2 rounded-lg max-w-[450px] break-words hyphens-auto",
                    isCurrentUser
                      ? "bg-primary dark:bg-primary/25"
                      : "bg-foreground/10",
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {((messages.at(idx + 1) &&
                  new Date(
                    messages.at(idx + 1)?.createdAt as any,
                  ).getMinutes() !==
                    new Date(message.createdAt).getMinutes()) ||
                  idx === messages.length - 1) && (
                  <p className="text-xs text-muted-foreground ml-1">
                    {`${!isToday(new Date(message.createdAt)) ? `${new Date(message.createdAt).toDateString()} - ` : ""}${new Date(
                      message.createdAt,
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
