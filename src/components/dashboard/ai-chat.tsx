
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, Mic, Send, User, PanelRightClose } from "lucide-react";
import { askTimetable } from "@/ai/flows/ask-timetable-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { mockTimetable } from "@/lib/placeholder-data";
import { useSidebar, SidebarTrigger } from "../ui/sidebar";

export function AIChat() {
  const aiAssistantAvatar = PlaceHolderImages.find(p => p.id === 'ai-assistant-avatar');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setOpen } = useSidebar();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askTimetable({
        question: input,
        timetable: JSON.stringify(mockTimetable),
      });
      const assistantMessage = { role: 'assistant' as const, text: response.answer };
      setMessages(prev => [...prev, assistantMessage]);

      const audioResponse = await textToSpeech(response.answer);
      if (audioResponse.media) {
        const audio = new Audio(audioResponse.media);
        audioRef.current = audio;
        audio.play();
      }
    } catch (error) {
      console.error("Error with AI chat:", error);
      const errorMessage = { role: 'assistant' as const, text: "Sorry, I'm having trouble responding right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Card className="h-full flex flex-col border-0 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
            <CardTitle className="font-headline text-xl flex items-center gap-2 mb-1"><Bot className="h-5 w-5 text-primary" />AI Assistant</CardTitle>
            <CardDescription>Ask me anything about your timetable.</CardDescription>
        </div>
        <SidebarTrigger asChild collapsible="offcanvas">
             <Button variant="ghost" size="icon">
                <PanelRightClose className="h-5 w-5" />
            </Button>
        </SidebarTrigger>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 p-0">
        <ScrollArea className="h-full w-full p-6" ref={scrollAreaRef}>
          {messages.length === 0 && !isLoading ? (
             <div className="flex h-full items-center justify-center">
                 <div className="flex items-start gap-3 text-sm">
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="rounded-lg px-4 py-2 bg-muted">
                        <p>Hello! How can I help you with your schedule today?</p>
                    </div>
                </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                      <div className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p>{message.text}</p>
                      </div>
                      {message.role === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                  </div>
              ))}
              {isLoading && (
                  <div className="flex items-start gap-3">
                      <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="rounded-lg px-4 py-2 text-sm bg-muted animate-pulse">
                        Thinking...
                      </div>
                  </div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="flex items-center gap-2 p-4 border-t">
          <Input
            placeholder="Ask about the timetable..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" disabled={isLoading}>
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
