"use client";

import {
  MessageDto,
  SupportTicketDto,
  SupportTicketStatus,
} from "@saeki/schema";
import { Ban, Loader } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMessage, getMessagesBySupportTicketId } from "@/lib/messages";
import { deleteSupportTicket, getSupportTicket } from "@/lib/support-tickets";

import { MessageGroupRenderer } from "./message-group-renderer";

export default function SupportTicketPage({
  params,
}: {
  params: { id: string };
}) {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [supportTicket, setSupportTicket] = useState<SupportTicketDto>(
    {} as any,
  );
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      getSupportTicket(params.id).then((res) => {
        setSupportTicket(res);
      }),
      refreshMessages(),
    ])
      .finally(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  async function refreshMessages() {
    return await getMessagesBySupportTicketId(params.id).then((res) =>
      setMessages(res),
    );
  }

  function handleSendMessage() {
    if (draft.length < 1) return;
    createMessage({ supportTicketId: params.id, content: draft }).then(() => {
      setDraft("");
      refreshMessages();
    });
  }

  function handleCloseTicket() {
    deleteSupportTicket(params.id).then(() => {
      location.reload();
    });
  }

  const messagesGroupedByUser = groupMessagesByUserId(messages);

  if (loading) {
    return (
      <main>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <Loader className="animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto flex h-full w-full flex-1 flex-col space-y-6 p-8 max-w-[1280px]">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-row items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Support Ticket {params.id}
              </h2>
              <p className="text-muted-foreground">
                Related to:{" "}
                <Link
                  href={`/orders/${supportTicket?.orderId}`}
                  className="underline"
                  target="_blank"
                >
                  Order {supportTicket?.orderId}
                </Link>
              </p>
            </div>
            <div>
              <Button
                size="sm"
                variant="destructive"
                className="w-min flex flex-row items-center gap-1.5"
                onClick={handleCloseTicket}
                disabled={supportTicket.status !== SupportTicketStatus.Open}
              >
                <Ban className="h-3 w-3 -ml-0.5" />
                Close
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full p-4 rounded-lg border relative h-[calc(100vh-13rem)] overflow-y-scroll">
          {messagesGroupedByUser.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tight font-bold opacity-50">
              No messages yet
            </div>
          )}
          {messagesGroupedByUser.length > 0 && (
            <>
              {messagesGroupedByUser.map((group) => (
                <MessageGroupRenderer messages={group} />
              ))}
            </>
          )}
        </div>
        <div className="w-full flex flex-row">
          <Input
            className="w-full"
            value={draft}
            onChange={(ev) => setDraft(ev.currentTarget.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="ml-2"
            disabled={draft.length < 1}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </main>
  );
}

function groupMessagesByUserId(messages: MessageDto[]): MessageDto[][] {
  var groupedMessages: MessageDto[][] = [];
  var currentGroup: MessageDto[] = [];
  messages.forEach((message) => {
    if (currentGroup.length === 0) {
      currentGroup.push(message);
      return;
    }

    const previousMessage = currentGroup[currentGroup.length - 1];
    if (message.senderId === previousMessage?.senderId) {
      currentGroup.push(message);
    } else {
      groupedMessages.push(currentGroup);
      currentGroup = [message];
    }
  });
  if (currentGroup.length > 0) groupedMessages.push(currentGroup);
  return groupedMessages;
}
