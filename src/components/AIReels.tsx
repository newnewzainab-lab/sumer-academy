import React, { useState } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  Smartphone,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Tv,
  MessageSquare,
  ThumbsUp,
  Share2,
  Heart,
  Flame,
  Award,
  Zap,
  Bookmark,
  Camera,
  Music,
  MoreVertical
} from "lucide-react";

interface AIReelsProps {
  category?: "continuous" | "university" | "school";
}

export const AIReels: React.FC<AIReelsProps> = ({ category = "continuous" }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Custom states
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    r1: 495,
    r2: 820,
    r3: 310,
    r4: 670,
    rc_1: 231,
    rc_2: 442,
    rc_3: 156,
    rc_4: 412,
    rs_1: 499,
    rs_2: 322,
    rs_3: 110,
    rs_4: 512
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  
  // Instagram reels specific states
  const [savedReels, setSavedReels] = useState<Record<string, boolean>>({});
  const [followedSpeakers, setFollowedSpeakers] = useState<Record<string, boolean>>({});
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [heartPopPosition, setHeartPopPosition] = useState({ x: 150, y: 220 });

  const [userComment, setUserComment] = useState("");
  const [commentsList, setCommentsList] = useState<Record<string, { author: string; text: string }[]>>({
    r1: [
      { author: "أحمد الموصلي", text: "شرح رائع جداً بسط لي مفهوم المقاومة والأوم!" },
      { author: "سارة جابر", text: "الفيديو القصير يغني عن محاضرة كاملة مدتها ساعة." }
    ],
    r2: [
      { author: "رائد الحديثي", text: "أتمنى إضافة ريل عن محركات الطائرات الحديثة." }
    ],
    rc_1: [
      { author: "نور الهدى", text: "الفكرة عظيمة جداً، أحتاج لتطبيقها في روتيني الدراسي!" }
    ],
    rs_1: [
      { author: "طالب بكالوريا", text: "مفهوم الميتوكندريا و إنتاج الطاقة تبسط بشكل كامل!" }
    ]
  });

  const [customReelTopic, setCustomReelTopic] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Filtered Reels Pool based on active Tab Category
  const CONTINUOUS_REELS = [
    {
      id: "rc_1",
      titleAr: "مهارات إدارة الوقت وحرب المشتتات",
      titleEn: "Time Management & Anti-Distraction Skills",
      speakerName: "د. هدى صالح (مدربة دولية)",
      voiceText: "تخيل يومك كصندوق يحتوي على ميزانية ثابتة من الساعات والدقائق. المشتتات وهواتفنا تسرق هذه الثروة دون أن نشعر! ابدأ بطريقة 'بومودورو' (25 دقيقة تركيز تام، تليها 5 دقائق راحة) لترويض عقلك وزيادة منسوب إنتاجيتك بالثواني.",
      componentType: "mental",
      accent: "text-amber-400",
      stats: "32K مشاهدة"
    },
    {
      id: "rc_2",
      titleAr: "هندسة الإلقاء ومواجهة الجمهور بجاذبية",
      titleEn: "Presentation & Public Speaking Masterclass",
      speakerName: "أ. جعفر المياحي (أستاذ التمكين)",
      voiceText: "الخوف من مواجهة الجمهور هو أمر طبيعي جداً وعصبي! يكمن الحل في تدريب حنجرتك وأدوات جسدك. تكلّم بلغة جسد منفتحة، خذ نفساً عميقاً من حجابك الحاجز، واجعل أول 30 ثانية من حديثك قصة تفاعلية تجذب العقول فوراً.",
      componentType: "mental",
      accent: "text-blue-400",
      stats: "19K مشاهدة"
    },
    {
      id: "rc_3",
      titleAr: "بناء العادة البرمجية وتحدي التكرار اليومي",
      titleEn: "Creating Atomic Code Habits",
      speakerName: "مهندس برمجيات حكيم",
      voiceText: "كتابة سطر برمجي واحد يومياً أفضل من دراسة 10 ساعات متواصلة في عطلة نهاية الأسبوع! العقل يبني مساراته البرمجية والمنطقية بالتواتر والاستدامة. حدد وقتاً ثابتاً لا تساوم عليه، كود، كود، كود، وسترى النتائج المزهلة في فترة قصيرة جداً.",
      componentType: "binary",
      accent: "text-emerald-400",
      stats: "41K مشاهدة"
    },
    {
      id: "rc_4",
      titleAr: "فن التفاوض الفعّال وصياغة الاقتراحات المقنعة",
      titleEn: "Effective Negotiation & Persuasion Patterns",
      speakerName: "أ. عمر خالد (مدرب ريادة الأعمال)",
      voiceText: "التفاوض ليس حرباً ينتصر فيها طرف ويهزم الآخر، بل هو جسر لصياغة مصلحة متبادلة مستديمة. استمع أكثر مما تتكلم، افهم مخاوف الشخص المقابل بالكامل، وحضر سيناريو الربح المشترك (Win-Win) لكي تضمن قبول اقتراحاتك المهنية بسلاسة تامة.",
      componentType: "mental",
      accent: "text-red-400",
      stats: "11K مشاهدة"
    }
  ];

  const UNIVERSITY_REELS = [
    {
      id: "r1",
      titleAr: "مقاومة تيار وهيدروليكا السوائل والكهرباء",
      titleEn: "Fluid Dynamics vs Electrical Resistors",
      speakerName: "مقاوم كربوني 100 أوم (الذكاء الاصطناعي)",
      voiceText: "مرحباً طلاب الهندسة! أنا المقاومة الكهربائية. وظيفتي في الدائرة هي تضييق معبر الإلكترونات لتقليل غزارة التيار وحماية القطع الحساسة الأخرى. كلما زاد طولي أو قلّ قطر ناقلي، زادت مقاومتي الكهربائية، تماماً كشكل أنبوب المياه الاختناقي ميكانيكياً!",
      componentType: "resistor",
      accent: "text-red-500",
      stats: "15K مشاهدة"
    },
    {
      id: "r2",
      titleAr: "حركة المكابس محرك الاحتراق الداخلي",
      titleEn: "Mechanics of Thermodynamic Pistons",
      speakerName: "المكبس الترددي الثالث (نقابة المدربين)",
      voiceText: "أهلاً بكم في ورشة الميكانيكا! أنا المكبس في المحرك. دوري محوري في تحويل الطاقة الكيميائية الكامنة في وقود السيارات تحت ضغط الانفجار الهائل إلى حركة ميكانيكية دورانية مستمرة، بفضل ذراع التوصيل والعمود المرفقي!",
      componentType: "piston",
      accent: "text-amber-500",
      stats: "24K مشاهدة"
    },
    {
      id: "r3",
      titleAr: "بوابة الـ AND المنطقية في الحواسب المعاصرة",
      titleEn: "Logical AND Gate Design Pattern",
      speakerName: "المعالج الرقمي الصغير (منسق المعرفة)",
      voiceText: "أنا حجر الأساس في بنية معالجكم اليوم! كبوابة منطق AND، لا أسمح للإشارات الرقمية بالمرور كنبضة واحدة (1) أبداً إلا في حالة واحدة فريدة: عندما يكون المدخل الأول والمدخل الثاني نشطين معاً بالرمز 1! بدونهما أظل مطفأً تماماً.",
      componentType: "binary",
      accent: "text-blue-500",
      stats: "9.5K مشاهدة"
    }
  ];

  const SCHOOL_REELS = [
    {
      id: "rs_1",
      titleAr: "طاقة الـ ATP وعملية التفسير في علم الأحياء (سادس علمي)",
      titleEn: "Mitochondria & ATP Chemistry Grade 12",
      speakerName: "أ. حيدر عباس (مدرس الأحياء)",
      voiceText: "أعزائي طلبة السادس الإعدادي! الميتوكندريا هي بيوت الطاقة الحقيقية في خلاياكم. تقوم بصهر السكريات التي نتناولها وتمرير الإلكترونات لإنتاج جزيئات ATP، العملة النقدية لكل حركة، تنفس، أو فكرة برمجية تخطر ببالكم!",
      componentType: "resistor",
      accent: "text-rose-400",
      stats: "48K مشاهدة"
    },
    {
      id: "rs_2",
      titleAr: "مبادئ علم الضوء ومفهوم الانكسار والعدسات",
      titleEn: "Optics and Light Refraction Physics",
      speakerName: "أ. نورا سالم (مدرسة الفيزياء)",
      voiceText: "مرحباً يا أبطال! لماذا يظهر القلم مكسوراً عند وضعه في نصف كوب من الماء؟ الجواب هو انكسار الضوء! عندما ينتقل شعاع الضوء من وسط شفاف منخفض الكثافة (الهواء) إلى مادة عالية الكثافة (الماء)، فإنه يغير اتجاهه وسرعته فورياً.",
      componentType: "piston",
      accent: "text-cyan-400",
      stats: "21K مشاهدة"
    },
    {
      id: "rs_3",
      titleAr: "الحساب الذهني السريع وتنمية الفص الأيمن",
      titleEn: "Abacus & Mental Math Sumerian Logic",
      speakerName: "المدرب الرقمي المساعد (نقابة المدربين)",
      voiceText: "أهلاً بكم يا براعم المستقبل! الحساب الذهني ليس مجرد رياضيات سريعة، بل هو تمرين محوري يربط الخلايا العصبية للفص الأيمن البصري مع الفص الأيسر المنطقي، لتخيل العداد وحل المسائل المعقدة في رمشة عين وبدون آلة حاسبة!",
      componentType: "mental",
      accent: "text-emerald-500",
      stats: "18K مشاهدة"
    }
  ];

  // Get active list matching selected category
  const reelsData = category === "continuous" 
    ? CONTINUOUS_REELS 
    : category === "university" 
      ? UNIVERSITY_REELS 
      : SCHOOL_REELS;

  const currentReel = reelsData[activeReelIndex] || reelsData[0];

  const handleNext = () => {
    setActiveReelIndex((prev) => (prev + 1) % reelsData.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setActiveReelIndex((prev) => (prev === 0 ? reelsData.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleLike = (id: string) => {
    const check = hasLiked[id];
    setHasLiked({ ...hasLiked, [id]: !check });
    setLikesCount({
      ...likesCount,
      [id]: check ? likesCount[id] - 1 : likesCount[id] + 1
    });
  };

  const addComment = () => {
    if (!userComment.trim()) return;
    const currentList = commentsList[currentReel.id] || [];
    setCommentsList({
      ...commentsList,
      [currentReel.id]: [...currentList, { author: "أنت (طالب أكاديمية سومر)", text: userComment }]
    });
    setUserComment("");
  };

  const handleCreateCustomReel = () => {
    if (!customReelTopic.trim()) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      // Inject generated custom reel into database
      const newReel = {
        id: `custom_${Date.now()}`,
        titleAr: `شرح تفاعلي فورياً: ${customReelTopic}`,
        titleEn: `AI Generated Concept Reel`,
        speakerName: "روبوت المعرفة المتكلم",
        voiceText: `لقد تسلم الذكاء الاصطناعي موضوعك: (${customReelTopic}) وفككه إلى سيناريو ريلز جذاب! إن دراسة هذا الموضوع تعزز الفهم العصبي التطبيقي له، وندعوك لدمج هذه الخلاصة اللحظية في مذكرات التدريب والامتحانات المدرسية المعيارية.`,
        componentType: activeReelIndex % 2 === 0 ? "resistor" : "binary",
        accent: "text-amber-400",
        stats: "توليد شخصي مخصص الآن"
      };

      reelsData.push(newReel);
      setCommentsList({
        ...commentsList,
        [newReel.id]: [{ author: "المشرف الذكي", text: "تم توليد هذا الريل خصيصاً لمساندتك المنهجية." }]
      });
      setLikesCount({ ...likesCount, [newReel.id]: 1 });
      setActiveReelIndex(reelsData.length - 1);
      setIsSynthesizing(false);
      setCustomReelTopic("");
    }, 2000);
  };

  const handleBookmark = (id: string) => {
    const isSaved = !!savedReels[id];
    setSavedReels({ ...savedReels, [id]: !isSaved });
  };

  const handleToggleFollow = (speakerName: string) => {
    const isFollowing = !!followedSpeakers[speakerName];
    setFollowedSpeakers({ ...followedSpeakers, [speakerName]: !isFollowing });
  };

  const handleDoubleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHeartPopPosition({ x, y });
    setShowHeartPop(true);
    
    if (!hasLiked[currentReel.id]) {
      handleLike(currentReel.id);
    }
    
    setTimeout(() => {
      setShowHeartPop(false);
    }, 850);
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 p-6 md:p-8 rounded-[32px] shadow-2xl border border-zinc-200 text-right font-sans relative overflow-hidden">
      {/* Absolute neon flares */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar and branding */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-zinc-200 pb-6">
        <div>
          <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2 shadow-sm">
            <Flame size={12} className="animate-pulse text-rose-500" /> ريلز المعرفة الشاملة | SUMER REELS
          </span>
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight font-display">
            منصة الفاشكارد والريلزات التوليدية الذكية
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-medium">
            شاهد محاكاة حية متطورة لكل قانون أثري أو قاعدة رياضية أو حاسوبية في ثوانٍ معدودة.
          </p>
        </div>

        {/* Generate Custom Reel Input Header */}
        <div className="bg-white p-3 rounded-2xl border border-zinc-200 flex items-center gap-2 max-w-sm w-full shadow-sm">
          <input
            type="text"
            value={customReelTopic}
            onChange={(e) => setCustomReelTopic(e.target.value)}
            placeholder="اكتب موضوعاً لتوليد ريل مخصص..."
            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-rose-500 font-medium transition-all text-right"
          />
          <button
            onClick={handleCreateCustomReel}
            disabled={isSynthesizing}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 disabled:bg-zinc-250 disabled:text-zinc-400 text-white font-extrabold text-[11px] px-4 py-2 rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
          >
            {isSynthesizing ? <RefreshCw size={12} className="animate-spin" /> : "ابتكر ريلز"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* RIGHT: Selected Reel Detailed Meta, Comments, and Synthesizer Controls (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Active Title */}
          <div className="bg-zinc-900/85 p-5 rounded-3xl border border-zinc-800/80 space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-gradient-to-r from-rose-400 to-amber-300 text-transparent bg-clip-text font-black uppercase tracking-wide font-mono">
                {currentReel.stats}
              </span>
              <span className="bg-zinc-950 text-zinc-400 text-[10px] px-2.5 py-1 rounded-full font-bold border border-zinc-805">
                {currentReel.id.startsWith("custom_") ? "توليد مستخدم" : "وحدة معتمدة"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-zinc-100 tracking-tight leading-snug">
              {currentReel.titleAr}
            </h4>
            <p className="text-xs text-zinc-500 font-mono">
              {currentReel.titleEn}
            </p>
          </div>

          {/* Interactive Simulated Voice AI Transcript */}
          <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/50 space-y-3 relative overflow-hidden group shadow-md backdrop-blur-sm">
            <h5 className="font-bold text-xs text-rose-400/90 flex items-center gap-1.5 justify-start">
              <Volume2 size={13} className="text-rose-400" /> النص الصوتي المنقح (موجات الذكاء):
            </h5>
            <p className="text-xs text-zinc-200 leading-relaxed font-medium">
              {currentReel.voiceText}
            </p>

            {/* Simulated Live Audio Waveform bar indicator */}
            <div className="pt-2 border-t border-zinc-850 flex items-end justify-center gap-0.5 h-10">
              {Array.from({ length: 28 }).map((_, i) => {
                const randHeight = Math.floor(Math.random() * 24) + 4;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-t bg-gradient-to-t from-rose-500 to-pink-400 transition-all ${
                      isPlaying ? "animate-pulse" : "opacity-30"
                    }`}
                    style={{
                      height: isPlaying ? `${randHeight}px` : "6px",
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Reel Comment Section */}
          <div className="bg-zinc-900/65 p-5 rounded-3xl border border-zinc-800/80 space-y-4 shadow-xl">
            <h5 className="font-bold text-xs text-zinc-300 flex items-center justify-start gap-1">
              <MessageSquare size={13} className="text-rose-400" /> نقاشات الزملاء حول الريل:
            </h5>
            
            <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1 text-right scrollbar-thin scrollbar-thumb-zinc-800">
              {(commentsList[currentReel.id] || []).map((cmt, cIdx) => (
                <div key={cIdx} className="bg-zinc-950/90 p-2.5 rounded-xl border border-zinc-805 text-xs shadow-inner">
                  <p className="font-bold text-rose-400 text-[10px] mb-0.5">{cmt.author}:</p>
                  <p className="text-zinc-300 font-medium leading-normal">{cmt.text}</p>
                </div>
              ))}
              {(!commentsList[currentReel.id] || commentsList[currentReel.id].length === 0) && (
                <p className="text-[11px] text-zinc-500 text-center py-2">كن أول من يكتب تساؤلاً أو تعليقاً علمياً!</p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="اطرح سؤالاً أو تعليقاً..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 outline-none focus:border-rose-500 text-right transition-all font-medium"
              />
              <button
                onClick={addComment}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-800 hover:border-zinc-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
              >
                تعليق
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: Simulated 3D Instagram Reels Smartphone Player (5 Columns) */}
        <div className="lg:col-span-5 flex justify-center py-2">
          
          <div 
            onDoubleClick={handleDoubleTap}
            className="relative w-80 aspect-[9/16] bg-gradient-to-b from-[#0e0e11] to-[#010103] rounded-[48px] border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col justify-between p-4 text-white hover:border-zinc-850 transition-all cursor-pointer select-none group ring-1 ring-black/40"
            title="انقر مزدوجاً للإعجاب بالريل! ❤"
          >
            {/* Ambient Background Glow inside phone */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-rose-500/10 mix-blend-color-dodge pointer-events-none z-10" />

            {/* Phone Top Speaker & Camera Notch visual detail */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-b-xl z-30 flex items-center justify-center">
              <div className="w-10 h-0.5 bg-zinc-650 rounded-full mb-0.5" />
              <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full ml-1.5 mb-0.5" />
            </div>

            {/* Custom Instagram Reels Header Overlay */}
            <div className="flex items-center justify-between z-20 pt-4 px-2">
              <ChevronRight size={18} className="cursor-pointer text-white/85 hover:text-white transition-colors" />
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Flame size={12} className="text-rose-500 animate-pulse animate-bounce" />
                <span className="text-[10px] font-bold tracking-wider font-sans text-rose-300">ريلز سومر</span>
              </div>
              <Camera size={18} className="cursor-pointer text-white/85 hover:text-white transition-colors" />
            </div>

            {/* Heart Pop Animation on Double Tap */}
            {showHeartPop && (
              <div 
                className="absolute z-50 pointer-events-none scale-150 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${heartPopPosition.x}px`,
                  top: `${heartPopPosition.y}px`,
                }}
              >
                <Heart size={72} className="text-rose-500 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.9)] animate-ping" />
              </div>
            )}

            {/* Floating Action Buttons Column on the Left (Instagram layout style) */}
            <div className="absolute left-3 bottom-24 flex flex-col items-center gap-4 z-30">
              
              {/* Heart Likes Button with pulse effect */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(currentReel.id);
                }}
                className="flex flex-col items-center group/btn cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-75 ${
                  hasLiked[currentReel.id] 
                    ? "bg-rose-600/30 text-rose-500 border border-rose-500/30" 
                    : "bg-zinc-900/60 text-white border border-white/10 hover:bg-zinc-900/80"
                }`}>
                  <Heart size={20} fill={hasLiked[currentReel.id] ? "#f43f5e" : "none"} className={hasLiked[currentReel.id] ? "animate-pulse" : "group-hover/btn:scale-110 transition-transform"} />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">{likesCount[currentReel.id]}</span>
              </button>

              {/* Comments count with scroll prompt */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const cInput = document.querySelector('input[placeholder="اطرح سؤالاً أو تعليقاً..."]') as HTMLInputElement;
                  if (cInput) {
                    cInput.focus();
                    cInput.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex flex-col items-center group/btn cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/60 text-white border border-white/10 backdrop-blur-md hover:bg-zinc-900/80 transition-all active:scale-75">
                  <MessageSquare size={18} className="group-hover/btn:scale-115 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">{(commentsList[currentReel.id] || []).length}</span>
              </button>

              {/* Share button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`تم نسخ رابط ريلز "${currentReel.titleAr}" بنجاح! انسخه للزملاء لنشر الفائدة العلمية.`);
                }}
                className="flex flex-col items-center group/btn cursor-pointer"
                title="مشاركة الريل"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/60 text-white border border-white/10 backdrop-blur-md hover:bg-zinc-900/80 transition-all active:scale-75">
                  <Share2 size={18} className="group-hover/btn:scale-115 transition-transform" />
                </div>
                <span className="text-[9px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">نشر</span>
              </button>

              {/* Bookmark Save button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark(currentReel.id);
                }}
                className="flex flex-col items-center group/btn cursor-pointer"
                title="حفظ إلى المحفوظات"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-75 ${
                  savedReels[currentReel.id]
                    ? "bg-rose-600/30 text-rose-500 border border-rose-500/30"
                    : "bg-zinc-900/60 text-white border border-white/10 hover:bg-zinc-900/80"
                }`}>
                  <Bookmark size={18} fill={savedReels[currentReel.id] ? "#f43f5e" : "none"} className="group-hover/btn:scale-115 transition-transform" />
                </div>
                <span className="text-[9px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">
                  {savedReels[currentReel.id] ? "محفوظ" : "حفظ"}
                </span>
              </button>

            </div>

            {/* Interactive Visual Schematic Container in Center of Phone */}
            <div className="flex-1 flex items-center justify-center p-2 z-15 mt-8 mb-24 w-full">
              {currentReel.componentType === "resistor" && (
                <div className="space-y-4 w-full text-center">
                  <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2.5 py-1 rounded font-bold border border-rose-500/20 inline-block">مخطط المقاومة والـ e-</span>
                  
                  {/* Resistor Visual Schematic */}
                  <div className="relative flex items-center justify-center h-14">
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
                    <div className="absolute w-28 h-8 bg-gradient-to-r from-purple-500/20 via-zinc-900 to-rose-500/20 border border-zinc-800 rounded-xl flex items-center justify-around px-2 shadow-lg">
                      <div className="w-2 h-full bg-rose-600 rounded-sm" />
                      <div className="w-2 h-full bg-purple-600 rounded-sm" />
                      <div className="w-2 h-full bg-zinc-700 rounded-sm" />
                    </div>
                  </div>

                  {/* Electron Particles Simulation */}
                  <div className="relative flex justify-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((e) => (
                      <div
                        key={e}
                        className={`w-5 h-5 bg-gradient-to-br from-rose-500 to-purple-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0 ${
                          isPlaying ? "animate-bounce" : ""
                        }`}
                        style={{ animationDelay: `${e * 0.15}s` }}
                      >
                        e-
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80 text-[9px] text-zinc-300 text-center leading-relaxed font-medium">
                    التفسير: تمنع المقاومة تدفق الشحنات لحماية الأجهزة، محولة الطاقة الكهربائية المهدرة لحرارة.
                  </div>
                </div>
              )}

              {currentReel.componentType === "piston" && (
                <div className="space-y-3 w-full text-center">
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded font-bold border border-purple-500/20 inline-block">تمدد الغاز وشوط الانفجار</span>
                  
                  {/* Piston Schematic Representation */}
                  <div className="w-20 h-28 border-2 border-zinc-800 rounded-xl mx-auto relative overflow-hidden flex items-end justify-center bg-zinc-950 p-1">
                    
                    {/* Fire Sparks Overlay when firing */}
                    <div
                      className={`absolute top-1 inset-x-1 h-9 bg-gradient-to-b from-rose-600 to-purple-500/10 rounded-t-lg transition-opacity duration-200 ${
                        isPlaying ? "animate-pulse opacity-100" : "opacity-20"
                      }`}
                    />

                    {/* Reciprocating block */}
                    <div
                      className={`w-16 h-10 bg-gradient-to-t from-zinc-700 to-zinc-600 border border-zinc-500 rounded-lg shadow-xl absolute bottom-1.5 z-10 transition-all ${
                        isPlaying ? "animate-piston-cycle" : "bottom-1.5"
                      }`}
                    />

                    {/* Spark plug terminal */}
                    <div className="absolute top-0 w-2.5 h-3 bg-zinc-800 rounded-b" />
                  </div>

                  <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80 text-[9px] text-zinc-300 text-center leading-relaxed font-medium">
                    التحليل: ضغط احتراق الوقود يدفع المكبس للأسفل، تحرك ذراع التوصيل والعمود المرفقي للسيارة.
                  </div>
                </div>
              )}

              {currentReel.componentType === "binary" && (
                <div className="space-y-3 w-full text-center">
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold border border-purple-500/20 inline-block">بوابة الـ AND المنطقية</span>
                  
                  <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-805 space-y-2.5">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-zinc-400 text-right">
                        <span className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800/50">أ = 1 (مرتفع)</span>
                        <span className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800/50">ب = 1 (مرتفع)</span>
                      </div>
                      <div className="w-12 h-10 border border-purple-900 bg-purple-950/40 rounded-r-2xl border-l-2 border-l-rose-500 flex items-center justify-center font-display text-[11px] font-bold text-rose-300">
                        AND
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/50 p-1 rounded font-mono border border-emerald-500/20">صاد = 1</span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-ping" : "bg-zinc-650"}`} />
                      <span className="text-[9px] text-zinc-350 font-bold">الخرج صحيح ويفعّل المسار</span>
                    </div>
                  </div>

                  <p className="text-[8px] text-zinc-500 font-medium">
                    * ركيزة العقل البشري لتبرير العمليات المعالجة في الحواسب الحالية.
                  </p>
                </div>
              )}

              {currentReel.componentType === "mental" && (
                <div className="space-y-4 w-full text-center">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/10 inline-block">محاكاة تدريب السوروبان الذكي</span>
                  
                  {/* Soroban Interactive Abacus simulation */}
                  <div className="bg-zinc-900/40 border border-zinc-800/80 p-2.5 rounded-xl space-y-1.5">
                    <div className="h-0.5 bg-zinc-800 rounded-full" />
                    {/* Columns representing abacus rods */}
                    <div className="flex justify-around items-center py-1 relative h-12">
                      {Array.from({ length: 5 }).map((r, i) => (
                        <div key={i} className="w-0.5 bg-zinc-700 h-full relative flex flex-col justify-between items-center">
                          {/* Upper deck bead */}
                          <div className={`w-3.5 h-1.5 bg-rose-500 border border-rose-600 rounded-full absolute -top-0.5 cursor-pointer transition-transform ${isPlaying ? "translate-y-1" : "translate-y-0"}`} />
                          
                          {/* Lower deck beads */}
                          <div className={`w-3.5 h-1.5 bg-zinc-400 border border-zinc-500 rounded-full absolute bottom-0.5 cursor-pointer transition-transform ${isPlaying ? "-translate-y-0.5" : "-translate-y-3"}`} />
                          <div className="w-3.5 h-1.5 bg-zinc-400 border border-zinc-500 rounded-full absolute bottom-3 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                    <div className="h-0.5 bg-zinc-800 rounded-full" />
                  </div>

                  <div className="bg-zinc-950/80 p-2 text-[9px] text-zinc-300 leading-normal font-medium rounded-xl border border-zinc-800/50">
                    طريقة سومر: تخيل الحركات والخرز وربط القنوات البصرية لخلق مهارة حساب لحظي مذهلة.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Overlay: Instagram Reels Description & Details (Always clear and visible) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pb-6 pt-16 z-20 flex flex-col gap-2 rounded-b-[40px] pr-12 text-right">
              
              {/* Profile info rows */}
              <div className="flex items-center gap-2 justify-start">
                {/* Micro avatar */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-[9px] text-amber-300">
                    S
                  </div>
                </div>
                
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-black text-amber-300 flex items-center gap-1">
                    @sumer_academy
                  </span>
                  <span className="text-[8px] text-white/60 font-semibold leading-none">{currentReel.speakerName}</span>
                </div>

                {/* Follow Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFollow(currentReel.speakerName);
                  }}
                  className={`px-3 py-0.5 rounded-full text-[9px] font-black border transition-all cursor-pointer ${
                    followedSpeakers[currentReel.speakerName] 
                      ? "bg-white/10 text-slate-300 border-white/20" 
                      : "bg-[#0095f6] text-white border-[#0095f6] hover:bg-[#1877f2]"
                  }`}
                >
                  {followedSpeakers[currentReel.speakerName] ? "متابع ✓" : "متابعة"}
                </button>
              </div>

              {/* Reel Title Caption */}
              <p className="text-white text-[11px] font-bold leading-tight line-clamp-2 md:line-clamp-none pl-2">
                {currentReel.titleAr}
              </p>

              {/* Music marquee ticker exactly like Instagram */}
              <div className="flex items-center gap-1 text-slate-300 text-[9px] mt-1 pr-1 bg-white/5 py-1 px-2 rounded-md border border-white/5 w-40 overflow-hidden whitespace-nowrap">
                <Music size={10} className="shrink-0 text-amber-400 animate-pulse" />
                <div className="overflow-hidden w-full h-3.5 relative">
                  <marquee scrollamount="2.5" direction="right" className="font-mono text-slate-300 inline-block">
                    {currentReel.speakerName} • الصوت الأصلي لأكاديمية سومر المزدوجة
                  </marquee>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* LEFT: Quick Carousel navigation and list of other available reels (3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800/80 space-y-4 shadow-xl">
            <h5 className="font-bold text-xs text-rose-400 flex items-center justify-start gap-1 pb-2 border-b border-zinc-800/60">
              <Tv size={14} className="text-rose-400" /> ريلز المعرفة المتوفرة في العراق:
            </h5>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-right scrollbar-thin scrollbar-thumb-zinc-800">
              {reelsData.map((rl, index) => {
                const isActive = activeReelIndex === index;
                return (
                  <div
                    key={rl.id}
                    onClick={() => {
                      setActiveReelIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border text-right space-y-1 relative group ${
                      isActive
                        ? "bg-zinc-950 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/30 scale-[1.02]"
                        : "bg-zinc-900/40 hover:bg-zinc-900 border-zinc-850"
                    }`}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-[8px] bg-zinc-850 text-rose-400 px-1.5 py-0.2 rounded font-mono font-bold">
                        {rl.id.startsWith("custom_") ? "مستخدم" : `ريلز ${index + 1}`}
                      </span>
                      <h6 className="font-bold text-xs text-zinc-100 group-hover:text-white transition-colors line-clamp-1">{rl.titleAr}</h6>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-mono text-left">{rl.titleEn}</p>
                  </div>
                );
              })}
            </div>

            {/* Slide Navigation Action bars */}
            <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3">
              <span className="text-[10px] text-zinc-400">انقر لتحديد المعرفة</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  title="السابق"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  title="التالي"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>

            {/* Play/Pause Global Action Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all text-center"
            >
              {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white" />}
              {isPlaying ? "إيقاف مؤقت للريل" : "استئناف تشغيل الريل"}
            </button>
          </div>

          {/* Quick Informative Badge representing SDG Impact */}
          <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-900 space-y-1.5 text-right">
            <h6 className="text-[11px] font-bold text-emerald-400 flex items-center justify-end gap-1">
              <Award size={12} /> أهداف التنمية المستدامة (SDG 4)
            </h6>
            <p className="text-[10px] text-zinc-400 leading-normal">
              تدعم ريلز المعرفة جودة التعليم المجاني والتفاعلي البصري لكل الطلبة في العراق والوطن العربي دون حواجز مادية.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
