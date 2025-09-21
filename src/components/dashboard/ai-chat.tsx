
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, Mic, Send, User, PanelRightClose } from "lucide-react";
import { askTimetable } from "@/ai/flows/ask-timetable-flow";
import { textToSpeech } from "@/ai/flows/tts-flow";
import { mockTimetable } from "@/lib/placeholder-data";
import { useSidebar } from "../ui/sidebar";

export function AIChat() {
  const aiAssistantAvatar = PlaceHolderImages.find(p => p.id === 'ai-assistant-avatar');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setOpen } = useSidebar();

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

      // Generate and play audio
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

  return (
    <Card className="h-full flex flex-col border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-headline text-xl flex items-center gap-2"><Bot className="h-5 w-5 text-primary" />AI Chat</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <PanelRightClose className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2 pt-0">
        <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
            {aiAssistantAvatar && (
                <Image
                src={aiAssistantAvatar.imageUrl}
                width={100}
                height={100}
                alt="AI Assistant"
                className="rounded-full mb-2 border-4 border-primary/20 shadow-lg"
                data-ai-hint={aiAssistantAvatar.imageHint}
                />
            )}
            <h3 className="text-lg font-bold">Good Evening, Slava</h3>
            <p className="text-muted-foreground text-sm">How can I help you today?</p>
        </div>
        <ScrollArea className="h-64 w-full pr-4">
            <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                    <div className={`rounded-lg px-4 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
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
        </ScrollArea>
        <div className="flex items-center gap-2">
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
