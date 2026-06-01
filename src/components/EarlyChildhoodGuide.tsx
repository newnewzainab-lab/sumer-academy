import React, { useState } from "react";
import { Smile, Award, Flame, Search, Lightbulb, Users, Clock, Compass, HelpCircle } from "lucide-react";

interface MilestoneData {
  ageGroup: string;
  linguistic: string;
  motor: string;
  cognitive: string;
  social: string;
  toyRecommendation: string;
}

const MILESTONES_BY_AGE: MilestoneData[] = [
  {
    ageGroup: "عمر ٣ سَنَوَات (الاستكشاف اللطيف) 👶",
    linguistic: "ينطق جمل قصيرة من ٣ كَلِمَات، يُرد كَلِمَات الأغاني البسيطة، يسأل بـ 'مَن' و'أين'.",
    motor: "يصعد الدرج بتبادل القدمين، يركب دراجة ذات ٣ عجلات، يقص ورقة بالمقص البلاستيكي تحت رعاية.",
    cognitive: "يركب بازل من ٣-٤ قطع، يفرز الخرز الملون الكبير، يدرك معنى الرقم '١' و '٢'.",
    social: "يبدأ اللعب المتوازي بجانب الأطفال، يفصح عن مشاعره بوضوح (سعيد، غاضب)، ينفصل عن والدته بوقت مؤقت بسهولة.",
    toyRecommendation: "قطع المكعبات الخشبية الكبيرة، كتب برسم بارز ملون، الرمل الصحي والصلصال المنزلي."
  },
  {
    ageGroup: "عمر ٤ سَنَوَات (عصر التساؤلات) 🧩",
    linguistic: "يتحدث بسباق وجمل غنية، يستعمل صيغة المتكلم والجمع والمذكر والمؤنث، يسأل 'لماذا' و 'كيف' باستمرار.",
    motor: "يقفز على قدم واحدة لـ ٣ ثوان، يمسك القلم بقبضة ثلاثية معقولة، يقص خطوطاً مستقيمة بالمقص.",
    cognitive: "يميز ٤ ألوان أساسية، يعبث بتركيب الحلقات المتدرجة بالترتيب، يفهم مفهوم الوقت (البارحة، غداً، اليوم).",
    social: "يفضل اللعب الجماعي التخيلي والمشاركة الكرمية، يبدي تعاطفاً واضحاً لزميل يبكي، حماسي لتجريب الأنشطة الجديدة.",
    toyRecommendation: "ألعاب موازين خشبية، البازل الأكبر (١٠-١٢ قطعة)، دمى مسرح العرائس المصنوعة باليد."
  },
  {
    ageGroup: "عمر ٥-٦ سَنَوَات (الاستعداد المدرسي الفذ) 🎒",
    linguistic: "يروي قصة مترابطة الأطراف، يتواصل بنطاقات معجمية تفوق ١٠٠٠ كلمة واضحة المخارج، يلفظ الحروف والوزاریات.",
    motor: "يتنقل بدراجة عادية أو ثنائية بشكل متمرس، يكتب بعض الحروف من اسمه، يزرر المعطف لخط النهاية بمفرده.",
    cognitive: "يعد حتى الرقم ٢٠ على الأقل، يفهم الكميات المادية (أقل/أكثر)، يربط الرموز بالأعداد بدقة.",
    social: "يطور علاقة صداقة حقيقية مخصصة، يلتزم طوعياً بقوانين الألعاب المنزلية والصفية، يرغب في نيل إشادة المعلمين والأهل لسرورهم.",
    toyRecommendation: "البازل المعقد والربط المنطقي، الدومينو للأطفال، مجموعات التجارب العلمية الآمنة مثل خلط الألوان."
  }
];

export const EarlyChildhoodGuide: React.FC<{ onAskAI?: (question: string) => void }> = ({ onAskAI }) => {
  const [selectedAgeIdx, setSelectedAgeIdx] = useState(0);
  const [customPromptText, setCustomPromptText] = useState("");

  const activeMilestone = MILESTONES_BY_AGE[selectedAgeIdx];

  const handleQuickQuestion = (question: string) => {
    if (onAskAI) {
      onAskAI(question);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-[35px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans" id="childhood-guide">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
        <div className="text-right space-y-1">
          <h3 className="text-lg font-extrabold text-[#0A2E5C]">دليل ومراحل التطور المبكر (المعايير المعتمدة لسنوات الطفولة ٣-٦)</h3>
          <p className="text-xs text-slate-500">خاطرات وخطوات تربوية ذكية موجهة للأسرة العراقية لتنمية الإمكانات الإدراكية للعلماء الصغار بذكاء وترف.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-purple-500/10 text-purple-700 border border-purple-500/20 text-[10px] px-3 py-1 rounded-full font-black">
            📋 معايير وزارة التربية وأطباء الأطفال العراقية و اليونيسف لعام ٢٠٢٦
          </span>
        </div>
      </div>

      {/* Age selector pills */}
      <div className="flex flex-wrap gap-2 justify-end">
        {MILESTONES_BY_AGE.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedAgeIdx(idx)}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              selectedAgeIdx === idx
                ? "bg-[#0A2E5C] text-white border-b-4 border-amber-500"
                : "bg-slate-50 text-slate-705 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {m.ageGroup}
          </button>
        ))}
      </div>

      {/* Milestones dynamic visual dashboard */}
      <div className="grid md:grid-cols-2 gap-6 pt-2">
        {/* Left column: Categories list */}
        <div className="space-y-4">
          <div className="bg-[#FFFDF6] border-2 border-amber-200 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-black text-[#EF6C00] flex items-center justify-end gap-1.5">
              <span>التواصل والقاموس اللغوي</span>
              <span>🗣️</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              {activeMilestone.linguistic}
            </p>
          </div>

          <div className="bg-[#FFFDF6] border-2 border-emerald-200 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-black text-emerald-800 flex items-center justify-end gap-1.5">
              <span>التطور الحركي والقلم والسلوك</span>
              <span>✏️</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              {activeMilestone.motor}
            </p>
          </div>
        </div>

        {/* Right column: Categories list */}
        <div className="space-y-4">
          <div className="bg-[#FFFDF6] border-2 border-sky-200 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-black text-sky-800 flex items-center justify-end gap-1.5">
              <span>القدرات الذهنية وحساب الأعداد</span>
              <span>🧩</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              {activeMilestone.cognitive}
            </p>
          </div>

          <div className="bg-[#FFFDF6] border-2 border-pink-200 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-black text-pink-800 flex items-center justify-end gap-1.5">
              <span>التفاعل الاجتماعي وموازنة الذكاء</span>
              <span>❤️</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              {activeMilestone.social}
            </p>
          </div>
        </div>
      </div>

      {/* Sumer Play recommendation Block */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-5 space-y-3 flex flex-col md:flex-row-reverse items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <h4 className="text-xs font-black text-amber-900 flex items-center justify-end gap-1">
            <span>🎁 لعبة المنزل المفضلة الموصى بها لهذه المرحلة</span>
            <span>🧸</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
            {activeMilestone.toyRecommendation}
          </p>
        </div>
        <span className="text-3xl animate-pulse">🎯</span>
      </div>

      {/* Screen Time & Sleep Hygiene Smart Checklist */}
      <div className="border border-slate-100 rounded-3xl p-5 space-y-4 bg-slate-50">
        <h4 className="text-xs font-black text-[#0A2E5C] border-r-4 border-amber-500 pr-2.5">
          🔔 توصيات صحية وسلوكية بالغة الأهمية (قبل المدرسة)
        </h4>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-3.5 border border-slate-200 rounded-2xl space-y-1">
            <span className="text-lg block">📺</span>
            <h5 className="text-[11px] font-black text-slate-800">حدود وقت الشاشة الآمن</h5>
            <p className="text-[10px] text-slate-500 font-bold leading-normal">
              لا يزيد وقت الشاشات (تلفزيون، أيباد) عن ساعة واحدة يومياً مع مرافقة الأهل وحوار تفاعلي لما يُشاهد.
            </p>
          </div>

          <div className="bg-white p-3.5 border border-slate-200 rounded-2xl space-y-1">
            <span className="text-lg block">😴</span>
            <h5 className="text-[11px] font-black text-slate-800">جداول النوم الثابتة</h5>
            <p className="text-[10px] text-slate-500 font-bold leading-normal">
              يحتاج الأطفال في عمر ٣-٥ سنوات ما بين ١٠ إلى ١٣ ساعة نوم يومية هانئة لبناء الدماغ والقدرات الإبداعية للغد.
            </p>
          </div>

          <div className="bg-white p-3.5 border border-slate-200 rounded-2xl space-y-1">
            <span className="text-lg block">🥦</span>
            <h5 className="text-[11px] font-black text-slate-800">غذاء الذكاء والنمو</h5>
            <p className="text-[10px] text-slate-500 font-bold leading-normal">
              التركيز على الفواكه الموسمية المحلية، التمر العراقي الثمين، المكسرات النظيفة، والحد التام من السكريات المصنعة المانعة للتركيز.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Interactive Consulting with AI assistant */}
      {onAskAI && (
        <div className="bg-[#0A2E5C] text-white p-6 rounded-[28px] space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-amber-400">💬 استشارية الـ AI الفورية لأولياء أمور الطفولة المبكرة</h4>
            <p className="text-[10px] text-slate-200 leading-relaxed font-bold">
              هل لديكم تحدٍ سلوكي، تنظيم نوم، نوبات غضب، أو كيفية إحضار الطفل للمدرسة الأولية؟ انقر أحد الاستشارات الجاهزة أو اطرح سؤالك ليجيبك الطبيب التربوي المساعد فورياً عبر المحادثة الذكية.
            </p>
          </div>

          {/* Preset options */}
          <div className="flex flex-wrap gap-2 justify-end">
            {[
              "كيف أتعامل مع قلق الانفصال لطفل عمره ٣ سنوات يرفض مغادرتي البتة؟",
              "خطوات عملية وسهلة لتأسيس روتين نوم سليم وهادئ لطفلي الرافض غلق الأعين؟",
              "ألعاب حركية منزلية بسيطة لتنشيط التركيز لدى أطفال ما قبل المدرسة؟",
              "كيف أساعد طفلي البالغ ٤ سنوات في لفظ حرف الراء والسين بدقة دون توتر؟"
            ].map((q, qidx) => (
              <button
                key={qidx}
                type="button"
                onClick={() => handleQuickQuestion(q)}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white text-[10px] py-1.5 px-3 rounded-xl cursor-pointer text-right transition-colors font-bold"
              >
                💡 {q}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (customPromptText.trim()) {
              handleQuickQuestion(customPromptText);
              setCustomPromptText("");
            }
          }} className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#0A2E5C] text-[11px] font-black rounded-lg transition-colors cursor-pointer"
            >
              اسأل المرشد 🧠
            </button>
            <input
              type="text"
              placeholder="اكتب سؤالاً خاصاً عن تطور طفلك هنا (مثال: طفلي يغار من أخيه الأصغر...)"
              className="bg-transparent text-white placeholder-slate-350 text-right text-xs outline-none flex-1 pr-2"
              value={customPromptText}
              onChange={(e) => setCustomPromptText(e.target.value)}
            />
          </form>
        </div>
      )}
    </div>
  );
};
