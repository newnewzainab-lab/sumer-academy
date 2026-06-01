import React, { useState, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw, Sparkles, BookOpen, Volume2, Smile, Heart, Award } from "lucide-react";

interface KidStory {
  id: string;
  title: string;
  emoji: string;
  moral: string;
  summary: string;
  fullStory: string;
}

const BEDTIME_STORIES: KidStory[] = [
  {
    id: "story_1",
    title: "مَجْد الـنَّخْلَة الـصَّغِيرَة الصَّبُورَة 🌴",
    emoji: "🌴",
    moral: "الصبر والنمو الهادئ يكشف جمالك بالنهاية للجميع.",
    summary: "قصة تروي حكاية نخلة صغيرة في بساتين بابل، كانت تحزن لأنها قصيرة، لكن أصدقاءها الفلاحين علموها كيف تمتد جذورها وتثمر أشهى التمر المقرمش بالصبر والماء العذب.",
    fullStory: "في غابر الزمان، في بستان جميل من بساتين دجلة الخالدة، كانت هناك نخلة صغيرة تدعى (موني). كانت موني حزينة لأن الطيور العالية لا تقف على سعفها الصغير مثل بقية النخيل الشامخ. نصحها البلبل الحكيم (سمير): 'لا تحزني يا موني، كل نخلة تنمو بقوة عندما تبسط جذورها عميقاً تحت التراب وتبتسم لقرص الشمس الذهبي'. تعلمت موني أن تصبر، وتشرب الماء العذب بهدوء وسرور. وبمرور الأيام، كبرت موني وأثمرت أشهى أنواع الرطب الذهبي الحلو، وصارت النخلة المفضلة في بابل التي تقابل جميع الطيور وتطعم الصغار والكبار بابتسامتها الدائمة!"
  },
  {
    id: "story_2",
    title: "الـصَّيَّاد الْحَكِيم وَالسَّمَكَة الـذَّهَبِيَّة فِي هَوْر الـجَّبَايِش 🐟",
    emoji: "🛶",
    moral: "الأمانة وحماية الطبيعة يعودان عليك بالخير دائمًا.",
    summary: "قصة صياد صغير ذكي يحمي أهوار بيئتنا وصاد سمكة ذهبية نادرة، فطلبت منه إعادتها للماء بمقابل حكمة سومرية فريدة.",
    fullStory: "في قلب أهوار الجبايش الساحرة، حيث يسبح القصب الأخضر وتطير الطيور النادرة، كان هناك صياد طيب يدعى (جعفر). ذات يوم، علقت بشبكته سمكة صغيرة تتلألأ بحراشف ذهبية لامعة تحت أشعة الشمس. قالت له السمكة بصوت دافئ: 'أرجوك يا جعفر، أعدني لمياه الهور العذب، وسأهديك حكمة الصبر والبركة في الرزق'. رق قلب جعفر الطيب، وبكل أمانة وحب أعادها للماء الواسع. شكرته السمكة وقدمت له سراً: أن أفضل صيد ليس بكثرته بل ببركته ومحبة الطبيعة. منذ ذلك اليوم، صعد جعفر في قارب المشحوف الشهير مكللاً بالفرح، وصار بطل الهور الذي يحمي المياه والأسماك."
  },
  {
    id: "story_3",
    title: "الـفَأْر الـذَّكِي وأَلْوَاح الْكِتَابَة الـسُّمَرِيَّة 📜",
    emoji: "🐭",
    moral: "حب العلم والمطالعة يجعل من الصغير جبار العقول.",
    summary: "قصة فرفور الصغير الذي كان يعبق في مكتبات سومر القديمة وتعلم كيف يساعد الكاتب في فرز الألواح.",
    fullStory: "في مكتبة الملك السومري القديمة، عاش فأر صغير فضولي ومحبوب يدعى (سوسو). كان سوسو يحب رائحة أوراق الطين والكتابات المسمارية القديمة. في ليلة من الليالي، نسى الكاتب الكبير ترتيب ألواح الحروف المهمة التي يعلم بها أطفال الأكاديمية. تسلل سوسو بذكائه اللطيف وبدأ يرتب الألواح بقدماه الصغيرتان تبعا لرموز الحروف والحيوانات، أليفةً كانت أم برية. عند الصباح، دهش الكاتب ورأى الحروف مصفوفة بروعة وسلاسة فائقة، وعلم أن الفأر الصغير هو النابغة المساعد، وقدم له قطعة شيدر لذيذة ونصبّه (المحرس الرسمي للمكتبة السحرية)!"
  }
];

export const EarlyChildhoodActivities: React.FC<{ onAskAI?: (question: string) => void }> = ({ onAskAI }) => {
  const [selectedStory, setSelectedStory] = useState<KidStory | null>(null);
  const [isPlayingStory, setIsPlayingStory] = useState(false);

  // Kid Timer variables
  const [timerDuration, setTimerDuration] = useState(120); // 120 seconds default = 2 mins
  const [timerLeft, setTimerLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState("teeth"); // "teeth" | "cleanup" | "reading"

  const presets: Record<string, { label: string; text: string; sec: number; emoji: string }> = {
    teeth: { label: "تنظيف الأسنان بالفرشاة 🪥", text: "فرشاة ومعجون لجعل الأسنان مثل اللؤلؤ!", sec: 120, emoji: "🦷" },
    cleanup: { label: "ترتيب الغرفة والألعاب 🧸", text: "لعبة السرعة! من يعيد الألعاب لمكانها أسرع؟", sec: 180, emoji: "📦" },
    reading: { label: "وقت القراءة الهادئة 📖", text: "نجلس بصمت، نتأمل الرسوم مع بابا وماما.", sec: 300, emoji: "🧘" }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft(prev => prev - 1);
      }, 1000);
    } else if (timerLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance("إنتهى الوقت يا بطل! أحسنت العمل تستحق نجمة ذهبية!");
          utterance.lang = "ar-IQ";
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {}
      alert("🎉 ممتاز جداً بالبطل الصغير! انتهى الوقت بنجاح وحصلت على وسام الالتزام.");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerLeft]);

  const handleApplyPreset = (key: string) => {
    setTimerPreset(key);
    const sec = presets[key].sec;
    setTimerDuration(sec);
    setTimerLeft(sec);
    setIsTimerRunning(false);
  };

  const minutes = Math.floor(timerLeft / 60);
  const seconds = timerLeft % 60;

  const handleSpeakStory = (text: string) => {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        if (!isPlayingStory) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "ar-IQ";
          utterance.rate = 0.85;
          utterance.pitch = 1.1;
          utterance.onend = () => setIsPlayingStory(false);
          setIsPlayingStory(true);
          window.speechSynthesis.speak(utterance);
        } else {
          window.speechSynthesis.cancel();
          setIsPlayingStory(false);
        }
      } else {
        alert("تأكد من دعم متصفحك لنطق الصوت التلقائي.");
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans" id="early-childhood-activities">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
        <div className="text-right space-y-1">
          <h3 className="text-lg font-extrabold text-[#0A2E5C]">الأنشطة والقصص الصوتية المسموعة ومؤقت الألعاب</h3>
          <p className="text-xs text-slate-500">أدوات ممتعة لتنظيم الروتين البيتي، تحويل الواجبات اليومية لألعاب ترفيهية، والاستماع لقصص سومرية شيقة.</p>
        </div>
        <span className="bg-amber-500/10 text-[#EF6C00] border border-amber-500/20 text-[10px] px-3 py-1 rounded-full font-black">
          ⏳ ألعاب روتينية وقصص الـ AI
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* RIGHT COLUMN: BEDTIME ARABIC STORIES */}
        <div className="space-y-4">
          <h4 className="text-sm font-black text-[#0A2E5C] border-r-4 border-[#EF6C00] pr-2.5">
            📚 صندوق القصص الرافدينية والتثقيفية للأطفال
          </h4>
          <p className="text-[11px] text-slate-500 font-bold leading-normal">
            اضغط لمطالعة القصة المفضلة، أو جرب الضغط على مكبّر الصوت ليقرأها المساعد الصوتي اللطيف لطفلك بصوته الهادئ قبل النوم.
          </p>

          <div className="grid gap-3">
            {BEDTIME_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right flex flex-col justify-between ${
                  selectedStory?.id === story.id
                    ? "border-sky-500 bg-sky-50/50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-sky-500/10 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                    موعظة القصة 🌟
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-800">{story.title}</span>
                    <span className="text-xl">{story.emoji}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold pt-2 border-t border-slate-100 mt-2">
                  {story.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Full Story View Pane */}
          {selectedStory && (
            <div className="p-5 border-2 border-dashed border-sky-300 rounded-[28px] bg-sky-50/20 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-sky-150">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleSpeakStory(selectedStory.fullStory)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer transition-colors ${
                      isPlayingStory ? "bg-red-500 text-white" : "bg-[#0A2E5C] text-white hover:bg-slate-850"
                    }`}
                  >
                    🔊 {isPlayingStory ? "إيقاف الصوت المؤقت" : "استمع للقصة كاملة 🎧"}
                  </button>
                  {onAskAI && (
                    <button
                      onClick={() => onAskAI(`أنشئ لي قصة تفاعلية ممتعة ومماثلة لـ (${selectedStory.title}) تناسب طفلاً بعمر ٤ سنوات مع دمج أسماء الحيوانات المحلية.`)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-[10px] font-black cursor-pointer transition-colors"
                    >
                      🎨 قصة جديدة بالـ AI
                    </button>
                  )}
                </div>
                <h5 className="font-black text-sm text-[#0A2E5C]">{selectedStory.title}</h5>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed font-semibold text-right" style={{ direction: "rtl" }}>
                {selectedStory.fullStory}
              </p>

              <div className="p-3 bg-white/80 border border-sky-100 rounded-xl text-[10px] font-black text-sky-800 text-center">
                🍀 <strong>العبرة التربوية:</strong> {selectedStory.moral}
              </div>
            </div>
          )}
        </div>

        {/* LEFT COLUMN: INTERACTIVE ROUTINE TIMER */}
        <div className="space-y-5 bg-slate-50 border border-slate-250 p-5 md:p-6 rounded-[28px]">
          <h4 className="text-sm font-black text-[#0A2E5C] flex items-center justify-end gap-1.5">
            <span>مؤقت الألعاب الروتينية البيتي السعيد</span>
            <span>⏳</span>
          </h4>
          <p className="text-[11px] text-slate-500 font-bold leading-normal text-right">
            حولوا الأنشطة الروتينية اليومية الصعبة (مثل محاربة تسوس الأسنان أو لم الوعاء) إلى ألعاب تنافسية سريعة. اختر نشاطاً وراقب المؤقت مع طفلك!
          </p>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(presets).map((key) => {
              const p = presets[key];
              const isSelected = timerPreset === key;
              return (
                <button
                  key={key}
                  onClick={() => handleApplyPreset(key)}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0A2E5C] text-white border-transparent"
                      : "bg-white text-slate-705 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-[10px] font-black block">{p.emoji} {p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Core Timer Interface Display */}
          <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl text-center space-y-4">
            <span className="text-xs font-black text-slate-400 block uppercase">
              {presets[timerPreset]?.label || "مؤقت روتيني"}
            </span>

            {/* Large ticking timer */}
            <div className="text-4xl md:text-5xl font-black text-[#0A2E5C] font-mono tracking-wider">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>

            <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-2 px-4">
              {presets[timerPreset]?.text}
            </p>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerLeft(timerDuration);
                }}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                title="إعادة ضبط"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-2 rounded-xl text-white text-xs font-black transition-all cursor-pointer shadow-md border-b-4 ${
                  isTimerRunning
                    ? "bg-amber-600 hover:bg-amber-700 border-amber-800"
                    : "bg-emerald-600 hover:bg-emerald-700 border-[#022c22]"
                }`}
              >
                {isTimerRunning ? "إيقاف مؤقت ⏸️" : "ابدأ اللعبة والعدّ الآن! ▶️"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-4 rounded-xl text-[10px] font-semibold text-slate-500 leading-normal">
            💡 <strong>تحفيز الوالدین:</strong> الألعاب الروتينية المقيتة تزيل التشنجات اللفظية بين الأهل ومواليدهم الصغار، وتصنع من طفلك طفلاً قيادياً يستشعر الوقت مبكراً بطريقة إيجابية.
          </div>
        </div>
      </div>
    </div>
  );
};
