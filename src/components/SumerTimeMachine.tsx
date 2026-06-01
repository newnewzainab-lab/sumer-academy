import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scroll, 
  Map, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Hammer, 
  User, 
  Medal, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Share2
} from "lucide-react";

interface Epoch {
  id: string;
  name: string;
  period: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  themeColor: string;
  wisdom: string;
  fact: string;
}

const EPOCHS: Epoch[] = [
  {
    id: "sumer",
    name: "العصر السومري وعهد أوروك",
    period: "3500 قبل الميلاد",
    title: "أول حرف كُتب في تاريخ الإنسانية",
    description: "هنا بدأت الثورة المعرفية الكبرى، حيث اخترع السومريون الكتابة المسمارية على ألواح الطين الطري لحفظ القوانين والمعارف والقصص، لتتحول بلاد الرافدين لمهد المعرفة الأول للعالم.",
    icon: Compass,
    themeColor: "from-[#EF6C00] to-amber-600",
    wisdom: "« من يتعلم يرتفع كالشمس، ومن تهاون بالمعرفة طمسته الرياح الكثيفة » — لوح طين سومري قديم.",
    fact: "أول مدرسة مسجلة في التاريخ كان يُطلق عليها 'إيدوبا' (بيت الألواح) في العراق السومري لتدريس الرياضيات واللغات."
  },
  {
    id: "babylon",
    name: "العصر البابلي والرمز العلمي",
    period: "1750 قبل الميلاد",
    title: "تدوين شريعة المعرفة والعدل",
    description: "اشتهر البابليون بحساب المثلثات المتطور، والخرائط الفلكية للنجوم، وإرساء شريعة حمورابي القانونية كأول دستور ينظم العلاقات الإنسانية ويحمي حق الضعيف بالدراسة والعمل.",
    icon: Hammer,
    themeColor: "from-blue-700 to-indigo-950",
    wisdom: "« العدالة هي سور البلاد، والمعرفة هي النور الذي يفتح أبصار الأجيال » — ديباجة حمورابي الملكية.",
    fact: "لوح 'بليمبتون 322' البابلي يستعرض مبادئ فيثاغورس الهندسية قبل فيثاغورس بـ 1000 عام كاملة!"
  },
  {
    id: "baghdad",
    name: "بيت الحكمة العباسي وملتقى العقول",
    period: "750 - 1258 ميلادي",
    title: "مستودع الترجمة وفجر العلوم الكونية",
    description: "تحولت بغداد للقطب الفكري الأوحد في الكوكب. أسس الخلفاء العباسيون 'بيت الحكمة' لترجمة معارف اليونان والهند وحضارتنا والابتكار في الجبر، البصريات، الفلسفة، والطب المعاصر.",
    icon: Scroll,
    themeColor: "from-emerald-600 to-teal-900",
    wisdom: "« قيمة كل امرئ ما يحسنه، وطلب العلم فريضة تذلل الصعاب الجسام » — من مأثورات معمل الحكمة ببغداد.",
    fact: "أحدثت بلادنا ثورة في الاختراع مثل الاصطرلاب والطب الوقائي ومبادئ الخوارزميات الرياضية التي تشغل خوارزميات الـ AI حالياً!"
  },
  {
    id: "modern-ai",
    name: "العراق الحديث وأكاديمية سومر",
    period: "2026 ميلادي وما بعدها",
    title: "دمج الذكاء الاصطناعي لاستعادة السيادة العلمية",
    description: "بوابة أكاديمية سومر تعيد إحياء تراث وادي الرافدين باستخدام خوارزميات الجيل الـ 3D، وربط طلابنا الإعداديين والجامعيين مباشرة بهياكل العمل ونقابات الابتكار التقني بفعالية.",
    icon: Sparkles,
    themeColor: "from-amber-500 to-[#EF6C00]",
    wisdom: "« نحن لا نروي التاريخ وحسب، بل نرسم المستقبل رقمياً بأيادٍ وطنية وذكاء فائق التمكين » — ميثاق جيل سومر الحديث.",
    fact: "الذكاء الاصطناعي التوليدي اليوم يحلل النصوص ويترجم ألواح طين السومريين القديمة فورياً وبثوانٍ معدودة!"
  }
];

// Mapping characters to beautiful symbolic Cuneiform characters for dynamic simulator play
const CUNEIFORM_MAP: { [key: string]: string } = {
  "ا": "𒀀", "ب": "𒁀", "ت": "𒋼", "ث": "𒅆", "ج": "𒁶", "ح": "𒄭", "خ": "𒄷", "د": "𒁲", 
  "ذ": "idemargin", "ر": "𒊑", "ز": "𒍣", "س": "𒊓", "ش": "𒋗", "ص": "𒍝", "ض": "𒍢", 
  "ط": "𒁕", "ظ": "idemargin", "ع": "𒂊", "غ": "𒄖", "ف": "𒉺", "ق": "𒋡", "ك": "𒅗", 
  "ل": "𒆷", "م": "𒈠", "ن": "𒈾", "ه": "ಹೆ", "و": "𒉿", "ي": "𒅀", " ": " 𒌋 "
};

export const SumerTimeMachine: React.FC = () => {
  const [activeEpoch, setActiveEpoch] = useState<string>("sumer");
  const [inputText, setInputText] = useState<string>("جعفر");
  const [clayBaked, setClayBaked] = useState<boolean>(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<string | null>(null);
  const [claimedWisdomPoints, setClaimedWisdomPoints] = useState<number>(0);

  const currentEpochObj = EPOCHS.find((e) => e.id === activeEpoch) || EPOCHS[0];
  const IconComponent = currentEpochObj.icon;

  const translateToCuneiform = (text: string) => {
    let result = "";
    for (const char of text) {
      const lower = char.toLowerCase();
      if (CUNEIFORM_MAP[lower]) {
        result += CUNEIFORM_MAP[lower];
      } else if (CUNEIFORM_MAP[char]) {
        result += CUNEIFORM_MAP[char];
      } else {
        result += " 𒀭 "; // An (heaven/god symbol) as fallback for unmatched characters
      }
    }
    return result || "𒀀𒁀";
  };

  const handleBakeTablet = () => {
    setClayBaked(true);
    if (claimedWisdomPoints < 100) {
      setClaimedWisdomPoints((prev) => prev + 50);
    }
    setTimeout(() => {
      setClayBaked(false);
    }, 4500);
  };

  return (
    <section id="sumer_time_machine" className="bg-white rounded-[40px] border-2 border-[#0A2E5C]/10 shadow-xl overflow-hidden text-right p-6 md:p-10 relative">
      {/* Absolute Decorative Motif */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#EF6C00]/5 to-transparent rounded-br-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#0A2E5C]/5 to-transparent rounded-tl-[150px] pointer-events-none" />

      {/* Header section of Sumer Time Machine */}
      <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[10px] bg-gradient-to-r from-[#EF6C00] to-amber-500 text-white font-black px-3 py-1 rounded-full shadow-sm animate-pulse">
              ميزة الرافدين الحصرية والمميزة ✨
            </span>
            <h2 className="text-xl md:text-3xl font-display font-black text-[#0A2E5C]">
              بوابة الزمن السومرية: اللوح الرقمي المستدام
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl">
            استكشف فصول المعرفة الرافدينية الاستباقية، وقم بنقش اسمك بالطريقة المسمارية وحفظ لوح معرفتك بتميز وطني يربط التاريخ بالذكاء الاصطناعي الحديث.
          </p>
        </div>

        {/* Sumer Wisdom Score badge */}
        <div className="bg-gradient-to-r from-[#0A2E5C] to-indigo-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3.5 self-start md:self-center border-b-4 border-[#EF6C00] shadow-md">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <Medal size={20} className="animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] text-slate-300 block font-bold leading-none">نقاط الحكمة الرافدينية</span>
            <span className="text-base font-black font-mono text-amber-400">{claimedWisdomPoints} نقطة</span>
          </div>
        </div>
      </div>

      {/* Epochs stepper navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {EPOCHS.map((epoch) => {
          const isActive = epoch.id === activeEpoch;
          const EpIcon = epoch.icon;
          return (
            <button
              key={epoch.id}
              onClick={() => {
                setActiveEpoch(epoch.id);
                setShowAnswerFeedback(null);
              }}
              className={`p-4 rounded-3xl border-2 text-right transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isActive
                  ? "bg-gradient-to-br from-[#0A2E5C] to-[#0A2E5C]/90 text-white border-[#EF6C00] shadow-lg translate-y-[-2px]"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-black rounded-full px-2 py-0.5 ${isActive ? "bg-amber-500/20 text-amber-300" : "bg-slate-200 text-slate-600"}`}>
                  {epoch.period}
                </span>
                <EpIcon size={16} className={isActive ? "text-[#EF6C00]" : "text-slate-400 group-hover:text-slate-600"} />
              </div>
              <h4 className="font-display font-black text-xs md:text-sm mt-3 leading-tight">
                {epoch.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Epoch view card with staggered entrance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEpoch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Epoch core info */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 p-6 md:p-8 rounded-[32px] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1 text-white rounded-full bg-gradient-to-r ${currentEpochObj.themeColor}`}>
                <BookOpen size={10} />
                <span>شاهد الأثر التاريخي والمعرفي</span>
              </span>

              <h3 className="text-lg md:text-2xl font-display font-black text-[#0A2E5C] leading-snug">
                {currentEpochObj.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {currentEpochObj.description}
              </p>

              {/* Wisdom quote panel */}
              <div className="bg-amber-500/5 border-r-4 border-[#EF6C00] p-4 rounded-l-2xl text-right">
                <p className="text-xs md:text-sm font-semibold italic text-slate-800 leading-relaxed font-display">
                  {currentEpochObj.wisdom}
                </p>
              </div>
            </div>

            {/* Fact board */}
            <div className="pt-4 border-t border-slate-200/60 text-xs text-slate-500 flex items-start gap-2.5">
              <span className="text-[#EF6C00] text-base select-none mt-0.5">ℹ️</span>
              <div>
                <span className="font-extrabold text-slate-700 block mb-0.5">هل كنت تعلم؟</span>
                <p className="leading-relaxed font-medium">{currentEpochObj.fact}</p>
              </div>
            </div>
          </div>

          {/* Interactive Tablet tool side */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2540] to-slate-900 text-white p-6 md:p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden border-2 border-slate-800">
            {/* Ambient clay styled background */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#EF6C00]/10 rounded-full blur-2xl pointer-events-none" />

            {activeEpoch === "sumer" || activeEpoch === "modern-ai" ? (
              // Sumerian Cuneiform Digital Clay Tablet Tool
              <div className="space-y-5 w-full flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <h4 className="text-sm font-display font-black text-amber-400">
                    📯 مترجم النقش المسماري السومري التفاعلي
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    اكتب اسمك باللغة العربية (أو اختر أي كلمة مرافقة) لتصميم ونحت لوح الطين الرقمي الخاص بك برموز مسمارية حقيقية تعود لـ 5000 سنة!
                  </p>
                </div>

                {/* Input text selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 block text-right">أدخل اسمك أو كلمتك الذهبية:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value.slice(0, 16));
                        setClayBaked(false);
                      }}
                      placeholder="مثال: جعفر المياحي"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-[#EF6C00] text-right font-display"
                    />
                    <button
                      onClick={() => setInputText("سومر")}
                      className="bg-white/10 hover:bg-white/15 px-3 py-2 text-[10px] rounded-xl font-bold transition-all text-amber-300 shrink-0"
                    >
                      كلمة سومر
                    </button>
                  </div>
                </div>

                {/* Baked Clay Tablet Simulation display */}
                <div className="relative py-8 px-4 rounded-2xl bg-gradient-to-b from-[#dfb175] to-[#c78640] border-2 border-[#b06a23] text-[#3e1e04] shadow-inner text-center space-y-4">
                  <div className="absolute top-2 right-3 text-[8px] font-black uppercase text-[#612c01] tracking-widest font-mono">
                    {clayBaked ? "🔒 TABLET BAKED • مصدق رقمياً" : "🌱 SOFT DIGITAL CLAY • طين رقمي رطب"}
                  </div>
                  
                  {/* Cuneiform glyphs display */}
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl tracking-widest font-mono select-all transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none">
                      {translateToCuneiform(inputText)}
                    </div>
                    <div className="text-sm font-black font-display tracking-tight opacity-90">
                      {inputText || "اكتب اسماً ورطّب الطين"}
                    </div>
                  </div>

                  {clayBaked && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[9px] bg-emerald-900 border border-emerald-500/30 text-emerald-100 rounded-lg py-1 px-2.5 font-bold inline-flex items-center gap-1"
                    >
                      <CheckCircle2 size={10} />
                      <span>تصلّب اللوح! حصلت على 50 نقطة حكمة رافدينية!</span>
                    </motion.div>
                  )}
                </div>

                {/* Baking / saving trigger CTA */}
                <button
                  disabled={clayBaked || !inputText}
                  onClick={handleBakeTablet}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    clayBaked
                      ? "bg-slate-800 text-slate-500 border border-slate-700"
                      : "bg-[#EF6C00] hover:bg-orange-600 text-white border-b-4 border-orange-800 shadow-[0_3px_0_#9a3412] hover:scale-[1.02]"
                  }`}
                >
                  <span>{clayBaked ? "تم النقش على الطين وبثه بنجاح!" : "صلّب اللوح ونقشه بذكاء (احصل على مكافأة)"}</span>
                </button>
              </div>
            ) : (
              // Historical Mini Challenge Interactive Section (For Babylon and Baghdad)
              <div className="space-y-5 w-full flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <h4 className="text-sm font-display font-black text-amber-300 flex items-center gap-1.5 justify-end">
                    <span>احجية وادي الرافدين المعرفية للطلاب</span>
                    <span>🧩</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    من خلال فحصك ومراجعتك لتاريخ {activeEpoch === "babylon" ? "بابل الساحرة" : "بيت الحكمة الشاهق بوفوده"}، حل هذا التساؤل لرفع نقاط هويتك الأكاديمية:
                  </p>
                </div>

                {/* Challenge content */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-right space-y-3">
                  <p className="text-xs font-bold leading-relaxed text-amber-200">
                    {activeEpoch === "babylon" 
                      ? "سؤال: ما هو اللوح البابلي الرياضي العراقي الشهير الذي حل مبادئ المثلثات قبل ولادة الفيلسوف الإغريقي فيثاغورس بـ 1000 عام؟"
                      : "سؤال: ما هو المركز الفكري العباسي الهائل ببغداد الذي أسسه خلفاء العراق ليكون قطباً لترجمة وحفظ معارف الأمم للعربية؟"
                    }
                  </p>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {activeEpoch === "babylon" ? (
                      <>
                        <button
                          onClick={() => {
                            setShowAnswerFeedback("correct");
                            if (claimedWisdomPoints < 100) setClaimedWisdomPoints((p) => p + 50);
                          }}
                          className="py-2.5 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-right font-semibold transition-all border border-white/10 flex items-center justify-between"
                        >
                          <span className="text-[10px] text-slate-400">أ) الخيار الأول</span>
                          <span>لوح بليمبتون (Plimpton 322)</span>
                        </button>
                        <button
                          onClick={() => setShowAnswerFeedback("wrong")}
                          className="py-2.5 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-right font-semibold transition-all border border-white/10 flex items-center justify-between"
                        >
                          <span className="text-[10px] text-slate-400">ب) الخيار الثاني</span>
                          <span>لوح إبيكتيتوس الخيالي</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setShowAnswerFeedback("correct");
                            if (claimedWisdomPoints < 100) setClaimedWisdomPoints((p) => p + 50);
                          }}
                          className="py-2.5 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-right font-semibold transition-all border border-white/10 flex items-center justify-between"
                        >
                          <span className="text-[10px] text-slate-400">أ) الخيار الأول</span>
                          <span>بيت الحكمة ببغداد (House of Wisdom)</span>
                        </button>
                        <button
                          onClick={() => setShowAnswerFeedback("wrong")}
                          className="py-2.5 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-right font-semibold transition-all border border-white/10 flex items-center justify-between"
                        >
                          <span className="text-[10px] text-slate-400">ب) الخيار الثاني</span>
                          <span>أكاديمية أثينا الأفلاطونية ببلاد الروم</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Instant Feedback indicator without mock window alert */}
                <div className="h-12 flex items-center justify-center">
                  {showAnswerFeedback === "correct" && (
                    <span className="text-xs bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-extrabold py-2 px-4 rounded-xl text-center w-full">
                      🎉 إجابة دقيقة وصحيحة بالكامل! حصدت 50 نقطة حكمة رافدينية!
                    </span>
                  )}
                  {showAnswerFeedback === "wrong" && (
                    <span className="text-xs bg-rose-950 border border-rose-500/30 text-rose-400 font-extrabold py-2 px-4 rounded-xl text-center w-full">
                      ❌ إجابة تخمينية غير مستقرة! حاول مرة أخرى لقراءة اللوح مجدداً.
                    </span>
                  )}
                </div>

                {/* Stepper trigger to help read */}
                <button
                  onClick={() => setShowAnswerFeedback(null)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/25 rounded-xl font-bold text-xs"
                >
                  تصفير الخيارات وإعادة قراءة اللوحة التاريخية
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
