import React, { useState } from "react";
import { Search, UserCheck, Star, Mail, Briefcase, Award, Send, CheckCircle2, Sparkles, Languages, Landmark } from "lucide-react";

interface Supervisor {
  id: string;
  name: string;
  title: string;
  uni: string;
  college: string;
  email: string;
  interests: string[];
  recentPublications: string[];
  rating: number;
  availableSlots: number;
}

const INITIAL_SUPERVISORS: Supervisor[] = [
  {
    id: "sup-1",
    name: "أ.د. ليث فاضل العزاوي",
    title: "خبير الأنظمة المدمجة والتنبؤ الخوارزمي",
    uni: "جامعة بغداد",
    college: "كلية الهندسة الخوارزمية",
    email: "layth.f@uobaghdad.edu.iq",
    interests: ["الذكاء الاصطناعي في الروبوتات", "التحكم الذكي بالأنظمة الصناعية", "إنترنت الأشياء الصناعي (IIoT)"],
    recentPublications: [
      "Optimizing Robotic Arms Control using Deep Reinforcement Learning (2025)",
      "Smart Irrigation in Iraq: IoT and Predictive Modeling Approach (2024)"
    ],
    rating: 4.9,
    availableSlots: 2
  },
  {
    id: "sup-2",
    name: "أ.د. مآرب العبيدي",
    title: "رائدة الأمن السيبراني والتحليل المنطقي",
    uni: "جامعة بغداد",
    college: "كلية العلوم للبنين",
    email: "maareb.o@uobaghdad.edu.iq",
    interests: ["بروتوكولات التشفير بعد الكم", "أمن شبكات الجيل الخامس وعام 2026", "التعلم العميق التوليدي الآمن"],
    recentPublications: [
      "Quantum-Resistant Cryptography Framework for Iraqi E-Governance (2025)",
      "Anomalous Traffic Detection in SDN Using Convolutional Neural Networks (2024)"
    ],
    rating: 5.0,
    availableSlots: 1
  },
  {
    id: "sup-3",
    name: "أ.د. علاء كريم الحلي",
    title: "رائد الهندسة الجينية المناعية بالشرق الأوسط",
    uni: "جامعة النهرين",
    college: "معهد الهندسة الوراثية والتقنيات الإحيائية للدراسات العليا",
    email: "alaa.k@alnahrain.edu.iq",
    interests: ["الجينوم البشري وتحليل السلسلة الوراثية", "اللقاحات الحيوية النانوية", "الأحياء الجزيئية المتقدمة"],
    recentPublications: [
      "Genetic Sequencing Analysis of Immunological Disorders in Iraqi Patients (2025)",
      "Nanoparticle Delivery Systems for Custom RNA Vaccines (2024)"
    ],
    rating: 5.0,
    availableSlots: 3
  },
  {
    id: "sup-4",
    name: "أ.د. خالد خليل الجميلي",
    title: "مستشار الجيل الخامس وشفرات التحكم الذكي",
    uni: "جامعة الموصل",
    college: "كلية هندسة الإلكترونيات",
    email: "khaled.j@uomosul.edu.iq",
    interests: ["هندسة الاتصالات اللاسلكية المتقدمة", "معالجة الإشارات في النظم الطبية", "معمارية إنترنت الأشياء الموزعة"],
    recentPublications: [
      "Spectrum Sharing in 5G Networks: A Cooperative Game Theory Approach (2025)",
      "Deep Learning for ECG Signal Denoising (2023)"
    ],
    rating: 4.8,
    availableSlots: 2
  },
  {
    id: "sup-5",
    name: "أ.م.د. رغد محمد جواد",
    title: "أخصائية الذكاء الاستدعائي للأنظمة الطبية",
    uni: "جامعة بغداد",
    college: "كلية الهندسة الخوارزمية",
    email: "raghad.j@uobaghdad.edu.iq",
    interests: ["الرؤية الحاسوبية الطبية", "تشخيص الأورام بالذكاء الاصطناعي", "معالجة الصور الرقمية ثنائية وثلاثية الأبعاد"],
    recentPublications: [
      "Convolutional Neural Networks for Early Detection of Breast Cancer in Iraqi Screening Programs (2025)",
      "Semantic Segmentation of Retinal Vessels in Fundus Images (2024)"
    ],
    rating: 4.7,
    availableSlots: 4
  }
];

export const PostgradSupervisors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUni, setSelectedUni] = useState<string>("all");
  const [selectedSup, setSelectedSup] = useState<Supervisor | null>(INITIAL_SUPERVISORS[0]);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDesc, setProposalDesc] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredSupervisors = INITIAL_SUPERVISORS.filter(sup => {
    const matchSearch = searchTerm === "" || 
      sup.name.includes(searchTerm) ||
      sup.title.includes(searchTerm) ||
      sup.interests.some(interest => interest.includes(searchTerm));
    
    const matchUni = selectedUni === "all" || sup.uni === selectedUni;
    return matchSearch && matchUni;
  });

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTitle || !proposalDesc) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setProposalTitle("");
      setProposalDesc("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans animate-fade-in" id="postgrad-supervisors-portal">
      <div className="border-b border-slate-100 pb-5 space-y-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 rounded-full text-[10px] font-black">
          🔬 دليل الإشراف والنخب الأكاديمية العريقة
        </span>
        <h2 className="text-xl font-black text-[#0A2E5C]">
          دليل المشرفين الأكاديميين للدراسات العليا بالعراق
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-bold">
          محرك بحث موحد لمشرفي ورؤساء كراسي البحث العلمي في الجامعات العراقية (بغداد، المستنصرية، النهرين، الموصل، البصرة). تصفح اهتماماتهم البحثية، طلبتهم الحاليين والمستقبليين، وقدّم مسودة فكرة أطروحتك (Research Concept) إليهم مباشرة.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Right column: Search & Directory list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-black text-slate-700">تصفية وبحث المشرفين والأكاديميين</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث بالاسم، الاهتمام، أو التخصص المتميز..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none pr-9 font-bold text-right shadow-sm"
              />
              <Search size={14} className="absolute right-3 top-3.5 text-slate-400" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedUni("all")}
                className={`py-2 px-3 rounded-xl border font-bold text-[11px] transition-all cursor-pointer ${
                  selectedUni === "all"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                الكل 🏛
              </button>
              <button
                onClick={() => setSelectedUni("جامعة بغداد")}
                className={`py-2 px-3 rounded-xl border font-bold text-[11px] transition-all cursor-pointer ${
                  selectedUni === "جامعة بغداد"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                ج. بغداد 🎓
              </button>
            </div>
          </div>

          {/* Supervisors list */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredSupervisors.map(sup => {
              const isSelected = selectedSup?.id === sup.id;
              return (
                <div
                  key={sup.id}
                  onClick={() => setSelectedSup(sup)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-indigo-50/45 border-indigo-500 shadow-md translate-x-[-2px]"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 justify-end">
                        {sup.name}
                        {sup.availableSlots > 0 && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-black">
                            متاح للإشراف
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-indigo-600 font-bold">{sup.title}</p>
                      <p className="text-[9px] text-slate-400 font-semibold">{sup.uni} - {sup.college}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 text-amber-500 font-black text-xs">
                      <Star size={12} fill="currentColor" />
                      <span>{sup.rating}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredSupervisors.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">لا يوجد مشرفون يطابقون شروط البحث.</p>
            )}
          </div>
        </div>

        {/* Left column: Detailed selected supervisor & Interactive proposal sender */}
        <div className="lg:col-span-7 space-y-6">
          {selectedSup ? (
            <div className="bg-slate-50 rounded-3xl border border-slate-150 p-6 space-y-6">
              {/* Profile card */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start border-b border-slate-200 pb-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end flex-wrap">
                    <span className="bg-amber-500/10 text-amber-700 border border-amber-500/25 px-2.5 py-0.5 rounded-full text-[9px] font-black">
                      ثقة أكاديمية عالية ⭐
                    </span>
                    <span className="bg-indigo-500/10 text-indigo-700 border border-indigo-500/25 px-2.5 py-0.5 rounded-full text-[9px] font-black">
                      مستشار أول
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900">{selectedSup.name}</h3>
                  <p className="text-xs text-indigo-600 font-bold">{selectedSup.title}</p>
                  <p className="text-xs text-slate-500 flex items-center justify-start gap-1 justify-end font-semibold">
                    <span>{selectedSup.uni} - {selectedSup.college}</span>
                    <Landmark size={13} className="text-slate-400" />
                  </p>
                </div>
                
                {/* Contact badge */}
                <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-right space-y-1 w-full sm:w-auto">
                  <span className="text-[9px] text-slate-400 block font-bold">البريد الجامعي المباشر:</span>
                  <a href={`mailto:${selectedSup.email}`} className="text-[10px] text-blue-600 font-mono font-bold block hover:underline">
                    {selectedSup.email}
                  </a>
                </div>
              </div>

              {/* Research Interests bento box style */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 justify-start">
                  <Award size={13} className="text-indigo-600" /> الاهتمامات البحثية المعتمدة لعام 2026:
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedSup.interests.map((interest, i) => (
                    <span key={i} className="bg-white border border-slate-200 text-slate-800 text-[10px] px-3 py-1.5 rounded-xl font-semibold shadow-sm">
                      🔍 {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Publications */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-150">
                <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 justify-start border-b border-slate-100 pb-1.5">
                  <Briefcase size={12} className="text-indigo-600" /> أحدث النتاجات والبحوث المنشورة (Scopus):
                </h4>
                <ul className="space-y-2">
                  {selectedSup.recentPublications.map((pub, i) => (
                    <li key={i} className="text-[10px] text-slate-600 flex items-start gap-1.5">
                      <span className="text-indigo-500 font-black shrink-0">📄</span>
                      <span className="font-mono font-bold leading-normal text-slate-800">{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supervisor slots left indicator */}
              <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>المقاعد البحثية الشاغرة للإشراف:</span>
                <span className="bg-amber-500/15 border border-amber-500/25 px-3 py-1 rounded-lg text-[10px] font-black">
                  {selectedSup.availableSlots} مقاعد متبقية لطلبة عام 2026
                </span>
              </div>

              {/* Proposal Sender */}
              <form onSubmit={handleSendProposal} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 justify-start">
                    <Sparkles size={13} className="text-amber-500" /> تقديم مقترح المشروع البحثي (Proposal Draft)
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">خط دفاعك البحثي الأول! ارسل فكرتك المبدئية للأستاذ الدكتور لطلب نية الإشراف والمواءمة المبدئية.</p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-600 block text-right">عنوان الأطروحة/الرسالة المقترح:</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none text-right font-bold"
                      placeholder="امثلة: أمن خوارزميات الجيل السادس بالتعلم العميق وتحليل التشفير"
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-600 block text-right">موجز الفكرة العلمية والمنهجية المبتغاة:</label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none resize-none text-right font-semibold"
                      placeholder="اشرح المشكلة، المساهمة البحثية الأساسية، والأدوات الرياضية أو البرمجية التي ستستخدمها لحل وتبرير الفرضيات..."
                      value={proposalDesc}
                      onChange={(e) => setProposalDesc(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {submitSuccess && (
                  <div className="bg-emerald-500/10 border border-emerald-500/35 p-3.5 rounded-xl text-center flex items-center justify-center gap-2 text-emerald-700 text-xs font-black">
                    <CheckCircle2 size={15} />
                    <span>تم إرسال المقترح البحثي بنجاح إلى بريد {selectedSup.name}! ستصلك استجابة لبريدك الجامعي قريباً.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-850 hover:scale-[1.01] active:scale-99 text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  <span>{submitting ? "جاري الإرسال والمعالجة الأكاديمية..." : "إرسال المقترح لطلب نية الإشراف"}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] text-center text-slate-400">
              اختر أحد المشرفين للعرض والأداء الأكاديمي.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
