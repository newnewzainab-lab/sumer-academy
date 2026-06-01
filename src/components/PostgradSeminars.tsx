import React, { useState } from "react";
import { Calendar, Clock, MapPin, Video, Users, Bell, BellOff, Sparkles, CheckSquare, ShieldCheck, Mail, ArrowUpRight, Search } from "lucide-react";

interface Seminar {
  id: string;
  topic: string;
  candidateName: string;
  degreeType: string; // "ماجستير" | "دكتوراه"
  uniName: string;
  collegeName: string;
  date: string;
  time: string;
  venue: string; // "قاعة الكندي" / "قاعة الفراهيدي" / "عبر الزووم"
  isVirtual: boolean;
  meetingLink?: string;
  registeredListeners: number;
}

const INITIAL_SEMINARS: Seminar[] = [
  {
    id: "sem-1",
    topic: "محاكاة وتحسين شبكات الجيل الخامس وعلاقتها بالأمن السيبراني العراقي",
    candidateName: "المهندس عمار رياض الجبوري",
    degreeType: "ماجستير (MSc)",
    uniName: "جامعة بغداد",
    collegeName: "كلية الهندسة الخوارزمية",
    date: "2026-06-03",
    time: "10:00 ص",
    venue: "قاعة الكندي - عمادة الكلية",
    isVirtual: false,
    registeredListeners: 14
  },
  {
    id: "sem-2",
    topic: "تعديل التعبير الجيني لإنتاج عقارات مناعية ضد الأمراض السارية",
    candidateName: "الباحثة صفا أحمد الخفاجي",
    degreeType: "دكتوراه (PhD)",
    uniName: "جامعة النهرين",
    collegeName: "معهد الهندسة الوراثية وتطبيقات الخلايا الجذعية",
    date: "2026-06-05",
    time: "11:30 ص",
    venue: "عبر منصة Zoom الرقمية",
    isVirtual: true,
    meetingLink: "https://zoom.us/j/postgrad-iraq-88981",
    registeredListeners: 42
  },
  {
    id: "sem-3",
    topic: "نظام هجين ذكي للتنبؤ بهطول الأمطار وتحسين الموارد المائية في نهري دجلة والفرات",
    candidateName: "الباحث ليث عبد الرزاق الحلي",
    degreeType: "ماجستير (MSc)",
    uniName: "جامعة الموصل",
    collegeName: "كلية الهندسة - قسم السدود والموارد المائية",
    date: "2026-06-08",
    time: "09:00 ص",
    venue: "قاعة الحدباء للدراسات الأكاديمية",
    isVirtual: false,
    registeredListeners: 19
  },
  {
    id: "sem-4",
    topic: "تحليل وتصميم بروتوكولات حوكمة الكترونية آمنة تعتمد على شبكات بلوكشين مقاومة للكم",
    candidateName: "المهندسة ريم طه الهاشمي",
    degreeType: "دكتوراه (PhD)",
    uniName: "جامعة بغداد",
    collegeName: "كلية العلوم لقسم الحاسوب",
    date: "2026-06-12",
    time: "10:00 ص",
    venue: "قاعة الفراهيدي للمؤتمرات العليا",
    isVirtual: false,
    registeredListeners: 23
  }
];

export const PostgradSeminars: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>(INITIAL_SEMINARS);
  const [reminders, setReminders] = useState<string[]>([]); // Seminar IDs
  const [joinedSeminars, setJoinedSeminars] = useState<string[]>([]); // Seminar IDs
  const [filterDegree, setFilterDegree] = useState<string>("all");
  const [filterSearch, setFilterSearch] = useState("");

  const handleToggleReminder = (id: string, topic: string) => {
    if (reminders.includes(id)) {
      setReminders(prev => prev.filter(item => item !== id));
    } else {
      setReminders(prev => [...prev, id]);
      // Show automated notification
    }
  };

  const handleJoinAsListener = (id: string) => {
    if (joinedSeminars.includes(id)) {
      setJoinedSeminars(prev => prev.filter(item => item !== id));
      setSeminars(prev => prev.map(sem => sem.id === id ? { ...sem, registeredListeners: sem.registeredListeners - 1 } : sem));
    } else {
      setJoinedSeminars(prev => [...prev, id]);
      setSeminars(prev => prev.map(sem => sem.id === id ? { ...sem, registeredListeners: sem.registeredListeners + 1 } : sem));
    }
  };

  const filteredSeminars = seminars.filter(sem => {
    const matchDegree = filterDegree === "all" || sem.degreeType.includes(filterDegree);
    const matchSearch = filterSearch === "" || 
      sem.topic.includes(filterSearch) || 
      sem.candidateName.includes(filterSearch) || 
      sem.uniName.includes(filterSearch);
    
    return matchDegree && matchSearch;
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans animate-fade-in" id="postgrad-seminars-schedule">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
            📅 التقويم والمحاضرات الجامعية المعتمدة
          </span>
          <h2 className="text-xl font-black text-[#0A2E5C]">
            جدول السمينارات ومناقشات أطاريح الدراسات العليا
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-bold">
            تابع مواعيد حلقات السمينار وتعديل العناوين ومناقشات الدكتوراه والماجستير القادمة في مختلف كليات العراق لعام 2026. احضر كمستمع للاستفادة وصياغة الأطر الرياضية الخاصة بك.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              // Simulated printable Excel schedule
              alert("تم تنزيل جدول السمينارات الموحد بصيغة PDF للطباعة بنجاح!");
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-black text-[11px] cursor-pointer transition-all border border-slate-200 whitespace-nowrap"
          >
            🖨 طباعة جدول اللجان الموحد
          </button>
        </div>
      </div>

      {/* Filter / Search Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-150">
        <div className="relative">
          <label className="text-[10px] font-black text-slate-600 block text-right mb-1">ابحث بالاسم أو موضوع الرسالة:</label>
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن باحث، تخصص، موضوع..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-800 outline-none pr-9 font-bold text-right shadow-sm"
            />
            <Search size={13} className="absolute right-3 top-3 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-600 block text-right mb-1">نوع المناقشة / درجة الأطروحة:</label>
          <select
            value={filterDegree}
            onChange={(e) => setFilterDegree(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 outline-none text-xs font-black text-slate-800 text-right appearance-none"
          >
            <option value="all">كل الدرجات العلمية 🎓</option>
            <option value="ماجستير">مناقشات الماجستير (MSc) 📚</option>
            <option value="دكتوراه">مناقشات الدكتوراه (PhD) 🔬</option>
          </select>
        </div>

        <div className="flex items-end justify-center">
          <div className="bg-[#0A2E5C]/5 border border-[#0A2E5C]/10 rounded-xl px-4 py-2 text-right w-full text-xs font-bold text-[#0A2E5C]">
            🎯 متاح المناقشات: {filteredSeminars.length} سمينار نشط
          </div>
        </div>
      </div>

      {/* Grid of Seminars Info cards */}
      <div className="grid sm:grid-cols-2 gap-6 pt-2">
        {filteredSeminars.map(sem => {
          const isReminded = reminders.includes(sem.id);
          const isJoined = joinedSeminars.includes(sem.id);
          return (
            <div
              key={sem.id}
              className={`bg-white border-2 rounded-3xl p-5 md:p-6 transition-all hover:shadow-md flex flex-col justify-between space-y-4 ${
                isJoined ? "border-emerald-500/55 bg-emerald-500/5" : "border-slate-100"
              }`}
            >
              <div className="space-y-3 text-right">
                {/* Meta details badge */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                    sem.degreeType.includes("PhD") || sem.degreeType.includes("دكتوراه")
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : "bg-indigo-100 text-indigo-700 border-indigo-200"
                  }`}>
                    {sem.degreeType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    🏛 {sem.uniName} - {sem.collegeName}
                  </span>
                </div>

                {/* Seminar Topic title */}
                <h3 className="font-extrabold text-slate-850 text-xs md:text-sm leading-relaxed">
                  "{sem.topic}"
                </h3>

                {/* Candidate name info */}
                <div className="flex items-center gap-1.5 justify-start text-[11px] font-bold text-slate-500">
                  <Users size={12} className="text-slate-400" />
                  <span>طالب البحث:</span>
                  <span className="text-[#EF6C00] font-black">{sem.candidateName}</span>
                </div>

                {/* Grid details (Date, Time, Location) */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-black text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                  <div className="space-y-0.5">
                    <span className="text-gray-400 block text-[9px]">📅 تاريخ الفعالية:</span>
                    <span className="flex items-center gap-1 justify-start">
                      <Calendar size={12} className="text-indigo-650" /> {sem.date}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-gray-400 block text-[9px]">⏰ توقيت البدء:</span>
                    <span className="flex items-center gap-1 justify-start">
                      <Clock size={12} className="text-indigo-650" /> {sem.time}
                    </span>
                  </div>
                  <div className="col-span-2 space-y-0.5 border-t border-slate-200/55 pt-1.5 mt-1.5">
                    <span className="text-gray-400 block text-[9px]">📍 موقع الانعقاد واللجان:</span>
                    <span className="flex items-center gap-1 justify-start font-bold">
                      {sem.isVirtual ? (
                        <>
                          <Video size={12} className="text-rose-500" />
                          <span className="text-rose-600">رابط Zoom المناقشة الرقمي</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={12} className="text-indigo-650" />
                          <span>{sem.venue}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom actions row */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {/* Registered counter */}
                <span className="text-[10px] text-slate-400 font-bold">
                  🤝 {sem.registeredListeners} مستمع حاضر مسجل
                </span>

                <div className="flex gap-1.5 w-full sm:w-auto">
                  {/* Virtual join if virtual */}
                  {sem.isVirtual && sem.meetingLink && (
                    <a
                      href={sem.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-lg transition-all text-[10px] flex items-center gap-1"
                    >
                      <span>دخول زووم</span> <ArrowUpRight size={10} />
                    </a>
                  )}

                  {/* Toggle listener simulation button */}
                  <button
                    onClick={() => handleJoinAsListener(sem.id)}
                    className={`px-3.5 py-2 font-black rounded-lg transition-all text-[10px] cursor-pointer flex items-center gap-1 ${
                      isJoined
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {isJoined ? "مسجل مستمعاً ✓" : "الحضور كمستمع"}
                  </button>

                  {/* Toggle Reminder button */}
                  <button
                    onClick={() => handleToggleReminder(sem.id, sem.topic)}
                    className={`p-2 rounded-lg cursor-pointer transition-all border ${
                      isReminded
                        ? "bg-amber-100 text-amber-700 border-amber-300"
                        : "bg-white text-slate-400 hover:text-slate-650 border-slate-200"
                    }`}
                    title={isReminded ? "الغاء التنبيه" : "تفعيل التنبيه المسبق"}
                  >
                    {isReminded ? <BellOff size={14} /> : <Bell size={14} />}
                  </button>
                </div>
              </div>

              {/* Reminder feedback alert within container */}
              {isReminded && (
                <p className="text-[9px] text-amber-700 bg-amber-500/5 p-1.5 rounded-lg text-center font-bold flex items-center justify-center gap-1">
                  <Sparkles size={10} className="animate-spin" />
                  <span>تم التفعيل! سنرسل لك إشعاراً لبريدك الجامعي قبل المناقشة بـ 24 ساعة.</span>
                </p>
              )}
            </div>
          );
        })}

        {filteredSeminars.length === 0 && (
          <p className="text-xs text-slate-400 py-12 text-center col-span-full">عتباً، لا توجد سمينارات تناسب مرشحات الفلترة الحالية بقاعدة البيانات الموقوتة.</p>
        )}
      </div>

      {/* Advisory Note */}
      <div className="bg-blue-500/5 border border-blue-550/10 p-4 rounded-2xl flex items-start gap-2.5 mt-2">
        <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">
          تعتبر هذه الجداول المحدثة رسمية ومطابقة لما يتم رفعه من قبل عمادات الدراسات العليا ومجالس الكليات في الجامعات العراقية للربع الأكاديمي الحاضر. يُنصح طلبة الماجستير والدكتوراه الجدد والباحثين بحضور هذه السمينارات لغرض الملاحظة العلمية وأخذ الموافقات المعيارية.
        </p>
      </div>
    </div>
  );
};
