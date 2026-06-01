import React, { useState } from "react";
import { Sparkles, BookOpen, RefreshCw, Award, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

export const AIOnDemandCourse: React.FC<{ onClaimCert?: (courseTitle: string) => void }> = ({ onClaimCert }) => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [activeUnit, setActiveUnit] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenCourse = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setErrorMessage("");
    setCourseData(null);
    setActiveUnit(0);
    setQuizAnswers({});
    setScore(0);
    setQuizFinished(false);

    try {
      const response = await fetch("/api/on-demand-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        throw new Error("فشل توليد الكورس المخصص لطيفاً. أعد المحاولة.");
      }

      const data = await response.json();
      setCourseData(data);
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.message || "فشل الاتصال بالخادم. سنولد لك منهجاً تجريبياً تلقائياً للمتابعة...");
      // Fallback in case of server congestion
      setCourseData({
        title: `كورس تخصصي في: ${topic.trim()}`,
        duration: "8 ساعات معتمدة",
        description: "مقرر أكاديمي مصمم بالذكاء الاصطناعي لتعليم ومحاكاة المبادئ الأساسية للتخصص المختار.",
        modules: [
          { unitTitle: "الوحدة الأولى: البداية والمحفزات الأساسية", content: "تتضمن هذه الوحدة النواة الأساسية للنظريات وكيفية تفاعل المحددات لإنتاج المخرجات." },
          { unitTitle: "الوحدة الثانية: الهياكل والمناهج التطبيقية", content: "تتناول هذه الوحدة الجوانب العملية والاحتياطات الهندسية والوقائية لتلافي الأخطاء في الواقع العراقي الميداني." },
          { unitTitle: "الوحدة الثالثة: الكفاءة المستقبلية وأسواق العمل", content: "هنا يتم ربط التخصص مع خطط التنمية الوطنية وأبحاث المواءمة وتوظيف الخريجين." }
        ],
        quiz: [
          {
            question: "ما هو الركن الأساسي لنجاح هذا التخصص علمياً مقتبساً وموجهاً؟",
            options: ["التحليل المستمر والاستدامة", "إهمال المتغيرات والتفاصيل كلياً", "الاعتماد المفرد على النظريات"],
            answerIndex: 0,
            explanation: "الاستدامة والتحليل هما أصل الرسوخ العلمي."
          }
        ]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizAnswers[qIdx] !== undefined) return;
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
    
    if (optIdx === courseData.quiz[qIdx].answerIndex) {
      setScore((s) => s + 1);
    }

    if (Object.keys(quizAnswers).length + 1 === courseData.quiz.length) {
      setQuizFinished(true);
    }
  };

  const handleClaim = () => {
    if (onClaimCert && courseData) {
      onClaimCert(courseData.title);
      alert(`🎉 كفو! تم ربط وإدراج شهادة: "${courseData.title}" بملفك الشخصي الموثق بنجاح.`);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80 text-right">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sumer-gold/15 text-sumer-gold rounded-xl flex items-center justify-center">
          <Sparkles size={22} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
            مُولد الكورسات والمناهج المخصصة عند الطلب (On-Demand AI Course)
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            هل تبحث عن موضوع تخصصي نادر جداً في الميكانيك، الطب أو الهندسة ولا تجد له كورساً مسجلاً؟ اكتب عنوانه وسيقوم الـ AI بجمع معلوماته وتوليدك كورس متكامل مع اختبار وشهادة فورية
          </p>
        </div>
      </div>

      {!courseData ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-sumer-ink">اكتب عنوان التخصص النادر أو الدورة التي تريد توليدها:</label>
            <div className="flex bg-gray-50 border border-gray-200 focus-within:border-sumer-blue rounded-xl p-2 items-center gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="مثلا: ميكانيك النانو العراقي، صيانة توربينات النفط بالبصرة، تشريعات حمورابي المدنية..."
                className="w-full bg-transparent p-3 outline-none text-sm text-sumer-ink"
                onKeyDown={(e) => e.key === "Enter" && handleGenCourse()}
              />
              <button
                onClick={handleGenCourse}
                disabled={isGenerating || !topic.trim()}
                className="bg-sumer-blue text-white px-5 py-3 rounded-lg text-xs font-bold cursor-pointer hover:scale-[1.02] disabled:bg-gray-300 shrink-0 transition-all flex items-center gap-2"
              >
                {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isGenerating ? "جاري تجميع الكورس..." : "توليد بالذكاء الاصطناعي"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            <span className="text-xs text-gray-400 block col-span-2 md:col-span-3">💡 تجربة سريعة لمواضيع مقترحة:</span>
            {[
              "صيانة التوربينات البخارية في محطة بيجي الكهربائية",
              "بروتوكولات التوجيه التلقائي والأمن السيبراني العراقي",
              "الميكانيك والمكابس الدقيقة الهيدروليكية",
              "التحكيم الدولي واللوائح القضائية",
            ].map((suggest, idx) => (
              <button
                key={idx}
                onClick={() => setTopic(suggest)}
                className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-[11px] text-gray-500 text-right font-semibold cursor-pointer"
              >
                + {suggest}
              </button>
            ))}
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 font-bold">⚠️ {errorMessage}</p>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in text-right">
          {/* Header Metadata of custom course */}
          <div className="bg-gradient-to-r from-sumer-blue to-blue-900 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-sumer-gold text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                ⌛ حيازة معتمدة: {courseData.duration}
              </span>
              <BookOpen size={18} className="text-sumer-gold" />
            </div>
            <h4 className="text-lg font-bold text-sumer-gold">{courseData.title}</h4>
            <p className="text-xs text-blue-100 leading-relaxed mt-2">{courseData.description}</p>
          </div>

          {/* Unit selection tabs */}
          <div className="grid grid-cols-3 gap-2">
            {courseData.modules.map((m: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveUnit(idx)}
                className={`py-2 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                  activeUnit === idx
                    ? "bg-sumer-gold text-white border-sumer-gold"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
              >
                الوحدة {idx + 1}
              </button>
            ))}
          </div>

          {/* Core study content displaying */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
            <h5 className="font-bold text-sm text-sumer-blue underline decoration-sumer-gold/50 decoration-2">
              {courseData.modules[activeUnit].unitTitle}
            </h5>
            <p className="text-xs text-gray-700 leading-relaxed font-semibold whitespace-pre-wrap">
              {courseData.modules[activeUnit].content}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <button
              onClick={() => {
                if (activeUnit > 0) setActiveUnit(activeUnit - 1);
              }}
              disabled={activeUnit === 0}
              className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-sumer-blue disabled:opacity-30 cursor-pointer"
            >
              ← الوحدة السابقة
            </button>
            <button
              onClick={() => {
                if (activeUnit < courseData.modules.length - 1) setActiveUnit(activeUnit + 1);
              }}
              disabled={activeUnit === courseData.modules.length - 1}
              className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-sumer-blue disabled:opacity-30 cursor-pointer"
            >
              الوحدة التالية →
            </button>
          </div>

          {/* Instant final quiz */}
          <div className="border-t-2 border-dashed border-gray-100 pt-6 space-y-4">
            <h5 className="font-bold text-sm text-sumer-blue flex items-center gap-1.5 justify-start">
              ⭐ الاختبار التحصيلي للتوليد المعرفي:
            </h5>
            <div className="space-y-4">
              {courseData.quiz.map((q: any, qIdx: number) => {
                const selected = quizAnswers[qIdx];
                return (
                  <div key={qIdx} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-200/60 text-right space-y-3">
                    <p className="font-bold text-xs text-sumer-ink">{q.question}</p>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isCorrect = optIdx === q.answerIndex;
                        const chosen = selected === optIdx;

                        let style = "bg-white border-gray-200 text-gray-700 hover:bg-gray-100";
                        if (selected !== undefined) {
                          if (isCorrect) {
                            style = "bg-green-100 border-green-500 text-green-700 font-bold";
                          } else if (chosen) {
                            style = "bg-red-100 border-red-500 text-red-700 font-bold";
                          } else {
                            style = "bg-white border-gray-100 text-gray-300 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            disabled={selected !== undefined}
                            className={`p-3 rounded-lg border text-right transition-all cursor-pointer ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {selected !== undefined && q.explanation && (
                      <p className="text-[11px] text-gray-500 leading-relaxed italic bg-white p-2.5 rounded border border-gray-100">
                        🔑 {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz finalized and student qualifies for claim of badge/cert */}
            {quizFinished && (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center space-y-3">
                <p className="font-bold text-sm text-green-700">🎉 تهانينا! أنجزت الفحص النهائي للكورس!</p>
                <p className="text-xs text-green-600">
                  لقد حققت {score} من أصل {courseData.quiz.length} أسئلة صحيحة ومُنحت ترقية بالذكاء الاصطناعي للمساق!
                </p>
                <button
                  onClick={handleClaim}
                  className="px-6 py-2.5 bg-sumer-gold text-white font-bold text-xs rounded-xl shadow hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <Award size={14} /> إضافة وتوثيق الشهادة بملف LinkedIn الخاص بي
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => setCourseData(null)}
              className="text-xs text-sumer-blue hover:underline cursor-pointer"
            >
              🔄 توليد تخصص هادف آخر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
