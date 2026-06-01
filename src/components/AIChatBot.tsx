import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Sparkles, Smile, Bot, User, Trash2 } from "lucide-react";

interface AIChatBotProps {
  initialQuestion?: string;
  onClearInitial?: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ initialQuestion, onClearInitial }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: "model",
      content: "مرحباً بك في رحاب أكاديمية سومر! أنا منسقك ومساعدك الأكاديمي الذكي المتاح 24/7. يمكنني إرشادك حول كليات ومعايير القبول المركزي، أو مساعدتك في حل معضلات التفكير البرمجي والميكانيكي. كيف تجري دراستك اليوم؟ 🎓✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuestion && initialQuestion.trim() && !isSending) {
      const autoSend = async (q: string) => {
        const userMessage = { role: "user" as const, content: q.trim() };
        // Trigger send
        setMessages((m) => [...m, userMessage]);
        setIsSending(true);

        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [...messages, userMessage],
            }),
          });

          if (!response.ok) {
            throw new Error("عواقب اتصال فنية.");
          }

          const data = await response.json();
          setMessages((m) => [...m, { role: "model" as const, content: data.content || "لم أستطع سماعك جيداً. كرر طرحك رجاءً." }]);
        } catch (e) {
          console.error(e);
          setMessages((m) => [
            ...m,
            {
              role: "model" as const,
              content: "عذراً يا بطل! تعذر استخلاص الإجابة من نموذج الذكاء الاصطناعي بسبب ضغط المرور أو فقدان الاتصال بالإنترنت العراقي المباشر. يرجى تكرار إرسال الاستفسار.",
            },
          ]);
        } finally {
          setIsSending(false);
          if (onClearInitial) {
            onClearInitial();
          }
        }
      };

      autoSend(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("عواقب اتصال فنية.");
      }

      const data = await response.json();
      setMessages((m) => [...m, { role: "model" as const, content: data.content || "لم أستطع سماعك جيداً. كرر طرحك رجاءً." }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        {
          role: "model" as const,
          content: "عذراً يا بطل! تعذر استخلاص الإجابة من نموذج الذكاء الاصطناعي بسبب ضغط المرور أو فقدان الاتصال بالإنترنت العراقي المباشر. يرجى تكرار إرسال الاستفسار.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        content: "تمت إعادة تهيئة ذاكرة الدعم وتصفية المحادثة. كيف يمكنني مساندة خطتك الدراسية الآن؟ 🧠🍀",
      },
    ]);
  };

  const handleSmartPromptClick = async (promptText: string) => {
    if (isSending) return;
    const userMessage = { role: "user" as const, content: promptText };
    setMessages((m) => [...m, userMessage]);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("عواقب اتصال فنية.");
      }

      const data = await response.json();
      setMessages((m) => [...m, { role: "model" as const, content: data.content || "لم أستطع سماعك جيداً. كرر طرحك رجاءً." }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        {
          role: "model" as const,
          content: "عذراً يا بطل! تعذر استخلاص الإجابة من نموذج الذكاء الاصطناعي بسبب ضغط المرور أو فقدان الاتصال بالإنترنت العراقي المباشر. يرجى تكرار إرسال الاستفسار.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const SMART_PROMPTS = [
    "كيف أنظم وقتي للامتحانات؟",
    "ما هي المهارات المطلوبة لعام 2026؟",
    "توجيه للقبول المركزي"
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100/80 shadow-2xl overflow-hidden flex flex-col h-[520px] text-right">
      {/* Chat header panel overlay */}
      <div className="bg-gradient-to-r from-sumer-blue to-blue-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sumer-gold/20 text-sumer-gold rounded-xl flex items-center justify-center">
            <Bot size={20} className="animate-bounce" />
          </div>
          <div>
            <h4 className="font-bold text-sm">مستشار الدعم الأكاديمي الشامل</h4>
            <span className="text-[10px] text-green-300 font-bold block">● ذكاء سومر التفاعلي نشط 24/7</span>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          title="مسح وتنظيف ذاكرة المحادثة"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Main message display chain area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((m, idx) => {
          const isBot = m.role === "model";
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                isBot ? "self-start text-right ml-auto flex-row-reverse" : "self-end text-right mr-auto flex-row"
              }`}
            >
              {/* Profile icon label avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isBot ? "bg-sumer-blue text-white" : "bg-sumer-gold text-white"
                }`}
              >
                {isBot ? <Bot size={14} /> : <User size={14} />}
              </div>

              {/* Speech bubble */}
              <div
                className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed font-semibold whitespace-pre-wrap ${
                  isBot
                    ? "bg-white border border-gray-100 text-gray-700 shadow-sm"
                    : "bg-sumer-blue text-white shadow"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Smart Prompts predictive bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-gray-100 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
        {SMART_PROMPTS.map((promptText, i) => (
          <button
            key={i}
            onClick={() => handleSmartPromptClick(promptText)}
            disabled={isSending}
            className="shrink-0 bg-white hover:bg-sumer-blue hover:text-white px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-500 border border-gray-200 transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
          >
            💡 {promptText}
          </button>
        ))}
      </div>

      {/* Chat input keyboard widget bar */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اطرح تحدياً أو اسألني عن معايير القبول المركزي..."
          className="w-full bg-gray-50 p-3 rounded-xl text-xs sm:text-sm outline-none border border-gray-200 focus:border-sumer-blue transition-colors text-sumer-ink"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={isSending || !input.trim()}
          className="bg-sumer-blue text-white w-10.5 h-10.5 rounded-xl flex items-center justify-center cursor-pointer transition-colors hover:bg-sumer-blue/90 disabled:bg-gray-200 shrink-0"
        >
          {isSending ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
};
