"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does hair transplant cost?",
  "Do you treat acne scars?",
  "How to book an appointment?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Smart Skin Assistant at D'CosMedics. ✨ I can help you with information about our treatments, pricing, and booking. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: msg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a brief moment. Please call us at +91 98300 00000 or book directly — we'd love to hear from you!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #B07A68, #C9907A)",
          boxShadow: "0 8px 32px rgba(183,110,121,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-off-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} className="text-off-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(197,160,33,0.25)" }}
          >
            {/* Header */}
            <div
              className="px-5 py-4"
              style={{
                background: "linear-gradient(135deg, #FDF8F3 0%, #F5EDE5 100%)",
                borderBottom: "1px solid rgba(197,160,33,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #B07A68, #C9907A)" }}
                >
                  <Sparkles size={16} className="text-off-white" />
                </div>
                <div>
                  <p className="font-semibold text-off-white text-sm">Smart Skin Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-[10px] text-muted">Powered by D&apos;CosMedics AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className="h-[340px] overflow-y-auto p-4 space-y-3"
              style={{ background: "#FDF8F3" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "chat-message-user"
                        : "chat-message-bot text-off-white/85"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="chat-message-bot px-4 py-3 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-accent" />
                    <span className="text-xs text-muted">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div
                className="px-4 py-3 flex flex-wrap gap-2"
                style={{ background: "#FDF8F3", borderTop: "1px solid rgba(176,122,104,0.12)" }}
              >
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[10px] px-3 py-1.5 rounded-full border border-accent/25 text-accent/80 hover:bg-accent/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="flex gap-2 p-3"
              style={{
                background: "#FDF8F3",
                borderTop: "1px solid rgba(197,160,33,0.12)",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask about treatments, pricing..."
                className="form-input flex-1 px-4 py-2.5 rounded-lg text-sm"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                  input.trim() && !loading
                    ? "bg-accent text-primary hover:bg-accent-light"
                    : "bg-accent/20 text-accent/30 cursor-not-allowed"
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
