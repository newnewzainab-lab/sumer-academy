import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  MapPin, 
  Globe, 
  Search, 
  UserCheck, 
  Sparkles, 
  Building, 
  Mail, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  Award,
  FileCheck2,
  ListFilter
} from "lucide-react";
import { IRAQI_POSTGRAD_STUDIES, PostgradUniversityInfo, PostgradProgramInfo } from "../data/iraqiPostgrad";

interface PostgradGuideProps {
  onAskAI?: (question: string) => void;
}

export const PostgradGuide: React.FC<PostgradGuideProps> = ({ onAskAI }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [degreeFilter, setDegreeFilter] = useState<string>("all");
  const [selectedUniId, setSelectedUniId] = useState<string>("baghdad-postgrad");
  const [selectedProgram, setSelectedProgram] = useState<PostgradProgramInfo | null>(
    IRAQI_POSTGRAD_STUDIES[0].programs[0]
  );

  // Filter postgraduate universities based on search and selected degree
  const filteredUniversities = IRAQI_POSTGRAD_STUDIES.filter(uni => {
    // Search query match in University name or overview or programs
    const matchUniName = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchUniOverview = uni.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if any programs in the university match the degree filter and search query
    const matchingPrograms = uni.programs.filter(prog => {
      const matchDegree = degreeFilter === "all" || prog.degreeType === degreeFilter;
      const matchSearch = searchTerm === "" || 
        prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.introduction.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.supervisorProfessors.some(prof => prof.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchDegree && matchSearch;
    });

    // Keep university if university info itself matches search (and fits degree filter via programs) or has matching programs
    if (degreeFilter !== "all") {
      return matchingPrograms.length > 0;
    }
    return matchUniName || matchUniOverview || matchingPrograms.length > 0;
  });

  // Safe selection of active university
  const selectedUni = filteredUniversities.find(u => u.id === selectedUniId) || filteredUniversities[0] || null;

  // Sync selected program safely
  useEffect(() => {
    if (selectedUni) {
      // Find matching programs inside selected university that match current filters
      const validPrograms = selectedUni.programs.filter(prog => 
        degreeFilter === "all" || prog.degreeType === degreeFilter
      );
      
      const hasProgram = validPrograms.some(p => p.name === selectedProgram?.name);
      if (!hasProgram && validPrograms.length > 0) {
        setSelectedProgram(validPrograms[0]);
      } else if (validPrograms.length === 0) {
        setSelectedProgram(null);
      }
    } else {
      setSelectedProgram(null);
    }
  }, [selectedUni, degreeFilter, selectedProgram]);

  const handleUniClick = (id: string) => {
    setSelectedUniId(id);
    const uni = IRAQI_POSTGRAD_STUDIES.find(u => u.id === id);
    if (uni) {
      const validPrograms = uni.programs.filter(prog => 
        degreeFilter === "all" || prog.degreeType === degreeFilter
      );
      if (validPrograms.length > 0) {
        setSelectedProgram(validPrograms[0]);
      } else {
        setSelectedProgram(null);
      }
    }
  };

  const askAboutProgram = (programName: string, uniName: string) => {
    if (onAskAI) {
      onAskAI(`أريد معرفة خطة القبول التفصيلية، شروط العمر، المعدل الساعاتي، ومصادر الامتحان التنافسي المعتمدة لـ ${programName} في ${uniName} للعام الدراسي 2026.`);
    }
  };

  return (
    <div className="space-y-8 text-right font-sans min-h-screen animate-fade-in" id="postgraduate-guide">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-[#0a1e36] via-[#112a4a] to-slate-900 text-white p-8 md:p-10 rounded-[32px] border-t-2 border-l-2 border-r-2 border-b-[8px] border-[#08182b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider">
            <Sparkles size={11} className="text-purple-400 animate-pulse" /> بوابة الدراسات العليا والأبحاث الصرفة والمقارنة
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-black leading-tight">
            دليلك لدراسة الماجستير والدكتوراه في العراق
          </h1>
          <p className="text-xs text-slate-300 max-w-4xl leading-relaxed font-bold">
            البوابة الذكية الموحدة للمتقدمين للدراسات العليا (دبلوم عالي، ماجستير، دكتوراه). تصفح الشروط والضوابط الوزارية، مواضيع ومواد الامتحانات التنافسية للعام 2026، كبار الأساتذة والمشرفين الأكاديميين المقترحين، ومتطلبات كفاءة اللغة والبرمجة. مدعومة كلياً بالذكاء الاصطناعي لحساب المواءمة وتوجيهك بنجاح.
          </p>
        </div>
      </div>

      {/* Main Grid Panels */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Right Nav / Filter component */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-2 justify-start">
              <Search size={15} className="text-purple-500" /> فلترة وبحث البرامج المتقدمة
            </h3>

            {/* Search Box inputs */}
            <div className="relative">
              <input 
                type="text"
                placeholder="ابحث عن برنامج، تخصص، مشرف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl pl-4 pr-10 py-3 text-xs text-slate-800 outline-none font-bold text-right shadow-inner"
              />
              <Search size={14} className="absolute top-3.5 right-3.5 text-slate-400" />
            </div>

            {/* Degree Type select dropdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black text-slate-500 block text-right flex items-center gap-1 justify-start">
                <ListFilter size={11} className="text-purple-500" /> تصفية حسب نوع الدرجة العلمية:
              </label>
              <div className="relative">
                <select
                  value={degreeFilter}
                  onChange={(e) => setDegreeFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none font-black text-right appearance-none cursor-pointer shadow-sm transition-all focus:ring-2 focus:ring-purple-500/10"
                >
                  <option value="all">كل البرامج والدرجات العلمية 🎓</option>
                  <option value="ماجستير (MSc)">درجة الماجستير (MSc) 📚</option>
                  <option value="دكتوراه (PhD)">درجة الدكتوراه (PhD) 🔬</option>
                </select>
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Universities list */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0A2E5C] px-1">الجامعات المتوفرة بالدليل ({filteredUniversities.length}):</h4>
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((uni) => {
                const isSelected = selectedUni && uni.id === selectedUniId;
                const matchCount = uni.programs.filter(p => degreeFilter === "all" || p.degreeType === degreeFilter).length;
                return (
                  <div
                    key={uni.id}
                    onClick={() => handleUniClick(uni.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden text-right select-none ${
                      isSelected 
                        ? "bg-[#0A2E5C] border-purple-500 text-white shadow-lg translate-x-[-4px]" 
                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 h-full w-2.5 bg-purple-500" />
                    )}
                    <div className="space-y-1.5 pr-2">
                      <h4 className="text-xs font-black flex items-center justify-start gap-1.5 leading-snug">
                        <Building size={15} className={isSelected ? "text-purple-300" : "text-slate-500"} />
                        {uni.name}
                      </h4>
                      <p className={`text-[10px] line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-500"} leading-relaxed font-semibold`}>
                        {uni.overview}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1 border-t border-dashed mt-2 text-[9px] font-mono leading-none">
                        <span className={isSelected ? "text-purple-300 font-bold" : "text-purple-600 font-bold"}>
                          📍 {uni.location.split("-")[0].trim()}
                        </span>
                        <span className="opacity-40">|</span>
                        <span className={isSelected ? "text-slate-300" : "text-slate-400"}>
                          {matchCount} برامج دراسات عليا متوافقة
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50 border border-slate-100 text-slate-500 p-6 rounded-2xl text-xs text-center font-bold">
                لم نجد أي برامج دراسات عليا تطابق الكلمات المبحوثة أو نوع البرنامج المختار.
              </div>
            )}
          </div>
        </div>

        {/* Left pane: Selected University & Program detailed list */}
        <div className="lg:col-span-8 space-y-6">
          {selectedUni ? (
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-xl space-y-6">
              
              {/* Header metadata */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <h2 className="text-lg md:text-xl font-display font-black text-[#0A2E5C]">
                    {selectedUni.name}
                  </h2>
                  <a 
                    href={`https://${selectedUni.website}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-purple-100/30 text-purple-600 text-[10px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1 border border-purple-100"
                  >
                    <Globe size={11} className="text-purple-500" /> البوابة لعمادات الدراسات عليا <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {selectedUni.overview}
                </p>
              </div>

              {/* Geographic Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">📍 عمادة شؤون الدراسات والموقع:</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1 justify-start">
                    <MapPin size={12} className="text-purple-600" /> {selectedUni.location}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">☎ قنوات التقديم الإلكتروني والمراسلة المعتمدة:</span>
                  <span className="text-slate-800 font-bold font-mono flex items-center gap-1 justify-start">
                    <Mail size={12} className="text-purple-600" /> {selectedUni.contact}
                  </span>
                </div>
              </div>

              {/* Programs Tab controllers */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#0A2E5C] border-b border-slate-100 pb-2">
                  📋 التخصصات والبرامج البحثية المتوفرة بالدليل العراقي 2026:
                </h3>
                
                <div className="flex gap-2 flex-wrap">
                  {selectedUni.programs
                    .filter(prog => degreeFilter === "all" || prog.degreeType === degreeFilter)
                    .map((prog, idx) => {
                      const isProgSelected = selectedProgram?.name === prog.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedProgram(prog)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                            isProgSelected 
                              ? "bg-purple-600 text-white shadow-md shadow-purple-500/15 scale-102" 
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <Award size={12} className={isProgSelected ? "text-amber-300" : "text-slate-400"} />
                          <span>{prog.name} ({prog.degreeType})</span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Program details card representation */}
              {selectedProgram ? (
                <div className="border border-purple-100 rounded-2xl p-5 md:p-6 space-y-6 mt-6 bg-gradient-to-b from-white to-purple-50/5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-500/10 text-purple-700 border border-purple-500/20 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {selectedProgram.degreeType}
                      </span>
                      <h3 className="text-sm md:text-base font-black text-slate-900 flex items-center gap-2 pt-1">
                        <GraduationCap size={18} className="text-purple-600" /> {selectedProgram.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold">القسم المستضيف: {selectedProgram.department}</p>
                    </div>
                    
                    <button
                      onClick={() => askAboutProgram(selectedProgram.name, selectedUni.name)}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-950 hover:scale-[1.03] active:scale-95 text-white rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sparkles size={13} className="text-amber-300" /> اسأل AI عن شروط القبول
                    </button>
                  </div>

                  {/* Program introduction */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-[#0A2E5C] flex items-center gap-1 justify-start">
                      <BookOpen size={12} className="text-purple-500" /> نبذة وتعريف عن البرنامج البحثي:
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {selectedProgram.introduction}
                    </p>
                  </div>

                  {/* Dual Grid content: Exam topics + Admissions Conditions */}
                  <div className="grid md:grid-cols-2 gap-5 text-xs font-semibold">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start border-b border-slate-100 pb-1.5">
                        <FileCheck2 size={13} className="text-purple-600" /> مواد وضوابط الامتحان التنافسي:
                      </h4>
                      <ul className="space-y-2 pr-1.5">
                        {selectedProgram.competitiveExamTopics.map((topic, i) => (
                          <li key={i} className="text-[11px] text-slate-700 leading-normal flex items-start gap-1.5 justify-start">
                            <span className="text-purple-600 font-bold shrink-0">📝</span>
                            <span className="font-mono font-bold text-slate-800">{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[9px] text-slate-400 leading-normal pt-1.5">يتطلب الامتحان الحصول على درجة لا تقل عن 50% كدرجة نجاح أولية للترشح للمقاعد الدراسية.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start border-b border-slate-100 pb-1.5">
                        <UserCheck size={14} className="text-purple-600" /> كبار المشرفين والأكاديميين:
                      </h4>
                      <ul className="space-y-2 pr-1.5">
                        {selectedProgram.supervisorProfessors.map((prof, i) => (
                          <li key={i} className="text-[11px] text-slate-700 leading-normal flex items-start gap-1 justify-start">
                            <span className="text-amber-500 font-bold shrink-0">🔬</span>
                            <span>{prof}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[9px] text-slate-400 leading-normal pt-1.5">يمكن للطلبة المقبولين التواصل مع المشرفين لصياغة أو مواءمة العناوين البحثية لرسائلهم.</p>
                    </div>
                  </div>

                  {/* Requirements section */}
                  <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10 space-y-2.5">
                    <h4 className="text-[#0A2E5C] font-black text-[11px] flex items-center gap-1.5 justify-start">
                      <span>✓</span> شروط القبول والمستمسكات المطلوبة للتقديم الدقيق:
                    </h4>
                    <ul className="space-y-1.5 pr-2">
                      {selectedProgram.requirements.map((req, i) => (
                        <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-1.5 justify-start">
                          <span className="text-purple-600 shrink-0">•</span>
                          <span className="font-bold">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-start gap-2 pt-2 border-t border-slate-100">
                    <HelpCircle size={12} />
                    <span>جميع الشروط مطابقة كلياً لتعليمات وضوابط دائرة البحث والتطوير في وزارة التعليم العالي والبحث العلمي العراقية لعام 2026.</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-150 p-8 rounded-2xl text-center text-xs text-slate-500 font-bold">
                  الرجاء تحديد كورس أو تخصص من القائمة أعلاه لعرض التفاصيل وضوابط المفاضلة التنافسية.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-12 shadow-xl text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <Building size={32} />
              </div>
              <h3 className="text-base font-black text-slate-800">لا توجد جامعات تطابق شروط فلاتر الدراسات العليا</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                يرجى تجربة فلتر آخر أو كتابة عبارة بحث مختلفة لاستكشاف الجامعات العراقية العريقة التي تقدم تخصصات الماستر والـ PhD.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
