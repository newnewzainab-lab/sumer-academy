import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, ShieldCheck, Mail, User, KeyRound, Copy, CheckCircle2, ArrowRight, Smartphone, Compass } from "lucide-react";

interface SumerLoginProps {
  onLoginSuccess: (profile: {
    name: string;
    goal: string;
    currentSkills: string[];
    completedCourses?: string[];
  }) => void;
  onClose?: () => void;
  onRegister: (fullName: string, phone: string) => Promise<void>;
export const SumerLogin: React.FC<SumerLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [activeChannel, setActiveChannel] = useState<"new" | "jaafar">("jaafar");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [userInputOtp, setUserInputOtp] = useState("");
  const [smsNotification, setSmsNotification] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handler for channel 2: Quick Jaafar restore
  const handleRestoreJaafar = () => {
    // We can directly login or require OTP for Jaafar for interactive fun!
    // Let's trigger simulated OTP step to show off the SMS verification education!
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(generatedCode);
    setOtpSent(true);
    setSmsNotification(`📱 رسالة قصيرة واردة: رمز الأمن المؤقت لأكاديمية سومر هو [ ${generatedCode} ]. لا تشاركه مع أحد لضمان سلامة هويتك الرقمية.`);
    
    // Auto clear notification after 15 seconds
    setTimeout(() => {
      setSmsNotification(null);
    }, 15000);
  };

  // Handler for channel 1: Newbie registry
  const handleRegisterNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      setErrorMsg("الرجاء إدخال الاسم وبريدك الإلكتروني لتوليد التوجيه الخالي.");
      return;
    }
    setErrorMsg("");
    
    // Trigger simulated OTP
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(generatedCode);
    setOtpSent(true);
    setSmsNotification(`📱 رسالة قصيرة واردة: مرحباً بك ${newName}! رمز التحقق الثنائي OTP لتأمين حسابك الجديد هو [ ${generatedCode} ]. انسخه لتأكيد هويتك.`);
  };
  // إرسال البيانات الحية إلى قاعدة البيانات
  onRegister(newName, newEmail);
  const handleCopyOtp = () => {
    navigator.clipboard.writeText(otpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInputOtp.trim() === otpCode) {
      setSmsNotification(null);
      
      if (activeChannel === "jaafar") {
        onLoginSuccess({
          name: "جعفر المياحي",
          goal: "أطمح لدخول كلية الهندسة وتأهيل مهاراتي البرمجية وإطلاق مشروع ذكي مستقل",
          currentSkills: ["HTML/CSS", "التفكير الإبداعي", "المبادئ الكهربائية الأولية"],
          completedCourses: [
            "الدورات المعتمدة: محو الأمية الرقمية للجميع",
            "أساسيات القياس والتحكم الميكانيكي"
          ]
        });
      } else {
        onLoginSuccess({
          name: newName,
          goal: "أطمح من الصفر لتخطيط مسار تعليمي وتوجيه ذكي صاعد في التكنولوجيا والبرمجيات",
          currentSkills: [], // Starts with clean slate
          completedCourses: [] // Clean whiteboard
        });
      }
    } else {
      setErrorMsg("رمز التحقق غير صحيح. تأكد من نسخ الرمز المعروض في الرسالة المنبثقة.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center p-4 relative overflow-hidden" dir="rtl">
      
      {/* Animated Simulated SMS / OTP Notification Toast at the Top */}
      <AnimatePresence>
        {smsNotification && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-auto md:w-[600px] bg-sumer-ink text-white p-4 rounded-2xl shadow-2xl border-2 border-sumer-gold z-50 flex items-center justify-between gap-4 text-xs md:text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl shrink-0 animate-bounce">💬</span>
              <p className="font-semibold text-gray-100">{smsNotification}</p>
            </div>
            <button
              onClick={handleCopyOtp}
              className="shrink-0 bg-sumer-gold hover:bg-amber-600 text-white font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1 cursor-pointer select-none"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={14} className="text-white" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Ambient Circles */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-sumer-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-sumer-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 z-10 relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-500 hover:text-sumer-gold transition-all text-[11px] font-black cursor-pointer flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60"
          >
            <span>الرجاء الرجوع للرئيسية</span>
            <ArrowRight size={13} className="rotate-180" />
          </button>
        )}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2.5 h-20 rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden">
          <img 
            src="/src/assets/images/sumer_perfect_logo_1780257338552.png" 
            alt="أكاديمية سومر" 
            className="h-full w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-center mt-8 mb-8">
          <h2 className="text-2xl font-black text-sumer-blue font-display">منصة أكاديمية سومر الذكية</h2>
          <p className="text-[11px] text-sumer-gold font-bold uppercase tracking-widest mt-1">Sumer Academy Gate</p>
          <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
            بوابة الدخول الموحد والتحقق الثنائي للتوجيه المهني والأكاديمي المستدام
          </p>
        </div>

        {/* Tab Controllers: Channels */}
        {!otpSent && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button
              onClick={() => {
                setActiveChannel("jaafar");
                setErrorMsg("");
              }}
              className={`py-3.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeChannel === "jaafar"
                  ? "bg-sumer-blue text-white shadow-md font-extrabold"
                  : "text-slate-600 hover:text-sumer-blue"
              }`}
            >
              تسجيل دخول (حساب جعفر)
            </button>
            <button
              onClick={() => {
                setActiveChannel("new");
                setErrorMsg("");
              }}
              className={`py-3.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeChannel === "new"
                  ? "bg-sumer-blue text-white shadow-md font-extrabold"
                  : "text-slate-600 hover:text-sumer-blue"
              }`}
            >
              إنشاء حساب طالب جديد
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.div
              key={activeChannel}
              initial={{ opacity: 0, x: activeChannel === "jaafar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeChannel === "jaafar" ? -20 : 20 }}
              transition={{ duration: 0.2 }}
            >
              {activeChannel === "jaafar" ? (
                <div className="space-y-6 text-right">
                  <div className="bg-sumer-blue/5 border border-sumer-blue/10 p-5 rounded-3xl">
                    <h4 className="font-bold text-sumer-blue text-sm flex items-center gap-1.5 justify-start">
                      <Compass size={16} className="text-sumer-gold" />
                      بوابة تسجيل الدخول السريع (طالب مسجل مسبقاً)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      اضغط على زر الدخول أدناه للتسجيل الفوري بهوية الطالب "جعفر المياحي" واستكشاف كشف الدرجات الأكاديمي، وقائمة الكورسات الحاصل عليها، لتجربة المنصة كاملة.
                    </p>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-xl text-center">
                      ⚠ {errorMsg}
                    </p>
                  )}

                  <button
                    onClick={handleRestoreJaafar}
                    className="w-full py-4 bg-sumer-blue hover:bg-[#0c2540] text-white font-extrabold rounded-2xl shadow-lg shadow-blue-900/10 cursor-pointer transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span>تسجيل دخول فوري بحساب جعفر المياحي</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterNew} className="space-y-5 text-right">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1.5">الاسم الكامل للطالب:</label>
                      <div className="relative">
                        <User className="absolute right-3.5 top-3.5 text-slate-400 shrink-0" size={16} />
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="الرجاء كتابة اسمك الثلاثي الكامل"
                          className="w-full bg-slate-50 pr-10 pl-4 py-3 rounded-xl text-xs font-semibold text-sumer-ink border border-slate-200 focus:outline-none focus:border-sumer-blue focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1.5">البريد الإلكتروني الموالف:</label>
                      <div className="relative">
                        <Mail className="absolute right-3.5 top-3.5 text-slate-400 shrink-0" size={16} />
                        <input
                          type="email"
                          required
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="example@domain.com"
                          className="w-full bg-slate-50 pr-10 pl-4 py-3 rounded-xl text-xs font-semibold text-sumer-ink border border-slate-200 focus:outline-none focus:border-sumer-blue focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 border border-sumer-gold/25 p-4 rounded-2xl text-xs text-sumer-gold font-bold leading-relaxed">
                    💡 حساب جديد يعني صفحة بيضاء خالية من مهارات وشهادات جعفر السابقة، لبناء مسارك وهويتك الرقمية الخاصة خطوة بخطوة بالذكاء الاصطناعي.
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-xl text-center">
                      ⚠ {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-sumer-gold hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/10 cursor-pointer transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span>توليد مسار طالب جديد وتأمين الحساب</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 text-right"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-sumer-gold/10 text-sumer-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="animate-pulse" size={24} />
                </div>
                <h4 className="font-extrabold text-sumer-blue text-sm">أدخل رمز التحقق الثنائي (OTP)</h4>
                <p className="text-[11px] text-slate-400 font-bold">يرجى نسخ الرمز المرسل ومحاكاة رسالة الـ SMS في الأعلى</p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="relative">
                  <KeyRound className="absolute right-3.5 top-3.5 text-[#0A2E5C] shrink-0" size={16} />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={userInputOtp}
                    onChange={(e) => setUserInputOtp(e.target.value)}
                    placeholder="أدخل رمز التحقق من 6 أرقام"
                    className="w-full bg-slate-50 pr-10 pl-4 py-3.5 rounded-xl text-center tracking-widest font-mono text-lg font-black text-sumer-ink border border-slate-200 focus:outline-none focus:border-sumer-blue focus:bg-white transition-colors"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 font-bold bg-dash p-2.5 rounded-xl text-center">
                    ⚠ {errorMsg}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg transition-all text-xs cursor-pointer text-center"
                  >
                    تأكيد وتفعيل الدوران الآمن
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setErrorMsg("");
                      setUserInputOtp("");
                    }}
                    className="py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-xs cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>

              <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                🔒 الدخول المؤمن برمز OTP يحاكي المعايير الوطنية للبطاقات الرقمية في العراق لتعليم الطلاب الحماية السيبرانية الفعالة.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
