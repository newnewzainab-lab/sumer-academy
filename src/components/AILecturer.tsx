import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Send, CheckSquare, Sparkles, AlertCircle, Info } from "lucide-react";

export const AILecturer: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState("الدرس الأول: صمامات الضغط والتحكم الهيدروليكي");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeCode, setTimeCode] = useState(15); // in seconds
  const [question, setQuestion] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);
  const [answerData, setAnswerData] = useState<any>(null);

  const mockLectures = [
    { title: "الدرس الأول: صمامات الضغط والتحكم الهيدروليكي", category: "Academic" },
    { title: "الدرس الثاني: شروط بطلان العقود في المحاكم المدنية", category: "Academic" },
    { title: "الدرس الثالث: بوابات الـ Logic Gates وتجميع الحواسب", category: "Tech / Professional" },
  ];

  // Animate mock progress bar if playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimeCode((t) => (t >= 320 ? 15 : t + 2));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setIsAnswering(true);
    setAnswerData(null);

    try {
      const response = await fetch("/api/in-lecture-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lectureTitle: selectedLecture,
          question: question.trim(),
          timeCode: formatTime(timeCode),
        }),
      });

      if (!response.ok) {
        throw new Error("حدث عائق اتصال. كرر المحاولة رجاءً.");
      }

      const data = await response.json();
      setAnswerData(data);
    } catch (e: any) {
      console.error(e);
      setAnswerData({
        explanationAr: `شرح مدمج احتياطي (RAG) لهذه الجزئية عند الدقيقة ${formatTime(timeCode)}: هذا المصطلح يرمز لأداة القياس المباشرة المصممة لتخفيف حدة الفوارق الإلكتروميكانيكية لتلافي حرق الأجهزة.`,
        tipAr: "ننصحك بمراجعة ملخص الأسبوع الأول لترسيخ الفكرة بشكل مستقل.",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80 text-right">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sumer-gold/15 text-sumer-gold rounded-xl flex items-center justify-center">
          <Info size={22} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
            المساعد الذكي اللحظي أثناء المحاضرة (In-Lecture RAG Assistant)
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            صُمم خصيصاً للتغلب على صعوبة الفهم الفردي؛ أطلق سؤلك في أي لحظة أثناء مشاهدة الكورس وسيقوم الـ AI بإرشادك بناءً على السياق الزمني والدرسي للفيلم
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Mock Video Player */}
        <div className="lg:col-span-7 bg-sumer-ink rounded-3xl overflow-hidden shadow-xl aspect-video relative flex flex-col justify-between text-white border border-gray-800">
          {/* Top Panel */}
          <div className="p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
            <h5 className="font-bold text-xs text-sumer-gold leading-tight line-clamp-1">
              مقطع الفيديو التفاعلي المولد ذكياً
            </h5>
            <span className="text-[10px] text-gray-300 mt-0.5 block">{selectedLecture}</span>
          </div>

          {/* Central Mock Graphics symbolizing the lecture topic */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-blue-950/20">
            <Sparkles size={48} className="text-sumer-gold/45 mb-4 animate-pulse" />
            <p className="text-xs text-gray-300 max-w-sm line-clamp-2">
              (رسم بياني هيدروليكي تفاعلي يظهر حركة الصمام الترددي المائي)
            </p>
          </div>

          {/* Bottom video controls player */}
          <div className="p-4 bg-gradient-to-t from-black/90 to-transparent z-10 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-[11px] font-mono font-bold text-gray-300">
              <span>{formatTime(timeCode)}</span>
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                <div className="h-full bg-sumer-gold transition-all" style={{ width: `${(timeCode / 320) * 100}%` }} />
              </div>
              <span>05:20</span>
            </div>

            {/* Buttons control Panel */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-sumer-gold hover:bg-sumer-gold/90 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>
              <span className="text-[10px] text-sumer-gold font-bold">● جودة البث مجانية مستدامة</span>
            </div>
          </div>
        </div>

        {/* Right Side: Lecturer Sidebar Chat Question Form */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-400">اختر مساقاً علمياً من كورساتك لتجربة بوت الدرس:</label>
            <select
              value={selectedLecture}
              onChange={(e) => {
                setSelectedLecture(e.target.value);
                setAnswerData(null);
                setTimeCode(15);
              }}
              className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-xs font-bold text-sumer-ink cursor-pointer outline-none"
            >
              {mockLectures.map((lec, idx) => (
                <option key={idx} value={lec.title}>
                  {lec.title}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-sumer-blue/5 border border-sumer-blue/10 p-4 rounded-xl space-y-1">
            <span className="text-[10px] text-sumer-blue font-bold block">ميزة التعقيب اللحظي RAG:</span>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              قم بإيقاف الفيديو مؤقتاً عند أي مدة صعبة (مثلاً عند الدقيقة <strong>{formatTime(timeCode)}</strong>) واطرح سؤالك في الحقل بالأسفل فوراً!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-2 rounded-xl focus-within:border-sumer-blue transition-colors">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="مثلاً: ما هي وظيفة هذا الصنف من الصمامات؟"
                className="w-full bg-transparent text-sm p-2 outline-none text-sumer-ink"
                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
              />
              <button
                onClick={handleAskQuestion}
                disabled={isAnswering || !question.trim()}
                className="w-10 h-10 bg-sumer-blue hover:bg-sumer-blue/90 disabled:bg-gray-300 text-white rounded-lg flex items-center justify-center cursor-pointer shrink-0 transition-colors"
              >
                {isAnswering ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>

          {/* Interactive Answer Bubble */}
          {answerData && (
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/60 text-right space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs text-sumer-blue font-bold flex items-center gap-1">
                  💡 إجابة مدرب الذكاء الاصطناعي اللحظية:
                </span>
                <span className="text-[10px] font-mono text-gray-400 font-bold">عند الدقيقة {formatTime(timeCode)}</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                {answerData.explanationAr}
              </p>
              
              {/* Voice playback action controls */}
              <div className="flex gap-2 justify-end pt-1">
                <button
                  onClick={() => {
                    if ("speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(answerData.explanationAr);
                      utterance.lang = "ar-SA";
                      utterance.rate = 0.95;
                      window.speechSynthesis.speak(utterance);
                    } else {
                      alert("⚠️ متصفحك لا يدعم توليف الصوت النصي المباشر.");
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2.5 rounded-lg text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  🔊 استمع للنصيحة بصوت المحاضر الذكي
                </button>
                <button
                  onClick={() => {
                    if ("speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className="bg-gray-205 hover:bg-gray-300 text-slate-700 font-bold py-1 px-2 rounded-lg text-[10px] cursor-pointer"
                >
                  🔇 إيقاف الصوت
                </button>
              </div>

              {answerData.tipAr && (
                <div className="p-3 bg-sumer-gold/5 rounded-xl border border-sumer-gold/10 text-[11px] text-gray-600 flex items-start gap-1.5">
                  <span>💡</span>
                  <p>{answerData.tipAr}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
