import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gamepad2,
  Sparkles,
  RefreshCw,
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Clock,
  Award,
  BookOpen,
  Volume2,
  Flame,
  Zap,
  CornerDownRight,
  ListOrdered,
  Shuffle,
  ShieldAlert
} from "lucide-react";

export const AIGamify: React.FC = () => {
  const [docText, setDocText] = useState("");
  const [subject, setSubject] = useState("قوانين حمورابي والتشريعات العراقية القديمة");
  const [isGamifying, setIsGamifying] = useState(false);
  const [gameData, setGameData] = useState<any>(null);

  // General state
  const [gameMode, setGameMode] = useState<"mcq" | "matching" | "sequencer" | "bug">("mcq");
  
  // Game 1: MCQ & Flashcards
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [revealCard, setRevealCard] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Game 2: concept matching
  const [matchingLeft, setMatchingLeft] = useState<{ id: string; text: string }[]>([]);
  const [matchingRight, setMatchingRight] = useState<{ id: string; text: string }[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<string[]>([]);
  const [wrongPairAttempt, setWrongPairAttempt] = useState<[string, string] | null>(null);

  // Game 3: step sequencer
  const [sequencerSteps, setSequencerSteps] = useState<{ id: string; orderIdx: number; text: string }[]>([]);
  const [sequencerFeedback, setSequencerFeedback] = useState<"idle" | "success" | "wrong">("idle");
  const [sequencerSolved, setSequencerSolved] = useState(false);

  // Game 4: bug spotter
  const [bugHunterCases, setBugHunterCases] = useState<{ statement: string; isBug: boolean; fix: string; explanation: string }[]>([]);
  const [selectedBugIdx, setSelectedBugIdx] = useState<number | null>(null);
  const [bugSolved, setBugSolved] = useState(false);
  const [showBugFeedback, setShowBugFeedback] = useState(false);

  const initActiveGames = (data: any, activeSubject: string) => {
    // 1. Initialize Matching
    const cards = data.flashcards || [];
    const left = cards.map((c: any, idx: number) => ({ id: `pair_${idx}`, text: c.front }));
    const right = cards.map((c: any, idx: number) => ({ id: `pair_${idx}`, text: c.back }));
    
    // Scramble helper
    const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
    setMatchingLeft(shuffle(left));
    setMatchingRight(shuffle(right));
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setCompletedPairs([]);
    setWrongPairAttempt(null);

    // 2. Initialize Sequencer Steps
    let steps = [];
    if (activeSubject.includes("حمورابي")) {
      steps = [
        { id: "step_0", orderIdx: 0, text: "صياغة المبادئ القانونية من قبل الملك حمورابي وكتبة بابل في مجمع تشريعي تاريخي." },
        { id: "step_1", orderIdx: 1, text: "نقش الـ 282 مادة قانونية والشرائع الباقية على مسلة حجرية سوداء سامقة." },
        { id: "step_2", orderIdx: 2, text: "تنصيب وتبليغ المسلحة في المعابد وساحات المدن البابلية الكبرى لضمان علم العوام." },
        { id: "step_3", orderIdx: 3, text: "تطبيق المحلفين والقضاة البابليين للمواد وفض النزاعات اليومية وتدوين الأحكام." }
      ];
    } else if (activeSubject.includes("بايثون")) {
      steps = [
        { id: "step_0", orderIdx: 0, text: "صياغة الأكواد البرمجية (Source Code) بوضوح في محرر النصوص البرمجي." },
        { id: "step_1", orderIdx: 1, text: "مرور الأكواد على مفسّر بايثون المباشر (Interpreter) ليقوم بفحص الأخطاء سطرًا بسطر." },
        { id: "step_2", orderIdx: 2, text: "ترجمة السطور برمجياً إلى رمز هجين وسيط يسمى شيفرة البايت (Bytecode)." },
        { id: "step_3", orderIdx: 3, text: "تشغيل التعليمات داخل محرك بيئة دوت بايثون (Python Virtual Machine) وإظهار النتائج للحاسوب." }
      ];
    } else if (activeSubject.includes("الدوائر الكهربائية")) {
      steps = [
        { id: "step_0", orderIdx: 0, text: "توصيل بطارية أو مولد كهرباء خارجي لتوليد فرق جهد كهرومغناطيسي على طرفي السلك." },
        { id: "step_1", orderIdx: 1, text: "تدفق وضخ الإلكترونات الحرة عبر ممر الموصل النحاسي من القطب السالب." },
        { id: "step_2", orderIdx: 2, text: "اصطدام الإلكترونات بمقاومات الدائرة كالمصابيح ومولد الحسابات الرياضية." },
        { id: "step_3", orderIdx: 3, text: "إتمام الدورة الكاملة بوصول الشحنات للقطب الموجب وحساب التيار الكلي عبر قانون أوم." }
      ];
    } else if (activeSubject.includes("الكيمياء")) {
      steps = [
        { id: "step_0", orderIdx: 0, text: "تفكيك ذرات الهيدروكربونات وتوفير جزيئات الكربون المناسبة للتفاعل العضوي." },
        { id: "step_1", orderIdx: 1, text: "تصميم حلقة بنزين سداسية الروابط مستقرة الرنين بسلوك أروماتي مدهش." },
        { id: "step_2", orderIdx: 2, text: "إضافة حمض محفز لتشجيع الرابطة الهيدروكربونية على إزاحة ذرات معينة." },
        { id: "step_3", orderIdx: 3, text: "استخلاص المركب العضوي النقي وتوثيق صيغته التركيبية التناظرية." }
      ];
    } else {
      // Dynamic fallback based on flashcards fronts
      steps = cards.map((c: any, idx: number) => ({
        id: `step_${idx}`,
        orderIdx: idx,
        text: `المرحلة المعرفية [${idx + 1}]: ` + (c.front.length > 80 ? c.front.substring(0, 80) + "..." : c.front)
      }));
    }
    setSequencerSteps(shuffle(steps));
    setSequencerFeedback("idle");
    setSequencerSolved(false);

    // 3. Initialize Bug Hunter Cases
    let bugs = [];
    if (activeSubject.includes("حمورابي")) {
      bugs = [
        { statement: "شيد الملك البابلي حمورابي مسلته لتنظيم الحقوق المدنية بالاعتماد على حجر الديوريت الأسود.", isBug: false, fix: "", explanation: "" },
        { statement: "تتضمن المسلة البابلية حوالي 282 مادة تشمل العقود التجارية والزواج والقصاص وقوانين الملكية.", isBug: false, fix: "", explanation: "" },
        { statement: "بنت الملكة السميرامية سور برلين العظيم في بلاد بابل لحماية حدائق نينوى من هجمات المغول والبرابرة.", isBug: true, fix: "هذا وهم تاريخي؛ سور برلين شيد في العصر الحديث (1961م) في ألمانيا الشيوعية وليس في بابل القديمة، وبابل لا شأن لها بسور برلين.", explanation: "رائع! لقد اصطدت العيب التاريخي بنجاح. سور برلين لا علاقة له الإطلاق ببلاد الرافدين والقرن السادس قبل الميلاد." },
        { statement: "ترتكز الصياغة اللغوية للمحاضر والمسلّة على قواعد بابلية صارمة تراعي البنى القضائية المعتمدة.", isBug: false, fix: "", explanation: "" }
      ];
    } else if (activeSubject.includes("بايثون")) {
      bugs = [
        { statement: "تستخدم دالة ()print لعرض المخرجات على شاشة الحاسوب وتعتمد صيغة القوسين.", isBug: false, fix: "", explanation: "" },
        { statement: "لتخزين نص نكتبه بين علامتي اقتباس ثنائية أو أحادية مثل 'Hello World' كمتغير نصي.", isBug: false, fix: "", explanation: "" },
        { statement: "يمكن قسمة الأرقام على صفر في بايثون ببساطة حيث ينتج مفسر بايثون القيمة 100 تلقائياً كرمز أمان للبرنامج.", isBug: true, fix: "القسمة على صفر تنتج خطأ وقت التشغيل ومكابح تسمى ZeroDivisionError ويتوقف النظام فورياً عن تشغيل ما بعد ذلك السلك.", explanation: "ممتاز! القسمة على صفر هي ثغرة برمجية شهيرة تحسب ضمن أخطاء وقت التشغيل (Runtime Error)." },
        { statement: "نستخدم معامل باقي القسمة (%) للكشف عن كينونة الأرقام الزوجية والفردية في الشروط البرمجية.", isBug: false, fix: "", explanation: "" }
      ];
    } else if (activeSubject.includes("الدوائر الكهربائية")) {
      bugs = [
        { statement: "التيار الكهربائي هو عبارة عن تدفق مستمر للالكترونات الحرة عبر سلك موصل مغلق.", isBug: false, fix: "", explanation: "" },
        { statement: "تقاس المقاومة الكهربائية بوحدة الأوم بينما يقاس الجهد بوحدة الفولت تماشياً مع معايير الفيزياء.", isBug: false, fix: "", explanation: "" },
        { statement: "الماء النقي المقطر الخالي تماماً من الأملاح والمعادن يعتبر أفضل وسيط فائق التوصيل للكهرباء المنزلية والدوائر.", isBug: true, fix: "الماء المقطر الخالي تماماً من الأملاح عازل تام وخامل كهربائياً! الأملاح والمعادن المنحلة هي التي تحفز التوصيل الأيوني وسريان التيار.", explanation: "مذهل! لقد كشفت العيب الفيزيائي بنجاح. الماء المقطر النقي عازل حقيقي بسبب غياب السباحة الأيونية الطليقة للأملاح." },
        { statement: "ينص قانون أوم الشهير على أن التيار الكهربائي يتناسب طردياً مع فرق الجهد وعكسياً مع المقاومة.", isBug: false, fix: "", explanation: "" }
      ];
    } else {
      // Dynamic general fallback
      bugs = [
        { statement: `أول معيار قياسي نعتمد عليه في دراسة (${activeSubject}) هو التحليل العلمي المنظم مع مراجعته.`, isBug: false, fix: "", explanation: "" },
        { statement: `يمكن تخطي البحث التتابعي في مادة (${activeSubject}) والاعتماد على قراءة الكلمات بالمعكوس للحصول على علامة كاملة.`, isBug: true, fix: "قراءة الكلمات بالمعكوس مجرد وهم يشتت العقل، والدراسة المنظمة هي السبيل الوحيد لفهم الحقائق.", explanation: "أحسنت في صيد الثغرة والوهم التعليمي! التدريب المتقن والمسار التدريجي هو الحل الفعلي للتمكين." },
        { statement: "يساعد التقييم المستمر وكتابة الملخصات على تثبيت المعلومات العميقة وسد الفراغات المعرفية لدى الدارس.", isBug: false, fix: "", explanation: "" }
      ];
    }
    setBugHunterCases(bugs);
    setSelectedBugIdx(null);
    setBugSolved(false);
    setShowBugFeedback(false);

    // Reset game finished flags
    setIsFinished(false);
    setScore(0);
    setSelectedAnswers({});
    setGameMode("mcq"); // Default to MCQ tab
  };

  const handleCreateGame = async () => {
    setIsGamifying(true);
    setGameData(null);
    setRevealCard(false);
    setActiveCardIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setIsFinished(false);

    try {
      const response = await fetch("/api/ai-gamify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docText,
          subject,
        }),
      });

      if (!response.ok) {
        throw new Error("فشل إنشاء اللعبة. حاول مجدداً لطيفاً.");
      }

      const data = await response.json();
      setGameData(data);
      initActiveGames(data, subject);
    } catch (e) {
      console.error(e);
      // Beautiful built-in fallback data match subject structure
      const fallbackData = {
        gameTitle: `رقعة ومبارزة: ${subject}`,
        flashcards: [
          {
            front: `ما الرابط الجوهري لموضوع (${subject}) بالأنظمة الهندسية أو الشرعية؟`,
            back: "تأسست القواعد الأولى لتنظيم العلوم المستدامة في بابل ونينوى لضمان نمو المعرفة واستقرار المدن عبر خطط محكمة."
          },
          {
            front: "كيف يمكن تفكيك الرموز والقيم الرقمية الممثلة للمقاييس؟",
            back: "من خلال حصر المتغيرات الأساسية (الجهد، المقاومة، أو المعايير القانونية الصارمة) ثم تطبيق خوارزمية الحل المباشر."
          },
          {
            front: "ما هي القيمة المضافة لتقييم الكفاءة الذاتي الفوري؟",
            back: "يساعد الطالب على توثيق نقاط الضعف بدقة وسد فجوات البكالوريا وتجاوز عقبات التدريب والمحاكاة لضمان التمكين."
          }
        ],
        quiz: [
          {
            question: `ما هو أول معيار قياسي نعتمد عليه عند دراسة أو تشييد مادة: ${subject}؟`,
            options: ["التحليل العلمي والمنطقي المفصل مع فحص السياقات", "التخمين العشوائي غير المسند بأي وثائق علمية", "تجاوز المبادئ والاعتماد على الكورسات البسيطة فقط"],
            answerIndex: 0
          },
          {
            question: "متى نعتبر المعالجة الذهنية للموضوع ناجحة وتامة المعالم؟",
            options: ["عند نيل مرتبة التمكين بالحل العملي والمحاكاة الكاملة للفكر", "بمجرد حفظ الكلمات بدون وعي رياضي عميق", "تأجيل التطبيق والعمل حتى نهاية العام الدراسي دون مبالاة"],
            answerIndex: 0
          },
          {
            question: "أي بوابة تمثل الضم المنطقي المشترك في حوسبة القواعد المعرفية؟",
            options: ["بوابة AND المشتركة", "بوابة NOT النفي المطلق", "التشعب الخارجي العشوائي"],
            answerIndex: 0
          }
        ]
      };
      setGameData(fallbackData);
      initActiveGames(fallbackData, subject);
    } finally {
      setIsGamifying(false);
    }
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...selectedAnswers, [qIdx]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (optIdx === gameData.quiz[qIdx].answerIndex) {
      setScore((s) => s + 1);
    }

    if (Object.keys(nextAnswers).length === gameData.quiz.length) {
      setIsFinished(true);
    }
  };

  // Game 2: Matching Logic
  const handleMatchingClick = (item: { id: string; text: string }, side: "left" | "right") => {
    if (completedPairs.includes(item.id)) return;

    if (side === "left") {
      if (selectedLeftId === item.id) {
        setSelectedLeftId(null);
      } else {
        setSelectedLeftId(item.id);
        if (selectedRightId) {
          if (item.id === selectedRightId) {
            setCompletedPairs([...completedPairs, item.id]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
            setScore((s) => s + 1);
          } else {
            setWrongPairAttempt([item.id, selectedRightId]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
            setTimeout(() => setWrongPairAttempt(null), 1000);
          }
        }
      }
    } else {
      if (selectedRightId === item.id) {
        setSelectedRightId(null);
      } else {
        setSelectedRightId(item.id);
        if (selectedLeftId) {
          if (item.id === selectedLeftId) {
            setCompletedPairs([...completedPairs, item.id]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
            setScore((s) => s + 1);
          } else {
            setWrongPairAttempt([selectedLeftId, item.id]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
            setTimeout(() => setWrongPairAttempt(null), 1000);
          }
        }
      }
    }
  };

  // Game 3: Sequencer Logic
  const moveStep = (idx: number, direction: "up" | "down") => {
    if (sequencerSolved) return;
    const nextSteps = [...sequencerSteps];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= nextSteps.length) return;

    // Swap elements
    const temp = nextSteps[idx];
    nextSteps[idx] = nextSteps[targetIdx];
    nextSteps[targetIdx] = temp;
    
    setSequencerSteps(nextSteps);
    setSequencerFeedback("idle");
  };

  const checkSequencerOrder = () => {
    let isCorrect = true;
    for (let i = 0; i < sequencerSteps.length; i++) {
      if (sequencerSteps[i].orderIdx !== i) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      setSequencerFeedback("success");
      setSequencerSolved(true);
      setScore((s) => s + 1);
    } else {
      setSequencerFeedback("wrong");
      setTimeout(() => setSequencerFeedback("idle"), 2500);
    }
  };

  // Game 4: Bug Spotter Logic
  const handleBugSpot = (idx: number) => {
    if (bugSolved) return;
    setSelectedBugIdx(idx);
    const item = bugHunterCases[idx];
    if (item.isBug) {
      setBugSolved(true);
      setShowBugFeedback(true);
      setScore((s) => s + 1);
    } else {
      setShowBugFeedback(true);
      setTimeout(() => setShowBugFeedback(false), 2500);
    }
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 p-6 md:p-10 rounded-[40px] shadow-3xl border-2 border-[#1e293b] text-right font-sans relative overflow-hidden" id="ai-gamify-module">
      {/* Decorative items */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header and instruction block */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 border-b border-[#1e293b] pb-6">
        <div className="w-12 h-12 bg-[#1e293b] border-2 border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
          <Gamepad2 size={24} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-100 font-display">
            رقعة الألعاب والذكاء المعرفي | SUMER PLAYGROUND
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            اختر أي موضوع أو منهاج لتحويله فوراً بأدوات الذكاء لألعاب تفاعلية متنوعة (خيارات متعددة، توصيل بطاقات، تنظيم خوارزميات، وصائد الأخطاء).
          </p>
        </div>
      </div>

      {!gameData ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-300">اختر موضوعاً منهجياً معتمداً للبدء فوراً:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "قوانين حمورابي والتشريعات العراقية القديمة", desc: "التشريع البابلي واللوح الأثري" },
                { name: "أساسيات البرمجة بلغة بايثون للناشئين", desc: "صياغة المترجم والخوارزميات" },
                { name: "الدوائر الكهربائية والجهد والتيار في الفيزياء", desc: "قوانين كيرشوف والتحليل الرياضي" },
                { name: "الكيمياء العضوية والأواصر الهيدروكاربونية", desc: "سداسيات البنزين وتفاعل الأسترة" },
                { name: "ميكانيك السوائل للمحركات الحرارية", desc: "منهاج الحقائب الهندسية المهنية للنقابة" },
                { name: "أشباه الموصلات والالكترونيات المعاصرة", desc: "بناء الدايودات والبوابات المنطقية" }
              ].map((subObj, i) => (
                <button
                  key={i}
                  id={`sub-btn-${i}`}
                  onClick={() => setSubject(subObj.name)}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    subject === subObj.name
                      ? "bg-[#1e3a8a] border-amber-500 text-white shadow-lg shadow-blue-900/40"
                      : "bg-[#1e293b]/50 hover:bg-[#1e293b] text-slate-300 border-slate-800"
                  }`}
                >
                  <span className="text-xs font-bold block leading-tight">{subObj.name}</span>
                  <span className="text-[10px] text-amber-400/70 font-mono mt-1 block">{subObj.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              أو الصق مادة كورس مخصصة، ملخصاً وزارياً، أو كتابات معينة (AI Smart Reader):
            </label>
            <textarea
              id="doc-text-input"
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              placeholder="مثال: يتركب محرك ديزل من صمامات سحب وعادم ومكبس يتحرك حركة خطية دائرية مع ذراع المرفق..."
              className="w-full h-32 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-100 outline-none focus:border-amber-400 transition-colors resize-none text-right"
            />
          </div>

          <button
            id="generate-game-btn"
            onClick={handleCreateGame}
            disabled={isGamifying}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:scale-[1.005] active:scale-[0.995]"
          >
            {isGamifying ? (
              <>
                <RefreshCw size={16} className="animate-spin text-slate-950" /> جاري تخليق رقعة الألعاب وصياغة الأطوار المعرفية اللحظية...
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-slate-950" /> توليد رقعة الألعاب ومبارزة الذكاء الاصطناعي
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          
          {/* Active Championship Header Banner */}
          <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1e293b] to-amber-500/10 p-5 rounded-3xl border-2 border-amber-500/20 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right">
              <span className="text-[9px] bg-amber-500 text-[#000] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                ملاعب سومر الرقمية المتأهبة
              </span>
              <h4 className="text-lg font-bold text-gray-100 mt-1.5">{gameData.gameTitle}</h4>
            </div>
            <button
              id="change-subject-btn"
              onClick={() => setGameData(null)}
              className="text-amber-300 hover:text-white text-xs font-bold bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl cursor-pointer transition-all shrink-0"
            >
              🔄 تغيير التخصص والموضوع
            </button>
          </div>

          {/* Interactive Game Selection Row */}
          <div className="bg-slate-900 border border-[#1e293b] p-2 rounded-2xl flex flex-nowrap md:flex-wrap items-center justify-start gap-1 overflow-x-auto" dir="rtl">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("mcq")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                gameMode === "mcq" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>🎮 مبارزة الاختيارات (MCQ)</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("matching")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                gameMode === "matching" ? "bg-purple-600 text-white shadow-md shadow-purple-900/40" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>🔗 توصيل الروابط المتناظرة</span>
              <span className="text-[9px] bg-purple-500 text-white font-mono px-1 rounded">جديد</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("sequencer")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                gameMode === "sequencer" ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>📐 ترتيب الخطوات الخوارزمية</span>
              <span className="text-[9px] bg-emerald-500 text-white font-mono px-1 rounded">جديد</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("bug")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                gameMode === "bug" ? "bg-rose-600 text-white shadow-md shadow-rose-900/40" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>🔍 صائد الثغرات والأخطاء</span>
              <span className="text-[9px] bg-rose-500 text-white font-mono px-1 rounded">جديد</span>
            </motion.button>
          </div>

          {/* Main Interactive Games Area with Motion Animations */}
          <div className="w-full min-h-[420px] relative">
            <AnimatePresence mode="wait">
              {/* GAME MODE 1: MCQ Battle with Flashcard review */}
              {gameMode === "mcq" && (
                <motion.div
                  key="mcq"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                  id="mcq-game-view"
                >
                  
                  {/* Part A: Flashcard with interactive motion */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-amber-400 font-bold block text-right">★ الخطوة الأولى: قلب بطاقة الكفاءة وفهم المفارقة:</span>
                    
                    <motion.div
                      whileHover={{ scale: 1.015, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.15)" }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setRevealCard(!revealCard)}
                      className={`rounded-3xl cursor-pointer p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all border-2 relative select-none min-h-[160px] ${
                        revealCard
                          ? "bg-amber-500/5 border-amber-500/60 text-amber-300 shadow-md ring-2 ring-amber-500/5"
                          : "bg-slate-900 hover:bg-[#1e293b] border-slate-800 text-gray-200"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {!revealCard ? (
                          <motion.div
                            key="front"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-2 pointer-events-none"
                          >
                            <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full font-bold">انقر على البطاقة لقلبها واكتشاف المعنى</span>
                            <p className="font-bold text-sm md:text-base leading-relaxed">
                              {gameData.flashcards[activeCardIndex]?.front}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="back"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: -90 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-2 pointer-events-none"
                          >
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold">تحليل الذكاء التوليدي المستدام</span>
                            <p className="text-xs md:text-sm leading-relaxed font-semibold text-slate-100">
                              {gameData.flashcards[activeCardIndex]?.back}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <span className="absolute bottom-2.5 text-[9px] text-slate-500 font-bold font-mono">
                        الملحوظة العميقة {activeCardIndex + 1} من {gameData.flashcards.length}
                      </span>
                    </motion.div>

                    {/* Flip Slider navigation arrows */}
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setRevealCard(false);
                          setActiveCardIndex((i) => (i === 0 ? gameData.flashcards.length - 1 : i - 1));
                        }}
                        className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <ArrowRight size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setRevealCard(false);
                          setActiveCardIndex((i) => (i + 1) % gameData.flashcards.length);
                        }}
                        className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <ArrowLeft size={16} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Part B: Interactive Multiple choice Quiz */}
                  <div className="border-t border-[#1e293b] pt-5 space-y-4">
                    <span className="text-xs font-bold text-slate-200 block text-right">★ الخطوة الثانية: الإجابة على منافسات الشطرين المنهجية:</span>
                    
                    <div className="grid gap-4">
                      {gameData.quiz.map((q: any, qIdx: number) => {
                        const chosen = selectedAnswers[qIdx];
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: qIdx * 0.05 }}
                            key={qIdx}
                            className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3.5 text-right"
                          >
                            <div className="flex items-start gap-2 justify-start">
                              <HelpCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                              <p className="font-bold text-xs text-gray-100 leading-relaxed">{q.question}</p>
                            </div>

                            <div className="grid gap-2 text-xs">
                              {q.options.map((opt: string, oIdx: number) => {
                                const isCorrect = oIdx === q.answerIndex;
                                const wasChosen = chosen === oIdx;

                                let btnStyle = "bg-[#1e293b]/80 border-slate-800 text-slate-300 hover:bg-[#1e293b]";

                                if (chosen !== undefined) {
                                  if (isCorrect) {
                                    btnStyle = "bg-green-500/20 border-green-500/40 text-green-300 font-bold";
                                  } else if (wasChosen) {
                                    btnStyle = "bg-red-500/20 border-red-500/40 text-red-300 animate-shake";
                                  } else {
                                    btnStyle = "bg-slate-950/40 border-slate-950 text-slate-600 opacity-30 pointer-events-none";
                                  }
                                }

                                return (
                                  <motion.button
                                    whileHover={chosen === undefined ? { x: -4, scale: 1.005, backgroundColor: "#1e293b" } : {}}
                                    whileTap={chosen === undefined ? { scale: 0.995 } : {}}
                                    key={oIdx}
                                    onClick={() => selectAnswer(qIdx, oIdx)}
                                    disabled={chosen !== undefined}
                                    className={`w-full p-3 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between font-medium ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {chosen !== undefined && isCorrect && <Check size={14} className="text-green-400" />}
                                    {chosen !== undefined && wasChosen && !isCorrect && <X size={14} className="text-red-400" />}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {isFinished && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="p-6 bg-gradient-to-br from-emerald-500/20 to-emerald-700/5 border-2 border-emerald-500/30 rounded-3xl text-center space-y-3 relative overflow-hidden"
                      >
                        {/* Interactive floating particles */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
                          <motion.span animate={{ y: [-10, 120], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="absolute text-xl left-[10%] text-emerald-400">★</motion.span>
                          <motion.span animate={{ y: [-10, 120], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.6 }} className="absolute text-xl left-[40%] text-amber-400">✨</motion.span>
                          <motion.span animate={{ y: [-10, 120], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1 }} className="absolute text-xl left-[80%] text-emerald-300">🎉</motion.span>
                        </div>
                        <motion.h4 animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="font-black text-sm md:text-base text-emerald-450 flex items-center justify-center gap-2">
                          🏆 تهانينا! لقد انتصرت في بطولة رقعة الأسئلة المنهجية
                        </motion.h4>
                        <p className="text-xs text-emerald-300 font-bold">
                          رصيدك النهائي: <span className="text-amber-400 font-mono text-sm md:text-base">{score}</span> من أصل <span className="font-mono text-sm md:text-base">{gameData.quiz.length}</span> إجابات صحيحة!
                        </p>
                        <p className="text-[10px] text-slate-400 leading-relaxed max-w-md mx-auto">
                          لقد أثبتّ قدرتك التوليدية وامتصاصك المعرفي للمادة بامتياز. انتقل الآن للمرحلة التالية لكسر الحواجز التعليمية وتثبيت التفوق!
                        </p>
                      </motion.div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* GAME MODE 2: concept matching pair game */}
              {gameMode === "matching" && (
                <motion.div
                  key="matching"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-right"
                  id="matching-game-view"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-purple-300 flex items-center justify-start gap-1">
                      <span>🔗 توصيل شبكات المعرفة (Matching Pairs)</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      اربط كل فكرة/تساؤل في الطيف الأيمن بالبرهان أو الإجابة المطابقة له في الجانب الأيسر. عند الربط الصحيح ستُغلق البطارية وتكسب النقاط!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {/* Left Column (Terms / Questions) */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold block">العمود أ: التحديات والمفاهيم</span>
                      {matchingLeft.map((item) => {
                        const isMatched = completedPairs.includes(item.id);
                        const isSelected = selectedLeftId === item.id;
                        const hasWrong = wrongPairAttempt?.includes(item.id);

                        let cardStyle = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200";
                        if (isMatched) {
                          cardStyle = "bg-purple-950/20 border-purple-500/50 text-purple-200 opacity-60 pointer-events-none";
                        } else if (isSelected) {
                          cardStyle = "bg-purple-600/20 border-purple-400 text-white ring-2 ring-purple-500/20";
                        } else if (hasWrong) {
                          cardStyle = "bg-rose-950/20 border-rose-500/50 text-rose-300";
                        }

                        return (
                          <motion.button
                            whileHover={!isMatched ? { scale: 1.015, x: 2 } : {}}
                            whileTap={!isMatched ? { scale: 0.985 } : {}}
                            key={item.id}
                            onClick={() => handleMatchingClick(item, "left")}
                            className={`w-full p-4 rounded-2xl border text-right text-xs leading-relaxed font-semibold transition-all cursor-pointer flex items-center gap-3 justify-between ${cardStyle}`}
                          >
                            <span>{item.text}</span>
                            {isMatched && <Check size={14} className="text-purple-400 shrink-0" />}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Right Column (Definitions / Explanations) */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold block">العمود ب: الحلول والمنطق البنيوي</span>
                      {matchingRight.map((item) => {
                        const isMatched = completedPairs.includes(item.id);
                        const isSelected = selectedRightId === item.id;
                        const hasWrong = wrongPairAttempt?.includes(item.id);

                        let cardStyle = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200";
                        if (isMatched) {
                          cardStyle = "bg-purple-950/20 border-purple-500/50 text-purple-200 opacity-60 pointer-events-none";
                        } else if (isSelected) {
                          cardStyle = "bg-purple-600/20 border-purple-400 text-white ring-2 ring-purple-500/20";
                        } else if (hasWrong) {
                          cardStyle = "bg-rose-950/20 border-rose-500/50 text-rose-300";
                        }

                        return (
                          <motion.button
                            whileHover={!isMatched ? { scale: 1.015, x: -2 } : {}}
                            whileTap={!isMatched ? { scale: 0.985 } : {}}
                            key={item.id}
                            onClick={() => handleMatchingClick(item, "right")}
                            className={`w-full p-4 rounded-2xl border text-right text-xs leading-relaxed font-semibold transition-all cursor-pointer flex items-center gap-3 justify-between ${cardStyle}`}
                          >
                            <span>{item.text}</span>
                            {isMatched && <Check size={14} className="text-purple-400 shrink-0" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                    <div className="text-right">
                      <span className="text-xs text-slate-400">حالة التوصيل: {completedPairs.length} من {matchingLeft.length}</span>
                    </div>
                    {completedPairs.length === matchingLeft.length && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="bg-gradient-to-br from-purple-500/20 to-indigo-950/10 border border-purple-500/30 p-5 rounded-2xl text-center space-y-2 relative overflow-hidden flex-1"
                      >
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
                          <motion.span animate={{ y: [-15, 120], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.1 }} className="absolute text-lg left-[20%] text-purple-400">✨</motion.span>
                          <motion.span animate={{ y: [-15, 120], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.9, delay: 0.5 }} className="absolute text-lg left-[75%] text-indigo-400">⚡</motion.span>
                        </div>
                        <span className="text-xs md:text-sm font-black text-purple-300 block">🎉 نصر معرفي مذهل! تم تجميع وتجريد الروابط المتناظرة بالكامل</span>
                        <p className="text-[10px] text-slate-300 leading-relaxed">أتقنت ربط وحبك المفاهيم وسد الفجوات اللفظية للموضوع بنجاح مبهر!</p>
                      </motion.div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
                        setMatchingLeft(shuffle(matchingLeft));
                        setMatchingRight(shuffle(matchingRight));
                        setCompletedPairs([]);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Shuffle size={12} /> إعادة الخلط واللعب
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* GAME MODE 3: Algorithmic Order Sequencer */}
              {gameMode === "sequencer" && (
                <motion.div
                  key="sequencer"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-right"
                  id="sequencer-game-view"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-emerald-300 flex items-center justify-start gap-1">
                      <span>📐 المنظم الخوارزمي وسلسلة الخطوات (Workflow Order)</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      لقد تعرّضت خطوات العملية المنهجية للتشتت! استخدم أزرار الأسهم (↑ للأعلى، ↓ للأسفل) لتنظيم العناصر في هيكل مرتب منطقياً من الخطوة الأولى للنهائية.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {sequencerSteps.map((step, idx) => {
                      return (
                        <motion.div
                          layout
                          key={step.id}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`p-4 bg-slate-900 border rounded-2xl flex items-center gap-4 justify-between transition-all ${
                            sequencerSolved
                              ? "border-emerald-500/40 bg-emerald-950/10 shadow-lg shadow-emerald-950/20"
                              : "border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3 text-right">
                            <span className="w-6 h-6 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <p className="text-xs font-bold text-slate-200 leading-relaxed pr-1">{step.text}</p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={idx === 0 || sequencerSolved}
                              onClick={() => moveStep(idx, "up")}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                              title="نقل خطوة للأعلى"
                            >
                              ↑
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={idx === sequencerSteps.length - 1 || sequencerSolved}
                              onClick={() => moveStep(idx, "down")}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                              title="نقل خطوة للأسفل"
                            >
                              ↓
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 mt-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={checkSequencerOrder}
                        disabled={sequencerSolved}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-md shadow-emerald-900/10 flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Check size={14} /> تحقق من المحاذاة المنطقية
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSequencerSteps([...sequencerSteps].sort(() => Math.random() - 0.5));
                          setSequencerSolved(false);
                          setSequencerFeedback("idle");
                        }}
                        className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer border border-slate-800 whitespace-nowrap"
                      >
                        خلط عشوائي
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {sequencerFeedback === "success" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="flex-1 bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-xl text-center"
                        >
                          <span className="text-xs font-black text-emerald-300 flex items-center justify-center gap-1.5">
                            🏆 عبقري خوارزمي! تم ترتيب السلسلة وهيكلة العمليات بأقصى دقة مكننة!
                          </span>
                        </motion.div>
                      )}

                      {sequencerFeedback === "wrong" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: [1, 1.02, 1], y: 0 }}
                          className="flex-1 bg-rose-500/15 border border-rose-500/30 p-3 rounded-xl text-center"
                        >
                          <span className="text-xs font-bold text-rose-300">
                            ❌ الترتيب غير متسق منطقياً. تفكّر بمسار الأحداث وأعِد الترصيف!
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* GAME MODE 4: Bug Spotter Lab */}
              {gameMode === "bug" && (
                <motion.div
                  key="bug"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-right"
                  id="bug-game-view"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-rose-300 flex items-center justify-start gap-1">
                      <span>🔍 صائد الثغرات والخدع المعرفية (Bug Spotter Lab)</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      هناك تصريح أو قانون يحتوي على ثغرة علمية/برمجية أو كذبة تاريخية واضحة مدمجة بين الحقائق. انقر على التصريح الذي يمثل الثغرة لتكشف عوارها!
                    </p>
                  </div>

                  <div className="grid gap-3 pt-2">
                    {bugHunterCases.map((item, idx) => {
                      const isSelected = selectedBugIdx === idx;
                      const isLieAndSolved = item.isBug && bugSolved && isSelected;
                      const isWrongChoice = !item.isBug && showBugFeedback && isSelected;

                      let itemStyle = "bg-slate-900 border-slate-800 hover:bg-[#1e293b]/50 border-slate-800";
                      if (isLieAndSolved) {
                        itemStyle = "bg-emerald-950/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/10";
                      } else if (isWrongChoice) {
                        itemStyle = "bg-rose-950/20 border-rose-500/50 text-rose-300";
                      } else if (isSelected && !bugSolved) {
                        itemStyle = "bg-[#1e3a8a]/40 border-amber-500 text-slate-100";
                      }

                      return (
                        <motion.button
                          whileHover={{ scale: 1.01, x: -2 }}
                          whileTap={{ scale: 0.99 }}
                          key={idx}
                          onClick={() => handleBugSpot(idx)}
                          className={`w-full p-4 rounded-2xl border text-right text-xs leading-relaxed font-semibold transition-all cursor-pointer flex items-start gap-3.5 justify-start ${itemStyle}`}
                        >
                          <span className="mt-0.5 text-xs">
                            {isLieAndSolved ? "🎯" : isWrongChoice ? "❌" : "📄"}
                          </span>
                          <span className="flex-1">{item.statement}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {showBugFeedback && selectedBugIdx !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl border transition-all text-xs leading-relaxed space-y-1.5"
                    >
                      {bugHunterCases[selectedBugIdx].isBug ? (
                        <div className="bg-emerald-500/15 border-emerald-500/30 p-3 rounded-xl text-emerald-300">
                          <p className="font-bold text-sm flex items-center gap-1.55">🎯 صيد ثمين! لقد هزمت المغالطة بنجاح!</p>
                          <p className="mt-1 font-extrabold text-[#EF6C00]">التصحيح المعتمد: {bugHunterCases[selectedBugIdx].fix}</p>
                          <p className="text-slate-300 mt-1 font-semibold">{bugHunterCases[selectedBugIdx].explanation}</p>
                        </div>
                      ) : (
                        <div className="bg-rose-500/15 border-rose-500/30 p-3 rounded-xl text-rose-300">
                          <p className="font-bold flex items-center gap-1.5">❌ تمويه مغلوط! لقد وقعت في المصيدة!</p>
                          <p className="mt-1">هذا التصريح حقيقة علمية منهجية مثبتة لا لبس فيها. لا تصطد النوايا السليمة، وابحث عن الثغرة في التصريحات الأخرى!</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {bugSolved && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 80 }}
                      className="bg-[#10b981]/10 border border-[#10b981]/20 p-4 rounded-2xl text-center flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} className="text-amber-400 animate-spin" />
                      <span className="text-xs font-black text-emerald-300">✨ بركت جهودك! تم قفل المختبر وحل الثغرات العلمية بنجاح منقطع النظير!</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}
    </div>
  );
};
