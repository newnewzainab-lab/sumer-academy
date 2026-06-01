import React, { useState } from "react";
import { Sparkles, GraduationCap, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const AIPathFinder: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Setup, 2: Qs, 3: Result
  const [score, setScore] = useState<number>(85);
  const [track, setTrack] = useState<string>("أحيائي");
  const [interests, setInterests] = useState<string>("");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const testQuestions = [
    {
      id: 1,
      qAr: "ما هو أسلوب التفكير والدراسة الذي تفضله وتجد نفسك فيه؟",
      options: [
        { key: "practical", textAr: "العملي والتحليلي (حل معضلات بالأرقام والرسومات والهياكل الملموسة)" },
        { key: "creative", textAr: "الإبداعي والإنساني (الكتابة، المناقشات، التحليل الفلسفي والتاريخي)" },
      ],
    },
    {
      id: 2,
      qAr: "ما هي بيئة العمل المستقبلية التي تحلم وتطمح للعمل فيها؟",
      options: [
        { key: "field", textAr: "بيئة ميدانية ومفتوحة أو داخل مختبرات علمية دقيقة ومستشفيات" },
        { key: "desk", textAr: "مكتبية مريحة أو رقمية تكنولوجية ترتكز على الحاسوب والإنترنت والعمل عن بعد" },
      ],
    },
    {
      id: 3,
      qAr: "كيف تصف شغفك واهتمامك بالتكنولوجيا الحديثة كبرمجة ومواقع وذكاء اصطناعي؟",
      options: [
        { key: "tech_high", textAr: "شغف عالٍ جداً، وأطمح للمساهمة في ابتكار برمجيات وثورات تقنية" },
        { key: "tech_medium", textAr: "شغف اعتيادي ومرن، أستخدم التكنولوجيا كأداة مساعدة في أعمالي فقط" },
      ],
    },
    {
      id: 4,
      qAr: "عندما تواجه مسألة أو مشكلة صعبة في حياتك الدراسية، كيف تباشر حلها؟",
      options: [
        { key: "analytical_break", textAr: "أقوم بتفكيكها منطقياً لأجزاء صغيرة وتجربة الإخفاق لحين قياس المخرج الصحيح" },
        { key: "comm_influence", textAr: "أعتمد على التواصل، النقاش، البحث عن مرشدين، والبحث في الجوانب التفاعلية والتنظيمية" },
      ],
    },
    {
      id: 5,
      qAr: "ما هو نمط الإنجاز والمستقبل الوظيفي الذي ترتاح له نفسك؟",
      options: [
        { key: "entrepreneur", textAr: "إنشاء مشروعي الحر الخاص، الاستقلالية التامة، والعمل كـ Freelancer" },
        { key: "corporate", textAr: "العمل الوظيفي المستقر، الارتقاء الأكاديمي، أو العمل في مؤسسات حكومية عملاقة" },
      ],
    },
  ];

  const handleNextQuestion = (optionKey: string) => {
    setAnswers({ ...answers, [currentQIndex]: optionKey });
    if (currentQIndex < testQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // End of questions, invoke analysis
      handleSubmitTest();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsAnalyzing(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/career-path-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qAnswers: answers,
          bakaloriaScore: score,
          section: track,
          interests: interests || "التميز في تخصص هادف",
        }),
      });

      if (!response.ok) {
        throw new Error("حدث خطأ في توليد التوصية. كرر المحاولة لطيفاً.");
      }

      const data = await response.json();
      setResult(data);
      setStep(3); // Show results
    } catch (err: any) {
      setErrorMsg(err.message || "عذراً، تعذر الاتصال بالخادم الذكي. تأكد من تفعيل الاتصال والمحاولة مجدداً.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetFinder = () => {
    setStep(1);
    setCurrentQIndex(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80 text-right">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sumer-gold/15 text-sumer-gold rounded-xl flex items-center justify-center">
          <GraduationCap size={22} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
            اختبار تحديد المسار الأكاديمي والجامعي بالذكاء الاصطناعي
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            موجه وطني خاص لطلبة البكالوريا (الإعدادية) العراقية للربط الذكي للتخصص بالمؤهلات والمعدل
          </p>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-sumer-blue/5 border border-sumer-blue/10 p-5 rounded-2xl">
            <h4 className="font-bold text-sm text-sumer-blue mb-1">💡 كيف يعمل الاختبار؟</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              يدرس نظام التقييم ميولك الشخصية ومعدلك الدراسي المتوقع وفرع التخصص (أحيائي، أدبي، علمي، إلخ) لمطابقتها إحصائياً بالخوارزميات مع الكليات ومعدلات القبول المركزي والموازي والأهلي المثالية لك في المحافظات العراقية.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-sumer-ink">معدل البكالوريا المتوقع أو الحالي (0-100):</label>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="0.1"
                  value={score}
                  onChange={(e) => setScore(parseFloat(e.target.value) || 85)}
                  className="w-full bg-transparent font-mono text-xl font-bold font-sans outline-none text-sumer-blue"
                />
                <span className="font-bold text-sm text-gray-400">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-sumer-ink">الفرع الإعدادي (التخصص):</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-sm font-bold text-sumer-ink cursor-pointer"
              >
                <option value="أحيائي">الفرع الأحيائي العلمي</option>
                <option value="تطبيقي">الفرع التطبيقي العلمي</option>
                <option value="علمي">الفرع العلمي الموحد</option>
                <option value="أدبي">الفرع الأدبي</option>
                <option value="مهني / تكنولوجي">فرع مهني وتجاري وزراعي وتكنولوجي</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-sumer-ink">
              اهتمامات خاصة، هوايات، أو تمنيات مهنية (اختياري):
            </label>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="مثال: أحب تجميع الأجهزة، مهتم بلغات البرمجة، أرغب في العمل المكتبي، أو القضاء والدراسات الدستورية..."
              className="w-full h-24 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-sumer-blue transition-colors resize-none"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-4 bg-sumer-blue text-white rounded-xl font-bold text-base shadow hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            متابعة لأسئلة التمييز الذاتي <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs text-gray-400 font-bold">
              السؤال {currentQIndex + 1} من {testQuestions.length}
            </span>
            <div className="w-1/3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sumer-gold transition-all"
                style={{ width: `${((currentQIndex + 1) / testQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-sumer-blue leading-relaxed">
              {testQuestions[currentQIndex].qAr}
            </h4>

            <div className="grid gap-3 pt-2">
              {testQuestions[currentQIndex].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleNextQuestion(option.key)}
                  className="w-full p-5 bg-gray-50 hover:bg-sumer-blue/5 border-2 border-gray-100 hover:border-sumer-blue/30 rounded-2xl text-right text-sm leading-relaxed transition-all cursor-pointer font-medium"
                >
                  {option.textAr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQIndex === 0}
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-sumer-blue flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft size={14} /> السابق
            </button>
            <span className="text-xs text-sumer-gold font-bold">كل إجابة تساعد AI في تقليص فرص الخطأ</span>
          </div>

          {isAnalyzing && (
            <div className="fixed inset-0 z-50 bg-sumer-blue/20 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm text-center space-y-4 border border-gray-100">
                <div className="w-12 h-12 bg-sumer-blue text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-bold text-lg text-sumer-blue">جاري تشخيص مسارك الجامعي بالـ AI</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  نقوم بربط رغباتك مع معدل ({score}%) وقواعد البيانات المحدثة لوزارة التعليم العالي العراقية لتوليد تقريرك الأكاديمي الشامل...
                </p>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-sumer-gold animate-progress-flow" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 3 && result && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-sumer-blue to-blue-900 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sumer-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="bg-sumer-gold text-white font-bold text-xs px-3 py-1 rounded-full">
                معدل المواءمة الابتكاري: {result.compatibilityScore}%
              </span>
              <Sparkles size={20} className="text-sumer-gold animate-bounce" />
            </div>

            <h4 className="text-lg font-bold text-sumer-gold mb-2 border-b border-white/10 pb-2">
              التشخيص الرئيسي المقترح للمسار الجامعي
            </h4>
            <p className="text-sm md:text-base leading-relaxed opacity-95">
              {result.primaryRecommendationAr}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60">
              <h5 className="font-bold text-base text-sumer-blue mb-3">🏫 الكليات والأقسام العراقية المقترحة:</h5>
              <div className="space-y-2">
                {result.suggestedCollegesAr?.map((col: string, i: number) => (
                  <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-center justify-between text-sm font-bold text-sumer-ink">
                    <span>{col}</span>
                    <span className="text-[10px] text-sumer-gold bg-sumer-gold/10 px-2 py-0.5 rounded-md">قبول متوقع</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60">
              <h5 className="font-bold text-base text-sumer-blue mb-3">🛠️ خطة العمل الاستراتيجية لبناء مستقبلك:</h5>
              <div className="space-y-2.5">
                {result.actionPlanAr?.map((act: string, i: number) => (
                  <div key={i} className="text-xs leading-relaxed text-gray-600 flex items-start gap-2">
                    <span className="w-5 h-5 bg-sumer-gold/20 text-sumer-gold font-bold text-[10px] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p>{act}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={resetFinder}
              className="text-xs font-bold text-sumer-blue hover:text-sumer-gold cursor-pointer"
            >
              🔄 إعادة خوض الاختبار من جديد
            </button>
            <span className="text-[11px] text-gray-400">تقرير صادر عن مستشار التوجيه الأكاديمي في أكاديمية سومر</span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center gap-3 text-xs leading-relaxed">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
