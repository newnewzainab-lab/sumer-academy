import React, { useState } from "react";
import { Check, ClipboardList, Sparkles, Smile, RefreshCw, AlertCircle, BookOpen, Heart, Award } from "lucide-react";

interface DomainQuestion {
  id: string;
  domain: string;
  icon: string;
  q: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

const READINESS_DOMAINS: DomainQuestion[] = [
  {
    id: "lang",
    domain: "التواصل والمهارات اللغوية 🗣️",
    icon: "💬",
    q: "هل يستطيع طفلك التعبير عن احتياجاته بوضوح وتشكيل جمل من 4-5 كلمات؟",
    options: [
      { text: "نعم، يعبر بطلاقة ويحب رواية قصص قصيرة", score: 3, tip: "ممتاز! استمر في قراءة القصص اليومية والتحدث معه بلهجات فصيحة غنية." },
      { text: "يتحدث بجمل بسيطة لكن قد تتوهم مخارج بعض الألفاظ", score: 2, tip: "طبيعي جداً. ركز على تكرار الكلمات الصحيحة أمامه بلطف دون صياغة سخرية." },
      { text: "يواجه صعوبة ويعبر بكلمات مقتضبة أو بالإشارة فقط", score: 1, tip: "نوصي بالحد من شاشات الأجهزة الرقمية والقيام بمحادثات تفاعلية مباشرة متكررة." }
    ]
  },
  {
    id: "motor",
    domain: "المهارات الحركية الدقيقة والكتابة 🎨",
    icon: "✏️",
    q: "كيف يقيم مستوى إمساكه بالقلم أو الألوان، واستعمال المقص البلاستيكي الآمن؟",
    options: [
      { text: "يمسك القلم بأصابعه الثلاثة بثبات ويرسم خطوطاً شبه مستقيمة", score: 3, tip: "رائع! عضلات يديه الدقيقة ممتازة. عوّده الآن على التلوين داخل حدود مرسومة." },
      { text: "يمسك القلم بكامل قبضة اليد (قبضة دائرية) ويبذل جهداً للتلوين", score: 2, tip: "جيد. استخدم ألعاب المعجون والصلصال الطبيعي لتقوية مفاصل وأوتار أصابعه." },
      { text: "يجد صعوبة بالغة في التحكم بالقلم أو يفضل تجنب أنشطة التلوين", score: 1, tip: "ينصح بالبدء بألعاب تجميع الخرز العريض، وتشكيل الطين لتعتاد يداه على الجهد." }
    ]
  },
  {
    id: "cognitive",
    domain: "الذكاء المعرفي والمنطقي 🧩",
    icon: "💡",
    q: "هل يميز الأشكال الهندسية الأساسية (مربع، دائرة، مثلث) والفرق في الأحجام؟",
    options: [
      { text: "يميزها بالكامل ويصنف الألعاب حسب المقاس أو اللون تلقائياً", score: 3, tip: "عبقري صغير! ابدأ بإدخال بازل أو قطع تركيبية بقطع مكثفة ومتنوعة لتعزيز التفاصيل." },
      { text: "يميز لونين أو ثلاثة، وقد يخلط أحياناً بين المربع والمثلث", score: 2, tip: "تطور مناسب. العب معه ألعاب الطابق والمطابقة للألعاب في المنزل لتثبيت الفروقات." },
      { text: "يحتاج لمساعدة دائمة ولا يستطيع الفرز أو المطابقة بشكل مستقل بشكل كافٍ", score: 1, tip: "استخدم الفواكه الحقيقية والخضروات لشرح المقاسات والألوان في الحياة اليومية ببساطة." }
    ]
  },
  {
    id: "social",
    domain: "الذكاء الاجتماعي والعاطفي 🤝",
    icon: "❤️",
    q: "كيف يتفاعل طفلك عند مشاركة ألعابه مع الأقران أو العمل في مهام ترفيهية مشتركة؟",
    options: [
      { text: "يتشارك الألعاب برغبة وينتظر دوره بمرونة عالية مع بقية الأطفال", score: 3, tip: "مهارة قيصرية قيّمة! هو مستعد كليا للبيئة الصفية المدرسية الكبيرة." },
      { text: "يتشارك الألعاب أحياناً لكن يثور غضبه بشدة إذا تم منعه من القيادة", score: 2, tip: "تحول مقبول. علمه ثقافة الكرم والمناوبة من خلال تمثيل مسرحي للدمى في المنزل." },
      { text: "يفضل اللعب الانعزالي تماماً ويشعر بوهن وتوتر شديد بوجود أترابه", score: 1, tip: "ادمج الطريقة التدريجية عن طريق دعوت صديق واحد فقط للعب الفردي في المنزل في البدء." }
    ]
  },
  {
    id: "independence",
    domain: "الاستقلالية والاعتماد الذاتي 🎒",
    icon: "👟",
    q: "هل يستطيع طفلك خلع حذائه ومعطفه وغسل يديه باستخدام الصابون بمفرده؟",
    options: [
      { text: "نعم، يقوم بها باستقلالية ويحب تقديم المساعدة في شؤون البيت", score: 3, tip: "شجعه دائماً! ثقته الشخصية هي أقوى ركيزة لنجاحه في عامه الدراسي الأول." },
      { text: "يحتاج لتذكير متكرر أو إعانة طفيفة في لف الأشرطة وإزرار القميص", score: 2, tip: "هذا هو الطبيعي لأفراد الفئة العمرية. اصبر عليه ودعه يجرب لمدة دورتين قبل التدخل." },
      { text: "يعتمد بشكل كلي على الوالدين ويواجه مقاومة لمحاولة التثقيف بالمهام الشخصية", score: 1, tip: "اجعل المهام الاستقلالية لعبة: 'من يرتدي قبعته أسرع؟'، لمراكمة النصر الشخصي لديه." }
    ]
  }
];

export const EarlyChildhoodReadiness: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSelectOption = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));

    if (currentStep < READINESS_DOMAINS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const activeQuestion = READINESS_DOMAINS[currentStep];

  const totalScore = (Object.values(answers) as number[]).reduce((a, b) => a + b, 0);
  const maxPossible = READINESS_DOMAINS.length * 3;
  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  const getOverallFeedback = () => {
    if (percentage >= 85) {
      return {
        title: "جاهزية مدرسية فائقة وطيبة! ✨",
        desc: "طفلكم يمتلك طاقة وجاهزية تامة للانتقال لعالم المدرسة والروضة بكامل مستمراته الفكرية والجسدية. أكاديمية سومر ترحب به!",
        color: "text-emerald-700 bg-emerald-105 border-emerald-300"
      };
    } else if (percentage >= 60) {
      return {
        title: "جاهزية كافية وبحاجة لتنظيم خفيف 🌱",
        desc: "الطفل يملك أساسات ممتازة ووفيرة. بعض التدريبات المنزلية البسيطة واللعب الحسي ستمحو أي فروقات قبل دق جرس الحصص الأولى.",
        color: "text-amber-700 bg-amber-50 border-amber-300"
      };
    } else {
      return {
        title: "بحاجة إلى تطوير ورعاية حثيثة متأملة 🧡",
        desc: "يحتاج طفلك لبعض التركيز الإضافي والحديث المتواصل لتقوية صوته وخطواته. لا داعي للقلق، لكل طفل إيقاعه الزمني الخاص والمقدس.",
        color: "text-orange-700 bg-orange-50 border-orange-200"
      };
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentStep(0);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans" id="child-readiness-survey">
      {/* Title */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
        <div className="text-right space-y-1">
          <h3 className="text-lg font-extrabold text-[#0A2E5C]">مقياس الاستعداد لبدء الروضة والمدرسة الابتدائية</h3>
          <p className="text-xs text-slate-500">نظام تقييم معتمد لأولياء الأمور لتشخيص كفاءة نمو مهارات الطفل المبكرة وتوفير تمرينات علاجية ذكية للبيت.</p>
        </div>
        <div className="bg-[#EF6C00]/10 text-[#EF6C00] px-4 py-1.5 rounded-full text-xs font-black">
          🧬 المنهج السومري التشخيصي
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          {/* Progress indicators bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>السؤال {currentStep + 1} من {READINESS_DOMAINS.length}</span>
            <span>بناء التشخيص الشامل: {Math.round(((currentStep) / READINESS_DOMAINS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / READINESS_DOMAINS.length) * 100}%` }}
            />
          </div>

          {/* Core Question Card */}
          <div className="bg-[#FFFDF6] border-2 border-amber-200 rounded-3xl p-6 md:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center gap-3 justify-end text-[#0A2E5C]">
              <span className="text-sm font-black bg-white shadow-sm border border-amber-200 px-3 py-1 rounded-xl">
                {activeQuestion.domain}
              </span>
              <span className="text-2xl">{activeQuestion.icon}</span>
            </div>

            <h4 className="text-base md:text-lg font-black text-slate-800 leading-snug">
              {activeQuestion.q}
            </h4>

            {/* Answer Options Grid */}
            <div className="grid gap-3 pt-4">
              {activeQuestion.options.map((option, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(activeQuestion.id, option.score)}
                  className="w-full text-right p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all hover:border-[#0A2E5C]/40 hover:translate-x-[-4px] font-bold text-xs md:text-sm text-slate-700 leading-relaxed flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-amber-500 text-xs text-left shrink-0 font-bold block max-w-xs">
                    👈 اختر هذا الخيار
                  </span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto py-4 animate-fade-in">
          {/* Score Circle Card */}
          <div className="bg-gradient-to-br from-[#0c2540] to-[#0A2E5C] text-white rounded-[32px] p-6 md:p-8 text-center space-y-4 shadow-lg">
            <h4 className="text-md md:text-lg font-extrabold text-amber-400">
              📊 التقرير التحليلي النهائي لمستوى جاهزية طفلك
            </h4>

            <div className="inline-flex items-center justify-center p-6 bg-white/10 rounded-full border border-white/20 my-2">
              <div>
                <span className="text-3xl md:text-5xl font-black block">{percentage}%</span>
                <span className="text-[10px] text-amber-300 font-bold">نسبة التوافق المدرسي</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-sm font-bold text-center leading-relaxed ${getOverallFeedback().color}`}>
              <p className="font-extrabold text-base mb-1">{getOverallFeedback().title}</p>
              <p className="text-xs">{getOverallFeedback().desc}</p>
            </div>
          </div>

          {/* Custom Action Tips list based on selection */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-[#0A2E5C] border-r-4 border-amber-500 pr-3">
              📝 الخطة والتمارين المنزلية الموصى بها لطفلك:
            </h4>

            <div className="grid sm:grid-cols-2 gap-4">
              {READINESS_DOMAINS.map((domain, index) => {
                const userScore = answers[domain.id];
                const matchingOption = domain.options.find(o => o.score === userScore);
                return (
                  <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-right">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span className="text-[#EF6C00]">درجة التقييم: {userScore}/3</span>
                      <span className="text-slate-800">{domain.domain}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold leading-normal">
                      اختيارك: "{matchingOption?.text}"
                    </p>
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl text-xs text-slate-800 font-semibold leading-relaxed">
                      💡 <strong>توصية الأكاديمية:</strong> {matchingOption?.tip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>إعادة الفحص والتقييم من جديد 🔄</span>
            </button>
            <button
              onClick={() => alert("تم حفظ التقرير السري في حسابك الطلابي لمراجعته رفقة المشرف التربوي مجاناً!")}
              className="px-6 py-2.5 bg-[#EF6C00] hover:bg-[#D85C00] text-white font-black text-xs rounded-xl shadow-md border-b-4 border-amber-800 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Award size={14} />
              <span>تنزيل بطاقة الجاهزية وحفظ الملخص 📥</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
