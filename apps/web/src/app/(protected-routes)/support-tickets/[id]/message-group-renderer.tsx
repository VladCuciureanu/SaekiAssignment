import { MessageDto } from "@saeki/schema";

import { useAuth } from "@/components/providers/auth-provider";

export function MessageGroupRenderer(props: { messages: MessageDto[] }) {
  const { messages } = props;
  const { user: currentUser } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        const isUser = message.senderId === currentUser?.id;
        return (
          <div
            key={message.id}
            className={`flex flex-col gap-2 w-full ${
              isUser ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`flex flex-col gap-1 p-2 rounded-lg ${
                isUser ? "bg-primary" : "bg-foreground/10"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-muted-foreground">
                {`${!isToday(new Date(message.createdAt)) ? `${new Date(message.createdAt).toDateString()} - ` : ""}${new Date(
                  message.createdAt,
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </p>
            </div>
          </div>
        );
      })}
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
