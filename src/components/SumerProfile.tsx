import React, { useState } from "react";
import { 
  User, 
  Award, 
  FileText, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Globe, 
  Briefcase, 
  BookOpen, 
  Link as LinkIcon, 
  CheckCircle, 
  Share2, 
  Fingerprint, 
  Cpu, 
  Search,
  Check,
  Send,
  Users,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

interface SumerProfileProps {
  completedCourses: string[];
  setCompletedCourses?: React.Dispatch<React.SetStateAction<string[]>>;
  userProfile: {
    name: string;
    goal: string;
    currentSkills: string[];
    bakaloriaScore?: string;
    highSchoolTrack?: string;
    interests?: string;
    headline?: string;
    location?: string;
    aboutSummary?: string;
  };
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
}

// Interactive Custom QR Code component with authentic corner blocks and realistic design
const QRCode: React.FC<{ value: string; info?: string }> = ({ value, info }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-amber-500/20 shadow-md">
      <div className="w-40 h-40 bg-slate-50 p-2.5 rounded-xl flex flex-col justify-between relative overflow-hidden border border-slate-200">
        {/* Corner Anchors */}
        <div className="absolute top-2.5 right-2.5 w-8 h-8 border-4 border-[#0A2E5C] bg-white flex items-center justify-center rounded-lg">
          <div className="w-3.5 h-3.5 bg-[#EF6C00] rounded" />
        </div>
        <div className="absolute top-2.5 left-2.5 w-8 h-8 border-4 border-[#0A2E5C] bg-white flex items-center justify-center rounded-lg">
          <div className="w-3.5 h-3.5 bg-[#EF6C00] rounded" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 w-8 h-8 border-4 border-[#0A2E5C] bg-white flex items-center justify-center rounded-lg">
          <div className="w-3.5 h-3.5 bg-[#EF6C00] rounded" />
        </div>
        
        {/* High-density grid of modern QR data points */}
        <div className="w-full h-full pt-1.5 flex flex-wrap gap-[1px] justify-center items-center opacity-90 p-1 mt-7 select-none">
          <div className="grid grid-cols-13 gap-[1px] w-full h-full">
            {Array.from({ length: 143 }).map((_, idx) => {
              const row = Math.floor(idx / 13);
              const col = idx % 13;
              // Anchor exclusions
              const isAnchor = (row < 4 && col < 4) || (row < 4 && col > 8) || (row > 8 && col > 8);
              if (isAnchor) return <div key={idx} className="w-1.5 h-1.5 opacity-0" />;
              
              const isBlack = (idx * 23 + 11) % 3 === 0 || (idx % 5 === 1) || (idx % 13 === 3);
              return (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-xs transition-colors ${
                    isBlack ? "bg-[#0A2E5C]" : "bg-slate-100"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {info && (
        <div className="text-[10px] text-slate-500 font-semibold mt-3 text-center border-t border-slate-100 pt-2 w-full">
          {info}
        </div>
      )}
    </div>
  );
};

// Simulated custom barcode builder to represent physical validation
const Barcode: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-[1.5px] h-9 px-1">
        <div className="w-[2px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[3px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[2px] h-full bg-slate-900" />
        <div className="w-[4px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[2px] h-full bg-slate-900" />
        <div className="w-[3px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[4px] h-full bg-slate-900" />
        <div className="w-[2px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[3px] h-full bg-slate-900" />
        <div className="w-[2px] h-full bg-slate-900" />
        <div className="w-[1px] h-full bg-slate-900" />
        <div className="w-[4px] h-full bg-slate-900" />
        <div className="w-[2px] h-full bg-slate-900" />
      </div>
      <span className="text-[8px] font-mono font-bold text-gray-500 tracking-widest mt-1 uppercase">
        {code}
      </span>
    </div>
  );
};

export const SumerProfile: React.FC<SumerProfileProps> = ({
  completedCourses,
  setCompletedCourses,
  userProfile,
  setUserProfile,
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [cvData, setCvData] = useState<any>(null);
  const [isBuildingCv, setIsBuildingCv] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeTab, setActiveTab ] = useState<"linkedin" | "settings">("linkedin");
  
  // Custom interactive follower and roles mode states
  const [followersCount, setFollowersCount] = useState(1420);
  const [isFollowing, setIsFollowing] = useState(false);
  const [roleMode, setRoleMode] = useState<"student" | "visitor">("student");

  // Custom interactive modal and saved items state
  const [selectedCert, setSelectedCert] = useState<{ name: string; code: string; date: string } | null>(null);
  const [savedItems, setSavedItems] = useState<Array<{ id: string; title: string; type: string; date: string }>>([
    { id: "s1", title: "كورس أساسيات بايثون وتحليل البيانات (المنهاج التوليدي المعتمد)", type: "دورة تخصصية حرة", date: "31 مايو 2026" },
    { id: "s2", title: "مسار هندسة البرمجيات التوليدية المتكاملة للقرن 21", type: "مسار كفاءة مهني", date: "30 مايو 2026" },
    { id: "s3", title: "مستشار توجيه مهني بالمركز الرقمي الموحد", type: "طلب وظيفة مفعّل", date: "29 مايو 2026" }
  ]);

  // Blockchain verification system state
  const [searchCertCode, setSearchCertCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // default courses in case none are completed yet
  const studentCerts = completedCourses.length > 0 ? completedCourses : ["محو الأمية الرقمية للجميع (دورة أساسية معتمدة)"];

  // Skills endorsement database state 
  const [endorsements, setEndorsements] = useState<Record<string, number>>({
    "Python": 24,
    "AutoCAD": 18,
    "حل المشكلات": 31,
    "الذكاء الاصطناعي": 42,
    "ميكانيك": 15,
  });

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !userProfile.currentSkills.includes(trimmed)) {
      setUserProfile({
        ...userProfile,
        currentSkills: [...userProfile.currentSkills, trimmed],
      });
      setEndorsements(prev => ({ ...prev, [trimmed]: Math.floor(Math.random() * 5) + 1 }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setUserProfile({
      ...userProfile,
      currentSkills: userProfile.currentSkills.filter((s) => s !== skill),
    });
  };

  const handleEndorse = (skill: string) => {
    setEndorsements(prev => ({
      ...prev,
      [skill]: (prev[skill] || 0) + 1
    }));
  };

  const triggerCopyProfileLink = () => {
    setCopiedLink("https://sumer.academy/p/jaafar_almayahi");
    setTimeout(() => setCopiedLink(null), 3000);
  };

  const handleBuildCV = () => {
    setIsBuildingCv(true);
    setCvData(null);

    setTimeout(() => {
      setCvData({
        nameEn: "Jaafar Al-Mayahi",
        nameAr: userProfile.name || "جعفر المياحي",
        title: userProfile.goal || "مهندس اتصالات وبرمجيات متدرب | Junior Software Engineer",
        summaryEn: "Motivated Sumer Academy graduate with strong logical thinking, digital literacy, and data analysis qualifications. Seeking to apply specialized AI-assisted training metrics in Iraqi corporate environments.",
        summaryAr: `خريج متميز من أكاديمية سومر يحمل تأهلاً في التفكير المنهجي والبرمجة وتحليل البيانات. حاصل على شهادات معتمدة ونموذجية بالسرعة الرقمية، ويسعى للتطبيق البناء للمهارات في سوق العمل العراقي.`,
        skills: userProfile.currentSkills,
        certifications: studentCerts,
        contact: "info@sumer.academy.edu.iq | العراق",
        code: "SA-ATS-CV-" + ((userProfile.name || "").length * 179 + 10452)
      });
      setIsBuildingCv(false);
    }, 1200);
  };

  // Modern Certificate Verification System Simulation
  const handleVerifyCertificate = (codeToVerify?: string) => {
    const code = (codeToVerify || searchCertCode || "").trim().toUpperCase();
    if (!code) {
      alert("الرجاء إدخال رقم الإعتماد أولاً للفحص.");
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      // Generate realistic cryptographic blockchain validation record
      const indexMatch = studentCerts.findIndex((_, idx) => `SA-2026-N${1000 + idx}` === code) !== -1;
      const isDefaultMockCode = code.startsWith("SA-2026-N") && parseInt(code.split("-N")[1]) >= 1000;
      
      if (indexMatch || isDefaultMockCode) {
        const indexVal = isDefaultMockCode ? parseInt(code.split("-N")[1]) - 1000 : 0;
        const matchedCourseName = studentCerts[indexVal] || studentCerts[0] || "مساق تدريبي معتمد";
        
        setVerificationResult({
          valid: true,
          code,
          studentName: userProfile.name,
          course: matchedCourseName,
          issueDate: "31 مايو 2026",
          blockchainHeight: "BLOCK #14,849,203",
          hash: "SHA256: 8f44a30a1cbd9cbe29831f29211fb5cf8be8f9a2394aee9f140bbbfdce1cf2d8",
          authority: "وزارة التعليم العالي العراقية & الباقة الأكاديمية لسومر",
          status: "ACTIVE_DECENTRALIZED_LEDGER"
        });
      } else {
        setVerificationResult({
          valid: false,
          code,
          error: "لم يتم العثور على رمز التوقيع الرقمي هذا في سجلات البلوكشين الوطني."
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 text-right max-w-6xl mx-auto">
      
      {/* Tab Selector: LinkedIn-style Vs Profile Settings */}
      <div className="flex gap-2 justify-end border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("linkedin")}
          className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "linkedin" 
            ? "bg-[#0A2E5C] text-white shadow-sm" 
            : "text-slate-650 hover:bg-slate-100"
          }`}
        >
          <Globe size={14} />
          <span>هوية LinkedIn المهنية للتوظيف</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "settings" 
            ? "bg-[#0A2E5C] text-white shadow-sm" 
            : "text-slate-650 hover:bg-slate-100"
          }`}
        >
          <User size={14} />
          <span>تعديل الهوية والبيانات الشخصية</span>
        </button>
      </div>

      {activeTab === "linkedin" ? (
        <div className="space-y-6">
          
          {/* 🎛️ Role Mode Simulator */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-500/15 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-right shadow-xs">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-[#0A2E5C] flex items-center justify-start gap-1">
                <ShieldCheck size={14} className="text-amber-600" />
                <span>محاكي استكشاف الهوية المهنية (Sumer Identity Simulator)</span>
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold">
                اضغط لتجربة معاينة حساب "الطالب" (حيث ترى معلوماتك المحفوظة الخاصة) مقابل معاينة "الزوار/الشركات" (حيث يتم حجبها تلقائياً).
              </p>
            </div>
            <div className="flex bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-1 gap-1">
              <button
                onClick={() => setRoleMode("visitor")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border-0 ${
                  roleMode === "visitor"
                    ? "bg-[#EF6C00]/10 text-[#EF6C00]"
                    : "text-[#0A2E5C]/70 hover:bg-slate-50 bg-transparent"
                }`}
              >
                <Globe size={13} />
                <span>🌐 معاينة الزائر والشركات</span>
              </button>
              <button
                onClick={() => setRoleMode("student")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border-0 ${
                  roleMode === "student"
                    ? "bg-[#0A2E5C] text-white shadow-sm"
                    : "text-[#0A2E5C]/70 hover:bg-slate-50 bg-transparent"
                }`}
              >
                <User size={13} />
                <span>🎓 معاينة الطالب الكاملة</span>
              </button>
            </div>
          </div>
          
          {/* LinkedIn Style Academic Profile Header Section */}
          <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden relative">
            
            {/* LinkedIn Style Cover Banner with sumer ornaments */}
            <div className="h-44 md:h-52 bg-gradient-to-r from-[#0A2E5C] via-[#0D4B8E] to-[#1473B1] relative flex items-end p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="absolute top-4 left-4 text-white/30 font-display text-[9px] tracking-widest font-bold uppercase truncate max-w-[200px]">
                Sumer Academic Chain / ID #{Math.floor(Math.random() * 900000) + 100000}
              </div>
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Profile Info Card Area */}
            <div className="px-6 md:px-8 pb-8 relative text-right">
              
              {/* Profile Avatar with Halo Badge */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-4">
                <div className="relative inline-block">
                  <div className="w-28 h-28 bg-white p-1 rounded-full border-4 border-amber-500 shadow-md">
                    <div className="w-full h-full bg-[#0A2E5C] hover:bg-[#0D4B8E] transition-colors rounded-full flex items-center justify-center font-display text-4xl font-extrabold text-white text-center select-none uppercase">
                      {userProfile.name.charAt(0) || "ج"}
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 text-white rounded-full border-2 border-white flex items-center justify-center text-[8px] animate-pulse font-black" title="متاح ومصادق للتوظيف الفوري">
                    ✓
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      if (isFollowing) {
                        setFollowersCount(prev => prev - 1);
                        setIsFollowing(false);
                      } else {
                        setFollowersCount(prev => prev + 1);
                        setIsFollowing(true);
                      }
                    }}
                    className={`px-4 py-2 font-black text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isFollowing 
                        ? "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        : "bg-gradient-to-r from-[#0C4B8E] to-[#0A2E5C] text-white border-blue-900 shadow-sm hover:scale-[1.02]"
                    }`}
                  >
                    <Users size={13} className={isFollowing ? "text-emerald-500 animate-pulse" : "text-amber-400"} />
                    <span>{isFollowing ? "متابع ✓" : "متابعة الطالب"}</span>
                  </button>
                  <button
                    onClick={triggerCopyProfileLink}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 size={13} />
                    <span>{copiedLink ? "✓ تم نسخ الرابط" : "مشاركة الملف"}</span>
                  </button>
                  <button
                    onClick={handleBuildCV}
                    disabled={isBuildingCv}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>{isBuildingCv ? "جاري البناء..." : "تحديث ملف السيرة الذاتية ATS"}</span>
                  </button>
                </div>
              </div>

              {/* Headline & Affinity Info */}
              <div className="space-y-2 mt-4">
                <div className="flex flex-wrap items-center gap-2 justify-start">
                  <h2 className="text-xl md:text-2xl font-black text-[#0A2E5C] flex items-center gap-1">
                    <span>{userProfile.name}</span>
                    <ShieldCheck size={20} className="text-[#EF6C00]" title="طالب وطني مصدق" />
                  </h2>
                  <span className="bg-[#EF6C00]/10 text-[#EF6C00] text-[9px] font-black px-2.5 py-1 rounded-md">
                    مستوى جدارة أ كلي
                  </span>
                </div>

                <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed max-w-2xl">
                  {userProfile.goal || "مطور حلول برمجية وريادة الأعمال الرقمية والتقنية"}
                </p>

                <div className="flex flex-wrap gap-y-1 gap-x-4 text-[11px] text-slate-500 font-semibold items-center pt-1">
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} className="text-slate-400" />
                    <span>أكاديمية سومر للتعليم والتدريب التوليدي المزدوج</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Globe size={12} className="text-slate-400" />
                    <span>جمهورية العراق</span>
                  </span>
                  <span>•</span>
                  <span className="text-[#0A2E5C] hover:underline cursor-pointer" onClick={triggerCopyProfileLink}>
                    معلومات الاتصال بالخريج
                  </span>
                </div>
              </div>

              {/* Profile Insights like LinkedIn */}
              <div className="grid grid-cols-3 gap-2.5 mt-6 p-4 bg-slate-50/65 rounded-2xl border border-slate-100 text-center">
                <div className="border-l border-slate-200">
                  <span className="text-[9px] text-slate-500 block font-bold">مشاهدات الملف الشخصي</span>
                  <span className="text-sm font-black text-[#0A2E5C] font-mono mt-0.5 block">148</span>
                </div>
                <div className="border-l border-slate-200">
                  <span className="text-[9px] text-slate-500 block font-bold">نقاط الجدارة الأكاديمية</span>
                  <span className="text-sm font-black text-amber-600 font-mono mt-0.5 block">980</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-bold">متابعو الصفحة</span>
                  <span className="text-sm font-black text-emerald-600 font-mono mt-0.5 block">
                    {followersCount.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* About Summary Block */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-[#0A2E5C] border-r-4 border-[#EF6C00] pr-2">
              حول الطالب والمسار المهني (About Student)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              خريج متوج في العلوم التطبيقية والبرمجية عبر منهج التعليم والتدريب الفوري التابع للمؤسسة الأكاديمية. مدرب على مهارات الاستدامة ومعايير التحول الرقمي للشركات الوطنية. أسعى لدمج مهاراتي التقنية لتخطي حواجز التوظيف الأتوماتيكي.
            </p>
          </div>

          {/* 🏷️ Materials Bookmark and Saved Items List (User Personal Profile Feature) - ONLY visible to Student Role */}
          {roleMode === "student" && (
            <div className="bg-gradient-to-br from-white to-slate-50/20 rounded-3xl p-6 md:p-8 border-2 border-rose-500/10 shadow-sm space-y-4 relative overflow-hidden">
              {/* Privacy indicator banner */}
              <div className="absolute top-0 left-0 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-3.5 py-1 rounded-bl-2xl text-[9px] font-black flex items-center gap-1 shadow-sm">
                <Lock size={10} />
                <span>خاص ومخفي عن الزوار والشركات</span>
              </div>

              <div className="flex items-center justify-between border-r-4 border-[#EF6C00] pr-2 pt-1">
                <h3 className="font-extrabold text-sm text-[#0A2E5C] flex items-center gap-1.5">
                  <span>المواد والعناصر المحفوظة (Saved & Bookmarked Items)</span>
                </h3>
                <span className="text-[10px] bg-rose-500/10 text-rose-600 border border-rose-500/10 font-bold px-2.5 py-1 rounded-lg">
                  رؤية الطالب فقط 🔒 ({savedItems.length} عناصر)
                </span>
              </div>
              
              <div className="bg-orange-500/5 border border-orange-500/10 p-3 rounded-2xl flex items-center gap-2 text-right">
                <Lock size={13} className="text-orange-600 shrink-0" />
                <p className="text-[10px] text-orange-850 font-bold leading-relaxed">
                  هذه الخزنة الرقمية والاهتمامات المهنية مخفية تماماً عن عامة الناس أو جهات التوظيف ومخصصة لمطالعتك الحصرية كطالب. يمكنك تجربة كبسة تبديل الأدوار في الأعلى لمعاينة كيف تختفي تماماً عن الزوار!
                </p>
              </div>

              <p className="text-xs text-slate-500 pr-2 pt-1 font-semibold">العناصر والمسارات المهنية وعناوين التوظيف التي احتفظت بها للرجوع إليها مستقبلاً في ملفك المهني الموحد:</p>

              {savedItems.length === 0 ? (
                <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <span className="text-xs text-slate-400 font-semibold block">لا توجد مواد محفوظة في ملفك الأكاديمي حالياً.</span>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white hover:bg-slate-50/80 border border-slate-200/50 rounded-2xl flex flex-col justify-between transition-all relative group shadow-xs"
                    >
                      <div className="space-y-1 text-right">
                        <span className="inline-block text-[9px] bg-[#EF6C00]/10 text-[#EF6C00] px-2 py-0.5 rounded font-black">
                          {item.type}
                        </span>
                        <h4 className="font-bold text-xs text-[#0A2E5C] leading-snug line-clamp-2 pt-1">{item.title}</h4>
                        <p className="text-[9px] text-slate-400 font-semibold">تاريخ الحفظ: {item.date}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-200/40 flex justify-end">
                        <button
                          onClick={() => {
                            setSavedItems(prev => prev.filter(s => s.id !== item.id));
                          }}
                          className="text-rose-600 hover:text-white hover:bg-rose-600 px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer border border-rose-200 bg-transparent"
                          title="حذف من ملفك المهني الموحد"
                        >
                          <Trash2 size={12} />
                          <span>حذف من المحفوظات</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Interactive National Blockchain Certificate Ledger Panel (The System Highlight) */}
          <div className="bg-gradient-to-br from-[#051E3D] to-[#0A2E5C] text-white rounded-3xl p-6 shadow-xl border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="text-right">
                <h3 className="text-sm font-extrabold text-amber-400 flex items-center justify-start gap-1">
                  <Cpu size={15} />
                  <span>النظام الرقمي الوطني الموحد للفحص والتحقق بالبلوكشين (Sumer Cryptographic Ledger System)</span>
                </h3>
                <p className="text-[10px] text-slate-300 mt-1">تثبت على الفور من صحة وأصالة أي شهادة صادرة برقم الاعتماد والباركود:</p>
              </div>
              <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-md animate-pulse">
                نظام التحقق نشط ومصنف ●
              </span>
            </div>

            {/* Verification Form */}
            <div className="flex gap-2 max-w-xl">
              <input
                type="text"
                value={searchCertCode}
                onChange={(e) => setSearchCertCode(e.target.value)}
                placeholder="أدخل كود الشهادة للفحص (مثل: SA-2026-N1000)"
                className="bg-white/10 hover:bg-white/15 focus:bg-white border border-white/10 text-white focus:text-slate-900 p-3 rounded-2xl text-xs flex-1 transition-all text-center outline-none font-mono"
              />
              <button
                onClick={() => handleVerifyCertificate()}
                disabled={isVerifying}
                className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold px-6 py-3 rounded-2xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Search size={14} />
                <span>{isVerifying ? "فحص..." : "فحص بالتوقيع الرقمي"}</span>
              </button>
            </div>

            {/* Visual Ledger Lookup Result */}
            {verificationResult && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-right space-y-3 animate-slide-up">
                {verificationResult.valid ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 justify-start text-emerald-400 font-black text-xs">
                      <CheckCircle size={16} />
                      <span>تم التصديق والمصادقة على أصل الشهادة الرقمية!</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[9px]">اسم حامل الشهادة:</span>
                        <span className="font-bold text-white block mt-0.5">{verificationResult.studentName}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[9px]">المقرر التدريبي الملحق:</span>
                        <span className="font-bold text-amber-300 block mt-0.5">{verificationResult.course}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[9px]">رقم بلوك المصادقة (National Blockchain):</span>
                        <span className="font-mono text-emerald-400 block mt-0.5 text-[11px]">{verificationResult.blockchainHeight}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[9px]">بصمة التوقيع الرقمي (SHA-256):</span>
                        <span className="font-mono text-gray-300 block mt-0.5 text-[10px] break-all">{verificationResult.hash}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 italic block border-t border-white/10 pt-2 text-center">
                      مصادق رسميًا ومدرج ضمن قواعد بيانات التدريب المستدام ونقابة المدربين العراقيين بموجب الترميز البصري.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-450 text-xs font-black">
                    <AlertCircle size={16} className="text-rose-400" />
                    <span className="text-rose-400">{verificationResult.error}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Core Credentials & Certified Badging List with Real Barcodes */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#0A2E5C] border-r-4 border-[#EF6C00] pr-2">
              الشهادات الصادرة والاعتمادات الدولية (Licenses & Certifications)
            </h3>
            <p className="text-xs text-slate-500">تمثل الكبسولات المعتمدة الحاصل عليها من أكاديمية سومر، كل شهادة مجهزة بـ باركود هوية وطني مخصص. اضغط على الكارت لفتح الشهادة وعرض رمز الـ QR:</p>

            <div className="grid md:grid-cols-2 gap-4">
              {studentCerts.map((cert: string, i: number) => {
                const uniqueCode = `SA-2026-N${1000 + i}`;
                return (
                  <div
                    key={i}
                    className="p-5 bg-slate-50 hover:bg-slate-100/60 border border-slate-200/60 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md cursor-pointer group"
                    onClick={() => setSelectedCert({ name: cert, code: uniqueCode, date: "31 مايو 2026" })}
                    title="اضغط لفتح الشهادة وعرض تفاصيل كود الـ QR"
                  >
                    <div className="space-y-2 flex-1 text-right">
                      <div className="flex items-center gap-2 justify-start">
                        <div className="w-8 h-8 bg-[#EF6C00]/10 group-hover:bg-[#EF6C00]/20 text-[#EF6C00] rounded-xl flex items-center justify-center transition-colors">
                          <Award size={16} />
                        </div>
                        <h4 className="font-bold text-xs text-[#0A2E5C] leading-snug group-hover:text-amber-700 transition-colors">{cert}</h4>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 space-y-1 pr-1 font-semibold">
                        <div>جهة الإصدار: المؤسسة العامة لأكاديمية سومر</div>
                        <div>تاريخ المنح: مايو 2026 ● الرقم: {uniqueCode}</div>
                        <div className="pt-2 flex flex-wrap gap-x-3 gap-y-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setSearchCertCode(uniqueCode);
                              handleVerifyCertificate(uniqueCode);
                            }}
                            className="text-[#EF6C00] hover:underline text-[9px] font-black cursor-pointer bg-transparent border-0 flex items-center gap-0.5"
                          >
                            🔍 التحقق السريع بالبلوكشين
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => setSelectedCert({ name: cert, code: uniqueCode, date: "31 مايو 2026" })}
                            className="text-blue-600 hover:underline text-[9px] font-black cursor-pointer bg-transparent border-0"
                          >
                            📄 عرض وثيقة الشهادة والـ QR
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => {
                              if (setCompletedCourses) {
                                setCompletedCourses(prev => prev.filter(c => c !== cert));
                              }
                            }}
                            className="text-rose-600 hover:underline text-[9px] font-black cursor-pointer bg-transparent border-0"
                          >
                            🗑️ حذف الشهادة
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Stylized Cryptographic Barcode Component */}
                    <div className="shrink-0 self-end md:self-auto">
                      <Barcode code={uniqueCode} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Endorsable Academic Skills List section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#0A2E5C] border-r-4 border-[#EF6C00] pr-2">
              المهارات والتزكيات الأكاديمية (Endorsed Professional Skills)
            </h3>
            <p className="text-xs text-slate-500">المهارات التي يدعمها المعلمون والزملاء ومحرك التوظيف التوليدي للأكاديمية:</p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {userProfile.currentSkills.map((sk: string, index: number) => {
                const count = endorsements[sk] || 4;
                return (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50 flex items-center justify-between transition-colors hover:bg-slate-100/40"
                  >
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#0A2E5C] block">
                        {sk}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                        {count} تزكيات مهنية
                      </span>
                    </div>

                    <button
                      onClick={() => handleEndorse(sk)}
                      className="px-2.5 py-1 bg-[#0A2E5C]/5 hover:bg-[#0A2E5C]/10 text-[#0A2E5C] hover:text-[#EF6C00] transition-colors rounded-xl text-[10px] font-black cursor-pointer border border-[#0A2E5C]/10"
                    >
                      تزكية +1
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Settings Tab: Maintain original update form */
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-[#0A2E5C] text-sm flex items-center gap-1.5 justify-start">
              <User size={16} className="text-[#EF6C00]" />
              <span>تحديث بيانات الهوية الشخصية والأكاديمية</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Form elements */}
              <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="font-bold text-xs text-[#0A2E5C] border-r-4 border-amber-500 pr-2">تحديث الهوية الطلابية:</h4>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs text-gray-400 font-extrabold mb-1">الاسم الكامل للطالب (عربي):</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full bg-white p-3 rounded-2xl text-xs font-semibold text-slate-900 border border-slate-200 outline-none focus:border-[#0A2E5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 font-extrabold mb-1">طموحك أو تفوقك الأكاديمي الحالي:</label>
                    <input
                      type="text"
                      value={userProfile.goal}
                      onChange={(e) => setUserProfile({ ...userProfile, goal: e.target.value })}
                      className="w-full bg-white p-3 rounded-2xl text-xs font-semibold text-slate-900 border border-slate-200 outline-none focus:border-[#0A2E5C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 font-extrabold mb-1">معدل البكالوريا:</label>
                      <input
                        type="text"
                        value={userProfile.bakaloriaScore || "94.5"}
                        onChange={(e) => setUserProfile({ ...userProfile, bakaloriaScore: e.target.value })}
                        className="w-full bg-white p-3 rounded-2xl text-xs font-semibold text-slate-900 border border-slate-200 outline-none focus:border-[#0A2E5C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 font-extrabold mb-1">الفرع الدراسي المعني:</label>
                      <select
                        value={userProfile.highSchoolTrack || "علمي"}
                        onChange={(e) => setUserProfile({ ...userProfile, highSchoolTrack: e.target.value })}
                        className="w-full bg-white px-2 text-xs font-semibold text-slate-900 border border-slate-200 outline-none focus:border-[#0A2E5C] rounded-2xl h-[42px]"
                      >
                        <option value="علمي">علمي (تطبيقي/إحيائي)</option>
                        <option value="أدبي">أدبي</option>
                        <option value="فنون">فنون جميلة</option>
                        <option value="مهني">صناعي / تجاري</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills database modify */}
              <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-bold text-xs text-[#0A2E5C] border-r-4 border-amber-500 pr-2">تحديث قاعدة مهارات الطالب:</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">أدخل المهارات والمساقات الجديدة لتتحين مباشرة على خريطة التوصيف والسيرة الذاتية الذكية:</p>
                
                <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="أضف مهاراة (مثلاً: C++, SQL, Git)"
                    className="w-full bg-transparent p-2 text-xs outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <button
                    onClick={handleAddSkill}
                    className="bg-[#0A2E5C] text-white w-8 h-8 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {userProfile.currentSkills.length > 0 ? (
                    userProfile.currentSkills.map((sk: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-[10px] font-bold text-[#0A2E5C] rounded-xl shadow-xs"
                      >
                        {sk}
                        <button
                          onClick={() => handleRemoveSkill(sk)}
                          className="text-red-400 hover:text-red-650 cursor-pointer font-black"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-[11px] text-gray-400 italic">لا يوجد مهارات مضافة مسبقاً.</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Generated CV Mockup Ready for ATS - Maintain CV segment at bottom of page as secondary support */}
      {cvData && (
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border-2 border-amber-500 relative overflow-hidden animate-fade-in text-right">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
          <div className="absolute top-0 left-0 w-16 h-16 bg-amber-500/5 rounded-br-full border-b border-r border-amber-500/10" />

          <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8 flex-wrap gap-4">
            <div>
              <span className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">
                توليد السيرة الذاتية الذكية المتوافقة مع الفلاتر (Sumer-ATS Draft)
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#0A2E5C] font-display mt-1">
                {cvData.nameAr} | {cvData.nameEn}
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-1">{cvData.title}</p>
              <span className="text-[10px] text-slate-400 font-bold block mt-1">📍 {cvData.contact}</span>
            </div>
            <div className="text-center font-display border border-[#0A2E5C] bg-[#0A2E5C]/5 p-3 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] text-[#0A2E5C] font-bold">ملف مصادق</span>
              <span className="text-xs font-black text-[#EF6C00] leading-none mt-1">Sumer ATS Match</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start text-right">
            <div className="md:col-span-8 space-y-6">
              
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-[#0A2E5C] font-display uppercase tracking-wide border-b border-gray-200 pb-1.5 select-none">
                  الملخص الأكاديمي الفني | Professional Summary
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  {cvData.summaryAr}
                </p>
                <p className="text-xs text-slate-450 italic leading-relaxed">
                  {cvData.summaryEn}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-[#0A2E5C] font-display uppercase tracking-wide border-b border-gray-200 pb-1.5 select-none">
                  الشهادات والاعتمادات الصادرة عن الأكاديمية | Academy Licenses & Certificates
                </h4>
                <div className="space-y-3">
                  {cvData.certifications.map((cert: string, idx: number) => {
                    const matchedCode = `SA-2026-N${1000 + idx}`;
                    return (
                      <div key={idx} className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="text-xs block font-bold text-slate-900">
                            ★ {cert}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            الترميز الرقمي المولد: {matchedCode} ● تم التحقق في السجل الوطني
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#EF6C00]">2026 - تخرج</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6 md:border-r border-gray-100 md:pr-6">
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-[#0A2E5C] font-display uppercase tracking-wide border-b border-gray-200 pb-1.5 select-none">
                  المهارات الفنية المثبتة | Verified Skills List
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 font-extrabold">
                  {cvData.skills.length > 0 ? (
                    cvData.skills.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5 justify-start">
                        <span className="text-[#EF6C00]">•</span> {s}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 block">لم يتم العثور على أي كفاءة تقنية</li>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-3xl">
                <h5 className="font-bold text-[10px] text-[#0A2E5C] mb-1">إشعار التوافق للتصفية الآلية:</h5>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  تصميم وتجزئة القوالب هذه مبرمجة ومتوافقة تماماً كمعيار دولي لتجاوز مرشحات وعوائق الفرز الآلي (ATS Resume Match) للنفط، والبرمجيات والمؤسسات الكبرى.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-150 flex items-center justify-between text-[11px] text-gray-400">
            <span>جميع الحقوق مرخصة ومحمية لسجل أكاديمية سومر الوطني 2026</span>
            <button
               onClick={() => alert("تم تحميل المقترح وتصدير السيرة الذاتية بنجاح بصيغة جاهزة للطباعة!")}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl cursor-pointer font-bold border border-slate-200"
            >
              📥 طباعة وتحميل الملف
            </button>
          </div>
        </div>
      )}

      {/* 📜 Beautiful Certificate Detail Modal with Custom QR Decoding */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in text-slate-900">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative border-2 border-amber-500/30 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-rose-500 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-0 bg-transparent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Official Header Badge */}
            <div className="flex flex-col items-center text-center pb-2 border-b border-gray-100">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-1">
                <Award size={26} className="animate-pulse text-amber-500" />
              </div>
              <h2 className="text-base font-black text-[#0A2E5C]">شهادة الإنجاز الرقمية الصادرة بالبلوكشين</h2>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{selectedCert.code}</p>
            </div>

            {/* Certificate Decorative Card */}
            <div className="border-8 border-double border-amber-500/25 bg-amber-50/10 px-5 py-6 md:px-8 md:py-8 rounded-2xl relative text-center space-y-4">
              
              {/* Iraqi Ministry Watermark Flag or Text */}
              <div className="text-[9px] text-slate-400 font-bold tracking-wide space-y-0.5">
                <div>جمهورية العراق - وزارة التعليم العالي والبحث العلمي</div>
                <div className="text-[#0A2E5C]">أكاديمية سومر المدمجة للتدريب التوليدي المزدوج</div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-600 tracking-wide font-display">شهادة جدارة معتمدة</h3>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">ACCELERATED DIGITAL CREDITING</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                تشهد الهيئة الاستشارية لأكاديمية سومر المدمجة أن الطالب الوطنى المصدق
              </p>

              <div className="py-1">
                <span className="text-xl md:text-2xl font-black text-[#0A2E5C] border-b-2 border-amber-500/40 pb-1.5 px-4 block w-max mx-auto">
                  {userProfile.name}
                </span>
              </div>

              <p className="text-xs text-slate-650 leading-relaxed font-semibold max-w-md mx-auto">
                قد أتم بنجاح وبكفاءة عالية المساق التخصصي الحاصل فيه على التقييم المزدوج للمنهاج الرقمي المعتمد:
              </p>

              <div className="bg-white p-3 rounded-xl border border-amber-500/15 max-w-sm mx-auto shadow-sm">
                <span className="text-xs md:text-sm font-black text-[#0A2E5C] block">
                  {selectedCert.name}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1 font-mono">
                  ACC_CREDIT_REF: {selectedCert.code}
                </span>
              </div>

              {/* Flex Section: QR + Signature Stamp */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-3">
                {/* 1. Official QR Code with decoded state */}
                <div className="shrink-0">
                  <QRCode
                    value={`https://sumer.academy/verify/${selectedCert.code}`}
                    info="امسح الرمز للتحقق من السجل الفوري"
                  />
                </div>

                {/* 2. Decoded Details and Signatures */}
                <div className="text-right space-y-2 text-[10px] text-slate-500 font-semibold flex-1">
                  <div className="bg-[#0A2E5C]/5 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-[#0A2E5C]">معلومات الـ QR المفكوكة:</p>
                    <ul className="list-disc list-inside space-y-0.5 mt-1 pr-1 text-[11px] leading-relaxed">
                      <li><strong>حامل الاعتماد:</strong> {userProfile.name}</li>
                      <li><strong>رقم المستودع:</strong> {selectedCert.code}</li>
                      <li><strong>تاريخ الصدور:</strong> {selectedCert.date}</li>
                      <li><strong>سلطة المصادقة:</strong> البلوكشين الوطني المزدوج</li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-2 px-1">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full border-2 border-amber-300 shadow flex items-center justify-center text-white text-[9px] font-black pointer-events-none uppercase">
                        SUMER
                      </div>
                      <span className="text-[8px] text-amber-700 font-black mt-1 block">ختم الأكاديمية</span>
                    </div>

                    <div className="text-center font-bold">
                      <div className="text-xs font-serif italic text-blue-800 pointer-events-none select-none">
                        Dr. Jaafar Al-Lami
                      </div>
                      <div className="w-20 h-[1px] bg-slate-300 my-0.5 animate-pulse" />
                      <span className="text-[8px] text-slate-400 block font-sans">مجلس التحقق الأكاديمي</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Delete Actions & Warning info inside Modal */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right">
              <div>
                <span className="text-[10px] text-rose-600 font-black flex items-center justify-start gap-1">
                  <AlertCircle size={12} className="shrink-0" /> منطقة حساسة للأمن الأكاديمي
                </span>
                <p className="text-[10px] text-slate-500 mt-1">
                  حذف هذه الشهادة سيؤدي إلى شطب توقيعك من سجل البلوكشين وتطهير اللوحة تماماً.
                </p>
              </div>
              <button
                onClick={() => {
                  if (setCompletedCourses) {
                    setCompletedCourses(prev => prev.filter(c => c !== selectedCert.name));
                  }
                  setSelectedCert(null);
                }}
                className="bg-rose-50 text-rose-750 hover:bg-rose-100 hover:text-white hover:bg-rose-650 border border-rose-200 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Trash2 size={13} />
                <span>شطب وحذف الشهادة</span>
              </button>
            </div>

            {/* Dialog Footer Actions */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer border-0"
              >
                إغلاق الشهادة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
