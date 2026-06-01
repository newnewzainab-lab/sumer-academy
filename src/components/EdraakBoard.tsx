import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Calendar,
  MapPin,
  Play,
  Sparkles,
  Users,
  Briefcase,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Award,
  BookOpenCheck,
  Flame,
  Globe,
  Plus
} from "lucide-react";

export const EdraakBoard: React.FC = () => {
  // States of the chessboard & AI game generator
  const [subjectQuery, setSubjectQuery] = useState("الأدب العربي القديم وملاحم العراق");
  const [isGenerating, setIsGenerating] = useState(false);
  const [boardGame, setBoardGame] = useState<any>({
    title: "مبارزة العباقرة: تاريخ دجلة والفرات",
    activeCard: 0,
    cards: [
      { front: "ما هي أقدم ملحمة أدبية مسجلة في التاريخ البشري؟", back: "ملحمة جلجامش السومرية، التي كُتبت بالخط المسماري على ألواح الطين بحدود عام 2100 قبل الميلاد." },
      { front: "من هو واضع أول نظام تشريعي قانوني في بلاد الرافدين؟", back: "الملك حمورابي البابلي من خلال مسلته الشهيرة المؤلفة من 282 قانوناً وقاعدة." },
      { front: "ما الميزة العمرانية البارزة لنظام الري في نينوى الآشورية؟", back: "قناة جروان المائية الأثرية، أول جسر معبر مائي فوق الأرض شيده سنحاريب لتوجيه شريان نهر الكوثر." }
    ],
    quiz: [
      {
        question: "أي ملك آشوري اشتهر بتأسيس أول مكتبة ملكية منظمة في التاريخ ونقله المخطوطات؟",
        options: ["آشوربانيبال", "سرجون الأكدي", "حمورابي", "نبوخذ نصر"],
        answerIndex: 0,
        explanation: "مكتبة آشوربانيبال في نينوى ضمت آلاف الألواح الطينية التي حوت ملحمة جلجامش."
      },
      {
        question: "أين تقع مدرسة المستنصرية الأثرية الشهيرة التي تدرس العلوم الطب والفلك؟",
        options: ["بغداد", "الموصل", "البصرة", "بابل"],
        answerIndex: 0,
        explanation: "تعتبر المستنصرية في بغداد من أقدم الجامعات في العالم الإسلامي والعالم أجمع."
      }
    ]
  });

  const [solvedAnswers, setSolvedAnswers] = useState<Record<number, number>>({});
  const [userScore, setUserScore] = useState(0);
  const [gameResultVisible, setGameResultVisible] = useState(false);
  const [revealCardBack, setRevealCardBack] = useState(false);

  // States for dynamic chess simulation on the board
  const [selectedChessSquare, setSelectedChessSquare] = useState<[number, number] | null>([3, 4]);
  const [chessMoves, setChessMoves] = useState<[number, number][]>([[1, 2], [5, 4], [2, 3], [4, 5], [6, 2]]);

  // Selected date on custom interactive Iraqi Events calendar
  const [selectedDate, setSelectedDate] = useState<number>(25);
  const calendarEvents: Record<number, { title: string; location: string; type: string }> = {
    5: { title: "ندوة تقنيات التبريد والتكييف الذكي", location: "نقابة المدربين العراقيين", type: "أكاديمي" },
    12: { title: "ورشة نقابة المدربين: كفاءة التدريب الرقمي", location: "نقابة المدربين العراقيين", type: "مهني" },
    16: { title: "موعد فحص البكالوريا التجريبي للذكاء الصنعي", location: "المركز الوطني للابتكار", type: "شامل" },
    25: { title: "إطلاق مسار إدراك وسومر للقرن 21", location: "المقر التكاملي الرقمي", type: "عام" },
    28: { title: "تسليم شهادات الاعتماد المهني الدولي للطلبة", location: "نقابة المدربين العراقيين - قاعة الرافدين", type: "تتويج" }
  };

  // Simulated reels database (integrated from Sumer Reels styled perfectly as the mockup)
  const dashboardReels = [
    { id: "dr1", title: "ميكانيك السوائل والأنابيب", tag: "ميكانيك", playsAr: "Learn Python in 60s" },
    { id: "dr2", title: "دورة الخوارزميات وصياغة البرمجة", tag: "حاسوب", playsAr: "Historical Trivia" },
    { id: "dr3", title: "بناء قواعد البيانات والمعالجات", tag: "تقنية", playsAr: "Sumerian Engineering" },
    { id: "dr4", title: "قوانين مسلة حمورابي القانونية", tag: "تاريخ", playsAr: "Hamurabi Code 101" }
  ];
  const [playingReel, setPlayingReel] = useState<string>("dr1");

  // Classified notes / whiteboard free notes states
  const [boardNotes, setBoardNotes] = useState<Array<{ id: number; text: string; color: "gold" | "blue" | "indigo" | "emerald"; tag: string }>>([
    { id: 1, text: "دراسة صمامات محرك السيارة رباعي الأشواط وسرعة الري", color: "gold", tag: "ميكانيك" },
    { id: 2, text: "تتبع ركن التراضي في صياغة العقد المدني العراقي", color: "blue", tag: "قانون" },
    { id: 3, text: "فهم بنية بروتوكولات حزم التشفير بالذكاء الاصطناعي", color: "indigo", tag: "برمجيات" },
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteColor, setNewNoteColor] = useState<"gold" | "blue" | "indigo" | "emerald">("gold");
  const [newNoteTag, setNewNoteTag] = useState("ميكانيك");
  const [selectedNoteForAi, setSelectedNoteForAi] = useState<number | null>(null);
  const [aiNoteRoadmap, setAiNoteRoadmap] = useState<string | null>(null);
  const [isAiLoadingNote, setIsAiLoadingNote] = useState(false);

  const handleExportNoteToAi = async (noteId: number, text: string) => {
    setIsAiLoadingNote(true);
    setSelectedNoteForAi(noteId);
    setAiNoteRoadmap(null);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `بصفتك مستشار أكاديمي في أكاديمية سومر، لقد دونت هذه الفكرة السريعة في مسودتي: "${text}". قم بتصدير وترجمة هذه الفكرة إلى خطة عمل دراسية قصيرة وعملية من 3 خطوات مبسطة للبدء فوراً باللغة العربية.`
            }
          ]
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        setAiNoteRoadmap(data.content);
      } else {
        setAiNoteRoadmap("تعذر محاذاة الفكرة بالذكاء الاصطناعي حالياً.");
      }
    } catch (e) {
      console.error(e);
      setAiNoteRoadmap("حدث خطأ في الاتصال بالسيرفر لتصدير فكرتك.");
    } finally {
      setIsAiLoadingNote(false);
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    setBoardNotes([
      ...boardNotes,
      {
        id: Date.now(),
        text: newNoteText.trim(),
        color: newNoteColor,
        tag: newNoteTag,
      },
    ]);
    setNewNoteText("");
  };

  const handleDeleteNote = (id: number) => {
    setBoardNotes(boardNotes.filter((n) => n.id !== id));
    if (selectedNoteForAi === id) {
      setSelectedNoteForAi(null);
      setAiNoteRoadmap(null);
    }
  };

  // Call the server to generate a real game
  const handleGenerateGame = async () => {
    setIsGenerating(true);
    setSolvedAnswers({});
    setUserScore(0);
    setGameResultVisible(false);
    setRevealCardBack(false);

    try {
      const resp = await fetch("/api/ai-gamify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: subjectQuery })
      });
      if (resp.ok) {
        const data = await resp.json();
        setBoardGame({
          title: data.gameTitle || `لعبة ذكاء: ${subjectQuery}`,
          activeCard: 0,
          cards: data.flashcards || [
            { front: `أهم فكرة في ${subjectQuery}`, back: "الإجابة التوليدية المفصلة" }
          ],
          quiz: data.quiz || []
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const answerQuizItem = (qIdx: number, optIdx: number) => {
    if (solvedAnswers[qIdx] !== undefined) return;
    setSolvedAnswers({ ...solvedAnswers, [qIdx]: optIdx });
    if (optIdx === boardGame.quiz[qIdx].answerIndex) {
      setUserScore((s) => s + 1);
    }
    if (Object.keys(solvedAnswers).length + 1 === boardGame.quiz.length) {
      setGameResultVisible(true);
    }
  };

  // Chessboard Pieces representation grid
  const renderChessGrid = () => {
    const grid: React.ReactNode[] = [];
    const simulatedPieces: Record<string, string> = {
      "0-0": "♜", "0-1": "♞", "0-2": "♝", "0-3": "♛", "0-4": "♚", "0-5": "♝", "0-6": "♞", "0-7": "♜",
      "1-0": "♟", "1-1": "♟", "1-2": "♟", "1-3": "♟", "1-4": "♟", "1-5": "♟", "1-6": "♟", "1-7": "♟",
      "7-0": "♖", "7-1": "♘", "7-2": "♗", "7-3": "♕", "7-4": "♔", "7-5": "♗", "7-6": "♘", "7-7": "♖",
      "6-0": "♙", "6-1": "♙", "6-2": "♙", "6-3": "♙", "6-4": "♙", "6-5": "♙", "6-6": "♙", "6-7": "♙",
      "3-4": "♞", "4-5": "♙"
    };

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isDark = (r + c) % 2 === 1;
        const key = `${r}-${c}`;
        const piece = simulatedPieces[key] || "";
        const isSelected = selectedChessSquare?.[0] === r && selectedChessSquare?.[1] === c;
        const isMoveOption = chessMoves.some(([mr, mc]) => mr === r && mc === c);

        grid.push(
          <div
            key={key}
            onClick={() => {
              setSelectedChessSquare([r, c]);
              // Generate dynamic random moves indicators
              const options: [number, number][] = [];
              for (let i = 0; i < 5; i++) {
                options.push([Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]);
              }
              setChessMoves(options);
            }}
            className={`aspect-square flex items-center justify-center text-lg md:text-2xl font-bold cursor-pointer transition-colors relative ${
              isDark ? "bg-[#0A2E5C]/10" : "bg-[#EF6C00]/5"
            } ${isSelected ? "ring-2 ring-amber-500 bg-amber-500/10" : ""} ${
              isMoveOption ? "after:content-[''] after:w-2.5 after:h-2.5 after:bg-emerald-500 after:rounded-full after:absolute" : ""
            } hover:bg-[#EF6C00]/15`}
          >
            <span className={`${piece.charCodeAt(0) > 9817 ? "text-[#EF6C00]" : "text-[#0A2E5C]"}`}>
              {piece}
            </span>
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="bg-white text-slate-800 p-4 md:p-8 rounded-[40px] shadow-xl border border-slate-200 text-right font-sans relative overflow-hidden">
      {/* Background Star Light and Abstract Gears */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A2E5C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EF6C00]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Dynamic 7 Stars Header + Sumer/Edraak Brand Banner matching Image 3 & 4 */}
      <div className="flex flex-col items-center justify-center text-center py-6 mb-8 relative border-b border-slate-200">
        {/* Crown of 7 Glowing Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <Sparkles
              key={s}
              size={18}
              className={`${
                s === 4 ? "text-amber-500 w-6 h-6 animate-pulse" : "text-amber-500/80 animate-bounce"
              }`}
              style={{ animationDelay: `${s * 0.1}s` }}
            />
          ))}
        </div>

        {/* Cuneiform tablet / brain-circuit logo representative */}
        <div className="w-20 h-20 mb-3 bg-[#0A2E5C] p-2 rounded-2xl border border-amber-500/20 flex items-center justify-center shadow-lg relative">
          <svg className="w-12 h-12 text-amber-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 8h16v48H12z" strokeLinejoin="round" />
            <path d="M52 8H36v48h16z" strokeLinejoin="round" />
            <path d="M22 16h-4M22 24h-4M22 32h-4M22 40h-4M22 48h-4" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
            <circle cx="16" cy="24" r="1.5" fill="currentColor" />
            <circle cx="16" cy="32" r="1.5" fill="currentColor" />
            <circle cx="16" cy="40" r="1.5" fill="currentColor" />
            <circle cx="16" cy="48" r="1.5" fill="currentColor" />
            <path d="M36 20h8l4 4M36 32h6l4-4M36 44h10l2-4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="48" cy="24" r="2.5" fill="currentColor" />
            <circle cx="46" cy="28" r="2.5" fill="currentColor" />
            <circle cx="48" cy="40" r="2.5" fill="currentColor" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-[#0A2E5C] font-display">
          أكاديمية سومر المدمجة | SUMER ACADEMY
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-2 font-semibold tracking-wide flex items-center gap-2">
          <span>بوابة تفاعلية بالشراكة مع منهاج إدراك الوطني لتمكين الكفاءات</span> • <span>وزارة التعليم العالي</span>
        </p>
      </div>

      {/* Main Dual Grid Dashboard Section */}
      <div className="grid lg:grid-cols-4 gap-6 items-start">
        
        {/* Right side Sidebar Panel: Personal Welcome, Calendar & Mosul Location (1 Column) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Welcome User Profile block */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-center space-y-4">
            <span className="text-[10px] bg-amber-500/10 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-500/20 block w-max mx-auto">
              بوابة إدراك للتعلم الحر
            </span>
            {/* Simulated 3D profile avatar */}
            <div className="w-20 h-20 bg-gradient-to-tr from-[#0A2E5C] to-[#EF6C00] rounded-full mx-auto border-2 border-amber-400 p-1 shadow-lg relative">
              <div className="w-full h-full rounded-full bg-[#0A2E5C] flex items-center justify-center font-bold text-2xl text-white">
                JF
              </div>
              <div className="absolute bottom-0 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center" title="المتدرب متصل" />
            </div>
            
            <div>
              <h4 className="font-extrabold text-[#0A2E5C] text-base">جعفر المياحي</h4>
              <p className="text-[11px] text-slate-500 font-mono">@sumeracademy.iq</p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500 font-bold">
              <span>الفئة: سادس علمي / مهني</span>
              <span>المستوى: متقدم</span>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-xl text-xs text-right text-slate-600">
              <p className="font-bold text-[#EF6C00] mb-0.5">الرصيد المعرفي:</p>
              <span className="font-semibold">⭐ 350 نقطة كفاءة معتمدة</span>
            </div>
          </div>

          {/* Upcoming Events Calendar Widget (Image 3) */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#EF6C00] font-bold">الرزنامة الذكية</span>
              <h5 className="font-bold text-xs text-slate-700 flex items-center gap-1">
                <Calendar size={14} className="text-[#EF6C00]" /> الأحداث القادمة
              </h5>
            </div>

            {/* Custom Interactive Calendar Grid for May 2026 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-1 mb-2">
                <span>أح</span><span>ثن</span><span>ثل</span><span>أر</span><span>خم</span><span>جم</span><span>سب</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-mono">
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = calendarEvents[day];
                  const isSelected = selectedDate === day;

                  return (
                    <button
                      key={i}
                      onClick={() => day in calendarEvents && setSelectedDate(day)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#EF6C00] text-white font-extrabold shadow-sm"
                          : hasEvent
                          ? "bg-[#0A2E5C]/10 text-[#0A2E5C] font-bold ring-1 ring-[#0A2E5C]/20"
                          : "text-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Event Details Panel */}
            {calendarEvents[selectedDate] && (
              <div className="bg-white p-3 rounded-xl border-r-2 border-[#EF6C00] shadow-sm text-xs text-right space-y-1">
                <p className="font-bold text-[#0A2E5C]">{calendarEvents[selectedDate].title}</p>
                <p className="text-slate-500 text-[10px]">{calendarEvents[selectedDate].location}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="bg-slate-100 text-slate-600 text-[9px] px-1.5 py-0.5 rounded font-bold">
                    {calendarEvents[selectedDate].type}
                  </span>
                  <span className="text-[9px] text-[#EF6C00] font-bold block">الأيام الملونة بها مواعيد</span>
                </div>
              </div>
            )}
          </div>

          {/* Regional Map Pinpoint section: Mosul, Iraq (Image 3) */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-bold">• نشط في كافة المحافظات</span>
              <h5 className="font-bold text-xs text-slate-700 flex items-center gap-1">
                <MapPin size={14} className="text-emerald-500" /> مخطط موقع العراق
              </h5>
            </div>

            <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
              {/* Simulated Map Graphic with real pins */}
              <div className="absolute inset-0 opacity-45 flex flex-col justify-between p-2 text-[9px] font-mono text-slate-400 select-none">
                <div className="flex justify-between"><span>33.31° N</span><span>44.36° E</span></div>
                {/* Simulated streets and river lines */}
                <div className="w-full h-1/2 border-b border-sky-200/40 relative">
                  <div className="absolute top-1/3 left-0 w-full h-4 bg-sky-200/20 transform -rotate-12 blur-sm" />
                </div>
                <div className="flex justify-between"><span>Sumer Map v2</span><span>Iraq Grid</span></div>
              </div>

              {/* Glowing MAP PINPOINT for Mosul, Iraq */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  <MapPin size={22} className="text-red-500 filter drop-shadow absolute -top-4 -left-1" />
                </div>
                <span className="bg-[#0A2E5C] text-white text-[10px] px-2 py-0.5 rounded-md border border-slate-700/80 mt-1 font-bold whitespace-nowrap shadow-md">
                  Iraq
                </span>
              </div>

              {/* Coordinates Indicator */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 px-2 py-1 rounded border border-slate-200 text-[9px] text-slate-500 font-mono text-center shadow-sm">
                نقابة المدربين العراقيين • مقر العراق تكنولوجيا ونماء
              </div>
            </div>
          </div>
        </div>

        {/* Center Canvas: Chess Game Generator (2 Columns) & Educational Reels (1 Column) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Chess Game Generator Widget (Image 3) */}
          <div className="bg-slate-50 p-5 md:p-6 rounded-[34px] border border-slate-200 space-y-5 relative shadow-sm">
            
            <div className="absolute top-4 left-4 bg-[#EF6C00]/10 text-[#EF6C00] border border-[#EF6C00]/20 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={11} className="animate-spin" /> نظام تخليق الألعاب الذكية
            </div>

            <div className="text-right">
              <h3 className="text-lg md:text-xl font-extrabold text-[#0A2E5C]">توليد الألعاب التعليمية (AI Game Builder)</h3>
              <p className="text-xs text-slate-500 mt-1">
                حوّل الملازم والمواضيع الصعبة فوراً إلى رقعة مسابقات تفاعلية وبطولة استرجاع ثنائية كألعاب إدراك!
              </p>
            </div>

            {/* Subject Entry Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-slate-700 text-right">أدخل موضوع الدراسة أو الهندسة المراد تحويله للعبة:</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={subjectQuery}
                  onChange={(e) => setSubjectQuery(e.target.value)}
                  placeholder="مثال: الأدب العربي القديم، ميكانيك المحركات، أشباه الموصلات..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#EF6C00] transition-colors text-right"
                />
                <button
                  onClick={handleGenerateGame}
                  disabled={isGenerating}
                  className="bg-[#EF6C00] hover:bg-[#D84315] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  {isGenerating ? "جاري التخليق..." : "توليد اللعبة"}
                </button>
              </div>
            </div>

            {/* Split layout: Chess Board graphic on left, Generated Game Questions on Right */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Chess Board Grid Visual simulation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-500">لوحة الموصل المفتوحة</span>
                  <span className="text-[#EF6C00] font-bold">بوابة النقل الذكية</span>
                </div>
                
                {/* Chess board render */}
                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 grid grid-cols-8 shadow-inner p-1 gap-0.5">
                  {renderChessGrid()}
                </div>
                <div className="text-[10px] text-slate-500 text-center font-bold">
                  * اضغط على المربعات لتحديد مسار النقل واكتشاف فخاخ الأسئلة!
                </div>
              </div>

              {/* Game Questions & Flashcards Area */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">بطاقات ذكية</span>
                    <h4 className="font-extrabold text-xs text-[#0A2E5C] line-clamp-1">{boardGame.title}</h4>
                  </div>

                  {/* FLASHCARD SECTION */}
                  <div className="space-y-2 mb-4">
                    <div
                      onClick={() => setRevealCardBack(!revealCardBack)}
                      className={`p-3.5 rounded-2xl cursor-pointer text-center border transition-all relative ${
                        revealCardBack
                          ? "bg-amber-500/10 border-amber-500 text-amber-900 font-medium"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="text-[8px] text-[#EF6C00] font-black block mb-1">
                        بطاقة {boardGame.activeCard + 1} • اضغط للقلب
                      </span>
                      <p className="text-xs font-semibold leading-relaxed">
                        {revealCardBack
                          ? boardGame.cards[boardGame.activeCard].back
                          : boardGame.cards[boardGame.activeCard].front}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setRevealCardBack(false);
                          setBoardGame((v: any) => ({
                            ...v,
                            activeCard: (v.activeCard + 1) % v.cards.length
                          }));
                        }}
                        className="text-[9px] bg-slate-100 hover:bg-slate-200 text-slate-755 font-bold px-3 py-1 rounded"
                      >
                        البطاقة التالية
                      </button>
                    </div>
                  </div>

                  {/* MINI QUIZ INTEGRATED IN GAME */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] text-slate-500 font-bold block text-right">أسئلة الرقعة التنافسية:</span>
                    
                    {boardGame.quiz.map((q: any, qIdx: number) => {
                      const selectedOpt = solvedAnswers[qIdx];
                      return (
                        <div key={qIdx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-2">
                          <p className="text-xs font-bold text-slate-800 leading-snug">{q.question}</p>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                            {q.options.map((opt: string, optIdx: number) => {
                              const isCorrect = optIdx === q.answerIndex;
                              const isSelected = selectedOpt === optIdx;
                              let btnStyle = "bg-white text-slate-700 border-slate-200";

                              if (selectedOpt !== undefined) {
                                if (isCorrect) {
                                  btnStyle = "bg-green-100 text-green-700 border-green-300 font-bold";
                                } else if (isSelected) {
                                  btnStyle = "bg-red-100 text-red-700 border-red-300";
                                } else {
                                  btnStyle = "bg-white text-slate-350 border-slate-100 opacity-40 pointer-events-none";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => answerQuizItem(qIdx, optIdx)}
                                  disabled={selectedOpt !== undefined}
                                  className={`p-1.5 rounded border text-right transition-colors cursor-pointer ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {gameResultVisible && (
                  <div className="mt-3 p-2 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-xs text-emerald-800 font-bold animate-pulse">
                    🏆 نقاط الكفاءة المستحقة: {userScore * 50} من رقعة العباقرة!
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Featured Courses Tracks aligned like Edraak MOOC paths */}
          <div className="bg-slate-50 p-5 rounded-[34px] border border-slate-200/80 space-y-4 shadow-sm">
            <h4 className="text-base font-extrabold text-[#0A2E5C] flex items-center gap-1.5 justify-end">
              <BookOpenCheck size={16} /> المسارات التخصصية المعتمدة (Edraak Paths)
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "مسار البكالوريا والقبول المركزي العراقي", desc: "توجيهات نموذج الأسئلة الوزارية للصف السادس العلمي والأدبي بمكافئ الذكاء الاصطناعي.", level: "مدرسي" },
                { title: "مسار الميكانيك واللوجستيات لنقابة المدربين", desc: "تطوير حقائب القياس والتبريد بشهادة تدريبية تخصصية معتمدة من نقابة المدربين العراقيين بجمهورية العراق.", level: "مهني" }
              ].map((trk, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-[#EF6C00]/50 transition-all shadow-sm">
                  <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-black">
                    {trk.level}
                  </span>
                  <h5 className="font-extrabold text-xs text-[#0A2E5C]">{trk.title}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{trk.desc}</p>
                  <button className="text-[10px] text-[#EF6C00] font-extrabold flex items-center gap-1 cursor-pointer">
                    تحميل حقيبة المسار والبدء فوراً <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* لوحة الإدراك البيضاء الحرة ومذكرة التعلم (Classified Free Sticky Notes Board) */}
          <div className="bg-slate-50 p-5 md:p-6 rounded-[34px] border border-slate-200 space-y-4 shadow-sm text-right">
            <h4 className="text-base font-extrabold text-[#0A2E5C] flex items-center gap-1.5 justify-end">
              <Sparkles size={16} className="text-[#EF6C00]" /> لوحة الإدراك البيضاء الحرة ومذكرة التعلم
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              منطقة عصف ذهني ومفكرة إبداعية تفاعلية لتدوين ومشاركة الأفكار والمسودات السريعة وترجمتها لخطط عمل بالذكاء الاصطناعي:
            </p>

            {/* Note Creation Form */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3.5">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="اكتب فكرتك الأكاديمية أو مسودة مشروعك التوليدي هنا..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#EF6C00] transition-all text-right h-20 resize-none font-medium"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Note color radio selection */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold ml-1 text-[11px]">اللون:</span>
                  {[
                    { val: "gold", bg: "bg-amber-100 border-amber-400" },
                    { val: "blue", bg: "bg-sky-100 border-sky-400" },
                    { val: "indigo", bg: "bg-indigo-100 border-indigo-400" },
                    { val: "emerald", bg: "bg-emerald-100 border-emerald-400" },
                  ].map((col) => (
                    <button
                      key={col.val}
                      onClick={() => setNewNoteColor(col.val as any)}
                      className={`w-6 h-6 rounded-full border-2 ${col.bg} transition-all cursor-pointer ${
                        newNoteColor === col.val ? "scale-115 ring-2 ring-[#0A2E5C]/30" : "opacity-60"
                      }`}
                    />
                  ))}
                </div>

                {/* Tag Selection */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold text-[11px]">التصنيف العلمي:</span>
                  <select
                    value={newNoteTag}
                    onChange={(e) => setNewNoteTag(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-705 outline-none focus:border-[#EF6C00]"
                  >
                    <option value="ميكانيك">ميكانيك</option>
                    <option value="برمجيات">برمجيات</option>
                    <option value="قانون">قانون</option>
                    <option value="فيزياء">فيزياء</option>
                  </select>
                </div>

                <button
                  onClick={handleAddNote}
                  className="bg-[#0A2E5C] hover:bg-[#0c2540] text-white font-extrabold px-5 py-2 rounded-xl transition-all text-xs cursor-pointer"
                >
                  إضافة المسودة
                </button>
              </div>
            </div>

            {/* Note Cards grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {boardNotes.map((note) => {
                let colorClass = "bg-amber-50/50 border-amber-200/80 text-amber-900";
                let tagColorClass = "bg-amber-100 text-amber-800";
                if (note.color === "blue") {
                  colorClass = "bg-sky-50/50 border-sky-200/80 text-sky-900";
                  tagColorClass = "bg-sky-100 text-sky-800";
                } else if (note.color === "indigo") {
                  colorClass = "bg-indigo-50/50 border-indigo-200/90 text-indigo-900";
                  tagColorClass = "bg-indigo-100 text-indigo-800";
                } else if (note.color === "emerald") {
                  colorClass = "bg-emerald-50/50 border-emerald-200/80 text-emerald-950";
                  tagColorClass = "bg-emerald-100 text-emerald-800";
                }

                return (
                  <div
                    key={note.id}
                    className={`p-4 rounded-2xl border transition-all hover:shadow flex flex-col justify-between relative ${colorClass}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${tagColorClass}`}>
                          {note.tag}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 font-bold transition-all cursor-pointer border-0 bg-transparent"
                        >
                          حذف
                        </button>
                      </div>
                      <p className="text-xs font-semibold leading-relaxed mb-3">
                        {note.text}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExportNoteToAi(note.id, note.text)}
                      className="w-full text-center bg-white/70 hover:bg-white text-[10px] font-black py-1.5 rounded-xl border border-black/10 text-slate-800 transition-colors cursor-pointer"
                    >
                      {isAiLoadingNote && selectedNoteForAi === note.id
                        ? "جاري التصدير..."
                        : "تصدير الذكاء الاصطناعي لفكرة خطة عمل"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Exported Result AI roadmap modal representation */}
            {aiNoteRoadmap && (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 mt-3 animate-slide-up text-xs text-right space-y-2 relative">
                <button
                  onClick={() => setAiNoteRoadmap(null)}
                  className="absolute top-2.5 left-3 text-slate-500 hover:text-red-500 text-xs font-bold font-mono cursor-pointer border-0 bg-transparent"
                >
                  إغلاق x
                </button>
                <h5 className="font-extrabold text-emerald-800 flex items-center gap-1">
                  💡 خطة العمل التوليدية المستندة لفكرتك:
                </h5>
                <p className="text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap">
                  {aiNoteRoadmap}
                </p>
                <div className="text-[9px] text-emerald-600 font-bold block pt-1">
                  ● تم تكييف وتوثيق الخطة ضمن سياق منسق وزارة التعليم العالي
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Left Side: Educational Reels widget (1 Column) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-rose-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                LIVE REELS
              </span>
              <h5 className="font-bold text-xs text-slate-700 flex items-center gap-1">
                <Flame size={14} className="text-[#f43f5e]" /> ريلز المعرفة
              </h5>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed text-right">
              حلقات معارف دقيقة مصممة لتفكيك المفاهيم المعقدة في أقل من دقيقة.
            </p>

            <div className="space-y-3 pt-2">
              {dashboardReels.map((rl) => {
                const isActive = playingReel === rl.id;
                return (
                  <div
                    key={rl.id}
                    onClick={() => setPlayingReel(rl.id)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border text-right space-y-1 relative group ${
                      isActive
                        ? "bg-[#0A2E5C] text-white border-transparent shadow-md scale-[1.02]"
                        : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    {/* Hover play dynamic overlay */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-500/10 hover:bg-[#EF6C00] text-[#EF6C00] hover:text-white rounded-full flex items-center justify-center transition-colors">
                      <Play size={10} fill="currentColor" />
                    </div>

                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-[9px] bg-amber-500/10 text-[#EF6C00] font-bold px-1.5 py-0.2 rounded">
                        {rl.tag}
                      </span>
                      <h6 className={`font-bold text-xs ${isActive ? "text-white" : "text-slate-800"}`}>{rl.title}</h6>
                    </div>
                    <p className={`text-[10px] font-mono text-left ${isActive ? "text-slate-200" : "text-slate-500"}`}>{rl.playsAr}</p>
                  </div>
                );
              })}
            </div>

            {/* Simulated Active Reels screen player box */}
            <div className="bg-slate-900 aspect-[9/10] rounded-2xl border border-slate-800 p-3 flex flex-col justify-between relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
              <div className="flex justify-between items-center text-[8px] text-slate-400 relative z-20">
                <span>REEL PLAYER ACTIVE</span>
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              </div>

              {/* Dynamic symbol representation of current reel */}
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 space-y-3 my-2">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center animate-spin-slow">
                  <BrainCircuit size={24} />
                </div>
                <p className="text-[11px] font-bold text-gray-200">
                  {playingReel === "dr1" && "🎥 مقاوم تيار وهيدروليكا السوائل"}
                  {playingReel === "dr2" && "🎥 لغات البرمجة وشرح البايثون الفوري"}
                  {playingReel === "dr3" && "🎥 استعلامات قواعد البيانات الرصينة"}
                  {playingReel === "dr4" && "🎥 تصفح بنود مسلة حمورابي ومعدل الوفاء"}
                </p>
                <span className="text-[9px] text-gray-500">مدة البث: 59 ثانية</span>
              </div>

              <div className="bg-slate-950 p-2 rounded-xl text-right text-[10px] text-slate-400 border border-slate-800 relative z-10 font-medium">
                بث علمي توليدي مسند بالوثائق المعتمدة في العراق.
              </div>
            </div>
          </div>

          {/* Premium Accreditation Seals Display */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-right space-y-4">
            <h5 className="font-bold text-xs text-[#0A2E5C] flex items-center gap-1 justify-end">
              <Award size={14} className="text-[#EF6C00]" /> تراخيص الاعتماد والتوظيف المالي
            </h5>

            <p className="text-[10px] text-slate-500 leading-relaxed">
              إن جميع مسارات أكاديمية سومر معتمدة ومبرمجة بالتعاون الاستراتيجي والتدقيق التكاملي مع أرفع الهيئات العراقية لتسييل ونضج شهادات الطلاب في حقول التوظيف مباشرة:
            </p>

            {/* Seal 1: Trade Union Training License */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 justify-end text-right">
              <div>
                <h6 className="text-[11px] font-bold text-[#EF6C00]">الترخيص المهني والاعتماد النقابي</h6>
                <p className="text-[9px] text-slate-500 leading-normal">
                  حقائب الهندسة، البرمجة، والذكاء الاصطناعي معتمدة ومسجلة نقابياً.
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#EF6C00] text-white font-extrabold text-[9px] flex flex-col items-center justify-center border border-orange-500/30 overflow-hidden shrink-0">
                <span className="text-[6px]">حكومي نقابي</span>
                <span className="text-[10px] tracking-tight text-white">ITU</span>
                <span className="text-[6px] scale-90">اعتماد ٢٠٢٦</span>
              </div>
            </div>

            {/* Seal 2: Iraqi Trainers Union */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 justify-end text-right">
              <div>
                <h6 className="text-[11px] font-bold text-emerald-700">نقابة المدربين العراقيين (ITU)</h6>
                <p className="text-[9px] text-slate-500 leading-normal">
                  الراصد والمدقق ومسيل رخص التأهيل والتدريب للبلد.
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-emerald-800 text-white font-extrabold text-[9px] flex flex-col items-center justify-center border border-emerald-500/20 overflow-hidden shrink-0">
                <span className="text-[7px]">جمع اللجان</span>
                <span className="text-[10px]">ITU</span>
                <span className="text-[6px]">بث العراق</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
