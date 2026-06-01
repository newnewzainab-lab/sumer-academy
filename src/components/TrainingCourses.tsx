import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  BookMarked,
  PlayCircle,
  FileText,
  UserCheck,
  Check,
  RotateCcw,
  BookOpenCheck
} from "lucide-react";

interface TrainingCoursesProps {
  onClaimCert: (courseTitle: string) => void;
  completedCourses: string[];
}

export const TrainingCourses: React.FC<TrainingCoursesProps> = ({ onClaimCert, completedCourses }) => {
  // Level State: null if not tested yet
  const [recommendedLevel, setRecommendedLevel] = useState<"Beginner" | "Advanced" | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(["1"]); // Default enroll in first course
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  
  // Quiz per course states
  const [courseQuizAnswers, setCourseQuizAnswers] = useState<Record<number, number>>({});
  const [courseQuizFinished, setCourseQuizFinished] = useState(false);
  const [courseQuizScore, setCourseQuizScore] = useState(0);

  // Diagnostic Placement Test Questions
  const PLACEMENT_QUESTIONS = [
    {
      q: "عند كتابة جملة شرطية في البرمجة لتنفيذ كود معين فقط عندما يكون الرقم زوجياً، ما هو التعبير المنطقي الأصح للاستعمال؟",
      options: [
        "تقسيم المتغير على اثنين يساوي صفر (x / 2 == 0)",
        "التأكد من أن باقي القسمة على اثنين يساوي صفر (x % 2 == 0)",
        "حساب ناتج الضرب بـ اثنين يساوي واحد (x * 2 == 1)",
        "استعمال دالة التدوير التلقائي للأعشار"
      ],
      correct: 1,
      explanation: "باقي القسمة % 2 يساوي صفر دائماً للأعداد الزوجية في لغات البرمجة الشائعة."
    },
    {
      q: "عند بناء مشروع تقني متكامل، ما هي المنهجية الأفضل لتقليل الضغط وتلافي تراكم المهام بنجاح؟",
      options: [
        "تأجيل كافة التفاصيل البرمجية حتى أسبوع التسليم النهائي للتركيز الكثيف.",
        "الإنشاء العشوائي الفوري بدون مسودات مسبقة.",
        "تقسيم المخرجات لأجزاء دورية صغيرة (سبرنتس) وفحصها تدريجياً (Agile Sprint).",
        "تعهيد كامل المشروع لطرف خارجي دون مراجعة جودتها."
      ],
      correct: 2,
      explanation: "المنهجيات الرشيقة (Agile) ومفهوم الـ Sprint يساعد في تقسيم العمل وتخفيض المخاطر الفنية."
    },
    {
      q: "ما هي الفكرة الأساسية وراء استخدام تقنيات الحوسبة السحابية (Cloud Computing) للمؤسسات والشركات؟",
      options: [
        "الوصول المرن والآمن للموارد الحاسوبية والبيانات عبر الإنترنت وتقنين النفقات الإنشائية لخوادم محلية.",
        "أنها تجعل الإنترنت يعمل بسرعة مضاعفة بدون كابل خارجي.",
        "استبدال جميع المبرمجين البشريين وتحويل العمليات كلياً للروبوت التلقائي.",
        "الاستغناء الذاتي التام عن الكهرباء ومصادر الطاقة."
      ],
      correct: 0,
      explanation: "تمنح الحوسبة السحابية مرونة هائلة وتوفير ضخم للمؤسسات لاستئجار الموارد وتوسيعها حسب الحاجة."
    },
    {
      q: "في عالم قواعد البيانات، ما هي الفائدة الجوهرية من مصطلح 'تطبيع البيانات' (Data Normalization)؟",
      options: [
        "تحويل كافة النصوص إلى ملفات صور.",
        "تكرار الجداول بشكل كبير حتى لا تضيع البيانات عند تلف الخادم الرئيسي.",
        "تنسيق العلاقات وتقليل التكرار غير المفيد لمنع شواذ التحديث والحذف.",
        "جعل البيانات متاحة للجميع بدون تشفير أو مصادقة هوية."
      ],
      correct: 2,
      explanation: "تطبيع البيانات يحمي البيانات من الشذوذ البرمجي والتشوهات لتقسيم الجداول بعلاقات منطقية."
    },
    {
      q: "كيف تصف دقة وآلية صياغة الأجوبة في النماذج اللغوية الكبيرة (LLMs) مثل Gemini؟",
      options: [
        "النسخ الحرفي الفوري لصفحات الإنترنت ونصوص ويكيبيديا دون تمييز أو صهر علمي.",
        "تخمين وتوقع الكلمة التالية الأكثر احتمالاً وإفادة بناء على ترابط رياضي لمليارات البيانات المسبقة.",
        "الحفظ التلقائي لكل ما يكتبه المستخدم في جهازه ورفعه للقمر الصناعي.",
        "الإجابة عشوائياً بدون الالتزام بقواعد اللغة."
      ],
      correct: 1,
      explanation: "تعتمد النماذج الكبيرة على شبكات الانتباه العصبي لتوليد الكلمات بناء على الأوزان اللغوية والاحتمالات المتقاطعة."
    }
  ];

  // Training Courses Data modeled directly like Edraak MOOC paths
  const COURSES_DATABASE = [
    {
      id: "edraak-1",
      title: "أساسيات لغة بايثون للجميع (Python Python Basics)",
      titleAr: "أساسيات لغة بايثون والبرمجة النصية",
      description: "المسار الأكاديمي الشامل لتعلم خوارزميات التفكير وحل المشكلات باستخدام لغة بايثون.",
      level: "Beginner",
      instructor: "أ. جعفر المياحي (أكاديمية سومر)",
      duration: "أسبوعين (8 ساعات معتمدة)",
      image: "https://picsum.photos/seed/python/800/600",
      lessons: [
        { title: "مقدمة إلى لغات البرمجة وبيئات التطوير", content: "بايثون هي لغة برمجة عالية المستوى، تمتاز ببساطتها وقوتها المذهلة. لكتابة أول برنامج، نقوم بتنزيل بيئة Anaconda أو مفسر Python الأساسي واستخدام دالة print لطباعة النصوص البرمجية." },
        { title: "المتغيرات وأنواع البيانات الأساسية (Data Types)", content: "نتعلم هنا كيفية تعيين القيم للمتغيرات (Variables) مثل الأرقام الصحيحة Integer، والأعداد العشرية Float، والنصوص String، بالإضافة للقيمة المنطقية Boolean لمعرفة الحقيقة." },
        { title: "الجمل الشرطية والتحكم في سير البرنامج (Conditionals)", content: "تعمل جملة if و elif و else كمفترق طرق يقرر الحاسوب من خلاله المسار بناءً على تحقيق الشرط، مثل فحص درجات الطلاب للنجاح ومعدلات السعي." }
      ],
      quiz: [
        {
          question: "كيف نكتب دالة للطباعة على الشاشة بلغة بايثون؟",
          options: ["console.log('مرحباً')", "print('مرحباً')", "echo 'مرحباً'", "system.out.println('مرحباً')"],
          answerIndex: 1,
          explanation: "في بايثون نستخدم print مباشرة لسهولة الكود وعظم مرونته."
        },
        {
          question: "ما نوع البيانات الذي يمثل القيمة True أو False؟",
          options: ["String", "Integer", "Boolean", "Float"],
          answerIndex: 2,
          explanation: "المنطقيات Booleans هي التي تخزن القيم الثنائية الصادقة أو الكاذبة."
        }
      ]
    },
    {
      id: "edraak-2",
      title: "رحلة الريادة والابتكار المهني للشباب",
      titleAr: "بناء النماذج الاقتصادية وإطلاق المشاريع الذكية",
      description: "إعداد التفكير الاستثماري وصياغة دراسة الجدوى ومخطط نموذج العمل التجاري للرياديين في جمهورية العراق.",
      level: "Beginner",
      instructor: "د. هدى صالح (مستشارة الأعمال والتدريب)",
      duration: "3 أسابيع (12 ساعة معتمدة)",
      image: "https://picsum.photos/seed/business/800/600",
      lessons: [
        { title: "صياغة فكرة القيمة المقترحة (Value Proposition)", content: "أي عمل ناجح يجب أن يبدأ بحل مشكلة حقيقية يواجهها الزبون. القيمة المقترحة هي المنتج أو الخدمة التي تقدم حلاً فريداً أفضل مما يتكبده العميل حالياً." },
        { title: "مكونات مخطط نموذج العمل التجاري (Business Model Canvas)", content: "نحلل هنا المكونات التسعة التي تشمل شرائح العملاء، العلاقات، القنوات، مصادر الإيرادات، هيكل التكاليف، والأنشطة الرئيسية لنجاح وتسييل المشروع ريادياً." },
        { title: "تحديد الفجوات التمويلية وطرق العرض على المستثمرين", content: "تتعلم مهارة الـ Elevator Pitch لصياغة ملخص فكرتك في دقيقة واحدة وجذب القروض المتناهية الصغيرة والاعتمادات الوطنية لدراسة كفاءة المشروع." }
      ],
      quiz: [
        {
          question: "ما هو الاختصار الشهير لمخطط نموذج العمل التجاري ذو النقاط التسعة؟",
          options: ["ATS", "BMC", "SDG", "LLM"],
          answerIndex: 1,
          explanation: "يرمز BMC لمخطط نموذج العمل التجاري (Business Model Canvas)."
        }
      ]
    },
    {
      id: "edraak-3",
      title: "الذكاء الاصطناعي التوليدي والويب المتقدم",
      titleAr: "تطبيقات الـ AI وهندسة الأوامر وهياكل الكود الحية",
      description: "للغوص العميق في بناء البرمجيات المعتمدة على واجهات API وصنع بوتات تفاعلية ودمجها مع واجهات الويب.",
      level: "Advanced",
      instructor: "م. رامي محمد (أخصائي الذكاء التكاملي للبلد)",
      duration: "4 أسابيع (18 ساعة معتمدة)",
      image: "https://picsum.photos/seed/generativeai/800/600",
      lessons: [
        { title: "الثورة التوليدية وكيفية تدبير النماذج اللغوية", content: "ترتكز التقنيات الحديثة على دمج الاستدعاء التلقائي للمعلومات وتوليدها. نستخدم واجهات API لتلقي مدخلات المستخدمين وقيادة معالجة عالية السرعة." },
        { title: "هندسة الأوامر (Prompt Engineering) والتقنيات المعقدة", content: "للحصول على إجابات نموذجية دقيقة من الـ AI، يجب تخصيص الدور (Role)، وإعطاء سياق ومحددات إخراج صريحة (Few-shot learning)، لتقليل هلوسة النموذج بالكامل." },
        { title: "أصول دمج الـ AI مع تطبيقات الويب الحديثة (React Components)", content: "تطوير واجهة مستخدم مدمجة تستجيب للـ AI في الوقت الفعلي عبر استدعاءات الخلفية الأمنة وإسكان الاستجابات في تدفق متناسق وسليم." }
      ],
      quiz: [
        {
          question: "أي مما يلي يعد من الممارسات المثلى لهندسة الأوامر (Prompt Engineering)؟",
          options: [
            "كتابة أوامر غامضة وقصيرة جداً.",
            "تحديد دور مخصص ومراعاة السياق وبناء أمثلة مخرجات حقيقية.",
            "استخدام لغة غير معروفة للكمبيوتر.",
            "تكرار الأمر مئة مرة في دقيقة واحدة."
          ],
          answerIndex: 1,
          explanation: "منح سياق واضح، دور افتراضي، وأمثلة يضمن أعلى جودة للمخرجات بالنماذج اللغوية."
        }
      ]
    },
    {
      id: "edraak-4",
      title: "تحليل النظم البرمجية وهندسة قواعد البيانات السحابية",
      titleAr: "تصميم وإدارة البيانات ومستودعات التخزين المعقدة",
      description: "مسار متقدم لبناء الأنظمة الكبيرة وإدارة الموارد وتقسيم الحوسبة للمنشآت بكفاءة عالية.",
      level: "Advanced",
      instructor: "د. سامر الطائي (مستشار في نقابة المدربين العراقيين)",
      duration: "5 أسابيع (20 ساعة معتمدة)",
      image: "https://picsum.photos/seed/database/800/600",
      lessons: [
        { title: "تخطيط الأنظمة البرمجية ومخططات ERD المعقدة", content: "تصميم هياكل البيانات يكمن في ربط الجداول الكبيرة بعلاقات وطنية سليمة ثنائية ومنع التشوهات بالاستعلام والبحث." },
        { title: "تقنيات تحسين الاستعلامات والـ Indexing والتأمين السحابي", content: "عند اتساع حجم قاعدة البيانات، يساعد إنشاء الفهارس (Indexes) في تسريع عمليات البحث بمئات المرات مع خفض استهلاك معالجة السيرفر." },
        { title: "أمن البيانات بروتوكولات الحماية من هجمات الإسقاط (SQL Injection)", content: "حماية حقول الإدخال عبر استخدام الاستعلامات المبرمجة المسبقة (Prepared Statements) للتحقق الدقيق من صلاحيات المستخدمين وعزل المتسللين." }
      ],
      quiz: [
        {
          question: "ما التقنية الأفضل لحماية قواعد البيانات من هجمات حقن التعليمات الشائعة؟",
          options: [
            "تعطيل قاعدة البيانات نهائياً.",
            "الاستعلامات المعلمية الجاهزة (Prepared Statements / Parameterized Queries).",
            "السماح للجميع بالوصول للتخزين بدون كلمة مرور لتفادي الأخطاء.",
            "تحويل الجداول إلى صور ثابتة غير قابلة للتعديل."
          ],
          answerIndex: 1,
          explanation: "تضمن الاستعلامات المعلمية معاملة المدخلات كبيانات بحتة وليست كأوامر برمجية قابلة للتنفيذ."
        }
      ]
    }
  ];

  // Handle Diagnostic test answer choice
  const handleAnswerTest = (optIdx: number) => {
    const newAnswers = [...testAnswers, optIdx];
    setTestAnswers(newAnswers);

    if (currentQuestionIdx + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate Score
      let finalScore = 0;
      PLACEMENT_QUESTIONS.forEach((q, idx) => {
        if (newAnswers[idx] === q.correct) {
          finalScore += 1;
        }
      });

      setScore(finalScore);
      // If score >= 3 -> advanced, else beginner
      const determinedLevel = finalScore >= 3 ? "Advanced" : "Beginner";
      setRecommendedLevel(determinedLevel);
      setCurrentQuestionIdx(0);
      setTestAnswers([]);
      setShowTest(false);
    }
  };

  // Skip or reset test
  const handleResetTest = () => {
    setRecommendedLevel(null);
    setScore(null);
    setCurrentQuestionIdx(0);
    setTestAnswers([]);
    setShowTest(false);
    setActiveCourseId(null);
  };

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
    }
  };

  const startCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveLessonIdx(0);
    setCourseQuizAnswers({});
    setCourseQuizFinished(false);
    setCourseQuizScore(0);
  };

  const handleSelectCourseQuizAnswer = (qIdx: number, optIdx: number, correctIdx: number, quizLength: number) => {
    if (courseQuizAnswers[qIdx] !== undefined) return;
    setCourseQuizAnswers({ ...courseQuizAnswers, [qIdx]: optIdx });

    if (optIdx === correctIdx) {
      setCourseQuizScore((s) => s + 1);
    }

    if (Object.keys(courseQuizAnswers).length + 1 === quizLength) {
      setCourseQuizFinished(true);
    }
  };

  const handleClaimCertificate = (courseTitle: string) => {
    onClaimCert(courseTitle);
    alert(`🎉 كفو! تم إرسال وتوثيق شهادتك بمسار: "${courseTitle}" إلى صفحة ملفك الشخصي بنجاح وهي متوافقة مع معايير التدقيق المهني.`);
  };

  // Filter courses based on user's recommended level
  const filteredCourses = recommendedLevel 
    ? COURSES_DATABASE.filter(c => c.level === recommendedLevel)
    : COURSES_DATABASE;

  return (
    <div id="training-courses-section" className="space-y-8 text-right">
      
      {/* Dynamic Jumbotron Header with Mesopotamian star decor */}
      <div className="bg-gradient-to-r from-[#031e42] via-[#0A2E5C] to-blue-900 text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" /> بوابة الكورسات والتمكين المهني المدمجة
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-black leading-tight text-white">
            مناهج إدراك الوطنية للتطوير الكامـل
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
            بوابة متكاملة بالشراكة مع منهاج إدراك الوطني لتمكين الكفاءات. نطور هنا مسارات تدريبية تخصصية بمكافئ ذكاء اصطناعي، ونوفر اختبارات مستمرة تلائم متطلبات الجامعات والشركات الوطنية لتوجيه دراستك للمستوى المناسب فوراً.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="bg-white/10 px-4 py-2 border border-white/10 rounded-xl text-xs font-bold">
              مستوى المتعلم الحالي: <span className="text-amber-400 font-sans font-extrabold">{recommendedLevel ? (recommendedLevel === "Beginner" ? "مبتدئ 🌟" : "متقدم 🔥") : "غير مقرر ⚠️"}</span>
            </div>
            {recommendedLevel && (
              <button 
                onClick={handleResetTest} 
                className="bg-transparent hover:bg-white/10 text-white font-bold text-xs px-3.5 py-2 border border-white/20 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={12} /> إعادة تقييم وتغيير المستويات
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Primary Integration Level Check Alert / Test triggers */}
      {!recommendedLevel && !showTest && (
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[32px] shadow-lg text-right flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-[#EF6C00]" />
          <div className="space-y-2 max-w-xl pr-4">
            <div className="flex items-center gap-2 justify-start">
              <span className="w-2.5 h-2.5 bg-[#EF6C00] rounded-full animate-ping" />
              <h3 className="font-extrabold text-[#0A2E5C] text-lg">قبل الدخول إلى الكورسات: حدد مستواك المعرفي والمهني</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              لتوفير جهدك ووقتك في الدراسة وتفادي صعوبة الدروس المتقدمة، خض الفحص التحليلي القصير (5 أسئلة ذكية) ليقوم الموجه بفرز وتوصيتك بالمسار الملائم (مبتدئ أو متقدم) للبدء المباشر.
            </p>
          </div>
          <button
            onClick={() => setShowTest(true)}
            className="w-full md:w-auto px-7 py-4 bg-[#EF6C00] hover:bg-[#D84315] text-white font-extrabold text-sm rounded-2xl shadow-lg hover:scale-105 transition-all text-center cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <BookOpenCheck size={16} /> خوض فحص تحديد المستوى الذكي الآن
          </button>
        </div>
      )}

      {/* Interactive Questionnaire Flow Overlay Card */}
      {showTest && (
        <div className="bg-white border-2 border-[#0A2E5C] p-6 md:p-8 rounded-[35px] shadow-2xl relative overflow-hidden animate-fade-in">
          {/* Glowing Continuous Progress Bar */}
          <div className="absolute top-0 right-0 left-0 h-2 bg-slate-100">
            <div 
              className="bg-gradient-to-r from-amber-500 to-[#EF6C00] h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(239,108,0,0.4)]"
              style={{ width: `${((currentQuestionIdx + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Elegant Segmented Step and Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div className="space-y-1 text-right">
              <span className="text-xs font-black text-[#0A2E5C] flex items-center gap-1.5 justify-end">
                <Sparkles size={14} className="text-amber-500 animate-pulse" /> اختبار تحديد كفاءة سومر المهني
              </span>
              <p className="text-xs text-slate-500 font-bold">
                سؤال {currentQuestionIdx + 1} من أصل {PLACEMENT_QUESTIONS.length}
              </p>
            </div>
            
            {/* Visual Step indicators representing each question */}
            <div className="flex items-center gap-1.5 justify-end" dir="rtl">
              {PLACEMENT_QUESTIONS.map((_, idx) => {
                const isCompleted = idx < currentQuestionIdx;
                const isActive = idx === currentQuestionIdx;
                return (
                  <div key={idx} className="flex items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 shadow-sm ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-[#EF6C00] text-white ring-4 ring-[#EF6C00]/20 scale-110"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check size={11} className="stroke-[3.5]" /> : idx + 1}
                    </div>
                    {idx < PLACEMENT_QUESTIONS.length - 1 && (
                      <div
                        className={`w-3 md:w-5 h-0.5 transition-all duration-300 ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smooth animated question transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIdx}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <h4 className="text-base md:text-lg font-extrabold text-slate-800 leading-relaxed text-right">
                {PLACEMENT_QUESTIONS[currentQuestionIdx].q}
              </h4>

              <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                {PLACEMENT_QUESTIONS[currentQuestionIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerTest(oIdx)}
                    className="p-4 bg-slate-50 hover:bg-[#0A2E5C]/5 text-slate-700 text-right font-semibold rounded-2xl border border-slate-200 transition-colors shadow-sm focus:ring-2 focus:ring-[#0A2E5C]/30 outline-none cursor-pointer flex items-center justify-start gap-2 group"
                  >
                    <span className="inline-flex w-5 h-5 bg-[#0A2E5C]/10 text-[#0A2E5C] font-mono font-extrabold rounded-md items-center justify-center mr-1 ml-2 text-xs shrink-0 group-hover:bg-[#EF6C00]/10 group-hover:text-[#EF6C00] transition-colors">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 mt-8 pt-4">
            <span>* تقيس الأسئلة المهارات الرقمية الممتدة وأساسيات البرمجة المنطقية.</span>
            <button 
              onClick={() => {
                setRecommendedLevel("Beginner"); 
                setShowTest(false);
              }} 
              className="text-[#EF6C00] font-bold hover:underline cursor-pointer"
            >
              تجاوز الامتحان واختيار مسار المبتدئين
            </button>
          </div>
        </div>
      )}

      {/* Results banner if test just finished */}
      {score !== null && !showTest && (
        <div className="bg-emerald-50 border-2 border-emerald-400/40 p-6 rounded-[30px] flex items-center gap-4 flex-col md:flex-row justify-between text-right animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-200 shadow-sm">
              <Award size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-emerald-900 text-lg">نموذج التوصية جاهز: تم تحديد مستواك بنجاح!</h4>
              <p className="text-xs text-emerald-700 font-semibold leading-relaxed">
                لقد حققت <span className="font-sans font-extrabold">{score}</span> من أصل <span className="font-sans font-extrabold">5</span> إجابات صحيحة. مستواك المناسب والموصى به هو: 
                <span className="bg-emerald-900 text-emerald-100 font-extrabold px-3 py-1 rounded-md ml-1 inline-block text-[11px] uppercase">
                  {recommendedLevel === "Beginner" ? "مبتدئ وبداية برمجية" : "متقدم ومستوى مهني تخصصي"}
                </span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById("courses-showcase-grid");
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-900 cursor-pointer text-center"
          >
            تصفح كورس المستوى المناسب أدناه ⬇️
          </button>
        </div>
      )}

      {/* Main Courses Interactive Workspace */}
      <div id="courses-showcase-grid" className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Course Main Viewer Panel (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeCourseId ? (
            (() => {
              const activeCourse = COURSES_DATABASE.find(c => c.id === activeCourseId);
              if (!activeCourse) return null;

              return (
                <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 animate-fade-in text-right">
                  
                  {/* Active Course Title Section */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-5">
                    <button
                      onClick={() => setActiveCourseId(null)}
                      className="text-xs text-slate-500 hover:text-[#0A2E5C] transition-all cursor-pointer flex items-center gap-1 bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl"
                    >
                      ← العودة للكورسات
                    </button>
                    <div className="text-right">
                      <span className="bg-amber-500/10 text-[#EF6C00] font-black text-[9px] px-2.5 py-1 rounded-full border border-amber-500/20">
                        مستوى: {activeCourse.level === "Beginner" ? "مبتدئ" : "متقدم"}
                      </span>
                      <h2 className="text-xl md:text-2xl font-black text-[#0A2E5C] mt-2 leading-relaxed">
                        {activeCourse.title}
                      </h2>
                      <p className="text-[11px] text-slate-500 font-bold block mt-1">⭐ المدرب: {activeCourse.instructor} • {activeCourse.duration}</p>
                    </div>
                  </div>

                  {/* Syllabus / Lessons layout */}
                  <div className="grid md:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Lessons Sidebar list menu inside Course (4 Cols) */}
                    <div className="md:col-span-4 space-y-2 bg-slate-50 p-3.5 border border-slate-100 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-bold block mb-2 mr-1">الفصول وقائمة الدروس:</span>
                      {activeCourse.lessons.map((ls, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveLessonIdx(idx);
                            setCourseQuizFinished(false);
                          }}
                          className={`w-full text-right p-3 rounded-xl text-xs font-bold transition-all transition-colors cursor-pointer flex items-center justify-between ${
                            activeLessonIdx === idx && !courseQuizFinished
                              ? "bg-[#0A2E5C] text-white shadow"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="line-clamp-2">{ls.title}</span>
                          <span className="font-mono text-[9px] opacity-60">#{idx + 1}</span>
                        </button>
                      ))}

                      {/* Course Quiz section inside sidebar */}
                      <button
                        onClick={() => {
                          setActiveLessonIdx(-1);
                        }}
                        className={`w-full text-right p-3 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center justify-between ${
                          activeLessonIdx === -1
                            ? "bg-[#EF6C00] text-white border-transparent shadow"
                            : "bg-[#EF6C00]/5 border-[#EF6C00]/20 text-[#EF6C00] hover:bg-[#EF6C00]/10"
                        }`}
                      >
                        <span>📝 فحص التحصيل للحصول على الشهادة</span>
                        <Award size={13} />
                      </button>
                    </div>

                    {/* Lesson Main content frame (8 Cols) */}
                    <div className="md:col-span-8 flex flex-col justify-between">
                      {activeLessonIdx !== -1 ? (
                        <div className="space-y-4">
                          <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner flex flex-col justify-between p-4 text-white">
                            <div className="absolute inset-0 bg-blue-500/10" />
                            <div className="flex justify-between items-center text-[8px] text-slate-400 z-10">
                              <span>بث تعليمي وتعبيري نموذج لجامعة سومر</span>
                              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                            </div>
                            
                            <div className="flex flex-col items-center justify-center text-center py-6 relative z-10 space-y-2">
                              <PlayCircle size={44} className="text-[#EF6C00] cursor-pointer hover:scale-105 transition-all" />
                              <span className="text-[10px] text-[#EF0] font-mono leading-none">STREAMING LESSON VIDEO</span>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md p-2 rounded-lg text-right text-[10px] text-slate-300 z-10 border border-white/5 outline-none font-semibold">
                              الدرس {activeLessonIdx + 1}: {activeCourse.lessons[activeLessonIdx].title}
                            </div>
                          </div>

                          <div className="space-y-2 text-right">
                            <h4 className="font-extrabold text-sm text-[#0A2E5C] border-r-4 border-[#EF6C00] pr-2">شرح الدرس والملاحظات والمناهج المكتوبة:</h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
                              {activeCourse.lessons[activeLessonIdx].content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Course Quiz Final render
                        <div className="space-y-4 text-right">
                          <div className="bg-gradient-to-tr from-[#EF6C00] to-amber-700 text-white p-5 rounded-2xl space-y-1 shadow">
                            <span className="text-[9px] bg-white/15 text-white font-extrabold px-2 py-0.5 rounded">اختبار الأبطال</span>
                            <h4 className="font-extrabold text-sm">الاختبار النهائي للمساق والاعتماد:</h4>
                            <p className="text-[11px] text-orange-100 leading-relaxed">
                              اجب على الأسئلة للحصول على شهادة مساق: "{activeCourse.title}" لتدرج في الهوية الأكاديمية.
                            </p>
                          </div>

                          <div className="space-y-4">
                            {activeCourse.quiz.map((q, qIdx) => {
                              const selected = courseQuizAnswers[qIdx];
                              return (
                                <div key={qIdx} className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-3">
                                  <p className="text-xs font-bold text-slate-800">{q.question}</p>
                                  <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                                    {q.options.map((opt, optIdx) => {
                                      const isCorrect = optIdx === q.answerIndex;
                                      const chosen = selected === optIdx;

                                      let style = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                                      if (selected !== undefined) {
                                        if (isCorrect) {
                                          style = "bg-green-100 border-green-500 text-green-800 font-bold";
                                        } else if (chosen) {
                                          style = "bg-red-100 border-red-500 text-red-800 font-bold";
                                        } else {
                                          style = "bg-white border-slate-100 text-slate-350 pointer-events-none";
                                        }
                                      }

                                      return (
                                        <button
                                          key={optIdx}
                                          onClick={() => handleSelectCourseQuizAnswer(qIdx, optIdx, q.answerIndex, activeCourse.quiz.length)}
                                          disabled={selected !== undefined}
                                          className={`p-2.5 rounded-lg border text-right transition-all cursor-pointer ${style}`}
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

                          {courseQuizFinished && (
                            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 text-center space-y-3">
                              <p className="font-bold text-xs text-green-700">لقد أكملت اختبار المساق بنجاح بالسرعة والتحليل!</p>
                              <p className="text-[11px] text-green-600 font-semibold">
                                درجاتك: {courseQuizScore} من أصل {activeCourse.quiz.length} أسئلة صحيحة وموثقة.
                              </p>
                              {courseQuizScore >= activeCourse.quiz.length ? (
                                <button
                                  onClick={() => handleClaimCertificate(activeCourse.title)}
                                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow hover:scale-105 transition-all inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Award size={13} /> استخراج وربط الشهادة بملف سومر الشخصي
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setCourseQuizAnswers({});
                                    setCourseQuizFinished(false);
                                    setCourseQuizScore(0);
                                  }}
                                  className="px-5 py-2 bg-slate-600 text-white font-bold text-xs rounded-xl hover:bg-slate-700 cursor-pointer"
                                >
                                  إعادة المحاولة مجدداً لعلامة حصد متكاملة
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })()
          ) : (
            // Course List Catalog Mode
            <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-[#0A2E5C]">كتالوج الفصول والمساقات التخصصية</h3>
                  <p className="text-xs text-slate-500 mt-1">تصفح والتحق بالدورات المختارة لك خصيصاً بمكافئ فحص طموحك ورصيدك المعرفي</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-[#EF6C00]/10 text-[#EF6C00] font-black px-3 py-1 rounded-full border border-[#EF6C00]/20">
                    تبويب فرز: {recommendedLevel ? (recommendedLevel === "Beginner" ? "المبتدئ" : "المتقدم") : "الكل"}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredCourses.map((c) => {
                  const isEnrolled = enrolledCourseIds.includes(c.id);
                  const isClaimed = completedCourses.includes(c.title);

                  return (
                    <div 
                      key={c.id} 
                      className="bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-[#0A2E5C]/50 overflow-hidden flex flex-col justify-between transition-all group"
                    >
                      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={c.image} 
                          alt={c.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 right-3 px-3 py-1 bg-[#0A2E5C] text-white font-extrabold text-[9px] rounded-full">
                          مستوى {c.level === "Beginner" ? "مبتدئ" : "متقدم"}
                        </span>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="font-extrabold text-[#0A2E5C] text-sm leading-snug line-clamp-2">{c.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{c.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-250 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                          <span>⌛ {c.duration}</span>
                          <span className="text-[#EF6C00]">أ. {c.instructor.split(" ")[1] || "معلم"}</span>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-1 flex gap-2">
                        {isEnrolled ? (
                          <button
                            onClick={() => startCourse(c.id)}
                            className="flex-1 px-4 py-2 bg-[#0A2E5C] hover:bg-[#031e42] text-white font-black text-xs rounded-xl cursor-pointer text-center"
                          >
                            {isClaimed ? "تم الاختبار (رؤية الشرح)  ★" : "ابدأ الدراسة والدروس والامتحان 📚"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnroll(c.id)}
                            className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-center"
                          >
                            انضم وحجز مقعد المساق مجاناً 
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* Right Info Sidebar Guide (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Diagnostic Stats Widget */}
          <div className="bg-white border border-slate-200/80 rounded-[30px] p-5 shadow-lg text-right space-y-4">
            <h4 className="font-extrabold text-xs text-[#0A2E5C] border-b border-slate-100 pb-2.5">
              رصيدك التعليمي والأكاديمي الموحد:
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-mono text-slate-800 font-extrabold">{enrolledCourseIds.length} מסאקים</span>
                <span className="font-bold">المساقات المحجوزة:</span>
              </div>
              
              <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-mono text-slate-800 font-extrabold">{completedCourses.length}</span>
                <span className="font-bold">الشهادات الموثقة:</span>
              </div>

              <div className="flex justify-between items-center text-[#EF6C00] bg-orange-500/5 p-2.5 rounded-xl border border-[#EF6C00]/15">
                <span className="font-mono font-extrabold">350 نقاط</span>
                <span className="font-bold">رصيد الكفاءة (Sumer Points):</span>
              </div>
            </div>

            <div className="p-3 bg-blue-500/5 border border-[#0A2E5C]/15 rounded-xl text-[10px] text-slate-500 leading-normal font-semibold">
              ⭐ تتوائم هذه الكفاءة ونقاط الفصول مباشرة مع تطلعات توظيفك أو توجيهك المهني برعاية برامج التدريب النقابي الموحد لنقابة المدربين.
            </div>
          </div>

          {/* Guidelines on Complete and easy Platform */}
          <div className="bg-white border border-slate-200/80 rounded-[30px] p-5 shadow-lg text-right space-y-4">
            <h4 className="font-extrabold text-xs text-[#0A2E5C] flex items-center gap-1 justify-end border-b border-slate-100 pb-2.5">
              <BookMarked size={14} className="text-[#EF6C00]" /> تنظيم ذكي وسهل الاستعمال
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              تم هيكلة الأكاديمية بالتحالف التدقيقي لتسهل على الطلبة والذين ليس لديهم دراية تامة بالكمبيوتر الوصول السهل إلى جميع الأدوات:
            </p>
            <ul className="text-[10px] text-slate-600 space-y-2 font-bold pr-1">
              <li className="flex items-start gap-2 justify-start">
                <Check size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>فرز تلقائي فوري للمستوى بمكافئ أسئلة مرنة لتفادي تشتتك وتراكم المواد.</span>
              </li>
              <li className="flex items-start gap-2 justify-start">
                <Check size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>دعم كامل للغة العربية الفصحى مع شرح برامجي ميسر خطوة بخطوة بالريلز والصوت.</span>
              </li>
              <li className="flex items-start gap-2 justify-start">
                <Check size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>امتحان فصلي سريع ومحاكاة مفسرة للأجوبة الخاطئة لتصحيح التلقائي وتأهيل ثقتك الذاتية للاعتراف.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
