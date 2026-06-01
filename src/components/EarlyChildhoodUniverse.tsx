import React, { useState } from "react";
import { Sparkles, Music, Star, Volume2, Smile, RefreshCw, Layers, Award, Heart, HelpCircle } from "lucide-react";

interface AlphabetItem {
  letter: string;
  word: string;
  translation: string;
  emoji: string;
  color: string;
  soundText: string;
}

interface NumberItem {
  num: number;
  word: string;
  emoji: string;
  count: number;
  color: string;
}

const ARABIC_ALPHABET: AlphabetItem[] = [
  { letter: "أ", word: "أسد", translation: "Asad (Lion)", emoji: "🦁", color: "bg-rose-100 border-rose-300 text-rose-700", soundText: "ألف أسد" },
  { letter: "ب", word: "بيت", translation: "Bayt (House)", emoji: "🏠", color: "bg-sky-100 border-sky-300 text-sky-750", soundText: "باء بيت" },
  { letter: "ت", word: "تفاح", translation: "Tuffah (Apple)", emoji: "🍎", color: "bg-emerald-100 border-emerald-300 text-emerald-700", soundText: "تاء تفاح" },
  { letter: "ث", word: "ثعلب", translation: "Tha'lab (Fox)", emoji: "🦊", color: "bg-amber-100 border-amber-300 text-amber-700", soundText: "ثاء ثعلب" },
  { letter: "ج", word: "جمل", translation: "Jamal (Camel)", emoji: "🐫", color: "bg-orange-100 border-orange-300 text-orange-700", soundText: "جيم جمل" },
  { letter: "ح", word: "حمامة", translation: "Hamamah (Dove)", emoji: "🕊️", color: "bg-pink-100 border-pink-300 text-pink-700", soundText: "حاء حمامة" },
  { letter: "خ", word: "خروف", translation: "Kharoof (Sheep)", emoji: "🐑", color: "bg-purple-100 border-purple-300 text-purple-700", soundText: "خاء خروف" },
  { letter: "د", word: "دب", translation: "Dubb (Bear)", emoji: "🐻", color: "bg-teal-100 border-teal-300 text-teal-700", soundText: "دال دب" },
  { letter: "ر", word: "ريشة", translation: "Reeshah (Feather)", emoji: "🪶", color: "bg-indigo-100 border-indigo-300 text-indigo-700", soundText: "راء ريشة" },
  { letter: "ز", word: "زرافة", translation: "Zarafah (Giraffe)", emoji: "🦒", color: "bg-amber-100 border-amber-300 text-amber-800", soundText: "زاي زرافة" },
  { letter: "س", word: "سمكة", translation: "Samakah (Fish)", emoji: "🐟", color: "bg-cyan-100 border-cyan-300 text-cyan-800", soundText: "سين سمكة" },
  { letter: "ش", word: "شمس", translation: "Shams (Sun)", emoji: "☀️", color: "bg-yellow-100 border-yellow-300 text-yellow-700", soundText: "شين شمس" },
  { letter: "ص", word: "صقر", translation: "Saqr (Falcon)", emoji: "🦅", color: "bg-indigo-100 border-indigo-200 text-slate-800", soundText: "صاد صقر" },
  { letter: "ط", word: "طائرة", translation: "Ta'irah (Airplane)", emoji: "✈️", color: "bg-blue-100 border-blue-300 text-blue-700", soundText: "طاء طائرة" },
  { letter: "ع", word: "عصفور", translation: "Asfoor (Bird)", emoji: "🐦", color: "bg-emerald-100 border-emerald-300 text-emerald-800", soundText: "عين عصفور" },
  { letter: "ق", word: "قلم", translation: "Qalam (Pen)", emoji: "✏️", color: "bg-slate-100 border-slate-300 text-slate-700", soundText: "قاف قلم" },
  { letter: "ك", word: "كتاب", translation: "Kitab (Book)", emoji: "📖", color: "bg-pink-100 border-pink-300 text-pink-700", soundText: "كاف كتاب" },
  { letter: "م", word: "موز", translation: "Mawz (Banana)", emoji: "🍌", color: "bg-amber-100 border-yellow-250 text-amber-900", soundText: "ميم موز" },
  { letter: "ن", word: "نحلة", translation: "Nahlah (Bee)", emoji: "🐝", color: "bg-yellow-100 border-amber-400 text-amber-950", soundText: "نون نحلة" },
  { letter: "هـ", word: "هلال", translation: "Hilal (Crescent)", emoji: "🌙", color: "bg-blue-50 border-blue-200 text-blue-900", soundText: "هاء هلال" },
  { letter: "و", word: "وردة", translation: "Wardah (Flower)", emoji: "🌹", color: "bg-rose-100 border-rose-300 text-rose-800", soundText: "واو وردة" },
  { letter: "ي", word: "يد", translation: "Yad (Hand)", emoji: "👋", color: "bg-teal-100 border-teal-200 text-teal-800", soundText: "ياء يد" }
];

const FUN_NUMBERS: NumberItem[] = [
  { num: 1, word: "وَاحِد", emoji: "🍎", count: 1, color: "bg-red-50 border-red-200 text-red-600" },
  { num: 2, word: "اِثْنَان", emoji: "🎈", count: 2, color: "bg-blue-50 border-blue-200 text-blue-600" },
  { num: 3, word: "ثَلَاثَة", emoji: "🐱", count: 3, color: "bg-emerald-50 border-emerald-200 text-emerald-600" },
  { num: 4, word: "أَرْبَعَة", emoji: "⭐", count: 4, color: "bg-amber-50 border-amber-200 text-amber-600" },
  { num: 5, word: "خَمْسَة", emoji: "🌸", count: 5, color: "bg-pink-50 border-pink-200 text-pink-600" },
  { num: 6, word: "سِتَّة", emoji: "🚗", count: 6, color: "bg-purple-50 border-purple-200 text-purple-600" },
  { num: 7, word: "سَبْعَة", emoji: "🦖", count: 7, color: "bg-teal-50 border-teal-200 text-teal-700" },
  { num: 8, word: "ثَمَانِيَة", emoji: "🍭", count: 8, color: "bg-rose-50 border-rose-200 text-rose-600" },
  { num: 9, word: "تِسْعَة", emoji: "🐠", count: 9, color: "bg-sky-50 border-sky-200 text-sky-600" },
  { num: 10, word: "عَشَرَة", emoji: "🐝", count: 10, color: "bg-yellow-50 border-yellow-250 text-yellow-800" }
];

export const EarlyChildhoodUniverse: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"alphabet" | "numbers">("alphabet");
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(ARABIC_ALPHABET[0]);
  const [selectedNumber, setSelectedNumber] = useState<NumberItem | null>(FUN_NUMBERS[0]);
  const [starCount, setStarCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const speakText = (text: string) => {
    if (!soundEnabled) return;
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ar-IQ"; // Iraqi accented Arabic / standard Arabic
        utterance.rate = 0.85; // slightly slower for children
        utterance.pitch = 1.1; // cuter higher pitch
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  };

  const handleAlphabetClick = (item: AlphabetItem) => {
    setSelectedLetter(item);
    speakText(`${item.letter}. ${item.soundText}`);
    setStarCount(prev => prev + 1);
  };

  const handleNumberClick = (item: NumberItem) => {
    setSelectedNumber(item);
    speakText(`رقم ${item.num}. ${item.word}`);
    setStarCount(prev => prev + 1);
  };

  return (
    <div className="bg-[#FFFDF6] border-[5px] border-amber-300 rounded-[40px] shadow-2xl p-6 md:p-8 space-y-6 text-right font-sans animate-fade-in relative overflow-hidden" id="early-childhood-soundboard">
      
      {/* Decorative Top Sun / Stars background */}
      <div className="absolute top-4 left-4 bg-amber-400/20 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center animate-spin-slow">
        👑
      </div>
      <div className="absolute top-12 right-12 bg-purple-400/10 text-purple-600 text-xs px-2 py-0.5 rounded-full animate-bounce">
        🌟 واحة المرح
      </div>

      {/* Header section with fun labels */}
      <div className="border-b-[4px] border-dashed border-amber-200 pb-5 space-y-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400/10 text-amber-700 border border-amber-400/30 rounded-full text-xs font-black">
          🧸 عالم الحروف والكلمات التفاعلي السحري
        </span>
        <h2 className="text-2xl font-black text-[#0A2E5C] flex items-center justify-end gap-2">
          <span>حديقة الحروف والأرقام للأطفال قبل المدرسة</span>
          <span className="text-xl">🍭</span>
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-bold">
          أهلاً بأبطالنا الصغار وعائلاتهم الكريمة! اضغطوا على أي حرف أو رقم للاستماع للنطق الصوتي التفاعلي الجميل واستكشاف الكلمات والصور الممتعة المرفقة بكل حب وسهولة.
        </p>

        {/* Floating Stars Scoreboard */}
        <div className="flex justify-between items-center bg-white/80 border-2 border-amber-200 rounded-2xl px-4 py-2.5 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold block">مستوى الصوت:</span>
            <button
              onClick={() => {
                const voiceOn = !soundEnabled;
                setSoundEnabled(voiceOn);
                if (voiceOn) {
                  speakText("أهلاً بكم في حديقة الحروف!");
                }
              }}
              className={`p-1.5 rounded-xl border transition-all ${
                soundEnabled ? "bg-emerald-500 text-white border-emerald-600" : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
              title="تفعيل/تعطيل الصوت"
            >
              <Volume2 size={13} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-amber-600 text-xs">
            <span>نجوم الإنجاز المحصلة:</span>
            <span className="bg-amber-100 px-3 py-0.5 rounded-md font-black text-amber-700 flex items-center gap-1">
              🏆 {starCount}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Tabs Selector */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            setActiveCategory("alphabet");
            speakText("حديقة الحروف والكلمات");
          }}
          className={`py-3 px-6 rounded-2xl border-b-4 font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeCategory === "alphabet"
              ? "bg-rose-500 text-white border-rose-700 shadow-md translate-y-[-2px]"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Music size={15} />
          <span>حديقة الحروف والكلمات (أ - ي) 🐰</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory("numbers");
            speakText("حديقة أرقام سومر");
          }}
          className={`py-3 px-6 rounded-2xl border-b-4 font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeCategory === "numbers"
              ? "bg-sky-500 text-white border-sky-700 shadow-md translate-y-[-2px]"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Star size={15} />
          <span>تعليم أرقام سومر وبابِل (١ - ١٠) 🌈</span>
        </button>
      </div>

      {/* Grid: Main interactive explorer */}
      <div className="grid lg:grid-cols-12 gap-6 pt-2">
        {/* Left side: Large Focus Card (Visual Preview & Interactive Sound) */}
        <div className="lg:col-span-4 order-last lg:order-first">
          {activeCategory === "alphabet" && selectedLetter && (
            <div className="bg-white border-4 border-amber-200 rounded-[30px] p-6 text-center space-y-6 shadow-sm sticky top-24">
              <span className="text-[10px] bg-sky-500/10 text-sky-700 border border-sky-400/25 px-3 py-0.5 rounded-full font-black">
                بطاقة التركيز لليافعين 🔍
              </span>

              {/* Big Letter Balloon */}
              <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center font-black text-5xl border-3 shadow-inner ${selectedLetter.color} hover:rotate-12 transition-all cursor-pointer`}
                   onClick={() => speakText(selectedLetter.letter)}>
                {selectedLetter.letter}
              </div>

              {/* Word & Symbol */}
              <div className="space-y-1.5">
                <span className="text-4xl block leading-tight">{selectedLetter.emoji}</span>
                <span className="text-xl font-black text-slate-800 block">{selectedLetter.word}</span>
                <span className="text-[11px] text-slate-405 font-semibold block font-mono">{selectedLetter.translation}</span>
              </div>

              {/* Play Button */}
              <button
                onClick={() => speakText(`${selectedLetter.letter}. ${selectedLetter.soundText}`)}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow border-b-4 border-rose-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Volume2 size={14} />
                <span>استمع للنطق الصوتي اللطيف 🎧</span>
              </button>

              <p className="text-[10px] text-slate-400 font-bold leading-normal">
                ساعد طفلك في استرجاع شكل الحرف ورسمه بالأصابع على الشاشة لتطوير الذاكرة العضلية المبكرة.
              </p>
            </div>
          )}

          {activeCategory === "numbers" && selectedNumber && (
            <div className="bg-white border-4 border-amber-200 rounded-[30px] p-6 text-center space-y-6 shadow-sm sticky top-24">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 border border-emerald-400/25 px-3 py-0.5 rounded-full font-black">
                بطاقة حساب الأعداد الذكية 🧮
              </span>

              {/* Big Number Bubble */}
              <div className={`w-32 h-32 rounded-[25px] mx-auto flex items-center justify-center font-black text-5xl border-3 shadow-inner ${selectedNumber.color} hover:scale-105 transition-all cursor-pointer`}
                   onClick={() => speakText(String(selectedNumber.num))}>
                {selectedNumber.num}
              </div>

              {/* Number word and count illustration */}
              <div className="space-y-3">
                <div>
                  <span className="text-xl font-black text-slate-800 block">{selectedNumber.word}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">بعدد: {selectedNumber.num} عناصر</span>
                </div>

                {/* Animated counter visual block */}
                <div className="flex flex-wrap gap-1.5 justify-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {Array.from({ length: selectedNumber.count }).map((_, i) => (
                    <span key={i} className="text-lg animate-bounce" style={{ animationDelay: `${i * 100}ms` }} title="عنصر عدّ">
                      {selectedNumber.emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Speech sound */}
              <button
                onClick={() => speakText(`الرقم ${selectedNumber.num} يعني ${selectedNumber.word}`)}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow border-b-4 border-sky-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Volume2 size={14} />
                <span>شغل العدّ للأطفال 🎧</span>
              </button>
            </div>
          )}
        </div>

        {/* Right side: Alphabet Index / Grid of items */}
        <div className="lg:col-span-8">
          {activeCategory === "alphabet" && (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {ARABIC_ALPHABET.map((item, idx) => {
                const isSelected = selectedLetter?.letter === item.letter;
                return (
                  <div
                    key={idx}
                    onClick={() => handleAlphabetClick(item)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.03] flex flex-col items-center justify-center space-y-1.5 select-none ${
                      isSelected
                        ? "border-[#0A2E5C] bg-[#0A2E5C]/10 text-[#0A2E5C] shadow-md -translate-y-1"
                        : "bg-white border-amber-100 hover:border-amber-300 active:translate-y-px"
                    }`}
                  >
                    <span className="text-2xl font-black">{item.letter}</span>
                    <span className="text-md shrink-0">{item.emoji}</span>
                    <span className="text-[10px] font-black text-slate-700">{item.word}</span>
                  </div>
                );
              })}
            </div>
          )}

          {activeCategory === "numbers" && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5">
              {FUN_NUMBERS.map((item, idx) => {
                const isSelected = selectedNumber?.num === item.num;
                return (
                  <div
                    key={idx}
                    onClick={() => handleNumberClick(item)}
                    className={`p-4 rounded-3xl border-2 cursor-pointer transition-all hover:scale-[1.03] text-center flex flex-col items-center justify-center space-y-2 select-none ${
                      isSelected
                        ? "border-[#0A2E5C] bg-[#0A2E5C]/15 text-[#0A2E5C] shadow-md -translate-y-1"
                        : "bg-white border-amber-100 hover:border-amber-300 active:translate-y-px"
                    }`}
                  >
                    <span className="text-3xl font-black">{item.num}</span>
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-[10px] font-black">{item.word}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mesopotamian Interactive Letter Mini-Game */}
          <div className="mt-6 bg-amber-100/40 border border-amber-200 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black text-indigo-900 flex items-center gap-1">
              🎨 لعبة تخمين الحروف والحيوانات لمرافقة الأهل
            </h4>
            <p className="text-[10px] text-slate-600 leading-normal font-semibold">
              انقروا على البطاقات لتسلية طفلك، اسأله: <strong>"أين يوجد حرف الجمل؟"</strong> أو <strong>"كم تفاحة خضراء في الرقم خمسة؟"</strong> لمساعدتهم على تنشيط الفص الجبهي في بيئة أسرية دافئة تحاكي ألعاب الذكاء من الأكاديمية.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[9px] bg-white border border-amber-200 px-2.5 py-1 rounded-xl text-slate-600 font-bold">
                🐰 لعبة الربط البصري
              </span>
              <span className="text-[9px] bg-white border border-amber-200 px-2.5 py-1 rounded-xl text-slate-600 font-bold">
                🍎 عد مع سومر
              </span>
              <span className="text-[9px] bg-white border border-amber-200 px-2.5 py-1 rounded-xl text-slate-600 font-bold">
                🗣️ مخارج الحروف الصحيحة
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
