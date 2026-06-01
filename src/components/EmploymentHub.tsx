import React from "react";
import { Briefcase, MapPin, BadgePercent, GraduationCap, ArrowUpRight, ShieldCheck, Star } from "lucide-react";

interface EmploymentHubProps {
  userSkills: string[];
}

export const EmploymentHub: React.FC<EmploymentHubProps> = ({ userSkills }) => {
  // Predefined lists of vacancies with smart matching logic based on student's currentSkills
  const vacancies = [
    {
      id: "v1",
      title: "مهندس برمجيات حاسب مبتدئ (Junior Developer)",
      company: "شركة آسياسيل للاتصالات (بغداد)",
      location: "بغداد، العراق",
      salary: "1,200,000 - 1,500,000 د.ع",
      requiredSkill: "Python",
      logoLetter: "A",
      type: "دوام كامل متوازن",
    },
    {
      id: "v2",
      title: "مطور واجهات ويب أمامية وتطبيقات",
      company: "أور ميديا للتطبيقات الرقمية (أربيل)",
      location: "أربيل، سلطة كردستان",
      salary: "900,000 - 1,100,000 د.ع",
      requiredSkill: "HTML/CSS",
      logoLetter: "U",
      type: "دوام عن بعد متاح",
    },
    {
      id: "v3",
      title: "محلل قواعد بيانات لوجستية دقيقة",
      company: "مؤسسة النفط الوطنية بالبصرة (موئل تدريب)",
      location: "البصرة، العراق",
      salary: "1,800,000 د.ع (معتاد)",
      requiredSkill: "SQL",
      logoLetter: "O",
      type: "دوام حقل ميداني",
    },
    {
      id: "v4",
      title: "مدرب ومعد حقائب تنمية بشرية",
      company: "نقابة المدربين العراقيين",
      location: "العراق",
      salary: "ساعات تدريب مكافئة",
      requiredSkill: "التفكير الإبداعي",
      logoLetter: "N",
      type: "عقود استشارية مرنة",
    },
  ];

  return (
    <div className="space-y-8 text-right">
      <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-sumer-blue/10 text-sumer-blue rounded-xl flex items-center justify-center">
            <Briefcase size={22} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
              بوابة التوظيف الموائمة للطلبة والربط المؤسسي
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              تربط المخرجات الدراسية لطلبتنا مباشرة بجهات العمل وتفحص مستويات مطابقتها مع الشركات الفاعلة في العراق بالخوارزميات الذكية
            </p>
          </div>
        </div>

        {/* Corporate Alliance trusts ribbon */}
        <div className="bg-sumer-blue/5 border border-sumer-blue/10 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="text-right space-y-1">
            <span className="text-[10px] text-sumer-blue font-bold flex items-center gap-1">
              🛡️ الاعتماد والتوظيف المباشر
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              تتاح الفرصة تلقائياً للطلاب المتفوقين في دورات الأكاديمية والذين تبلغ مطابقة ملفاتهم المهارية أكثر من 80% للتقديم والمقابلة الفورية عبر مذكرات التعاون المبرمة مع نقابة المدربين والمؤسسات العراقية المسؤولة.
            </p>
          </div>
          <div className="bg-sumer-gold text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0">
            أنت مسجل بالمسار التنافسي للتوظيف
          </div>
        </div>

        <div className="grid gap-6 pt-6">
          <h4 className="font-bold text-sm text-sumer-blue">📂 الوظائف المقترحة المتاحة للمواءمة حالياً:</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            {vacancies.map((vac) => {
              // Calculate compatibility percent based on student skills
              const hasMatchingSkill = userSkills.some(
                (skill) => skill.toLowerCase() === vac.requiredSkill.toLowerCase()
              );
              const compatibilityScore = hasMatchingSkill ? 95 : 45;

              return (
                <div
                  key={vac.id}
                  className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 hover:border-sumer-gold/25 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-sumer-blue/15 text-sumer-blue font-bold text-xl rounded-xl flex items-center justify-center">
                          {vac.logoLetter}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-sumer-ink">{vac.title}</h5>
                          <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                            {vac.company}
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            hasMatchingSkill
                              ? "bg-green-500/10 text-green-700"
                              : "bg-amber-500/10 text-amber-700"
                          }`}
                        >
                          المطابقة: {compatibilityScore}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-2 justify-start">
                        <MapPin size={12} className="text-sumer-gold" />
                        <span>{vac.location}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-start font-semibold">
                        <Star size={12} className="text-sumer-gold" />
                        <span>تقريباً: {vac.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <GraduationCap size={12} className="text-sumer-blue" />
                        <span>
                          المهارة المفتاحية المطلوبة:{" "}
                          <strong className="text-sumer-blue bg-sumer-blue/10 px-2 py-0.5 rounded ml-1">
                            {vac.requiredSkill}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-gray-400 font-bold">{vac.type}</span>
                    <button
                      onClick={() =>
                        alert(
                          `📝 تم إرسال ملفك الشخصي وسيرتك الذاتية من أكاديمية سومر لمسؤولي التعيين في: "${vac.company}". سيتم التواصل معك قريباً.`
                        )
                      }
                      className="px-4 py-1.5 bg-sumer-blue hover:bg-sumer-blue/95 text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
                    >
                      تقديم سريع بضغطة زر <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
