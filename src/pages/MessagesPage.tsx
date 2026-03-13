import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockMessages } from "@/lib/mock-data";
import { Send } from "lucide-react";

export default function MessagesPage() {
  const [selected, setSelected] = useState(mockMessages[0]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ from: string; text: string; time: string }[]>([
    { from: "them", text: selected.message, time: selected.time },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setChatHistory(prev => [...prev, { from: "me", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Contacts */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-base font-display">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelected(msg);
                    setChatHistory([{ from: "them", text: msg.message, time: msg.time }]);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selected.id === msg.id ? "bg-primary text-primary-foreground" : "hover:bg-sage-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{msg.from}</p>
                    {msg.unread && selected.id !== msg.id && <span className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <p className={`text-xs truncate mt-1 ${selected.id === msg.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {msg.message}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="shadow-soft border-border lg:col-span-2 flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-display">{selected.from}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="flex-1 space-y-3 overflow-auto">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      msg.from === "me" ? "bg-primary text-primary-foreground" : "bg-sage-100 text-foreground"
                    }`}>
                      {msg.text}
                      <p className={`text-xs mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="icon" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
