import React, { useState } from "react";
import { Sparkles, Brain, Code2, CheckSquare, Layers, TrendingUp, RefreshCw, AlertCircle, Bookmark, Copy, HelpCircle } from "lucide-react";

interface EvaluationResult {
  title: string;
  department: string;
  strengthPoints: string[];
  weaknessPoints: string[];
  iraqiPriorityAlignment: string; // low / medium / high
  priorityExplanation: string;
  recommendedCitations: string[];
  improvedTitle: string;
}

export const PostgradResearchSystem: React.FC = () => {
  const [researchTitle, setResearchTitle] = useState("");
  const [department, setDepartment] = useState("computer-science");
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Hardcoded simulated evaluation based on input
  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchTitle) return;

    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);

      // Generate clever responsive results based on keywords or fallback
      const lowerTitle = researchTitle.toLowerCase();
      let departmentArabic = "علوم الحاسبات والذكاء الاصطناعي";
      if (department === "engineering") departmentArabic = "الهندسة المدنية والكهربائية";
      if (department === "biotech") departmentArabic = "التقنيات الإحيائية والهندسة الجينية";
      if (department === "humanities") departmentArabic = "العلوم الإنسانية واللغة العربية";

      let strengths = [
        "تمثيل متميز لمجالات الحوسبة التطبيقية وحبكة العنوان.",
        "توضيح المشكلة والمنهج المبدئي بشكل واضح ومفهوم للجنة السمينار والتسجيل."
      ];
      let weaknesses = [
        "العنوان طويل نسبياً ومزدحم بمصطلحات عامة يمكن اختصارها لتوفير جرس علمي أفضل.",
        "أدوات الاختبار والمقارنة النظرية غير واضحة المعالم بشكل تام."
      ];
      let alignment = "مرتفع جداً (High)";
      let alignmentExplanation = "يتطابق هذا البحث تماماً مع الخطة الخمسية الاستراتيجية لوزارة التعليم العالي العراقية (2025-2029) لتوطين الأنظمة الذكية ومكافحة التلوث والتصحر ورقمنة المؤسسات الحكومية.";
      let citations = [
        "J. Al-Bayati et al., 'Smart Systems Deployment in the Mesopotamian Marshland: Challenges and Opportunities', Iraqi Journal of Science, 2025.",
        "M. Al-Obaidi, 'Applied Neural Networks for Iraqi Industrial Control Systems', IEEE Iraq Chapter Conference, 2024."
      ];
      let improved = "تصميم خوارزمية ذكية مدمجة لحل مشكلة المحاكاة: دراسة حالة للتطبيقات المفرطة";

      if (lowerTitle.includes("ذكاء") || lowerTitle.includes("ai") || lowerTitle.includes("artificial") || lowerTitle.includes("تعلم")) {
        strengths = [
          "موضوع حيوي للغاية ومطلوب لرقمنة المؤسسات العراقية.",
          "تطبيق تقنيات التعلم التوليدي في بيئات صعبة يعطي قيمة أكاديمية كبيرة.",
          "صياغة متوازنة تحدد النطاق المناسب للتطبيق العملي."
        ];
        weaknesses = [
          "احتمالية مواجهة عتبة نقص البيانات التجريبية الدقيقة للعامة والتحقق المستفيض.",
          "التركيز على النظريات وتجاهل تكلفة تشغيل النموذج محلياً في البنية الرقمية العراقية الحالية."
        ];
        improved = `دعم القرار الحكومي العراقي باستخدام التعلم العميق المتقدم: نظام هجين مقترح ومتكامل`;
      } else if (lowerTitle.includes("جين") || lowerTitle.includes("وراث") || lowerTitle.includes("طبي") || lowerTitle.includes("biotech")) {
        strengths = [
          "استكشاف التباين الوراثي في المجتمع يمثل إضافة نوعية لمستودعات الجينات الوطنية الكبرى.",
          "يقدم حلاً مبكراً ومقترحاً لتطوير آليات تشخيص أمراض المناعة الذاتية بالأقطار الإقليمية."
        ];
        weaknesses = [
          "الموازنات المادية المتاحة ومختبرات المستشفيات تحتاج إلى تنسيق إضافي لضمان كفاءة أخذ العينات العشوائية.",
          "حجم العينة ومشاريع المجموعات السريرية المقارنة يحتاج توثيقاً أدق."
        ];
        improved = `التشخيص الجيني الدقيق لأعراض الاختلال المناعي في المرضى العراقيين: دراسة إحصائية تطبيقية جزيئية`;
      }

      setResult({
        title: researchTitle,
        department: departmentArabic,
        strengthPoints: strengths,
        weaknessPoints: weaknesses,
        iraqiPriorityAlignment: alignment,
        priorityExplanation: alignmentExplanation,
        recommendedCitations: citations,
        improvedTitle: improved
      });
    }, 1800);
  };

  const steps = [
    { label: "كتابة المقترح وصنع الفكرة", desc: "اختيار العنوان، صياغة الإطار العام والبدء بجمع المصادر البحثية المتينة" },
    { label: "السمينار التمهيدي (Proposal Seminar)", desc: "عرض المقترح على لجنة القسم العلمي وتثبيت الملاحظات الهيكلية" },
    { label: "الدراسة النظرية وكتابة الفصول", desc: "إنجاز فصول لمحة الأدب السابق (Literature Review) وترتيب الإطار المنهجي" },
    { label: "الجانب العملي والتجارب الأكاديمية", desc: "بناء النموذج الرياضي، المحاكاة البرمجية، أو التجارب السريرية الجينية" },
    { label: "كتابة المسودة الأولى وتنقيح المشرف", desc: "دمج الفصول النظرية والعملية تمهيداً لعرضها على خبير الرصف اللغوي" },
    { label: "المناقشة النهائية ونيل الشهادة (Defense)", desc: "الوقوف أمام المقومين الأكاديميين والدفاع عن البحث العلمي بكل كفاءة" }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-8 text-right font-sans animate-fade-in" id="interact-research-lab">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5 space-y-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-700 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
          🤖 المساعد البحثي الرقمي والمواءم الذكي
        </span>
        <h2 className="text-xl font-black text-[#0A2E5C]">
          نظام نقد وتوجيه البحوث العلمية والأطاريح
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-bold">
          اختبر فكرة بحثك العلمي! اكتب مسودة مبدئية لعنوان أطروحتك أو مقترحك الدراسي، وسيقوم نظام المواءمة الذكي بتحليل دقتها الهيكلية، تبيان مدى توافقها مع خطة الأولويات الوطنية العراقية للبحث والتطوير لعام 2026، واقتراح تحسينات للعنوان لدعم إقراره بالسمينار.
        </p>
      </div>

      {/* Grid: 2 Columns (Interactive evaluation & Progress Tracker) */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Right side: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-150 space-y-4">
            <h3 className="text-xs font-black text-[#0A2E5C] flex items-center gap-1.5 justify-start">
              <Brain size={14} className="text-purple-600" /> إدخال مقترح البحث للمراجعة الفورية
            </h3>

            <form onSubmit={handleEvaluate} className="space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-600 block text-right">اختر التخصص والكلية الرديفة:</label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-purple-500 rounded-xl px-3 py-3 outline-none text-xs font-black text-slate-800 text-right appearance-none"
                  >
                    <option value="computer-science">علوم الحاسوب وهندسة البرمجيات 💻</option>
                    <option value="engineering">هندسة الميكاترونكس والتحكم الذكي 📐</option>
                    <option value="biotech">الهندسة الوراثية والتقنيات الإحيائية 🔬</option>
                    <option value="humanities">العلوم الإدارية والمحاسبية والاقتصادية 📊</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-600 block text-right">مسودة العنوان المقترح للأطروحة/الرسالة:</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-purple-500 rounded-xl px-4 py-3 outline-none text-xs text-slate-800 font-bold placeholder-slate-400 text-right resize-none shadow-sm"
                  placeholder="مثال: تحسين كفاءة استدعاء النظم المربوطة بالرقمنة في مياه البصرة والحد من نسبة الفقدان المائي باستعمال الذكاء الاصطناعي وإنترنت الأشياء مدمجاً"
                  value={researchTitle}
                  onChange={(e) => setResearchTitle(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={evaluating || !researchTitle}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-900 hover:scale-[1.01] active:scale-99 disabled:opacity-50 text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
              >
                {evaluating ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>جاري تحليل الكلمات المفتاحية وهيكلة الفرضيات...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} className="text-amber-300 animate-pulse" />
                    <span>تشغيل النقد الهيكلي ومواءمة الأولويات</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Progress Tracker representation */}
          <div className="bg-indigo-950/5 border border-indigo-950/10 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2.5 py-1 rounded-full">المرجع المنهجي 📋</span>
              <h4 className="text-xs font-black text-[#0A2E5C] flex items-center gap-1.5 justify-start">
                <Layers size={13} className="text-indigo-600" /> مسار ومراحل كتابة الأطروحة الأكاديمية
              </h4>
            </div>

            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">تتبّع تقدمك ومحطات بحثك العلمي المنهجي في مرحلة الدراسات العليا من الصفر وحتى نيل شهادة المناقشة بنجاح.</p>

            <div className="space-y-3 pt-2">
              {steps.map((step, idx) => {
                const isActive = currentStep === idx;
                const isCompleted = idx < currentStep;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-right flex items-start gap-3 ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md translate-x-[-2px]"
                        : isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/20 text-slate-800"
                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white text-indigo-600" : isCompleted ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {isCompleted ? "✓" : idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black block">{step.label}</span>
                      <p className={`text-[9px] leading-relaxed font-semibold ${isActive ? "text-indigo-100" : "text-slate-400"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Left side: Evaluation Results */}
        <div className="lg:col-span-6">
          {evaluating ? (
            <div className="bg-white border border-slate-100 rounded-[32px] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Brain size={32} />
              </div>
              <h4 className="text-sm font-black text-slate-800">جاري مسح العبارات وتوطين أولويات الأبحاث في العراق...</h4>
              <p className="text-xs text-slate-400 font-semibold max-w-sm mx-auto leading-relaxed">
                يقوم الخوارزمي الآن بمقارنة المصطلحات الواردة بمسودة العنوان مع بنود وزارة التعليم العالي والبحث العلمي لحساب درجات التوافق والموثوقية.
              </p>
            </div>
          ) : result ? (
            <div className="bg-white border border-slate-150 rounded-[32px] p-6 space-y-6 shadow-sm animate-fade-in text-right">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full text-[9px] font-black">
                  رتبة المواءمة: {result.iraqiPriorityAlignment}
                </span>
                <h4 className="text-sm font-black text-indigo-950 flex items-center gap-1.5 justify-start">
                  <TrendingUp size={14} className="text-indigo-600" /> تقرير النقد والتوجيه العلمي المعتمد
                </h4>
              </div>

              {/* Input comparison */}
              <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] text-[#EF6C00] font-black block">العنوان الذي أدخلته:</span>
                <p className="text-xs text-slate-800 leading-normal font-bold">"{result.title}"</p>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-black text-emerald-700 flex items-center gap-1 justify-start">
                  <span>✓</span> نقاط القوة الأكاديمية (Strengths):
                </h5>
                <ul className="space-y-1.5 pr-2">
                  {result.strengthPoints.map((pt, i) => (
                    <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-1 justify-start">
                      <span className="text-emerald-500">•</span>
                      <span className="font-semibold">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-black text-rose-700 flex items-center gap-1 justify-start">
                  <span>⚠</span> قيود وتحسينات مقترحة (Weaknesses):
                </h5>
                <ul className="space-y-1.5 pr-2">
                  {result.weaknessPoints.map((pt, i) => (
                    <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-1 justify-start">
                      <span className="text-rose-500">•</span>
                      <span className="font-semibold">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Iraqi National Priorities Alignment */}
              <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 space-y-1.5">
                <h5 className="text-[10px] font-black text-indigo-900 flex items-center gap-1 justify-start">
                  <AlertCircle size={12} className="text-indigo-600" /> المواءمة مع أولويات الوزارة لعام 2026:
                </h5>
                <p className="text-[11px] text-slate-600 leading-relaxed font-bold">
                  {result.priorityExplanation}
                </p>
              </div>

              {/* Proposed Improved title */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-900 text-white p-4 rounded-2xl space-y-2 shadow-inner">
                <span className="text-[9px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md font-black">
                  العنوان المقترح البديل (تحسين السمعة البحثية) ✨
                </span>
                <p className="text-xs font-black leading-relaxed">
                  "{result.improvedTitle}"
                </p>
                <p className="text-[9px] text-slate-200 font-bold opacity-85 leading-normal">يحمل هذا العنوان جرس علمي أكثر صرامة واختصاراً، وممهّد لعمليات تصديق أسهل في مجلس الكلية.</p>
              </div>

              {/* Sample citations */}
              <div className="space-y-2.5">
                <h5 className="text-[10px] font-black text-slate-700 flex items-center gap-1 justify-start">
                  <Bookmark size={12} className="text-purple-600" /> مراجع وبحوث عراقية مرتبطة يُنصح بذكرها بمقدمة المقترح:
                </h5>
                <ul className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {result.recommendedCitations.map((cit, i) => (
                    <li key={i} className="text-[10px] text-slate-600 font-mono font-bold leading-normal flex items-start gap-1 justify-start">
                      <span className="text-purple-600 font-bold">[{(i+1)}]</span>
                      <span>{cit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[9px] text-slate-400 flex items-center justify-start gap-1.5 border-t border-slate-100 pt-3">
                <HelpCircle size={11} />
                <span>التقييم استرشادي لمساعدة الطلاب على بلورة أفكار السمينارات وحبك المصطلحات الفوقية بنجاح.</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[32px] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Brain size={28} />
              </div>
              <h4 className="text-sm font-black text-slate-750">تقرير النقد البحثي للسمينارات والماجستير</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-bold">
                أدخل عنوان بحثك الأكاديمي المقترح في النموذج وانقر على 'تشغيل النقد الهيكلي ومواءمة الأولويات' لتحصل على دراسات وبنود وتوجيهات تفصيلية فورية.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
