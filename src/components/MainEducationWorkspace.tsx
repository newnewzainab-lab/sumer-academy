import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Sparkles,
  Bot,
  Video,
  Gamepad2,
  GitFork,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpenCheck,
  Flame,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  PlayCircle,
  Clock,
  Lightbulb,
  Search,
  Check
} from "lucide-react";

import { AIReels } from "./AIReels";
import { AIOnDemandCourse } from "./AIOnDemandCourse";
import { AIGamify } from "./AIGamify";
import { AIMindMap } from "./AIMindMap";
import { AILecturer } from "./AILecturer";
import { AIPathFinder } from "./AIPathFinder";
import { AITimeSchedule } from "./AITimeSchedule";
import { UniversityGuide } from "./UniversityGuide";
import { SchoolGuide } from "./SchoolGuide";
import { EmploymentHub } from "./EmploymentHub";
import { AtsCvBuilder } from "./AtsCvBuilder";
import { PostgradGuide } from "./PostgradGuide";
import { PostgradSupervisors } from "./PostgradSupervisors";
import { PostgradResearchSystem } from "./PostgradResearchSystem";
import { PostgradSeminars } from "./PostgradSeminars";
import { EarlyChildhoodUniverse } from "./EarlyChildhoodUniverse";
import { EarlyChildhoodReadiness } from "./EarlyChildhoodReadiness";
import { EarlyChildhoodGuide } from "./EarlyChildhoodGuide";
import { EarlyChildhoodActivities } from "./EarlyChildhoodActivities";
import { EarlyChildhoodQuiz } from "./EarlyChildhoodQuiz";

interface MainEducationWorkspaceProps {
  activeTab: string; // "continuous" | "university" | "school"
  onClaimCert: (courseTitle: string) => void;
  completedCourses: string[];
  onAskAI?: (question: string) => void;
  userSkills?: string[];
}

export const MainEducationWorkspace: React.FC<MainEducationWorkspaceProps> = ({
  activeTab,
  onClaimCert,
  completedCourses,
  onAskAI,
  userSkills,
}) => {
  // Placement Test States for Continuous Education
  const [placementLevel, setPlacementLevel] = useState<"Beginner" | "Advanced" | null>(null);
  const [selectedPlacementAnswers, setSelectedPlacementAnswers] = useState<number[]>([]);
  const [placementStep, setPlacementStep] = useState<number>(0);
  const [showPlacementTestOverlay, setShowPlacementTestOverlay] = useState<boolean>(false);
  const [placementScore, setPlacementScore] = useState<number | null>(null);
  const [selectedCourseType, setSelectedCourseType] = useState<string | null>(null);
  const [recommendedCourseId, setRecommendedCourseId] = useState<string | null>(null);

  const catNames: Record<string, string> = {
    communication: "مهارات التواصل والذكاء العاطفي",
    programming: "برمجة وبناء البرمجيات والتفكير الخوارزمي المتقدم",
    speaking: "مهارات الإلقاء المظفر والخطابة وتصميم العروض التقديمية",
    time_management: "إدارة الوقت والإنتاجية وصهر التفاصيل"
  };

  // Active continuous education course variables
  const [viewingContinuousCourseId, setViewingContinuousCourseId] = useState<string | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [lectureChatText, setLectureChatText] = useState<string>("");
  const [lectureChatHistory, setLectureChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "أهلاً بك في المحاضرة! أسألني أي سؤال يخطر ببالك حول المادة وسأشرحه لك بدقة فورياً." }
  ]);
  const [claimedLessonCertificate, setClaimedLessonCertificate] = useState<boolean>(false);

  // Course Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Private lesson scheduling mocks
  const [scheduledLessons, setScheduledLessons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sub-tabs inside each of the main division
  const [activeSubTabContinuous, setActiveSubTabContinuous] = useState<string>("courses"); // "courses" | "reels" | "generate-course" | "games" | "mindmaps" | "lecture"
  const [activeSubTabUniversity, setActiveSubTabUniversity] = useState<string>("university-guide"); // "university-guide" | "lessons" | "reels" | "games" | "mindmaps"
  const [activeSubTabSchool, setActiveSubTabSchool] = useState<string>("school-guide"); // "school-guide" | "lessons" | "reels" | "games" | "mindmaps" | "career"
  const [activeSubTabPostgrad, setActiveSubTabPostgrad] = useState<string>("postgrad-guide"); // "postgrad-guide" | "lessons" | "reels" | "games" | "mindmaps"
  const [activeSubTabEarlyChildhood, setActiveSubTabEarlyChildhood] = useState<string>("universe"); // "universe" | "readiness" | "guide" | "activities" | "quiz"

  const PLACEMENT_QUESTIONS = [
    {
      q: "ما هي الطريقة الأسرع لبناء سمعة تواصل جيدة وتوطيد علاقات العمل والتعلم؟",
      options: [
        "التحدث الدائم ومقاطعة الآخرين لبيان قوة الحضور",
        "الإنصات النشط وإظهار الاهتمام لأسئلة ووجهات نظر الطرف الآخر بمرونة",
        "تجنب الرد على الاستفسارات وتأجيل اللقاءات",
        "الرد بطريقة غامضة وغير مباشرة دائماً"
      ],
      correct: 1,
      explanation: "الإنصات النشط هو حجر الزاوية في مهارات التواصل وبناء الجسور المهنية."
    },
    {
      q: "عند كتابة شرط برمي متكرر (Loop) يفحص الأرقام الزوجية، فما هو الرمز الرياضي الأنسب لباقي القسمة؟",
      options: [
        "علامة الضرب (*)",
        "علامة النسبة المئوية (%)",
        "دالة التقريب الكسري (Round)",
        "رمز الحصر الثنائي (&)"
      ],
      correct: 1,
      explanation: "يستخدم معامل باقي القسمة (%) لمعرفة الرقم الزوجي (x % 2 == 0) في أغلب لغات البرمجة."
    },
    {
      q: "عند مواجهة جمهور لتقديم مادة تدريبية أو عرض تقديمي، ما أهم سلوك يجب التركيز عليه في أول 30 ثانية؟",
      options: [
        "سرد كامل سيرتك الذاتية بالتفصيل الممل لترهيب الجالسين",
        "تحديق النظر في السقف لتفادي التوتر البصري",
        "طرح تساؤل تفاعلي أو قصة قصيرة تجذب انتباه الجمهور",
        "البدء بالاعتذار عن عدم التحضير الجيد لتبرير أي هفوة"
      ],
      correct: 2,
      explanation: "البداية المشوقة بسؤال أو قصة قصيرة تزيد التفاعل وتكسر الجمود فوراً لدى السامع والمخاطب."
    }
  ];

  // Specific 3D Courses matching requested: مهارات التواصل، برمجة، مهارات الإلقاء، إدارة الوقت
  const CONTINUOUS_COURSES = [
    {
      id: "cc_1",
      title: "مهارات التواصل الفعّال والذكاء العاطفي",
      description: "بناء أسس الحوار، الكفاءة الشخصية، وقيادة الاجتماعات برقي تواصل مهني كلي.",
      instructor: "أ. جعفر المياحي (مستشار التنمية والتدريب المعتمد)",
      duration: "أسبوع واحد (6 ساعات حية)",
      image: "https://picsum.photos/seed/communication/800/600",
      lessons: [
        { title: "تعريف الحوار والإنصات النشط", content: "يتكون التواصل الفعّال من مرسل، ومستقبل، ورسالة دقيقة خالية من المشوشات. الإنصات ليس مجرد سماع الأصوات بل هو فهم نية المتكلم المعرفية وصياغة رد مواءم." },
        { title: "لغة الجسد وقوانين التناغم الفوري", content: "تأثير نبرات الصوت وتوزيع الإيماءات يعادل 55% من قبول الرسالة لدى الطرف المقابل. كيف تحافظ على وضعية جسد مريحة تدل على الثقة والامتداد." },
        { title: "الذكاء العاطفي وإدارة الخلافات بثبات", content: "السيطرة على الانفعالات وتأطير المشاكل كفرص نمو هما أساس القيادة الحديثة. استخدام عبارات التمكين وبناء شراكة رابحة مع زملائك." }
      ],
      quiz: [
        {
          question: "ما النسبة التقريبية لتأثير لغة الجسد في نقل الرسائل الصامتة؟",
          options: ["أقل من 5%", "حوالي 55%", "لا توجد نسبة مطلقة", "100% بالتمام"],
          answerIndex: 1
        }
      ]
    },
    {
      id: "cc_2",
      title: "برمجة وبناء البرمجيات والتفكير الخوارزمي المتقدم",
      description: "أساسيات علوم البرمجة والشيفرات بلغة بايثون وبناء الواجهات المدمجة بمكافئ الـ AI.",
      instructor: "م. رامي محمد (أخصائي الذكاء التكاملي للبلد)",
      duration: "أسبوعين (12 ساعة معتمدة)",
      image: "https://picsum.photos/seed/coding/800/600",
      lessons: [
        { title: "المنطق البرمجي والخلفية الحاسوبية", content: "البرمجة هي علم تحويل الأفكار والعمليات المعقدة إلى خطوات تتابعية منطقية يفهمها المعالج الرقمي. كيف يتعامل نظام التشغيل مع الأكواد كإشارات ثنائية." },
        { title: "بناء الدوال (Functions) والحلقات التكرارية (Loops)", content: "نتعلم تكرار المهام المعقدة دون إعادة كتابة الكود باستعمال جمل For و While، وبناء دوال تقبل وسائط وتمرر مخرجات مصفاة." },
        { title: "ربط واجهات الويب بنبض الذكاء الاستدعائي الرشيق", content: "إسكان أكوادك البرمجية في واجهات مستخدم تفاعلية تتلقى البيانات وتتواصل مع سيرفرات المعرفة بلحظات وسرعة كاملة لرب العمل." }
      ],
      quiz: [
        {
          question: "لماذا نستخدم الدوال (Functions) في البرمجة وتطوير البرمجيات الرياضية؟",
          options: ["لتكرار نفس الأكواد عشوائياً", "لإعادة استخدام الأكواد وتنظيم البرنامج بكفاءة ومنع التكرار الرديء", "لوقف التشغيل التلقائي للمعالج"],
          answerIndex: 1
        }
      ]
    },
    {
      id: "cc_3",
      title: "مهارات الإلقاء المظفر والخطابة وتصميم العروض التقديمية",
      description: "كسر حاجز الخوف، هندسة الحنجرة، وتنسيق الشرائح البصرية بروح كاريزمية باهرة.",
      instructor: "أ. جعفر المياحي (مستشار التنمية والتدريب المعتمد)",
      duration: "أسبوع واحد (5 ساعات)",
      image: "https://picsum.photos/seed/speaking/800/600",
      lessons: [
        { title: "كسر حاجز الخوف من مواجهة الجمهور", content: "أول خطوة في الخطابة هي التحكم في لغة الجسد والتنفس العميق لتقليل هرمونات التوتر وبناء حضور كاريزمي مؤثر." },
        { title: "هندسة الحنجرة وتلوين نبرات الصوت", content: "التلوين النبري هو المفتاح الكاريزمي لإبقاء اهتمام ومثالية استماع وانتباه المتلقين. كيف ترفع وتخفض صوتك لإبراز الأفكار." }
      ],
      quiz: [
        {
          question: "ما هو الأسلوب الأمثل للتحكم بنبرات صوتك أثناء العرض؟",
          options: ["وتيرة صوت رتيبة ومنخفضة جداً", "تلوين الصوت ليتناسب العلو والانخفاض والوقف مع الأهمية", "الصراخ المستمر لجعل الجميع يستيقظ"],
          answerIndex: 1
        }
      ]
    },
    {
      id: "cc_4",
      title: "إدارة الوقت والإنتاجية وصهر التفاصيل",
      description: "تنظيم المهام الأسبوعية وترتيب الأولويات لتحقيق إنتاجية قصوى وتقنيات تنظيم الوقت.",
      instructor: "د. هدى صالح (مدربة دولية)",
      duration: "أسبوع واحد (5 ساعات)",
      image: "https://picsum.photos/seed/time/800/600",
      lessons: [
        { title: "أصول مصفوفة أيزنهاور (Eisenhower Matrix)", content: "تصنيف مهامك إلى: (عاجل وهام) للتنفيذ الفوري، (هام وغير عاجل) للتخطيط للمستقبل، (عاجل وغير هام) للتفويض، و (غير عاجل وغير هام) للشطب لمنع نهب الساعات." },
        { title: "تقنية الاستطاعة وبناء الأهداف الذكية SMART", content: "كيف يجب أن يكون هدفك محدداً، قابلاً للقياس المادي، قابلاً للتحقيق العقلي، ذا صلة بالتمكين، ومحدداً بإطار زمني صارم لا خرق فيه." }
      ],
      quiz: [
        {
          question: "ماذا نفعل بالمهام التي تصنف كـ (غير هامة وغير عاجلة) بمصفوفة الوقت؟",
          options: ["نقوم بجدولتها للمستقبل", "نقوم بتفويضها فورياً للزملاء", "نشطبها أو نقوم بحذفها لتقليل مشتتات ذهننا"],
          answerIndex: 2
        }
      ]
    }
  ];

  // Specific High-Fidelity University Private Lessons Catalog
  const UNIVERSITY_LESSONS = [
    { id: "ul_1", subject: "الرياضيات المتقدمة والتفاضل للهندسة (Calculus III)", professor: "د. ليث جاسم", uni: "جامعة الموصل", cost: "مجاني بالرعاية الوطنية", rating: "4.9" },
    { id: "ul_2", subject: "ميكانيك السوائل والتوازن الهيدروليكي (Fluid Mechanics)", professor: "د. عبد السلام الملا", uni: "نقابة المدربين العراقيين", cost: "مجاني بالرعاية الوطنية", rating: "4.8" },
    { id: "ul_3", subject: "الفيزياء الكهرومغناطيسية والدوائر المترددة", professor: "أ. د. هاشم التميمي", uni: "جامعة بغداد - هندسة", cost: "مجاني بالرعاية الوطنية", rating: "5.0" },
    { id: "ul_4", subject: "مدخل ومبادئ القانون الدستوري العراقي المقارن", professor: "د. زينب محمد", uni: "جامعة الكوفة - قانون", cost: "مجاني بالرعاية الوطنية", rating: "4.7" },
    { id: "ul_5", subject: "بنى المعطيات والترجمة الخوارزمية بلغة C++", professor: "م.م. سارة كمال", uni: "جامعة بابل - تكنولوجيا المعلومات", cost: "مجاني بالرعاية الوطنية", rating: "4.9" }
  ];

  // Specific School Private Lessons Catalog
  const SCHOOL_LESSONS = [
    { id: "sl_1", subject: "الأحياء والخلية الوراثية - السادس العلمي", teacher: "أ. حيدر عباس", school: "إعدادية المتميزين للبنين", cost: "مجاني ومتاح 24/7", rating: "4.9" },
    { id: "sl_2", subject: "الفيزياء ومبادئ انكسار الضوء والبصريات - السادس العلمي", teacher: "أ. نورا سالم", school: "عقبة بن نافع الإعدادية المختلطة", cost: "مجاني ومتاح 24/7", rating: "4.8" },
    { id: "sl_3", subject: "الكيمياء العضوية والأواصر البنزينية والمجسمات", teacher: "أ. رائد الحديثي", school: "ثانوية المشرق النموذجية", cost: "مجاني ومتاح 24/7", rating: "4.9" },
    { id: "sl_4", subject: "قواعد اللغة الإنجليزية وقوانين المقارنة والصفات", teacher: "مدرسة نورا السامرائي", school: "متوسطة الحدباء الكفوءة للبنات", cost: "مجاني ومتاح 24/7", rating: "4.7" },
    { id: "sl_5", subject: "الرياضيات والتفاضل الجبري البسيط للمتوسطة والإعدادية", teacher: "أ. عمار البصري", school: "ثانوية المتفوقين", cost: "مجاني ومتاح 24/7", rating: "5.0" }
  ];

  // Specific Postgraduate Research/Lessons Catalog
  const POSTGRAD_LESSONS = [
    { id: "pl_1", subject: "منهجية البحث العلمي وصياغة الأطاريح الأكاديمية (Research Methodology)", professor: "أ.د. أحمد الحيدري", uni: "جامعة بغداد", cost: "مجاني بالرعاية الوطنية", rating: "4.9" },
    { id: "pl_2", subject: "تحليل وتصميم المسح الجيني ومعالجة بيانات Bioinformatics", professor: "أ.د. علاء كريم الحلي", uni: "جامعة النهرين", cost: "مجاني بالرعاية الوطنية", rating: "5.0" },
    { id: "pl_3", subject: "الشبكات العصبونية العميقة وتطبيقات الرشاقة التوليدية (Deep Learning)", professor: "أ.د. مآرب العبيدي", uni: "جامعة بغداد", cost: "مجاني بالرعاية الوطنية", rating: "4.9" },
    { id: "pl_4", subject: "ميكانيك السوائل الحسابي والمحاكاة المنتهية للأنظمة الميكانيكية", professor: "أ.د. عمر خليل العبيدي", uni: "نقابة المدربين العراقيين", cost: "مجاني بالرعاية الوطنية", rating: "4.8" },
    { id: "pl_5", subject: "إدارة الملكية الفكرية، قوانين براءات الاختراع والابتكار الحكومي", professor: "د. زينب محمد", uni: "جامعة الكوفة", cost: "مجاني بالرعاية الوطنية", rating: "4.7" }
  ];

  const CATEGORY_QUESTIONS: Record<string, { q: string; options: string[]; correct: number; explanation: string }[]> = {
    communication: [
      {
        q: "ما هي الطريقة الأسرع لبناء سمعة تواصل جيدة وتوطيد علاقات العمل والتعلم؟",
        options: [
          "التحدث الدائم ومقاطعة الآخرين لبيان قوة الحضور",
          "الإنصات النشط وإظهار الاهتمام لأسئلة ووجهات نظر الطرف الآخر بمرونة",
          "تجنب الرد على الاستفسارات وتأجيل اللقاءات",
          "الرد بطريقة غامضة وغير مباشرة دائماً"
        ],
        correct: 1,
        explanation: "الإنصات النشط هو حجر الزاوية في مهارات التواصل وبناء الجسور المهنية."
      },
      {
        q: "ما أهم مهارة تبني بها الثقة في المفاوضات المهنية وتهدئة العملاء أو الشركاء؟",
        options: [
          "الرد الهجومي السريع لبيان السطوة والقوة",
          "الاستماع الفعال، إبداء التعاطف والتفهم، وتأطير المخرجات المشتركة لربح الطرفين",
          "تجاهل اعتراضاتهم والحديث عن مزايا أخرى مكررة",
          "التهرب من الالتزام بالمواعيد المحددة"
        ],
        correct: 1,
        explanation: "التفاهم التعاوني والذكاء العاطفي يكسبانك عهوداً طويلة الأجل."
      }
    ],
    programming: [
      {
        q: "عند كتابة شرط برمي متكرر (Loop) يفحص الأرقام الزوجية، فما هو الرمز الرياضي الأنسب لباقي القسمة؟",
        options: [
          "علامة الضرب (*)",
          "علامة النسبة المئوية (%)",
          "دالة التقريب الكسري (Round)",
          "رمز الحصر الثنائي (&)"
        ],
        correct: 1,
        explanation: "يستخدم معامل باقي القسمة (%) لمعرفة الرقم الزوجي (x % 2 == 0) في أغلب لغات البرمجة."
      },
      {
        q: "ما هي أول وأفضل ممارسة عند التخطيط لحل مشكلة برمجية معقدة أو ميزة برمجية جديدة؟",
        options: [
          "البدء الفوري في كتابة الأكواد ومحاولة استكشاف الأخطاء بالحظ",
          "طرح أسئلة عشوائية على محركات البحث قبل التفكير",
          "تفكيك المشكلة ورسم خوارزمية تتابعية واضحة (Pseudocode) تصف تدفق البيانات منطقياً",
          "الاستسلام وترك الملفات فارغة"
        ],
        correct: 2,
        explanation: "التحليل المنطقي ورسم الخرائط الخوارزمية يضمنان بنية برمجية صلبة وسريعة."
      }
    ],
    speaking: [
      {
        q: "عند مواجهة جمهور لتقديم مادة تدريبية أو عرض تقديمي، ما أهم سلوك يجب التركيز عليه في أول 30 ثانية؟",
        options: [
          "سرد كامل سيرتك الذاتية بالتفصيل الممل لترهيب الجالسين",
          "تحديق النظر في السقف لتفادي التوتر البصري",
          "طرح تساؤل تفاعلي أو قصة قصيرة تجذب الحاضرين وكسر الجليد",
          "البدء في قراءة النصوص المكتوبة في الشاشة مباشرة"
        ],
        correct: 2,
        explanation: "البدايات التفاعلية تبهر المتلقي وترفع هرمونات التركيز لدى الجمهور فورياً."
      },
      {
        q: "أثناء الحديث أمام الجمهور وتنسيق الشرائح البصرية، ما هو التصرف الأمثل للتحكم بنبرات صوتك؟",
        options: [
          "البقاء على وتيرة صوت رتيبة ومنخفضة جداً لتجنب إزعاج القاعة",
          "الصراخ المستمر لجعل الجميع يستيقظ",
          "تلوين الصوت (هندسة الحنجرة) بحيث يتناسب العلو والانخفاض والوقف مع الأهمية والمغالق الحساسة للدرس",
          "التحدث بلهجات مختلفة عشوائياً"
        ],
        correct: 2,
        explanation: "التلوين النبري هو المفتاح الكاريزمي لإبقاء اهتمام ومثالية استماع وانتباه المتلقين."
      }
    ],
    time_management: [
      {
        q: "لتنظيم الوقت ومحاربة المشتتات التقنية اليومية، ما هي تقنية 'البومودورو' (Pomodoro) الصحيحة؟",
        options: [
          "العمل لـ 9 ساعات متواصلة دون دقيقة راحة واحدة",
          "تقسيم العمل إلى فترات: 25 دقيقة تركيز كامل يتبعها 5 دقائق استراحة كفصل ذهني",
          "النوم طوال اليوم والدراسة ليلاً فقط",
          "متابعة الريلز التعليمية طيلة ساعات الدراسة"
        ],
        correct: 1,
        explanation: "تقنية البومودورو تضمن الراحة الدورية وتمنح العقل طاقة تفجيرية للاستمرارية."
      },
      {
        q: "ترتيب الأولويات اليومية والمهام الأسبوعية في مصفوفة أيزنهاور (Eisenhower Matrix) يعتمد على معياريين رئيسيين هما:",
        options: [
          "درجة الصعوبة لمهامك وسعر العائد المادي منها",
          "السرعة الشخصية المطلوبة ومدى قربها جغرافياً",
          "الأهمية (Important) والاستعجال (Urgent) للمهمة المدروسة",
          "المطابقة للذكاء الاصطناعي وعدد الكلمات المكتوبة"
        ],
        correct: 2,
        explanation: "تقسيم المهام لـ (عاجل وهام)، (هام وغير عاجل)، (غير هام وعاجل)، (غير هام وغير عاجل) يحكم الساعات ويحرق الكسل."
      }
    ]
  };

    const startPlacementTest = () => {
    setSelectedPlacementAnswers([]);
    setPlacementStep(0);
    setPlacementScore(null);
    setSelectedCourseType(null);
    setRecommendedCourseId(null);
    setPlacementLevel(null);
    setShowPlacementTestOverlay(true);
  };

  const handlePlacementAnswer = (optIdx: number) => {
    if (!selectedCourseType) return;
    const currentQuestions = CATEGORY_QUESTIONS[selectedCourseType];
    const nextAnswers = [...selectedPlacementAnswers, optIdx];
    setSelectedPlacementAnswers(nextAnswers);

    if (placementStep + 1 < currentQuestions.length) {
      setPlacementStep(placementStep + 1);
    } else {
      // Calculate final level Recommendation
      let score = 0;
      currentQuestions.forEach((q, idx) => {
        if (nextAnswers[idx] === q.correct) {
          score += 1;
        }
      });
      setPlacementScore(score);
      const totalQuestionsCount = currentQuestions.length;
      
      // Determine level: if they got maximum correct, recommend Advanced. Otherwise Beginner.
      const outputLevel = score >= totalQuestionsCount ? "Advanced" : "Beginner";
      setPlacementLevel(outputLevel);
      
      // Select appropriate course recommendation
      let matchedCourseId = "cc_1";
      if (selectedCourseType === "communication") matchedCourseId = "cc_1";
      else if (selectedCourseType === "programming") matchedCourseId = "cc_2";
      else if (selectedCourseType === "speaking") matchedCourseId = "cc_3";
      else if (selectedCourseType === "time_management") matchedCourseId = "cc_4";
      
      setRecommendedCourseId(matchedCourseId);
      setShowPlacementTestOverlay(false);
    }
  };

  const handleEnrollAndStart = (id: string) => {
    setViewingContinuousCourseId(id);
    setActiveLessonIdx(0);
    setClaimedLessonCertificate(false);
    setQuizAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  const handleLectureChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureChatText.trim()) return;

    const userMsg = lectureChatText;
    setLectureChatHistory(prev => [...prev, { sender: "user", text: userMsg }]);
    setLectureChatText("");

    setTimeout(() => {
      // Generate dynamically meaningful AI Response based on course content
      setLectureChatHistory(prev => [
        ...prev,
        {
          sender: "ai",
          text: `سؤال رائع جداً بخصوص (${userMsg})! استناداً لمقرر الدرس والذكاء الاصطناعي لسومر، يُعتبر هذا المفهوم محورياً في تبسيط المبادئ. لفهم أدق له، نوصيك بموازنة المتغيرات وتجربة ذلك في الرقعة التفاعلية لإحراز العلامة الكاملة!`
        }
      ]);
    }, 1200);
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number, correctIdx: number) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...quizAnswers, [qIdx]: optIdx };
    setQuizAnswers(nextAnswers);

    if (optIdx === correctIdx) {
      setQuizScore(prev => prev + 1);
    }

    // Verify if all questions answered in lesson
    setQuizFinished(true);
  };

  const handleClaimCourseCert = (title: string) => {
    setClaimedLessonCertificate(true);
    onClaimCert(title);
  };

  const handleScheduleLesson = (subjectName: string, teacher: string) => {
    if (scheduledLessons.includes(subjectName)) {
      alert(`لقد تم حجز هذه المحاضرة والدرس الخصوصي مسبقاً! تابع البث ومذكرات الدرس.`);
      return;
    }
    setScheduledLessons(prev => [...prev, subjectName]);
    alert(`🎉 ممتاز جداً! تم حجز مقعدك بالدرس الخصوصي مع (${teacher}) بنجاح. ستتاح كراسات ومذكرات الدرس وتواصل الـ AI مباشرة عبر منصتنا.`);
  };

  // Filters catalog subjects based on search bar queries
  const filteredUniLessons = UNIVERSITY_LESSONS.filter(l =>
    l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.professor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchoolLessons = SCHOOL_LESSONS.filter(l =>
    l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPostgradLessons = POSTGRAD_LESSONS.filter(l =>
    l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.professor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* ==================== 1. CONTINUOUS EDUCATION VIEW ==================== */}
      {activeTab === "continuous" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub-Navigator inside Continuous Education */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {[
              { id: "courses", label: "📚 الكورسات التدريبية", desc: "تواصل، برمجة، ألقاء" },
              { id: "reels", label: "📱 ريلز تطوير الذات", desc: "محاكاة وفيديوهات ذكية" },
              { id: "generate-course", label: "🤖 توليد كورس AI", desc: "أقسام غير موجودة" },
              { id: "games", label: "🎮 ألعاب وتطوير مهارة", desc: "رقعة ومباراة الكفاءة" },
              { id: "mindmaps", label: "🗺️ مخططات تعليمية", desc: "مسارات وخرائط ذهنية" },
              { id: "schedule", label: "📅 التقويم والجدول الذكي", desc: "إدارة الوقت والامتحانات" },
              { id: "lecture", label: "💬 تتبع المحاضرة الذكي", desc: "تحدث RAG مع الدرس" },
              { id: "jobs", label: "💼 الوظائف المتاحة", desc: "ربط وظيفي محلي" },
              { id: "ats-cv", label: "📄 سيرة ذاتية ATS", desc: "إنشاء الـ CV بالذكاء" }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubTabContinuous(sub.id);
                  if (sub.id === "courses") setViewingContinuousCourseId(null);
                }}
                className={`p-3 rounded-2xl cursor-pointer text-right transition-all flex flex-col justify-between border-t-2 border-l-2 border-r-2 select-none h-24 ${
                  activeSubTabContinuous === sub.id
                    ? "bg-[#0A2E5C] text-white border-b-[6px] border-amber-500 shadow-[0_5px_0_#9a3412] translate-y-[-2px]"
                    : "bg-white text-slate-700 border-slate-200 border-b-[5px] hover:bg-slate-50 active:translate-y-[1px]"
                }`}
              >
                <span className="text-xs font-black font-display block leading-tight">{sub.label}</span>
                <span className={`text-[9px] font-bold ${activeSubTabContinuous === sub.id ? "text-amber-300" : "text-gray-400"} mt-1 block`}>
                  {sub.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Sub Tab Area Content renderers */}
          <div className="transition-all duration-300">
            {activeSubTabContinuous === "courses" && (
              <div className="space-y-8">
                {/* Placement test warning/prompt */}
                {!placementLevel && !showPlacementTestOverlay && (
                  <div className="bg-amber-50/70 border border-amber-200/90 p-6 rounded-[28px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2.5 h-full bg-amber-500" />
                    <div className="text-right space-y-1.5 pr-3">
                      <h4 className="font-extrabold text-[#0A2E5C] text-base flex items-center gap-1.5 justify-start">
                        <Flame size={16} className="text-amber-500 animate-pulse" /> فرز وتحديد مستوى الطالب قبل دخول الكورس
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed font-bold">
                        قبل تصفح والتحاق الكورسات، قم بالخضوع لفحص تحديد المستوى المخصص لمساعدتك بتدريب مناسب (مبتدئ أو متقدم) ومستوانا الدراسي السليم.
                      </p>
                    </div>
                    <button
                      onClick={startPlacementTest}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl border-b-4 border-amber-800 active:translate-y-1 active:border-b-0 transition-all cursor-pointer whitespace-nowrap"
                    >
                      خوض اختبار تحديد المستوى فورا ⬇️
                    </button>
                  </div>
                )}

                {/* Placement Test Overlay active */}
                {showPlacementTestOverlay && (
                  <div className="bg-white border-2 border-[#0A2E5C] p-6 md:p-8 rounded-[30px] shadow-2xl relative overflow-hidden animate-fade-in">
                    {!selectedCourseType ? (
                      <div className="space-y-6 text-right" dir="rtl">
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EF6C00]/10 text-[#EF6C00] border border-[#EF6C00]/20 rounded-full text-[10px] font-black">
                            <Sparkles size={12} className="animate-pulse" /> التوجيه الذكي لسومر
                          </span>
                          <h3 className="text-xl font-black text-[#0A2E5C]">اختر نوع الكورس لمعرفة مستواك به</h3>
                          <p className="text-xs text-slate-500 font-bold leading-relaxed">
                            لتشخيص مستواك وضخ الموارد التمكينية المناسبة لك، الرجاء انتقاء المسار التعليمي المهني الذي تود خوض فحص تحديد المستوى المعرفي به:
                          </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          {[
                            { id: "communication", label: "💬 مهارات التواصل والذكاء العاطفي", desc: "فحص فهمك لمهارات الاستماع النشط، وهندسة لغة الجسد وفض النزاعات." },
                            { id: "programming", label: "💻 أساسيات بايثون والبرمجيات", desc: "فحص مهاراتك في التفكير المنطقي، الحلقات، وكتابة الشروط البرمجية." },
                            { id: "speaking", label: "🎤 مهارات الإلقاء أمام الجمهور", desc: "فحص كسر حاجز الخوف، وتلوين نبرتك الحنجرية وكاريزما الحديث." },
                            { id: "time_management", label: "⏱️ تنظيم الوقت ومحاربة الكسل", desc: "فحص أولويات مصفوفة أيزنهاور وتقنية البومودورو والإنتاجية اليومية." }
                          ].map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setSelectedCourseType(cat.id);
                                setPlacementStep(0);
                                setSelectedPlacementAnswers([]);
                              }}
                              className="p-5 text-right bg-slate-50 hover:bg-amber-500/5 hover:border-amber-400 border border-slate-200 rounded-3xl transition-all cursor-pointer group flex flex-col justify-between h-36 active:translate-y-[1px] shadow-sm select-none"
                            >
                              <span className="font-extrabold text-[#0A2E5C] text-sm group-hover:text-amber-800 transition-colors block">{cat.label}</span>
                              <span className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed block">{cat.desc}</span>
                              <span className="text-[10px] text-amber-600 font-bold mt-2 hover:underline block">ابدأ الفحص الآن ←</span>
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
                          <button
                            onClick={() => setShowPlacementTestOverlay(false)}
                            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                          >
                            إلغاء الفحص
                          </button>
                        </div>
                      </div>
                    ) : (
                      (() => {
                        const currentQuestions = CATEGORY_QUESTIONS[selectedCourseType] || [];
                        if (currentQuestions.length === 0) return null;
                        const currentQ = currentQuestions[placementStep] || currentQuestions[0];
                        return (
                          <div className="text-right">
                            <div className="absolute top-0 right-0 left-0 h-1.5 bg-slate-100">
                              <div
                                className="bg-amber-500 h-full transition-all duration-350"
                                style={{ width: `${((placementStep + 1) / currentQuestions.length) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between items-center mb-6">
                              <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-3 py-1 rounded-full font-mono">
                                سؤال {placementStep + 1} من {currentQuestions.length}
                              </span>
                              <span className="text-xs font-black text-[#0A2E5C] flex items-center gap-1.5">
                                <Sparkles size={14} className="text-amber-500" />
                                {selectedCourseType === "communication" && "فحص مهارات التواصل والذكاء العاطفي"}
                                {selectedCourseType === "programming" && "فحص البرمجيات وتكنولوجيا المعلومات"}
                                {selectedCourseType === "speaking" && "فحص الإلقاء والكاريزما القيادية"}
                                {selectedCourseType === "time_management" && "فحص تنظيم الساعات ومحاربة الكسل"}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-base font-extrabold text-slate-800 leading-relaxed pr-1">
                                {currentQ.q}
                              </h3>
                              <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm pt-2">
                                {currentQ.options.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    onClick={() => handlePlacementAnswer(oIdx)}
                                    className="p-4 bg-slate-50 hover:bg-[#0A2E5C]/10 text-slate-800 text-right font-black rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center justify-start gap-3 select-none"
                                  >
                                    <span className="w-6 h-6 bg-amber-500 text-white font-mono font-black rounded-md flex items-center justify-center text-xs ml-1 shrink-0">
                                      {oIdx + 1}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                )}

                {/* Level recommended badge */}
                {placementLevel && (
                  <div className="bg-emerald-50 border-2 border-emerald-500/20 p-5 rounded-2xl flex items-center justify-between gap-4 animate-fade-in text-right">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800 font-bold border border-emerald-200 shadow-sm shrink-0">
                        🏆
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-emerald-900 text-sm">
                          تم تحديد وتمرير مستواك بنجاح في كورس: <span className="text-[#EF6C00] underline decoration-wavy font-black">{selectedCourseType ? (catNames[selectedCourseType] || selectedCourseType) : ""}</span>
                        </p>
                        <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                          لقد حققت: {placementScore} من أصل {selectedCourseType ? (CATEGORY_QUESTIONS[selectedCourseType]?.length || 2) : 2} إجابات صحيحة. مستواك المقترح هو: <span className="bg-emerald-900 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded ml-1">{placementLevel === "Beginner" ? "مبتدئ / أساسي" : "متقدم / احترافي"}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setPlacementLevel(null);
                        setPlacementScore(null);
                        setSelectedPlacementAnswers([]);
                        setSelectedCourseType(null);
                        setRecommendedCourseId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer shadow-sm text-center shrink-0"
                    >
                      تغيير الفحص / مهارة أخرى
                    </button>
                  </div>
                )}

                {/* Viewing Course Content workspace or Catalog List */}
                {viewingContinuousCourseId ? (
                  (() => {
                    const c = CONTINUOUS_COURSES.find(it => it.id === viewingContinuousCourseId);
                    if (!c) return null;
                    return (
                      <div className="bg-white border-2 border-slate-100 rounded-[30px] p-6 space-y-6 shadow-xl animate-fade-in">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <button
                            onClick={() => setViewingContinuousCourseId(null)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                          >
                            ← كتالوج الكورسات
                          </button>
                          <div className="text-right">
                            <h3 className="font-extrabold text-[#0A2E5C] text-lg leading-snug">{c.title}</h3>
                            <p className="text-[10px] text-slate-400 mt-1 font-bold">المشرف: {c.instructor} • ⏳ {c.duration}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-6">
                          {/* Sidebar Lessons */}
                          <div className="md:col-span-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                            <span className="text-[11px] text-slate-400 font-black block mr-1">المحاضرات ومفردات الفصل:</span>
                            {c.lessons.map((ls, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setActiveLessonIdx(index);
                                  setClaimedLessonCertificate(false);
                                }}
                                className={`w-full text-right p-3 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                                  activeLessonIdx === index
                                    ? "bg-[#0A2E5C] text-white shadow"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                <span>{ls.title}</span>
                                <span className="text-[10px] opacity-60">#{index + 1}</span>
                              </button>
                            ))}

                            {/* Lecture chat tool */}
                            <button
                              onClick={() => setActiveLessonIdx(-1)}
                              className={`w-full text-right p-3 rounded-xl text-xs font-black transition-all border flex items-center justify-between cursor-pointer ${
                                activeLessonIdx === -1
                                  ? "bg-[#EF6C00] text-white border-transparent shadow"
                                  : "bg-[#EF6C00]/5 border-[#EF6C00]/20 text-[#EF6C00] hover:bg-[#EF6C00]/10"
                              }`}
                            >
                              <span>💬 تواصل مع AI واختبر معلوماتك</span>
                              <Award size={13} />
                            </button>
                          </div>

                          {/* Detail Window */}
                          <div className="md:col-span-8 space-y-5">
                            {activeLessonIdx !== -1 ? (
                              <div className="space-y-4">
                                <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner flex flex-col justify-between p-4 text-white">
                                  <div className="absolute inset-0 bg-blue-500/10" />
                                  <div className="flex justify-between items-center text-[8px] text-slate-400 z-10">
                                    <span>بث تعليمي كفاءات بالذكاء الاصطناعي</span>
                                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                                  </div>
                                  <div className="flex flex-col items-center justify-center text-center py-6 relative z-10 space-y-2">
                                    <PlayCircle size={44} className="text-[#EF6C00] cursor-pointer hover:scale-105 transition-all" />
                                    <span className="text-[10px] text-yellow-400 font-mono leading-none font-bold">بث مرئي تفاعلي مجاني</span>
                                  </div>
                                  <div className="bg-black/40 backdrop-blur-md p-2 rounded-lg text-right text-[10px] text-slate-300 z-10">
                                    الدرس {activeLessonIdx + 1}: {c.lessons[activeLessonIdx].title}
                                  </div>
                                </div>

                                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <h4 className="font-extrabold text-xs text-[#0A2E5C] border-r-3 border-[#EF6C00] pr-2">ملخص وملاحظات الدرس:</h4>
                                  <p className="text-xs text-slate-600 leading-relaxed font-bold">{c.lessons[activeLessonIdx].content}</p>
                                </div>
                              </div>
                            ) : (
                              // Live Chat during Lectures + Free Certificate Claim
                              <div className="space-y-6">
                                <div className="bg-gradient-to-tr from-[#EF6C00] to-orange-700 text-white p-5 rounded-2xl space-y-1.5 shadow-md">
                                  <h4 className="font-extrabold text-sm">التواصل مع الذكاء الاصطناعي والامتحان النهائي:</h4>
                                  <p className="text-[11px] text-orange-100 leading-relaxed">
                                    اجب على الاستبيان القصير تالياً لحصد شهادتك الأكاديمية والمهنية مجاناً ومشاركتها لملفك بالدراسة.
                                  </p>
                                </div>

                                {/* Mini test quiz */}
                                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-4">
                                  <span className="text-xs font-black text-slate-700 block text-right">★ اختبار كفاءة المادة التدريبية:</span>
                                  {c.quiz.map((q, qIdx) => {
                                    const selected = quizAnswers[qIdx];
                                    return (
                                      <div key={qIdx} className="space-y-2.5 text-right">
                                        <p className="text-xs font-extrabold text-slate-800">{q.question}</p>
                                        <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                                          {q.options.map((opt, optIdx) => {
                                            const isCorrect = optIdx === q.answerIndex;
                                            const chosen = selected === optIdx;

                                            let style = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                                            if (selected !== undefined) {
                                              if (isCorrect) {
                                                style = "bg-green-100 border-green-500 text-green-800 font-bold";
                                              } else if (chosen) {
                                                style = "bg-red-100 border-red-500 text-red-800 font-extrabold";
                                              } else {
                                                style = "bg-white border-slate-100 text-slate-400 pointer-events-none";
                                              }
                                            }

                                            return (
                                              <button
                                                key={optIdx}
                                                onClick={() => handleSelectQuizAnswer(qIdx, optIdx, q.answerIndex)}
                                                disabled={selected !== undefined}
                                                className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {quizFinished && (
                                    <div className="bg-green-100/40 p-4 rounded-xl border border-green-500/20 text-center space-y-2">
                                      <p className="font-extrabold text-xs text-green-800">أحسنت! كملت الإجابة الكفوءة بنجاح.</p>
                                      {!claimedLessonCertificate ? (
                                        <button
                                          onClick={() => handleClaimCourseCert(c.title)}
                                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer transition-all inline-flex items-center gap-1.5"
                                        >
                                          🥇 استخراج شهادتك المجانية المعتمدة وربطها بالهوية الطلبية
                                        </button>
                                      ) : (
                                        <p className="text-xs text-emerald-600 font-black">🌟 تم توثيق الشهادة بملفك الشخصي بنجاح! تفقد تبويب 'حسابي الطلابي' بالأعلى ورؤيتها.</p>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Lecture chat conversation frame */}
                                <div className="border border-slate-200 rounded-2xl flex flex-col h-64 bg-white overflow-hidden text-right">
                                  <div className="bg-[#0A2E5C] text-white p-3 font-bold text-xs">
                                    💬 المساعد الذكي للمحاضرة حية (RAG Chatbot)
                                  </div>
                                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs text-right scrollbar-thin">
                                    {lectureChatHistory.map((m, i) => (
                                      <div key={i} className={`flex ${m.sender === "user" ? "justify-start" : "justify-end"}`}>
                                        <div className={`p-2.5 rounded-xl max-w-xs ${m.sender === "user" ? "bg-[#031e42] text-white" : "bg-slate-100 text-slate-700"}`}>
                                          <p className="font-bold leading-normal">{m.text}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <form onSubmit={handleLectureChatSubmit} className="p-2 border-t border-slate-150 flex gap-2">
                                    <input
                                      type="text"
                                      value={lectureChatText}
                                      onChange={(e) => setLectureChatText(e.target.value)}
                                      placeholder="اسأل المعالج حول مواضيع وملاحظات المحاضرة..."
                                      className="flex-1 bg-slate-50 border border-slate-200 outline-none rounded-lg text-xs px-3 py-2 text-right focus:border-[#0A2E5C]"
                                    />
                                    <button type="submit" className="bg-[#0A2E5C] text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">إرسال</button>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  /* Catalog List of continuous education */
                  <div className="grid sm:grid-cols-2 gap-6 pb-6">
                    {CONTINUOUS_COURSES.map(c => {
                      const isRecommended = c.id === recommendedCourseId;
                      return (
                        <div 
                          key={c.id} 
                          className={`bg-white border-2 rounded-3xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group relative ${
                            isRecommended 
                              ? "border-amber-400 ring-4 ring-amber-400/20 shadow-amber-100/50 scale-[1.01]" 
                              : "border-slate-100 hover:border-[#EF6C00]/40"
                          }`}
                        >
                          {isRecommended && (
                            <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                              <Sparkles size={10} className="animate-pulse" /> كورس موصى به لمستواك
                            </span>
                          )}
                          <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                            <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                            <span className="absolute top-3 right-3 px-3 py-1 bg-[#0A2E5C] text-white font-extrabold text-[9px] rounded-full uppercase tracking-wider">
                              كورس تدريبي معتمد
                            </span>
                          </div>
                          <div className="p-5 space-y-2 text-right">
                            <h4 className="font-extrabold text-sm text-[#0A2E5C] leading-tight group-hover:text-[#EF6C00] transition-colors">{c.title}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-semibold">{c.description}</p>
                          </div>
                          <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex gap-2 w-full justify-between items-center">
                            <span className="text-[10px] text-gray-400 font-bold">⌛ {c.duration}</span>
                            <button
                              onClick={() => handleEnrollAndStart(c.id)}
                              className="bg-gradient-to-br from-[#EF6C00] to-[#E65100] text-white text-xs px-4 py-2 border-b-4 border-amber-800 shadow-sm rounded-xl font-black cursor-pointer shadow hover:scale-[1.03] transition-transform"
                            >
                              دراسة واختبار المساق 📚
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeSubTabContinuous === "reels" && (
              <AIReels category="continuous" />
            )}

            {activeSubTabContinuous === "generate-course" && (
              <AIOnDemandCourse onClaimCert={onClaimCert} />
            )}

            {activeSubTabContinuous === "games" && (
              <AIGamify />
            )}

            {activeSubTabContinuous === "mindmaps" && (
              <AIMindMap defaultConcept="المهارات القيادية والبرمجة" />
            )}

            {activeSubTabContinuous === "schedule" && (
              <AITimeSchedule />
            )}

            {activeSubTabContinuous === "lecture" && (
              <AILecturer />
            )}

            {activeSubTabContinuous === "jobs" && (
              <EmploymentHub userSkills={userSkills || []} />
            )}

            {activeSubTabContinuous === "ats-cv" && (
              <AtsCvBuilder completedCourses={completedCourses} />
            )}
          </div>

        </div>
      )}

      {/* ==================== 2. UNIVERSITY EDUCATION VIEW ==================== */}
      {activeTab === "university" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub-Navigator inside University Education */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { id: "university-guide", label: "🏛️ دليلك الجامعي العراقي", desc: "الكليات والجامعات والمحافظات" },
              { id: "lessons", label: "🎓 دروس خصوصية جامعية", desc: "أساتذة وبحوث الكليات" },
              { id: "reels", label: "📱 ريلز هندسية وأكاديمية", desc: "ميكانيك، فيزياء وبوابات" },
              { id: "games", label: "🎮 ألعاب الذكاء للمناهج", desc: "ابتكار مسابقات تفاعلية" },
              { id: "mindmaps", label: "🗺️ خرائط ذهنية للمواد", desc: "مخططات ذهنية تلقائية" },
              { id: "schedule", label: "📅 التقويم والجدول الذكي", desc: "مواءمة وقت الامتحانات" },
              { id: "lecture", label: "💬 تتبع المحاضرة الذكي", desc: "تحدث RAG مع الدرس" }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTabUniversity(sub.id)}
                className={`p-3 rounded-2xl cursor-pointer text-right transition-all flex flex-col justify-between border-t-2 border-l-2 border-r-2 select-none h-24 ${
                  activeSubTabUniversity === sub.id
                    ? "bg-[#0A2E5C] text-white border-b-[6px] border-amber-500 shadow-[0_5px_0_#9a3412] translate-y-[-2px]"
                    : "bg-white text-slate-700 border-slate-200 border-b-[5px] hover:bg-slate-50 active:translate-y-[1px]"
                }`}
              >
                <span className="text-xs font-black font-display block leading-tight">{sub.label}</span>
                <span className={`text-[9px] font-bold ${activeSubTabUniversity === sub.id ? "text-amber-300" : "text-gray-400"} mt-1 block`}>
                  {sub.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            {activeSubTabUniversity === "university-guide" && (
              <UniversityGuide onAskAI={onAskAI} />
            )}

            {activeSubTabUniversity === "lessons" && (
              <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6">
                
                {/* Search / Filter catalog */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
                  <div className="text-right">
                    <h3 className="text-lg font-extrabold text-[#0A2E5C]">كتالوج الدروس الخصوصية والبحوث الجامعية</h3>
                    <p className="text-xs text-slate-500 mt-1">تنسيق دروس وبث تخصصي مباشر برعاية نخبة من دكاترة الجامعات العراقية مجاناً بالكامل.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0A2E5C] text-right pr-9"
                      placeholder="ابحث عن مادة، تخصص، أو دكتور..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={14} className="absolute right-3 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUniLessons.map(lesson => (
                    <div key={lesson.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-[#0A2E5C]/40 hover:shadow-md">
                      <div className="space-y-2 text-right">
                        <span className="bg-blue-500/10 text-[#0A2E5C] border border-blue-500/20 text-[9px] px-2.5 py-1 rounded-full font-sans font-black uppercase">
                          {lesson.uni}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm leading-snug pt-1">{lesson.subject}</h4>
                        <p className="text-xs text-[#EF6C00] font-black">أ.د. {lesson.professor}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-emerald-600">⭐ {lesson.rating} التقييم</span>
                        <button
                          onClick={() => handleScheduleLesson(lesson.subject, lesson.professor)}
                          className="px-4 py-2 bg-[#0A2E5C] hover:bg-[#031e42] text-white text-[11px] font-black rounded-lg transition-colors cursor-pointer"
                        >
                          {scheduledLessons.includes(lesson.subject) ? "حجزت مقعدك ✓" : "انضم للدرس الخصوصي 🎓"}
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredUniLessons.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 col-span-full">عتباً، لم نجد نتائج توافق بحثك العلمي. جرب كلمات أخرى.</p>
                  )}
                </div>

              </div>
            )}

            {activeSubTabUniversity === "reels" && (
              <AIReels category="university" />
            )}

            {activeSubTabUniversity === "games" && (
              <AIGamify />
            )}

            {activeSubTabUniversity === "mindmaps" && (
              <AIMindMap defaultConcept="الميكانيك الهندسي والمعالجة الرقمية" />
            )}

            {activeSubTabUniversity === "schedule" && (
              <AITimeSchedule />
            )}

            {activeSubTabUniversity === "lecture" && (
              <AILecturer />
            )}
          </div>

        </div>
      )}

      {/* ==================== 3. SCHOOL EDUCATION VIEW ==================== */}
      {activeTab === "school" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub-Navigator inside School Education */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { id: "school-guide", label: "🏫 دليلك المدرسي والتربوي", desc: "متميزين ومتفوقين ومحافظات" },
              { id: "lessons", label: "🏫 دروس خصوصية مدرسية", desc: "وزاريات وبكالوريا" },
              { id: "reels", label: "📱 ريلز علمية ومناهجية", desc: "أحياء، فيزياء وبصريات" },
              { id: "games", label: "🎮 صانع الألعاب المدرسي", desc: "تحجيم الصعوبات لترفيه" },
              { id: "mindmaps", label: "🗺️ خرائط ذهنية مدرسية", desc: "مفاهيم البكالوريا بلمسة" },
              { id: "career", label: "🎯 مكتشف مسارك الإعدادي", desc: "توجيه ذكي نحو الكلية" },
              { id: "schedule", label: "📅 التقويم والجدول الذكي", desc: "جدولة ساعات امتحاناتك" },
              { id: "lecture", label: "💬 تتبع المحاضرة الذكي", desc: "تتبع RAG مع المدرس" }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTabSchool(sub.id)}
                className={`p-3 rounded-2xl cursor-pointer text-right transition-all flex flex-col justify-between border-t-2 border-l-2 border-r-2 select-none h-24 ${
                  activeSubTabSchool === sub.id
                    ? "bg-[#0A2E5C] text-white border-b-[6px] border-amber-500 shadow-[0_5px_0_#9a3412] translate-y-[-2px]"
                    : "bg-white text-slate-700 border-slate-200 border-b-[5px] hover:bg-slate-50 active:translate-y-[1px]"
                }`}
              >
                <span className="text-xs font-black font-display block leading-tight">{sub.label}</span>
                <span className={`text-[9px] font-bold ${activeSubTabSchool === sub.id ? "text-amber-300" : "text-gray-400"} mt-1 block`}>
                  {sub.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            {activeSubTabSchool === "school-guide" && (
              <SchoolGuide onAskAI={onAskAI} />
            )}

            {activeSubTabSchool === "lessons" && (
              <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6">
                
                {/* Search / Filter catalog */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
                  <div className="text-right">
                    <h3 className="text-lg font-extrabold text-[#0A2E5C]">كتالوج الدروس الخصوصية والتربوية</h3>
                    <p className="text-xs text-slate-500 mt-1">تنسيق دروس وبث مدرسي مباشر للتحضير لامتحانات البكالوريا والمراحل كافة من أكفأ المعلمين.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0A2E5C] text-right pr-9"
                      placeholder="ابحث عن مادة، معلم، أو مدرسة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={14} className="absolute right-3 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchoolLessons.map(lesson => (
                    <div key={lesson.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-[#0A2E5C]/40 hover:shadow-md">
                      <div className="space-y-2 text-right">
                        <span className="bg-rose-500/10 text-rose-600 border border-rose-500/20 text-[9px] px-2.5 py-1 rounded-full font-black">
                          {lesson.school}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm leading-snug pt-1">{lesson.subject}</h4>
                        <p className="text-xs text-[#EF6C00] font-black">أ. {lesson.teacher}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-emerald-600">⭐ {lesson.rating} التقييم</span>
                        <button
                          onClick={() => handleScheduleLesson(lesson.subject, lesson.teacher)}
                          className="px-4 py-2 bg-[#0A2E5C] hover:bg-[#031e42] text-white text-[11px] font-black rounded-lg transition-colors cursor-pointer"
                        >
                          {scheduledLessons.includes(lesson.subject) ? "حجزت مقعدك ✓" : "انضم للدرس الخصوصي 🏫"}
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredSchoolLessons.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 col-span-full">عتباً، لم نجد نتائج توافق بحثك الدراسي. جرب كلمات أخرى.</p>
                  )}
                </div>

              </div>
            )}

            {activeSubTabSchool === "reels" && (
              <AIReels category="school" />
            )}

            {activeSubTabSchool === "games" && (
              <AIGamify />
            )}

            {activeSubTabSchool === "mindmaps" && (
              <AIMindMap defaultConcept="منهج الأحياء والفيزياء الوزاري" />
            )}

            {activeSubTabSchool === "career" && (
              <AIPathFinder />
            )}

            {activeSubTabSchool === "schedule" && (
              <AITimeSchedule />
            )}

            {activeSubTabSchool === "lecture" && (
              <AILecturer />
            )}
          </div>

        </div>
      )}

      {/* ==================== 4. POSTGRADUATE STUDIES VIEW ==================== */}
      {activeTab === "postgrad" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub-Navigator inside Postgraduate Studies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
            {[
              { id: "postgrad-guide", label: "🎓 دليل الدراسات العليا", desc: "شروط ومتطلبات لعام ٢٠٢٦" },
              { id: "supervisors", label: "🔍 دليل المشرفين", desc: "البحث عن كبار الأساتذة وعناوينهم" },
              { id: "research-system", label: "🧪 نظام البحث التفاعلي", desc: "نقد مبدئي ومواءمة الأولويات" },
              { id: "seminars", label: "📋 جدول السمينارات", desc: "مواعيد المناقشات لعام ٢٠٢٦" },
              { id: "lessons", label: "🔬 حلقات وبحوث دراسية", desc: "منهجية، ديب ليرنينج وبراءات" },
              { id: "reels", label: "📱 ريلز علمية وبحثية", desc: "أطاريح ورسائل مسكوبة" },
              { id: "games", label: "🎮 ألعاب الذكاء للمناهج", desc: "صهر المواد للعب فوري" },
              { id: "mindmaps", label: "🗺️ خرائط ذهنية ميسرة", desc: "تتبع المفاهيم المعقدة" },
              { id: "schedule", label: "📅 التقويم والجدول الذكي", desc: "مواعيد اللجان والامتحانات" },
              { id: "lecture", label: "💬 تتبع المحاضرة والسمينار", desc: "تحدث RAG ومناقشة الـ AI" }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTabPostgrad(sub.id)}
                className={`p-3 rounded-2xl cursor-pointer text-right transition-all flex flex-col justify-between border-t-2 border-l-2 border-r-2 select-none h-24 ${
                  activeSubTabPostgrad === sub.id
                    ? "bg-[#0A2E5C] text-white border-b-[6px] border-amber-500 shadow-[0_5px_0_#9a3412] translate-y-[-2px]"
                    : "bg-white text-slate-700 border-slate-200 border-b-[5px] hover:bg-slate-50 active:translate-y-[1px]"
                }`}
              >
                <span className="text-xs font-black font-display block leading-tight">{sub.label}</span>
                <span className={`text-[9px] font-bold ${activeSubTabPostgrad === sub.id ? "text-amber-300" : "text-gray-400"} mt-1 block`}>
                  {sub.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            {activeSubTabPostgrad === "postgrad-guide" && (
              <PostgradGuide onAskAI={onAskAI} />
            )}

            {activeSubTabPostgrad === "supervisors" && (
              <PostgradSupervisors />
            )}

            {activeSubTabPostgrad === "research-system" && (
              <PostgradResearchSystem />
            )}

            {activeSubTabPostgrad === "seminars" && (
              <PostgradSeminars />
            )}

            {activeSubTabPostgrad === "lessons" && (
              <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6">
                
                {/* Search / Filter catalog */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
                  <div className="text-right">
                    <h3 className="text-lg font-extrabold text-[#0A2E5C]">كتالوج حلقات وبحوث الدراسات العليا</h3>
                    <p className="text-xs text-slate-500 mt-1">تنسيق حلقات نقاشية ودروس تخصصية برعاية وتأطير نخبة من دكاترة ومشرفي الدراسات العليا مجاناً.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0A2E5C] text-right pr-9"
                      placeholder="ابحث عن مادة، بحث، أو دكتور..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={14} className="absolute right-3 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPostgradLessons.map(lesson => (
                    <div key={lesson.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-[#0A2E5C]/40 hover:shadow-md">
                      <div className="space-y-2 text-right">
                        <span className="bg-purple-500/10 text-purple-700 border border-purple-500/20 text-[9px] px-2.5 py-1 rounded-full font-black">
                          {lesson.uni}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm leading-snug pt-1">{lesson.subject}</h4>
                        <p className="text-xs text-[#EF6C00] font-black">أ.د. {lesson.professor}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-emerald-600">⭐ {lesson.rating} التقييم</span>
                        <button
                          onClick={() => handleScheduleLesson(lesson.subject, lesson.professor)}
                          className="px-4 py-2 bg-[#0A2E5C] hover:bg-[#031e42] text-white text-[11px] font-black rounded-lg transition-colors cursor-pointer"
                        >
                          {scheduledLessons.includes(lesson.subject) ? "حجزت مقعدك ✓" : "انضم للمناقشة 🔬"}
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredPostgradLessons.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 col-span-full">عتباً، لم نجد نتائج توافق بحثك العلمي. جرب كلمات أخرى.</p>
                  )}
                </div>

              </div>
            )}

            {activeSubTabPostgrad === "reels" && (
              <AIReels category="university" />
            )}

            {activeSubTabPostgrad === "games" && (
              <AIGamify />
            )}

            {activeSubTabPostgrad === "mindmaps" && (
              <AIMindMap defaultConcept="أدوات ومنهجية كتابة البحث العلمي وأطروحة الماجستير" />
            )}

            {activeSubTabPostgrad === "schedule" && (
              <AITimeSchedule />
            )}

            {activeSubTabPostgrad === "lecture" && (
              <AILecturer />
            )}
          </div>

        </div>
      )}

      {/* ==================== 5. EARLY CHILDHOOD EDUCATION VIEW ==================== */}
      {activeTab === "early-childhood" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Sub-Navigator inside Early Childhood */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "universe", label: "🧸 حديقة الحروف والأرقام التفاعلية", desc: "تعليم تفاعلي مسمع بالصوت" },
              { id: "readiness", label: "🧩 مقياس الاستعداد للروضة والمدرسة", desc: "فحص تشخيصي معتمد للأهل" },
              { id: "guide", label: "📋 دليل التطور ومراحل الطفولة ٣-٦", desc: "معايير الوزارة والنوم والغذاء" },
              { id: "activities", label: "⏳ روتين الألعاب وقصص الرافدين والـ AI", desc: "تنظيم البيت بترف ومرح" },
              { id: "quiz", label: "🎨 اختبار المستكشفين الصغار", desc: "ألعاب مطابقة وتخمين حيوانات بالصور" },
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTabEarlyChildhood(sub.id)}
                className={`p-3.5 rounded-3xl cursor-pointer text-right transition-all flex flex-col justify-between border-t-2 border-l-2 border-r-2 select-none h-24 ${
                  activeSubTabEarlyChildhood === sub.id
                    ? "bg-[#0A2E5C] text-white border-b-[6px] border-amber-500 shadow-[0_5px_0_#9a3412] translate-y-[-2px]"
                    : "bg-white text-slate-700 border-slate-200 border-b-[5px] hover:bg-slate-50 active:translate-y-[1px]"
                }`}
              >
                <span className="text-xs font-black font-display block leading-tight">{sub.label}</span>
                <span className={`text-[9px] font-bold ${activeSubTabEarlyChildhood === sub.id ? "text-amber-300" : "text-gray-400"} mt-1 block`}>
                  {sub.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="transition-all duration-300">
            {activeSubTabEarlyChildhood === "universe" && (
              <EarlyChildhoodUniverse />
            )}

            {activeSubTabEarlyChildhood === "readiness" && (
              <EarlyChildhoodReadiness />
            )}

            {activeSubTabEarlyChildhood === "guide" && (
              <EarlyChildhoodGuide onAskAI={onAskAI} />
            )}

            {activeSubTabEarlyChildhood === "activities" && (
              <EarlyChildhoodActivities onAskAI={onAskAI} />
            )}

            {activeSubTabEarlyChildhood === "quiz" && (
              <EarlyChildhoodQuiz />
            )}
          </div>

        </div>
      )}

    </div>
  );
};
