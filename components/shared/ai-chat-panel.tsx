'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, X, Send, Sparkles, User, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export function AIChatPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [remainingQueries, setRemainingQueries] = React.useState(15);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi! I am Jhansi’s AI Assistant. Ask me about her VSR lip-reading research, projects, or tech stack!',
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (typeof data.remainingQueries === 'number') {
        setRemainingQueries(data.remainingQueries);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error processing request';
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: `Notice: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center gap-2 border border-emerald-300"
        aria-label="Ask me about my work"
      >
        <Bot className="w-5 h-5" />
        <span className="text-xs font-mono font-bold pr-1 hidden sm:inline">Ask AI</span>
      </button>

      {/* Floating Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-40 w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans text-xs"
          >
            {/* Header */}
            <div className="p-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-bold text-zinc-100">Ask About Jhansi&apos;s Work</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">{remainingQueries} queries left</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-zinc-900/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && <Bot className="w-3.5 h-3.5 text-emerald-400 mt-1 shrink-0" />}
                  <div
                    className={`p-2.5 rounded-xl text-xs max-w-[80%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-400 text-zinc-950 font-medium'
                        : 'bg-zinc-950 text-zinc-200 border border-zinc-800 font-mono'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === 'user' && <User className="w-3.5 h-3.5 text-zinc-400 mt-1 shrink-0" />}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] py-1">
                  <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask e.g. What is VSR research?"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition font-mono"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-lg disabled:opacity-50 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
