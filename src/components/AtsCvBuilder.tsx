import React, { useState, useRef } from "react";
import { 
  FileText, 
  Sparkles, 
  Plus, 
  Trash2, 
  Award, 
  Download, 
  Check, 
  RefreshCcw, 
  GraduationCap, 
  Briefcase, 
  User, 
  BookmarkCheck,
  AlertCircle
} from "lucide-react";

interface AtsCvBuilderProps {
  completedCourses: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  desc: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

export const AtsCvBuilder: React.FC<AtsCvBuilderProps> = ({ completedCourses }) => {
  // Personal Info States
  const [fullName, setFullName] = useState("جعفر المياحي");
  const [jobTitle, setJobTitle] = useState("مطور برمجيات واعد");
  const [email, setEmail] = useState("jaafar.almayahi@gamil.com");
  const [phone, setPhone] = useState("+964 770 123 4567");
  const [address, setAddress] = useState("العراق");
  const [summary, setSummary] = useState("خريج طموح وحاصل على اعتماد برمجي متقدم وتفكير خوارزمي من أكاديمية سومر، متمكن من لغات الويب الأساسية وبناء الواجهات المدمجة بمكافئات الذكاء الاصطناعي.");

  // Lists
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      title: "متدرب برمجيات وتطبيقات",
      company: "مشروع تدريبي مشترك (أكاديمية سومر)",
      period: "2026 - حالياً",
      desc: "تطوير واجهات برمجة تفاعلية وربط مسارات المواءمة والتقويم الدراسي الذكي"
    }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "الدراسة الإعدادية - الفرع العلمي كفاءة",
      school: "إعدادية المتميزين النموذجية",
      year: "2025"
    }
  ]);

  const [skillTags, setSkillTags] = useState<string[]>(["HTML/CSS", "Python", "التفكير الإبداعي", "مهارات الإلقاء"]);
  const [newSkill, setNewSkill] = useState("");

  // Certificates states - loaded from platform courses
  const [selectedPlatformCerts, setSelectedPlatformCerts] = useState<string[]>([...completedCourses]);

  // Preview Mode
  const [activePreviewTheme, setActivePreviewTheme] = useState<"ats" | "modern" | "classic">("ats");

  // Add Item actions
  const handleAddExperience = () => {
    setExperiences([...experiences, { title: "", company: "", period: "", desc: "" }]);
  };

  const handleRemoveExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const handleUpdateExperience = (idx: number, field: keyof Experience, val: string) => {
    const updated = [...experiences];
    updated[idx][field] = val;
    setExperiences(updated);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { degree: "", school: "", year: "" }]);
  };

  const handleRemoveEducation = (idx: number) => {
    setEducations(educations.filter((_, i) => i !== idx));
  };

  const handleUpdateEducation = (idx: number, field: keyof Education, val: string) => {
    const updated = [...educations];
    updated[idx][field] = val;
    setEducations(updated);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillTags.includes(newSkill.trim())) {
      setSkillTags([...skillTags, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillTags(skillTags.filter(s => s !== skill));
  };

  const togglePlatformCert = (cert: string) => {
    if (selectedPlatformCerts.includes(cert)) {
      setSelectedPlatformCerts(selectedPlatformCerts.filter(c => c !== cert));
    } else {
      setSelectedPlatformCerts([...selectedPlatformCerts, cert]);
    }
  };

  // Calculate ATS Score & Recommendations
  const calculateAtsScore = () => {
    let score = 30; // base score for inputting info
    
    if (fullName.length > 5) score += 10;
    if (summary.length > 40) score += 15;
    if (experiences.every(e => e.title && e.company && e.desc)) score += 15;
    if (educations.every(ed => ed.degree && ed.school)) score += 10;
    if (skillTags.length >= 4) score += 10;
    if (selectedPlatformCerts.length > 0) score += 10; // Extra score for certificates completed on sumer academy
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  const getAtsRecommendations = () => {
    const recs: string[] = [];
    if (summary.length < 50) {
      recs.push("قم بإطالة ملخصك المهني ليركز على مهاراتك الفائقة والذكاء الاستدعائي المكتسب في سومر.");
    }
    if (skillTags.length < 5) {
      recs.push("أضف على الأقل 5 مهارات لوحتك التنافسية مثل (Python, وبنى المعطيات, حل المشكلات).");
    }
    if (experiences.some(e => e.desc.length < 20)) {
      recs.push("قم بكتابة ملخص دقيق للمهام السابقة لضمان نجاح الزحف التلقائي للمصطلحات بالبرنامج.");
    }
    if (selectedPlatformCerts.length === 0) {
      recs.push("أضف شهادة معتمدة واحدة على الأقل حصدتها من الأكاديمية لتظهر مصداقيتها بالتوظيف.");
    }
    return recs;
  };

  const recommendations = getAtsRecommendations();

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-right font-sans min-h-screen">
      
      {/* Heavy 3D Premium Title Frame */}
      <div className="bg-gradient-to-r from-[#031e42] via-[#0A2E5C] to-indigo-950 text-white p-8 md:p-10 rounded-[32px] border-t-2 border-l-2 border-r-2 border-b-[8px] border-indigo-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={11} /> صانع السيرة الذاتية المهني والامتحانات الموثوقة بالذكاء الاصطناعي
            </span>
            <h1 className="text-2xl md:text-3xl font-display font-black leading-tight">
              أداة بناء السيرة الذاتية القياسية بنظام مواءمة (ATS) الدولي
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-bold">
              صمم سيرتك الاحترافية الموزونة مجاناً وهندس الكلمات لإقناع لجان التوظيف الآلية، مع تضمين كلي وفوري لجميع الشهادات والدورات التي حصدتها داخل بوابة الأكاديمية.
            </p>
          </div>
          <div className="bg-slate-900/40 p-4 rounded-xl border border-white/10 flex items-center gap-3 shrink-0">
            <div className="text-center font-mono font-black text-2xl text-amber-400">
              {atsScore}%
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-bold">مؤشر جودة الـ ATS المقترح</span>
              <span className="text-[11px] text-green-400 font-bold block">
                {atsScore >= 80 ? "جاهزة للتقديم في كبرى الشركات ✓" : "تتطلب بعض التحسينات الطفيفة"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* RIGHT SIDE: Interactive Edit Form Panel */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-xl space-y-8">
          
          {/* Section 1: Personal info */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#0A2E5C] flex items-center gap-2 justify-start border-b border-slate-100 pb-2">
              <User size={16} className="text-[#EF6C00]" /> المعلومات الشخصية الأساسية
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold block">الاسم الثلاثي واللقب:</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold block">المسمى الوظيفي المستهدف:</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold block">البريد الإلكتروني:</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-[11px] text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold block">رقم الهاتف النشط:</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-[11px] text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold block">العنوان الجغرافي العراقي:</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-[11px] text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-bold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold block">ملخص مهني ووظيفي موجز:</label>
              <textarea 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-bold leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Certifications and Courses harvested from the Sumer platform! */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#0A2E5C] flex items-center gap-2 justify-start border-b border-slate-100 pb-2">
              <Award size={16} className="text-amber-500" /> تضمين شهادات منصة أكاديمية سومر (تكامل فوري)
            </h3>
            <p className="text-[11px] text-slate-500 font-bold">
              تظهر هنا جميع الشهادات والدورات التي أكملتها بنجاح داخل رصيدك بالأكاديمية. اضغط لتضمينها فورياً بملف السيرة الذاتية المهني أمام لجان التوظيف:
            </p>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {completedCourses.map((c, idx) => {
                const isSelected = selectedPlatformCerts.includes(c);
                return (
                  <div 
                    key={idx}
                    onClick={() => togglePlatformCert(c)}
                    className={`p-3.5 rounded-2xl border-2 text-right transition-all cursor-pointer flex items-center justify-between select-none ${
                      isSelected 
                        ? "bg-amber-500/10 border-amber-500 text-[#0a2e5c]"
                        : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border ${
                        isSelected ? "bg-amber-500 text-white border-amber-600" : "bg-slate-200 text-slate-400 border-slate-300"
                      }`}>
                        🏆
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold block leading-normal">{c}</span>
                        <span className="text-[9px] text-gray-400 font-medium block mt-0.5">شهادة تقويم منسقة معتمدة بالباركود</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isSelected ? "bg-amber-500 border-transparent text-white" : "border-slate-300"
                    }`}>
                      {isSelected && <Check size={11} />}
                    </div>
                  </div>
                );
              })}
              {completedCourses.length === 0 && (
                <div className="bg-amber-50 text-amber-800 p-4 rounded-xl border border-amber-200 text-xs font-bold leading-relaxed">
                  لم تقم بحصد شهادات بالملف الشخصي حتى الآن. توجه لكورسات التعليم المستمر، تجاوز الامتحانات بنجاح لتظهر هنا!
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Work experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <button 
                onClick={handleAddExperience}
                className="px-3 py-1 bg-slate-100 hover:bg-[#0A2E5C]/10 text-[#0A2E5C] text-xs font-black rounded-lg cursor-pointer transition-all flex items-center gap-1"
              >
                <Plus size={13} /> أضف خبرة
              </button>
              <h3 className="text-sm font-black text-[#0A2E5C] flex items-center gap-2 justify-start">
                <Briefcase size={16} className="text-[#EF6C00]" /> الخبرات المهنية والتطبيقات
              </h3>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl relative space-y-3">
                  <button 
                    onClick={() => handleRemoveExperience(idx)}
                    className="absolute top-3 left-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg cursor-pointer transition-all"
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">المسمى الوظيفي:</label>
                      <input 
                        type="text" 
                        value={exp.title}
                        onChange={(e) => handleUpdateExperience(idx, "title", e.target.value)}
                        placeholder="مثال: مطور برمجيات متدرب"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">الشركة أو الجهة:</label>
                      <input 
                        type="text" 
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(idx, "company", e.target.value)}
                        placeholder="مثال: آسياسيل"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 text-xs">
                    <div className="col-span-4 space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">الفترة / التاريخ:</label>
                      <input 
                        type="text" 
                        value={exp.period}
                        onChange={(e) => handleUpdateExperience(idx, "period", e.target.value)}
                        placeholder="مثال: 2025 - حاليا"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                    <div className="col-span-8 space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">سرد للمسؤوليات أو الإنجازات:</label>
                      <input 
                        type="text" 
                        value={exp.desc}
                        onChange={(e) => handleUpdateExperience(idx, "desc", e.target.value)}
                        placeholder="أذكر باختصار ما هي أهم مخرج عملي قمت به..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Academic Achievements */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <button 
                onClick={handleAddEducation}
                className="px-3 py-1 bg-slate-100 hover:bg-[#0A2E5C]/10 text-[#0A2E5C] text-xs font-black rounded-lg cursor-pointer transition-all flex items-center gap-1"
              >
                <Plus size={13} /> أضف تعليم
              </button>
              <h3 className="text-sm font-black text-[#0A2E5C] flex items-center gap-2 justify-start">
                <GraduationCap size={16} className="text-[#EF6C00]" /> المسار الدراسي والأكاديمي
              </h3>
            </div>

            <div className="space-y-4">
              {educations.map((edu, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl relative space-y-3">
                  <button 
                    onClick={() => handleRemoveEducation(idx)}
                    className="absolute top-3 left-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg cursor-pointer transition-all"
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="grid grid-cols-12 gap-3 text-xs">
                    <div className="col-span-5 space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">الدرجة والتخصص:</label>
                      <input 
                        type="text" 
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(idx, "degree", e.target.value)}
                        placeholder="مثال: بكالوريوس هندسة عصبية"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                    <div className="col-span-5 space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">اسم الكلية / المدرسة:</label>
                      <input 
                        type="text" 
                        value={edu.school}
                        onChange={(e) => handleUpdateEducation(idx, "school", e.target.value)}
                        placeholder="مثال: جامعة الموصل"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none text-right font-bold"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] text-gray-400 font-bold block">السنة:</label>
                      <input 
                        type="text" 
                        value={edu.year}
                        onChange={(e) => handleUpdateEducation(idx, "year", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 outline-none text-center font-bold font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Skills tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#0A2E5C] flex items-center gap-2 justify-start border-b border-slate-100 pb-2">
              <BookmarkCheck size={16} className="text-[#EF6C00]" /> الأوسمة والمهارات المطلوبة
            </h3>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="أضف مهارة وسمية (مثال: Python, SQL)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0A2E5C] text-right font-bold"
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <button 
                onClick={handleAddSkill}
                className="bg-[#0A2E5C] hover:bg-[#031e42] text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillTags.map((sk, idx) => (
                <span 
                  key={idx}
                  className="bg-slate-100 border border-slate-200 text-slate-700 font-display font-black text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all group cursor-pointer"
                  onClick={() => handleRemoveSkill(sk)}
                  title="اضغط للحذف"
                >
                  {sk}
                  <span className="text-slate-400 group-hover:text-red-500 font-mono text-[9px]">×</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* LEFT SIDE: Real-Time ATS Print Preview Template & Report Score card */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
          
          {/* Action Tools: Download/Print */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-md flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setActivePreviewTheme("ats")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activePreviewTheme === "ats" ? "bg-[#0A2E5C] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                بسيط ATS
              </button>
              <button 
                onClick={() => setActivePreviewTheme("classic")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activePreviewTheme === "classic" ? "bg-[#0A2E5C] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                كلاسيكي
              </button>
            </div>
            
            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2"
            >
              <Download size={14} /> طباعة وحفظ السيرة الذاتية المستحقة (PDF)
            </button>
          </div>

          {/* Parser Evaluation Report Panel */}
          <div className="bg-slate-900 text-white border-2 border-indigo-950 p-6 rounded-[30px] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 justify-start text-amber-400">
              <AlertCircle size={18} />
              <h4 className="font-extrabold text-[#D84315] text-xs">تقرير الامتحانات والمطابقة للموارد البشرية (ATS Verification)</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
              يقرأ الزاحف الذكي لآسيا سيل أو غاز الشمال سيرتك بدقة تامة. هنا توصيات الذكاء الاصطناعي للملف:
            </p>
            {recommendations.length > 0 ? (
              <ul className="space-y-1.5">
                {recommendations.slice(0, 3).map((rec, i) => (
                  <li key={i} className="text-[10px] text-amber-200/90 leading-relaxed flex items-start gap-1 justify-start">
                    <span className="shrink-0 text-amber-500">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1.5 justify-start">
                ✓ ممتاز! ملفك المواءم مستوفى لكافة الكلمات المفتاحية والشهادات المهنية المعتمدة بشكل رائع.
              </p>
            )}
          </div>

          {/* LIVE ATS VIEWBOX: Exact B&W / Clean spacing format to guarantee ATS parser crawling! */}
          <div className="border border-slate-300 bg-white p-8 md:p-10 rounded-2xl shadow-xl space-y-6 text-right text-slate-900 border-t-4 border-t-[#0A2E5C]">
            <div className="text-center space-y-2 pb-4 border-b border-slate-200">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">{fullName || "الاسم ثلاثي كامل"}</h2>
              <p className="text-xs font-semibold text-slate-600 tracking-wide uppercase">{jobTitle || "الوظيفة المستهدفة"}</p>
              
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] font-mono text-slate-500">
                <span>📍 {address}</span>
                <span>✉ {email}</span>
                <span>☎ {phone}</span>
              </div>
            </div>

            {/* Profile summary */}
            {summary && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-0.5">Summary / الملخص المهني</h3>
                <p className="text-[11px] text-slate-700 leading-relaxed font-normal">{summary}</p>
              </div>
            )}

            {/* Platform Accreditations list */}
            {selectedPlatformCerts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-0.5">Certifications / الاعتمادات التعليمية من سومر</h3>
                <div className="space-y-1.5 text-[11px]">
                  {selectedPlatformCerts.map((crt, i) => (
                    <div key={i} className="flex justify-between items-start font-bold">
                      <span className="text-slate-800">● {crt}</span>
                      <span className="text-slate-500 text-[10px] font-mono select-none">Sumer Academy (Verified Platform Credit)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education section */}
            {educations.length > 0 && educations.some(e => e.school || e.degree) && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-0.5">Education / التعليم والتأهيل</h3>
                <div className="space-y-2.5">
                  {educations.map((edu, i) => (
                    <div key={i} className="text-[11px] leading-snug">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{edu.degree || "الشهادة الأكاديمية"}</span>
                        <span className="text-[10px] font-mono">{edu.year || "السنة"}</span>
                      </div>
                      <p className="text-slate-500">{edu.school || "الجامعة أو المدرسة"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience section */}
            {experiences.length > 0 && experiences.some(e => e.title || e.company) && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-0.5">Experience / الخبرات والعمل الميداني</h3>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="text-[11px] leading-snug space-y-0.5">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{exp.title || "المسمى الدراسي أو التدريبي"}</span>
                        <span className="text-[10px] font-mono">{exp.period || "السنة"}</span>
                      </div>
                      <p className="text-slate-600 font-semibold">{exp.company || "الجهة الموظفة"}</p>
                      <p className="text-slate-500 text-[10px] leading-normal">{exp.desc || "تفاصيل الإنجاز..."}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Skills section layout */}
            {skillTags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-0.5">Skills / المهارات والتقنيات</h3>
                <p className="text-[11px] text-slate-700 leading-normal font-semibold">
                  {skillTags.join(" | ")}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
