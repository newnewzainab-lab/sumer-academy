import React, { useState } from "react";
import { Clock, CheckSquare, Sparkles, AlertCircle, Calendar, ShieldAlert } from "lucide-react";

export const AITimeSchedule: React.FC = () => {
  const [examDate, setExamDate] = useState("بعد 4 أسابيع");
  const [dailyHours, setDailyHours] = useState(4);
  const [focusStyle, setFocusStyle] = useState("pomodoro"); // pomodoro or continuous
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "الرياضيات المتقدمة والهندسة",
    "التربية الإسلامية والمطالعة",
    "تصميم مواقع الويب والبرمجة",
  ]);
  const [customSubject, setCustomSubject] = useState("");
  const [scheduleTable, setScheduleTable] = useState<any[] | null>(null);

  const predefinedSubjects = [
    "الرياضيات المتقدمة والهندسة",
    "التربية الإسلامية والمطالعة",
    "تصميم مواقع الويب والبرمجة",
    "كيمياء الصف السادس علمي",
    "أحياء البكالوريا التخصصية",
    "ميكانيكا السوائل وآلات الشد",
    "القانون الدستوري العراقي",
  ];

  const handleToggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleAddCustomSubject = () => {
    if (customSubject.trim() && !selectedSubjects.includes(customSubject.trim())) {
      setSelectedSubjects([...selectedSubjects, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  const generateSchedule = () => {
    if (selectedSubjects.length === 0) return;

    // Build mock custom calendar table based on options
    const targetBlockDescription =
      focusStyle === "pomodoro"
        ? "جلسات بومودورو 25 دقيقة مذاكرة تركيز + 5 دقائق استراحة كفاح"
        : "فواصل دراسة مستمرة مدتها 50 دقيقة تركيز فائق + 10 دقائق نقاهة";

    const baseSchedule = [
      {
        day: "السبت",
        focus: selectedSubjects[0 % selectedSubjects.length],
        hours: `${dailyHours} ساعات دراسية`,
        timePattern: "من 9:00 صباحاً - 1:00 ظهراً",
        tip: "ابدأ بأصعب المسائل الرياضية أولاً لتوافر الطاقة الذهنية.",
      },
      {
        day: "الأحد",
        focus: selectedSubjects[1 % selectedSubjects.length],
        hours: `${dailyHours} ساعات دراسية`,
        timePattern: "من 10:00 صباحاً - 2:00 ظهراً",
        tip: "سجل ملخصاتك الصوتية واستمع لها في فترات الراحة.",
      },
      {
        day: "الإثنين",
        focus: selectedSubjects[2 % selectedSubjects.length] || selectedSubjects[0],
        hours: `${dailyHours} ساعات دراسية`,
        timePattern: "من 4:00 عصراً - 8:00 مساءً",
        tip: "حل مسائل نموذج بكالوريا وزاري سابق لقياس مستواك.",
      },
      {
        day: "الثلاثاء",
        focus: "جلسة مراجعة متكاملة متقاطعة",
        hours: "ساعتان دراسيتان",
        timePattern: "من 7:00 مساءً - 9:00 مساءً",
        tip: "توقف عن الحفظ الجديد وراجع الخرائط الذهنية فقط.",
      },
      {
        day: "الأربعاء",
        focus: selectedSubjects[3 % selectedSubjects.length] || selectedSubjects[0],
        hours: `${dailyHours} ساعات دراسية`,
        timePattern: "من 9:00 صباحاً - 1:00 ظهراً",
        tip: "تأكد من شرب السوائل الكافية وفحص فجوتك المهنية.",
      },
      {
        day: "الخميس",
        focus: "تنظيم ومذاكرة حرة ومحاكاة اللعبة",
        hours: "ساعة واحدة مخصصة",
        timePattern: "اختياري مرن",
        tip: "العب التحديات التنافسية في قسم الألعاب مع زملائك في الأكاديمية.",
      },
      {
        day: "الجمعة",
        focus: "استراحة كافية وإغلاق المنهج",
        hours: "0 ساعة (نقاهة تامة للتركيز)",
        timePattern: "كل اليوم",
        tip: "النوم الجيد وراحة الدماغ هي أهم ركن لتثبيت الذاكرة العشوائية.",
      },
    ];

    setScheduleTable(baseSchedule);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80 text-right">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sumer-blue/10 text-sumer-blue rounded-xl flex items-center justify-center">
          <Clock size={22} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
            الإدارة الذكية للوقت وازدواجية الجداول الدراسية
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            مساعد محاربة التشتت وبناء منسق زمني مرن يتكيف تلقائياً مع وتيرة تحصيل الطالب ومواعيد امتحانات البكالوريا
          </p>
        </div>
      </div>

      {!scheduleTable ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Limit Input 1 */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-sumer-ink">موعد الامتحان النهائي المخطط له:</label>
              <select
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="بعد أسبوعين">بعد أسبوعين (وضع طوارئ مكثف)</option>
                <option value="بعد 4 أسابيع">بعد 4 أسابيع (متوسط المذاكرة)</option>
                <option value="بعد شهرين">بعد شهرين (تأسيس هادئ)</option>
                <option value="بعد 6 أشهر">بعد 6 أشهر (تطوير كفاءة مستدامة)</option>
              </select>
            </div>

            {/* Limit Input 2 */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-sumer-ink">
                ساعات الدراسة الممكن تخصيصها يومياً ({dailyHours} ساعات):
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value) || 4)}
                className="w-full accent-sumer-blue h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-bold font-mono">
                <span>2 ساعة</span>
                <span>6 ساعات</span>
                <span>10 ساعات وظيفية</span>
              </div>
            </div>
          </div>

          {/* Concentration style select checkbox */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-sumer-ink font-sans">أسلوب ونظام الفاصل الزمني المفضل للراحة:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFocusStyle("pomodoro")}
                className={`p-4 rounded-xl border-2 text-right transition-colors cursor-pointer ${
                  focusStyle === "pomodoro"
                    ? "bg-sumer-gold/5 border-sumer-gold text-sumer-gold font-bold"
                    : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                <h5 className="font-bold text-xs">🍅 تقسيم البومودورو (Pomodoro)</h5>
                <p className="text-[10px] opacity-90 mt-1">25 دقيقة تركيز قاسي متبوعة بريست 5 دقائق لتلافي التشتت</p>
              </button>

              <button
                onClick={() => setFocusStyle("continuous")}
                className={`p-4 rounded-xl border-2 text-right transition-colors cursor-pointer ${
                  focusStyle === "continuous"
                    ? "bg-sumer-blue/5 border-sumer-blue text-sumer-blue font-bold"
                    : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                <h5 className="font-bold text-xs">🧱 الحصص المتصلة المستقرة</h5>
                <p className="text-[10px] opacity-90 mt-1">50 دقيقة تركيز مهني متصل مع 10 دقائق نقاهة للأبحاث والعصف الذهني</p>
              </button>
            </div>
          </div>

          {/* Subjects selection checklist */}
          <div className="space-y-3 pb-2">
            <label className="block text-sm font-bold text-sumer-ink">اختر المواد الهامة التي ترغب بإدراجها بالجدول:</label>
            <div className="flex flex-wrap gap-2">
              {predefinedSubjects.map((sub, i) => {
                const isChecked = selectedSubjects.includes(sub);
                return (
                  <button
                    key={i}
                    onClick={() => handleToggleSubject(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer ${
                      isChecked
                        ? "bg-sumer-blue/10 border-sumer-blue text-sumer-blue"
                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {isChecked ? "✓ " : "+ "} {sub}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={generateSchedule}
            className="w-full py-4 bg-sumer-blue text-white rounded-xl font-bold text-base hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
          >
            <Sparkles size={18} /> توليد الجدول الزمني المخصص والمؤتمت بالذكاء الاصطناعي
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Calendar Table Output Wrapper */}
          <div className="bg-sumer-blue p-5 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-sumer-gold uppercase tracking-wider font-bold">جدول دراسة الكفاءة المقررة</span>
              <h4 className="text-base font-bold text-sumer-gold">
                أهدافك: {selectedSubjects.length} تخصصات مضافة للتكرار المتباعد
              </h4>
              <p className="text-xs text-blue-100 mt-1">
                النمط المستخدم:{" "}
                {focusStyle === "pomodoro"
                  ? "ساعة بومودورو بومودورو متباعدة لـ 25/5"
                  : "جلسات 50-10 لضخ الحصص المتصلة"}
              </p>
            </div>
            <button
              onClick={() => setScheduleTable(null)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-bold hover:bg-white/20 transition-all cursor-pointer border border-white/10"
            >
              🔄 تعديل خيارات التوقيت
            </button>
          </div>

          {/* Responsive Calendar grid list representing a beautiful weekly plan */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {scheduleTable.map((dayItem, idx) => (
              <div key={idx} className="grid grid-cols-12 md:grid-cols-12 gap-2 p-4 items-center bg-white hover:bg-gray-50 transition-colors">
                {/* Time zone Badge */}
                <div className="col-span-12 md:col-span-2 text-right">
                  <span className="inline-block px-3 py-1 bg-sumer-blue text-white font-bold text-xs rounded-lg select-none">
                    {dayItem.day}
                  </span>
                </div>

                {/* Main subject study focus */}
                <div className="col-span-12 md:col-span-4 text-right">
                  <h5 className="font-bold text-xs text-sumer-ink mb-0.5">{dayItem.focus}</h5>
                  <span className="text-[10px] text-gray-400 font-bold block">{dayItem.timePattern}</span>
                </div>

                {/* Specific timeframe stats */}
                <span className="col-span-6 md:col-span-2 text-right text-xs text-sumer-gold font-bold">
                  ⌛ {dayItem.hours}
                </span>

                {/* Smart contextual study advice */}
                <p className="col-span-12 md:col-span-4 text-right text-xs text-gray-500 italic leading-relaxed border-t md:border-t-0 border-gray-100 pt-2 md:pt-0">
                  ⚡ {dayItem.tip}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/50 flex items-start gap-3 text-right">
            <ShieldAlert size={18} className="text-sumer-gold shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold text-sumer-blue block mb-0.5">💡 إرشاد الحماية ومكافحة التشتت:</span>
              ينسق النظام إرسال إشعارات قصيرة عبر المتصفح لتذكيرك حين تقترب لحظة البدء بوقفة التركيز، مع حجب المشتتات الصوتية تلقائياً. التزم بهذه الاستراحة وستشهد تضاعف منسوب تذكرك.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
