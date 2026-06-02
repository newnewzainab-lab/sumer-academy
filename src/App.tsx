import { supabase } from '@/lib/supabase'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sumer3DLogo } from "./components/Sumer3DLogo";
import {
  BookOpen,
  Sparkles,
  Users,
  ChevronRight,
  GraduationCap,
  Globe,
  Briefcase,
  Bot,
  BrainCircuit,
  Award,
  BookMarked,
  Clock,
  CheckCircle2,
  Info,
  Phone,
  Mail
} from "lucide-react";

// Import custom sub-components
import { Navbar } from "./components/Navbar";
import { Partners } from "./components/Partners";
import { SDGImpact } from "./components/SDGImpact";
import { AIPathFinder } from "./components/AIPathFinder";
import { AIReels } from "./components/AIReels";
import { AIGamify } from "./components/AIGamify";
import { AIMindMap } from "./components/AIMindMap";
import { AITimeSchedule } from "./components/AITimeSchedule";
import { AILecturer } from "./components/AILecturer";
import { AIOnDemandCourse } from "./components/AIOnDemandCourse";
import { SumerProfile } from "./components/SumerProfile";
import { AIChatBot } from "./components/AIChatBot";
import { MainEducationWorkspace } from "./components/MainEducationWorkspace";
import { SumerLogin } from "./components/SumerLogin";
import { AtsCvBuilder } from "./components/AtsCvBuilder";
import { EdraakBoard } from "./components/EdraakBoard";
import { EmploymentHub } from "./components/EmploymentHub";
import { SumerTour } from "./components/SumerTour";
import { SumerTimeMachine } from "./components/SumerTimeMachine";

import { SAMPLE_COURSES } from "./constants";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [microOnboarding, setMicroOnboarding] = useState(true);
  const handleRegister = async (fullName: string, phone: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { 
          full_name: fullName, 
          phone: phone,         
          role: 'student'       
        }
      ])

    if (error) {
      alert('حدث خطأ أثناء التسجيل: ' + error.message)
    } else {
      alert('تم تسجيل حسابك بنجاح في أكاديمية سومر!')
    }
  }
  const [showTour, setShowTour] = useState(() => {
    const rejected = sessionStorage.getItem("sumer_tour_rejected");
    const completed = sessionStorage.getItem("sumer_tour_completed");
    return !(rejected || completed);
  });
  
  const [interactiveGuidanceActive, setInteractiveGuidanceActive] = useState(() => {
    return localStorage.getItem("sumer_guidance_active") === "true";
  });

  // Ensure they get the tour message fresh on login or whenever first opening the platform
  useEffect(() => {
    // Clean up any old localStorage blockers from previous sessions to avoid lockout
    localStorage.removeItem("sumer_tour_rejected");
    localStorage.removeItem("sumer_tour_completed");
    
    const sessionRejected = sessionStorage.getItem("sumer_tour_rejected");
    const sessionCompleted = sessionStorage.getItem("sumer_tour_completed");
    if (!sessionRejected && !sessionCompleted) {
      setShowTour(true);
    }
  }, []);
  const [toggleChatDrawer, setToggleChatDrawer] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string | undefined>(undefined);
  const [activeAiTool, setActiveAiTool] = useState("career-path");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Global student profile simulation synced across modules
  const [userProfile, setUserProfile] = useState({
    name: "جعفر المياحي",
    goal: "أطمح لدخول كلية الهندسة وتأهيل مهاراتي البرمجية وإطلاق مشروع ذكي مستقل",
    currentSkills: ["HTML/CSS", "التفكير الإبداعي", "المبادئ الكهربائية الأولية"],
  });

  // Track courses dynamically completed and certified by user via AI On-Demand generator
  const [completedCourses, setCompletedCourses] = useState<string[]>([
    "الدورات المعتمدة: محو الأمية الرقمية للجميع",
  ]);

  const handleClaimCourseCertification = (title: string) => {
    if (!completedCourses.includes(title)) {
      setCompletedCourses((prev) => [...prev, title]);
    }
  };

  const handleLoginSuccess = (profile: {
    name: string;
    goal: string;
    currentSkills: string[];
    completedCourses?: string[];
  }) => {
    setUserProfile({
      name: profile.name,
      goal: profile.goal,
      currentSkills: profile.currentSkills,
    });
    if (profile.completedCourses) {
      setCompletedCourses(profile.completedCourses);
    } else {
      setCompletedCourses([]);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
  };

  const isProtectedTab = activeTab === "profile" || activeTab === "ai-tools";

  if (!isLoggedIn && isProtectedTab) {
    return (
      <div className="min-h-screen bg-sumer-ivory text-sumer-ink font-sans relative pb-10 antialiased overflow-x-hidden">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          microOnboarding={microOnboarding}
          setMicroOnboarding={setMicroOnboarding}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          interactiveGuidanceActive={interactiveGuidanceActive}
          setInteractiveGuidanceActive={setInteractiveGuidanceActive}
        />
        <div className="pt-2">
          <SumerLogin
            onLoginSuccess={(profile) => {
              handleLoginSuccess(profile);
              setActiveTab(activeTab);
            }}
            onClose={() => setActiveTab("home")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sumer-ivory text-sumer-ink font-sans relative pb-10 antialiased overflow-x-hidden">
      {/* Dynamic Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        microOnboarding={microOnboarding}
        setMicroOnboarding={setMicroOnboarding}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        interactiveGuidanceActive={interactiveGuidanceActive}
        setInteractiveGuidanceActive={setInteractiveGuidanceActive}
      />

      {/* Floating 24/7 Support Concierge Indicator */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setToggleChatDrawer(!toggleChatDrawer)}
          className="w-14 h-14 bg-sumer-blue text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer relative border-2 border-sumer-gold"
          title="افتح منسق التوجيه الذكي المساعد 24/7"
        >
          <Bot size={28} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

      {/* Floating Chat Concierge Sidebar */}
      <AnimatePresence>
        {toggleChatDrawer && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed bottom-24 left-6 z-40 w-96 max-w-[90vw]"
          >
            <AIChatBot 
              initialQuestion={chatInitialQuestion} 
              onClearInitial={() => setChatInitialQuestion(undefined)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-2 pb-12">
        <AnimatePresence mode="wait">
          {/* Landing / Main home view */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Interactive In-Page Welcome Guidance Alert */}
              {interactiveGuidanceActive && (
                <div className="container mx-auto px-6 max-w-5xl mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-amber-100/60 border-2 border-dashed border-sumer-gold/50 rounded-[28px] p-6 text-right space-y-4 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-sumer-gold/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 justify-end">
                        <div className="text-right">
                          <h4 className="font-display font-black text-sumer-blue text-base flex items-center gap-1.5 justify-end">
                            <span>الدليل الملاحي التفاعلي نشط حالياً</span>
                            <span className="animate-bounce">💡</span>
                          </h4>
                          <p className="text-xs text-slate-700 font-bold leading-relaxed mt-1">
                            يسعدنا مرافقتك! لقد قمنا بوضع إشارات ونصوص استرشادية ذهبية اللون بجوار كل ميزة في الصفحة لمساعدتك على التجول واستيعاب وظائف الأكاديمية بنقرة واحدة.
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-sumer-gold/15 text-sumer-gold flex items-center justify-center shrink-0">
                          <Sparkles size={18} />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setInteractiveGuidanceActive(false);
                          localStorage.setItem("sumer_guidance_active", "false");
                        }}
                        className="self-end sm:self-center px-4 py-2.5 bg-white hover:bg-slate-100 text-[11px] text-slate-500 font-black rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                      >
                        تعطيل الإرشاد التفاعلي
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
              {/* Cover Hero section */}
              <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-12 pb-12 overflow-hidden text-right">
                {/* Visual Ambient Blur backgrounds */}
                <div className="absolute top-1/4 -right-24 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 -left-24 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-5xl z-10 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    <span className="inline-block px-4 py-1.5 bg-sumer-blue/10 text-sumer-blue border border-sumer-blue/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                      مستقبل التعليم الرقمي والتمكين المستدام في العراق
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-black text-sumer-blue leading-tight">
                      ثورة التعلم بـ <span className="text-sumer-gold">الذكاء الاصطناعي</span> تبدأ من سومر
                    </h1>
                    <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      منصة وطنية للتعليم الأكاديمي والمهني المستدام، تسخر قوى الـ AI لبناء مسار مواءمة يربط مخرجات جيلنا التعليمي مباشرة بفرص العمل وقواعد القبول في الجامعات العراقية.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                       <button
                         onClick={() => setActiveTab("continuous")}
                         className="w-full sm:w-auto px-8 py-4 bg-sumer-gold hover:opacity-90 text-white rounded-2xl font-extrabold text-base hover:scale-105 transition-all shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
                       >
                        ابدأ بتحديد مستواك ومداومة الكورسات <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={() => setActiveTab("school")}
                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-2xl font-bold text-base transition-all cursor-pointer shadow-sm text-center"
                      >
                        توججه ومعالجة المناهج المدرسية
                      </button>
                    </div>

                    {interactiveGuidanceActive && (
                      <div className="flex justify-center">
                        <div className="bg-amber-500/10 border border-sumer-gold/30 text-amber-900 px-4 py-2.5 rounded-2xl text-[11px] font-black max-w-lg shadow-sm animate-pulse text-right">
                          💡 <strong>ميزة الاستعمال:</strong> اضغط على أحد الأزرار بالأعلى لتحديد مسارك التعليمي؛ إما لدراسة المناهج الوزارية وفحص نماذج سادس بكالوريا، أو للانخراط في مسابقات تدريبات المستمر المصدقة من النقابة!
                        </div>
                      </div>
                    )}

                    {/* Integrated Interactive Sumer Login/Profile Display Gate inside Main Hero */}
                    {!isLoggedIn ? (
                      <div className="mt-12 bg-white p-6 md:p-8 rounded-[38px] border-2 border-dashed border-sumer-blue/20 shadow-xl max-w-lg mx-auto text-right space-y-4">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-[10px] font-bold text-sumer-gold bg-sumer-gold/10 px-2.5 py-1 rounded-full">بوابة الدخول الفوري</span>
                          <h3 className="text-base font-black text-sumer-blue">الدخول الموحد للطلاب (Sumer Unified Login Hub)</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          ابدأ بتدوين هويتك الرقمية الأكاديمية! يمكنك إنشاء حساب طالب مستجد جديد كلياً، أو تسجيل الدخول السريع والفوري بحساب الطالب التجريبي "جعفر المياحي" لاستكشاف لوحة الدرجات وحمل الشهادات فوراً.
                        </p>
                        
                        {interactiveGuidanceActive && (
                          <div className="bg-amber-500/5 border border-sumer-gold/20 p-3 rounded-2xl text-[11px] font-black text-right">
                            <span className="text-sumer-blue font-extrabold block mb-0.5">💡 الهوية الرقمية والدخول السريع</span>
                            <span className="text-slate-600 block">اضغط على زر "حساب جعفر" لتجربة المنصة فوراً وتنشيط لوحة الدرجات التفاعلية والشهادات الصادرة مباشرة باسمك لتجربة محاكاة تامة!</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <button
                            onClick={() => {
                              setActiveTab("profile");
                            }}
                            className="py-3 px-4 bg-sumer-blue text-white hover:opacity-95 rounded-2xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>تسجيل دخول (حساب جعفر)</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab("profile");
                            }}
                            className="py-3 px-4 bg-amber-50/50 border border-sumer-gold/30 text-sumer-ink hover:bg-amber-100 rounded-2xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>إنشاء حساب طالب مستجد</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-12 bg-gradient-to-r from-sumer-blue to-[#081b2f] p-6 rounded-[32px] text-white shadow-xl max-w-lg mx-auto text-right space-y-3.5 border border-sumer-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-sumer-gold/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] bg-emerald-500 text-white font-black px-2.5 py-1 rounded-md animate-pulse">
                            الهوية الطلابية نشطة ومصدقة
                          </span>
                          <h4 className="text-xs font-bold text-sumer-gold uppercase tracking-wider">لوحة الطالب الشخصية</h4>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-300">طالب الأكاديمية المسجل حالياً:</p>
                          <p className="text-base font-black text-white">{userProfile.name}</p>
                          <p className="text-[11px] text-slate-300 italic">"{userProfile.goal}"</p>
                        </div>
                        
                        {interactiveGuidanceActive && (
                          <div className="bg-white/10 border border-white/20 p-3 rounded-2xl text-[11px] font-black text-right">
                            <span className="text-sumer-gold font-extrabold block mb-0.5">💡 ملفك المهني والأكاديمي نشط</span>
                            <span className="text-slate-200 block">انقر على "الملف الدراسي وكشف الشهادات" لتعديل درجاتك واستخراج وثائق التخرج وتصدير السيرة الذاتية الذكية.</span>
                          </div>
                        )}

                        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                          <button
                            onClick={() => setActiveTab("ai-tools")}
                            className="flex-1 py-2.5 bg-sumer-gold hover:opacity-95 text-white text-xs font-black rounded-xl transition-all cursor-pointer text-center"
                          >
                            الانتقال لأدوات الذكاء الاصطناعي الـ 14
                          </button>
                          <button
                            onClick={() => setActiveTab("profile")}
                            className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                          >
                            الملف الدراسي وكشف الشهادات
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Live Platform performance indicators stats */}
                <div className="mt-16 w-full max-w-5xl px-6 mx-auto">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "مناهج معتمدة بالوزارات", val: "500+", icon: BookOpen },
                      { label: "كفاءات ونسب توظيف مسجلة", val: "10,240+", icon: Users },
                      { label: "مدربون بنقابة العراقيين", val: "150+", icon: Sparkles },
                      { label: "اعتمادات وشبكة تحالفات", val: "15+", icon: Globe },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md text-right flex flex-col justify-between">
                        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-sumer-gold mb-3 border border-slate-100">
                          <stat.icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-sumer-blue font-mono">{stat.val}</h3>
                          <p className="text-slate-500 text-[11px] font-bold mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Three Levels of Education Segment */}
              <section className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-12">
                  <span className="text-xs text-sumer-gold font-black border border-sumer-gold/50 bg-sumer-gold/5 px-3 py-1 rounded-full">هرم التعليم الثلاثي التكاملي للبلد</span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-sumer-blue mt-3">تنسيق مخصص لتطوير طموحك المهني</h2>
                </div>

                {interactiveGuidanceActive && (
                  <div className="mb-8 flex justify-center animate-pulse">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-black rounded-2xl select-none text-right max-w-3xl">
                      💡 <strong>إرشاد الهرم التعليمي:</strong> تنقسم برامجنا لـ (المدرسي) لحل نماذج الامتحانات العراقية والمناهج المعتمدة، و(الجامعي) لكليات ومعاهد الهندسة، و(المستمر) لنقابة المهنيين والتدريب العملي المعتمد لزيادة التنافسية بسوق العمل.
                    </span>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                  {/* school block */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md text-right space-y-3">
                    <div className="w-10 h-10 bg-sumer-gold/10 text-sumer-gold rounded-xl flex items-center justify-center border border-sumer-gold/20">
                      <BookMarked size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-sumer-blue font-display">قسم التعليم المدرسي</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      يركز بالكامل على المناهج الوزارية والتربوية، مع ميزة التصفح والفحص لنموذج البكالوريا وتوجيهات الصف السادس العلمي والأدبي بذكاء.
                    </p>
                  </div>

                  {/* uni block */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md text-right space-y-3">
                    <div className="w-10 h-10 bg-sumer-blue/10 text-sumer-blue rounded-xl flex items-center justify-center border border-sumer-blue/20">
                      <GraduationCap size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-sumer-blue font-display">قسم التعليم الجامعي</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      يدعم طلاب الكليات والمعاهد بالبحوث التطبيقية للميكانيك، أجهزة القياس والهندسة، والعلوم الإنسانية لضمان الفوقية الأكاديمية.
                    </p>
                  </div>

                  {/* career training block */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md text-right space-y-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-500/20">
                      <Briefcase size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-sumer-blue font-display">قسم التعليم المستمر</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      يختص بالتطوير المهني والاعتمادي بالتعاون المباشر مع نقابة المدربين لإكساب خريجينا الموثوقية العالية في أسواق التشغيل لرب العمل.
                    </p>
                  </div>
                </div>
              </section>

              {/* Unique Sumerian Knowledge Time Machine Segment */}
              <div id="sumerian_wisdom_time_machine" className="container mx-auto px-6 max-w-5xl py-4">
                <SumerTimeMachine />
              </div>

              {/* Courses Showcase List Layout */}
              <section className="container mx-auto px-6 max-w-5xl py-10">
                <div className="flex flex-col sm:flex-row items-end justify-between mb-8 text-right gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-sumer-blue">أحدث المناهج والكورسات المتاحة</h2>
                    <p className="text-xs text-slate-500 mt-1">تصفح مساقات الأكاديمية من كافة الفئات المصنفة</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("ai-tools")}
                    className="text-sumer-gold font-black text-xs flex items-center gap-1 hover:opacity-80 transition-colors cursor-pointer"
                  >
                    تفقد مولد الكورسات النادرة وتوليد مادتك <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SAMPLE_COURSES.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg hover:border-sumer-blue/35 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                          <img
                            src={course.image}
                            alt={course.titleAr}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-3 right-3 px-3 py-1 bg-sumer-blue text-white font-black text-[9px] rounded-full uppercase">
                            {course.category}
                          </span>
                        </div>
                        <div className="p-5 text-right space-y-2">
                          <h4 className="font-extrabold text-sm text-sumer-blue leading-tight">{course.titleAr}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {course.descriptionAr}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                        <span>⌛ {course.duration}</span>
                        <span className="text-sumer-gold">{course.instructor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Success Partner Trusts showcase */}
              <Partners />

              {/* Sustainable Development SDG Impact dashboard */}
              <div className="container mx-auto px-6 max-w-5xl">
                <SDGImpact />
              </div>
            </motion.div>
          )}

          {/* AI Tools compilation hub view page */}
          {activeTab === "ai-tools" && (
            <motion.div
              key="ai-tools"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="container mx-auto px-6 max-w-5xl py-10 space-y-10"
            >
              <div className="text-center space-y-2">
                <span className="text-xs text-sumer-gold font-bold bg-sumer-gold/10 px-3 py-1 rounded-full">
                  ترسانة ميزات الذكاء الاصطناعي الـ 14 الموحدة
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-sumer-blue">
                  المساعد الأكاديمي الذكي المترابط
                </h1>
                <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                  تنقل بسلاسة في القائمة الجانبية أدناه لتجربة الميزات الأكثر تطوراً مجاناً بالكامل لدعم مسارك الدراسي والمهني.
                </p>
              </div>

              {/* Micro onboarding banner guide - Feature 12 */}
              {microOnboarding && (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3 text-right">
                  <span className="text-base select-none mt-0.5">💡</span>
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-sumer-blue block">دليل الإرشاد المصغر المدمج (Micro-Onboarding):</span>
                    <p className="text-gray-600 leading-relaxed">
                      لقد قمنا ببرمجة الأدوات الـ14 لتتواصل مع خوادم الـ AI بشكل تفاعلي. يمكنك فحص مسار قبولك الجامعي بالإعدادية، تحويل الملازم لألعاب، رسم المخططات بلمسة، وتوليد الكورسات النادرة كلياً.
                    </p>
                  </div>
                </div>
              )}

              {/* Lateral Submenu bar */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Lateral Navigation Sub-Menu */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-3 shadow-md divide-y divide-gray-100">
                  {[
                    { id: "career-path", label: "مكتشف المسار الجامعي (جديد)", badge: "هام" },
                    { id: "reels", label: "الريلزات التعليمية الذكية" },
                    { id: "gamify", label: "الألعاب والتحويل الفوري للكورسات" },
                    { id: "mindmap", label: "خرائط المفاهيم التلقائية" },
                    { id: "time", label: "منسق الوقت والجداول" },
                    { id: "lecture", label: "مساعد المحاضرة الذكي (RAG)" },
                    { id: "demand", label: "توليد كورس مخصص عند الطلب" },
                    { id: "ats-cv", label: "منشئ السيرة الذاتية الذكي ATS" },
                    { id: "edraak-board", label: "لوحة الإدراك ومذكرة التعلم" },
                    { id: "employment-hub", label: "مركز التوظيف ومطابقة الفرص" },
                  ].map((it) => (
                    <button
                      key={it.id}
                      onClick={() => {
                        setActiveAiTool(it.id);
                        if (it.id === "demand") setMicroOnboarding(false);
                      }}
                      className={`w-full text-right p-3.5 text-xs font-bold transition-all rounded-xl cursor-pointer flex items-center justify-between ${
                        activeAiTool === it.id
                          ? "bg-sumer-blue text-white shadow-md font-extrabold"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span>{it.label}</span>
                      {it.badge && (
                        <span className="text-[8px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded uppercase">
                          {it.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Sub Tools Area Content switches */}
                <div className="lg:col-span-9">
                  {activeAiTool === "career-path" && <AIPathFinder />}
                  {activeAiTool === "reels" && <AIReels />}
                  {activeAiTool === "gamify" && <AIGamify />}
                  {activeAiTool === "mindmap" && <AIMindMap />}
                  {activeAiTool === "time" && <AITimeSchedule />}
                  {activeAiTool === "lecture" && <AILecturer />}
                  {activeAiTool === "demand" && (
                    <AIOnDemandCourse onClaimCert={handleClaimCourseCertification} />
                  )}
                  {activeAiTool === "ats-cv" && (
                    <AtsCvBuilder completedCourses={completedCourses} />
                  )}
                  {activeAiTool === "edraak-board" && (
                    <EdraakBoard />
                  )}
                  {activeAiTool === "employment-hub" && (
                    <EmploymentHub userSkills={userProfile.currentSkills} />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Unified Central Education Workspace */}
          {(activeTab === "continuous" || activeTab === "university" || activeTab === "school" || activeTab === "postgrad" || activeTab === "early-childhood") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              className="container mx-auto px-4 md:px-6 max-w-6xl py-10"
            >
              <MainEducationWorkspace
                activeTab={activeTab}
                onClaimCert={handleClaimCourseCertification}
                completedCourses={completedCourses}
                userSkills={userProfile.currentSkills}
                onAskAI={(question) => {
                  setChatInitialQuestion(question);
                  setToggleChatDrawer(true);
                }}
              />
            </motion.div>
          )}

          {/* User portfolio profile visual workspace tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="container mx-auto px-6 max-w-5xl py-10"
            >
              <SumerProfile
                completedCourses={completedCourses}
                setCompletedCourses={setCompletedCourses}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured corporate Iraqi Footer layout */}
      <footer className="mt-20 border-t border-gray-100 bg-white py-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 text-right">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 justify-end">
                <Sumer3DLogo size="lg" />
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed ml-auto">
                بناء المسار المهني والأكاديمي الأكثر جدارة لطلبة البكالوريا والجامعات العراقية، بدعم برامجي معزز بالذكاء الاصطناعي وبالتعاون المدني.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-xs text-sumer-blue uppercase">بوابات الأقسام</h5>
              <ul className="text-xs text-gray-400 space-y-1.5 font-bold">
                <li className="hover:text-sumer-blue cursor-pointer transition-colors">مكتشف المسار الإعدادي</li>
                <li className="hover:text-sumer-blue cursor-pointer transition-colors">مناهج السادس الإعدادي</li>
                <li className="hover:text-sumer-blue cursor-pointer transition-colors">بحوث الميكانيك والهندسة</li>
                <li className="hover:text-sumer-blue cursor-pointer transition-colors">شهادات نقابة المدربين</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-xs text-slate-800 uppercase border-b border-gray-100 pb-1.5">معلومات التواصل معنا</h5>
              <ul className="text-xs text-slate-600 space-y-2.5 font-bold text-right">
                <li className="flex items-center gap-2 justify-end">
                  <span className="font-sans text-slate-700 font-extrabold" dir="ltr">+964 770 123 4567</span>
                  <span className="text-[#0A2E5C] flex items-center gap-1 shrink-0 font-display">رقم الهاتف <Phone size={13} className="text-amber-500" /></span>
                </li>
                <li className="flex items-center gap-2 justify-end">
                  <a href="https://wa.me/9647701234567" target="_blank" rel="noreferrer" className="font-sans text-emerald-600 hover:underline hover:scale-102 transition-transform duration-150 flex items-center gap-1.5 font-extrabold">
                    +964 770 123 4567
                  </a>
                  <span className="text-slate-700 flex items-center gap-1 shrink-0 font-display">واتساب <span className="text-emerald-500">💬</span></span>
                </li>
                <li className="flex items-center gap-2 justify-end">
                  <a href="mailto:support@sumer.academy.edu.iq" className="font-sans text-amber-600 hover:underline hover:scale-102 transition-transform duration-150 font-extrabold">
                    support@sumer.academy.edu.iq
                  </a>
                  <span className="text-slate-700 flex items-center gap-1 shrink-0 font-display">البريد الإلكتروني <Mail size={13} className="text-[#0A2E5C]" /></span>
                </li>
                <li className="text-[11px] text-gray-400 mt-2 border-t border-dashed border-gray-100 pt-2 font-display">
                  المقر الوطني الرئيسي: العراق - نينوى وبغداد
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p className="font-bold">© 2026 أكاديمية سومر. جميع الحقوق والملكيات للمسارات الوطنية محفوظة.</p>
            <div className="flex gap-4 font-bold">
              <span className="cursor-pointer hover:text-sumer-blue">سياسة المعايير</span>
              <span className="cursor-pointer hover:text-sumer-blue">شروط الاستدامة التعليمية</span>
            </div>
          </div>
        </div>
      </footer>

      {showTour && (
        <SumerTour
          onAccept={() => {
            setShowTour(false);
            setInteractiveGuidanceActive(true);
            localStorage.setItem("sumer_guidance_active", "true");
            sessionStorage.setItem("sumer_tour_completed", "true");
          }}
          onReject={() => {
            setShowTour(false);
            localStorage.setItem("sumer_tour_rejected", "true");
            sessionStorage.setItem("sumer_tour_rejected", "true");
          }}
        />
      )}
    </div>
  );
}
