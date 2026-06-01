import React, { useState } from "react";
import { Sparkles, Smile, Volume2, Award, HelpCircle, RefreshCw, Check, X, Star, Heart, ArrowLeft, ArrowRight } from "lucide-react";

interface QuizQuestion {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
  soundHint: string;
  arabicPhrase: string;
  emoji: string;
}

const ANIMAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    image: "/src/assets/images/cartoon_lion_1780225088206.png",
    correctAnswer: "أسد",
    options: ["جمل", "أسد", "فيل", "ثعلب"],
    soundHint: "أنا ملك الغابة ذو السبيب الذهبي الطويل، فمن أكون؟",
    arabicPhrase: "أسد شجاع ذو زئير قوي 🦁",
    emoji: "🦁"
  },
  {
    id: 2,
    image: "/src/assets/images/cartoon_camel_1780225107632.png",
    correctAnswer: "جمل",
    options: ["أسد", "سمكة", "جمل", "خروف"],
    soundHint: "أنا سفينة الصحراء، أصبر على العطش، فمن أكون؟",
    arabicPhrase: "جمل صبور يحب بستان النخيل 🐫",
    emoji: "🐫"
  },
  {
    id: 3,
    image: "/src/assets/images/cartoon_fish_1780225123643.png",
    correctAnswer: "سمكة",
    options: ["نحلة", "تفاح", "سمكة", "طائرة"],
    soundHint: "أنا أسبح بمهارة تحت مياه دجلة والفرات وأطلق الفقاعات، فمن أكون؟",
    arabicPhrase: "سمكة ذهبية مضيئة تسبح في الهور 🐟",
    emoji: "🐟"
  },
  {
    id: 4,
    image: "/src/assets/images/cartoon_bee_1780225138215.png",
    correctAnswer: "نحلة",
    options: ["نحلة", "زرافة", "حمامة", "عصفور"],
    soundHint: "أطير من زهرة لزهرة وأصنع عسلاً حلواً لذيذاً، فمن أكون؟",
    arabicPhrase: "نحلة نشيطة تحب الأزهار البرية 🐝",
    emoji: "🐝"
  }
];

const ALPHABET_MATCH_QUESTIONS = [
  {
    letter: "أ",
    correctAnswer: "أسد",
    options: ["بيت", "تفاح", "أسد", "جمل"],
    emoji: "🦁",
    tip: "ألف.. مثل ملك الغابة الشجاع!"
  },
  {
    letter: "ب",
    correctAnswer: "بيت",
    options: ["بيت", "تفاح", "ثعلب", "وردة"],
    emoji: "🏠",
    tip: "باء.. المكان الدافئ الذي نعيش فيه!"
  },
  {
    letter: "ت",
    correctAnswer: "تفاح",
    options: ["أسد", "جمل", "تفاح", "سمكة"],
    emoji: "🍎",
    tip: "تاء.. الفاكهة اللذيذة بلونيها الأحمر والأخضر!"
  },
  {
    letter: "ج",
    correctAnswer: "جمل",
    options: ["تفاح", "جمل", "زرافة", "كتاب"],
    emoji: "🐫",
    tip: "جيم.. سفينة الصحراء الصبورة!"
  }
];

export const EarlyChildhoodQuiz: React.FC = () => {
  const [quizMode, setQuizMode] = useState<"animals" | "alphabet">("animals");
  
  // Animal quiz states
  const [animalIdx, setAnimalIdx] = useState(0);
  const [selectedAnimalOption, setSelectedAnimalOption] = useState<string | null>(null);
  const [animalQuizScore, setAnimalQuizScore] = useState(0);
  const [animalAnswerStatus, setAnimalAnswerStatus] = useState<"correct" | "wrong" | null>(null);
  const [animalQuizCompleted, setAnimalQuizCompleted] = useState(false);

  // Alphabet quiz states
  const [alphabetIdx, setAlphabetIdx] = useState(0);
  const [selectedAlphabetOption, setSelectedAlphabetOption] = useState<string | null>(null);
  const [alphabetQuizScore, setAlphabetQuizScore] = useState(0);
  const [alphabetAnswerStatus, setAlphabetAnswerStatus] = useState<"correct" | "wrong" | null>(null);
  const [alphabetQuizCompleted, setAlphabetQuizCompleted] = useState(false);

  // Sound settings
  const [soundEnabled, setSoundEnabled] = useState(true);

  const speakText = (text: string) => {
    if (!soundEnabled) return;
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ar-IQ"; // Iraqi accented Arabic / Standard Arabic
        utterance.rate = 0.85;
        utterance.pitch = 1.15; // friendly high-pitched voice for kids
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const playCorrectPraise = () => {
    const praises = [
      "مذهل! أحسنت يا بطل! إجابة صحيحة ممتازة جداً!",
      "واو! رائع للغاية! أنت عبقري صغير ذكي جداً!",
      "أحسنت العمل! إجابة صحيحة وصوت عالي!",
      "إجابة ممتازة! تستحق نجمة ذهبية براقة!"
    ];
    const phrase = praises[Math.floor(Math.random() * praises.length)];
    speakText(phrase);
  };

  const playWrongEncouragement = () => {
    speakText("حاول مرة أخرى يا شجاع.. أنت ذكي وتقدر عليها بالتأكيد!");
  };

  // Animal Answer handler
  const handleAnimalOptionClick = (option: string) => {
    if (selectedAnimalOption !== null) return; // Prevent double answer
    setSelectedAnimalOption(option);
    
    const currentQuestion = ANIMAL_QUIZ_QUESTIONS[animalIdx];
    if (option === currentQuestion.correctAnswer) {
      setAnimalAnswerStatus("correct");
      setAnimalQuizScore(prev => prev + 1);
      playCorrectPraise();
    } else {
      setAnimalAnswerStatus("wrong");
      playWrongEncouragement();
    }
  };

  const handleNextAnimalQuestion = () => {
    setSelectedAnimalOption(null);
    setAnimalAnswerStatus(null);
    if (animalIdx < ANIMAL_QUIZ_QUESTIONS.length - 1) {
      setAnimalIdx(prev => prev + 1);
      // Speak hint for the next question automatically
      setTimeout(() => {
        speakText(ANIMAL_QUIZ_QUESTIONS[animalIdx + 1].soundHint);
      }, 300);
    } else {
      setAnimalQuizCompleted(true);
      speakText(`مبروك يا بطل! لقد أكملت اختبار الحيوانات بنجاح وحصلت على ${animalQuizScore + (animalAnswerStatus === "correct" ? 1 : 0)} من أربعة نجوم!`);
    }
  };

  // Alphabet Answer handler
  const handleAlphabetOptionClick = (option: string) => {
    if (selectedAlphabetOption !== null) return;
    setSelectedAlphabetOption(option);
    
    const currentQuestion = ALPHABET_MATCH_QUESTIONS[alphabetIdx];
    if (option === currentQuestion.correctAnswer) {
      setAlphabetAnswerStatus("correct");
      setAlphabetQuizScore(prev => prev + 1);
      playCorrectPraise();
    } else {
      setAlphabetAnswerStatus("wrong");
      playWrongEncouragement();
    }
  };

  const handleNextAlphabetQuestion = () => {
    setSelectedAlphabetOption(null);
    setAlphabetAnswerStatus(null);
    if (alphabetIdx < ALPHABET_MATCH_QUESTIONS.length - 1) {
      setAlphabetIdx(prev => prev + 1);
      setTimeout(() => {
        speakText(`ما هي الكلمة التي تبدأ بحرف ${ALPHABET_MATCH_QUESTIONS[alphabetIdx + 1].letter}؟`);
      }, 300);
    } else {
      setAlphabetQuizCompleted(true);
      speakText(`تهانينا الحارة! لقد أنهيت تحدي مطابقة الحروف وحققت نتيجة رائعة!`);
    }
  };

  // Reseters
  const resetAnimalQuiz = () => {
    setAnimalIdx(0);
    setSelectedAnimalOption(null);
    setAnimalQuizScore(0);
    setAnimalAnswerStatus(null);
    setAnimalQuizCompleted(false);
    speakText("لنلعب لعبة تخمين الحيوانات بالصور الجميلة!");
  };

  const resetAlphabetQuiz = () => {
    setAlphabetIdx(0);
    setSelectedAlphabetOption(null);
    setAlphabetQuizScore(0);
    setAlphabetAnswerStatus(null);
    setAlphabetQuizCompleted(false);
    speakText("لنطابق الحروف الرائعة مع أسمائها اللطيفة!");
  };

  // Render variables
  const currentAnimalQuestion = ANIMAL_QUIZ_QUESTIONS[animalIdx];
  const currentAlphabetQuestion = ALPHABET_MATCH_QUESTIONS[alphabetIdx];

  return (
    <div className="bg-[#FFFDF6] border-[5px] border-amber-300 rounded-[40px] shadow-xl p-6 md:p-8 space-y-6 text-right font-sans relative overflow-hidden" id="little-explorers-quiz">
      
      {/* Absolute Decorative elements */}
      <div className="absolute top-4 left-4 bg-purple-500/10 text-purple-600 font-extrabold text-xs px-2.5 py-1 rounded-full">
        🎨 واحة الألعاب الذكية للأطفال
      </div>

      {/* Header Info */}
      <div className="border-b-[4px] border-dashed border-amber-200 pb-5 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/15 text-amber-700 border border-amber-400/30 rounded-full text-xs font-black">
          👶 اختبار المستكشفين الصغار • Little Explorers Quiz
        </span>
        <h2 className="text-2xl font-black text-[#0A2E5C] flex items-center justify-end gap-2">
          <span>ألعاب مطابقة الحروف وتخمين صور الحيوانات الذكية</span>
          <span className="text-xl">🦁</span>
        </h2>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          عبر الصور والكلمات الجميلة التي تم توليدها بالذكاء الاصطناعي، يختبر الطفل ذكاءه البصري وسمع مخارج الحروف العربية والرافدينية بسهولة تامة وبتحفيز صوتي إيجابي.
        </p>

        {/* Global Toolbar */}
        <div className="flex justify-between items-center bg-white/80 border border-amber-100 rounded-2xl px-4 py-2 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold block">مكبر الصوت اللطيف:</span>
            <button
              onClick={() => {
                const updated = !soundEnabled;
                setSoundEnabled(updated);
                if (updated) speakText("أهلاً بالمستكشف الصغير!");
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                soundEnabled ? "bg-emerald-500 text-white border-emerald-600" : "bg-slate-150 text-slate-400 border-slate-200"
              }`}
              title="تفعيل/تعطيل الصوت"
            >
              <Volume2 size={13} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-600 text-xs text-right">
            <span>القسم الفني:</span>
            <span className="bg-amber-100 text-amber-805 px-2.5 py-0.5 rounded-lg font-black text-[10px]">
              رسومات الـ AI السومرية 🎨
            </span>
          </div>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setQuizMode("animals");
            speakText("تحدي تخمين صور الحيوانات");
          }}
          className={`py-2.5 px-4 rounded-2xl border-b-4 font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
            quizMode === "animals"
              ? "bg-[#0A2E5C] text-white border-[#031e42] shadow"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>🐾 تخمين الحيوانات بالصور التفاعلية</span>
        </button>

        <button
          onClick={() => {
            setQuizMode("alphabet");
            speakText("تحدي مطابقة الحروف والكلمات");
          }}
          className={`py-2.5 px-4 rounded-2xl border-b-4 font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
            quizMode === "alphabet"
              ? "bg-[#0A2E5C] text-white border-[#031e42] shadow"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>🍎 لعبة ربط الحرف بالاسم الصحيح</span>
        </button>
      </div>

      {/* QUIZ PORT: MODE 1 (ANIMALS PICTURES GUESING) */}
      {quizMode === "animals" && (
        <div className="space-y-6">
          {!animalQuizCompleted ? (
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white border border-amber-100 rounded-[30px] p-6 shadow-sm">
              
              {/* Question Image Panel */}
              <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
                <div className="relative group overflow-hidden rounded-[24px] border-4 border-amber-200 shadow-md aspect-square max-w-[240px] w-full">
                  <img
                    src={currentAnimalQuestion.image}
                    alt={currentAnimalQuestion.correctAnswer}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 text-xs font-black py-0.5 px-2 rounded-full border border-amber-200 shadow-sm">
                    سؤال {animalIdx + 1} من {ANIMAL_QUIZ_QUESTIONS.length}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speakText(currentAnimalQuestion.soundHint)}
                  className="px-3.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-750 font-black text-[10px] rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 size={12} />
                  <span>اضغط هنا لسماع لغز الحيوان اللطيف! 🔊</span>
                </button>
              </div>

              {/* Question choices & Prompting */}
              <div className="md:col-span-7 space-y-5 text-right w-full">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#EF6C00] font-black uppercase">من أنا يا أصدقائي؟ 🤔</span>
                  <h3 className="text-lg font-black text-slate-800 leading-snug">
                    تأمل الصورة الجميلة على اليمين، ثم اختر الاسم العربي الصحيح للحيوان:
                  </h3>
                </div>

                {/* Choices listing */}
                <div className="grid grid-cols-2 gap-3">
                  {currentAnimalQuestion.options.map((option, oIdx) => {
                    const isSelected = selectedAnimalOption === option;
                    const isCorrectOption = option === currentAnimalQuestion.correctAnswer;
                    
                    let cardStyle = "bg-slate-50/50 border-slate-200 hover:bg-slate-100 hover:border-slate-300";
                    if (selectedAnimalOption !== null) {
                      if (isSelected) {
                        cardStyle = isCorrectOption 
                          ? "bg-emerald-500 text-white border-emerald-600 scale-[1.02] shadow"
                          : "bg-red-500 text-white border-red-600 scale-[1.02] shadow";
                      } else if (isCorrectOption) {
                        // Highlight the correct answer anyway if user was wrong
                        cardStyle = "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold";
                      } else {
                        cardStyle = "opacity-50 border-slate-200 bg-slate-50 text-slate-300";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={selectedAnimalOption !== null}
                        onClick={() => handleAnimalOptionClick(option)}
                        className={`p-4 rounded-2xl border-2 font-black text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${cardStyle}`}
                      >
                        {selectedAnimalOption !== null && isCorrectOption && <Check size={14} className="text-white" />}
                        {selectedAnimalOption !== null && isSelected && !isCorrectOption && <X size={14} className="text-white" />}
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Message */}
                {selectedAnimalOption !== null && (
                  <div className="animate-fade-in p-4 rounded-2xl border flex items-center justify-between gap-3 bg-slate-50 border-slate-200 text-right">
                    <button
                      onClick={handleNextAnimalQuestion}
                      className="px-5 py-2.5 bg-[#0A2E5C] hover:bg-slate-900 text-white rounded-xl text-xs font-black cursor-pointer shadow transition-all flex items-center gap-1"
                    >
                      <span>{animalIdx < ANIMAL_QUIZ_QUESTIONS.length - 1 ? "السؤال التالي" : "عرض نتيجتي النهائية"}</span>
                      <ArrowLeft size={13} />
                    </button>
                    <div className="space-y-0.5">
                      <span className={`text-xs font-black block ${
                        animalAnswerStatus === "correct" ? "text-emerald-600" : "text-rose-500"
                      }`}>
                        {animalAnswerStatus === "correct" ? "إجابة صحيحة هائلة! 🎉" : "توقع قريب، لكن الإجابة الصحيحة هي:"}
                      </span>
                      <p className="text-xs text-slate-650 font-bold">
                        {currentAnimalQuestion.arabicPhrase}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="bg-gradient-to-br from-[#0c2540] to-[#0A2E5C] text-white rounded-[32px] p-6 md:p-8 text-center space-y-6 shadow-lg animate-fade-in">
              <span className="text-4xl animate-bounce inline-block">👑</span>
              <h3 className="text-lg md:text-xl font-extrabold text-amber-400">
                وسام المغامر الصغير في عالم الحيوانات!
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed max-w-md mx-auto">
                عمل مذهل يفخر به الأهل! لقد نجحت في إكمال جميع أسئلة اختبار الذكاء البصري المولد بالذكاء الاصطناعي وجاءت علامتك الطيبة كالتالي:
              </p>

              <div className="inline-flex flex-col items-center justify-center p-6 bg-white/10 rounded-full border border-white/20 my-2">
                <span className="text-3xl md:text-5xl font-black block text-amber-305">
                  {animalQuizScore} / {ANIMAL_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-[10px] text-amber-300 font-bold mt-1">نجوم ذهبية من دجلة</span>
              </div>

              <div className="flex justify-center gap-2">
                {Array.from({ length: animalQuizScore }).map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 animate-pulse" size={24} />
                ))}
                {animalQuizScore === 0 && <Smile className="text-white" size={24} />}
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetAnimalQuiz}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-[#0A2E5C] text-xs font-black rounded-xl transition-all border-b-4 border-amber-700 cursor-pointer"
                >
                  العب من جديد 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* QUIZ PORT: MODE 2 (ALPHABET MATCH) */}
      {quizMode === "alphabet" && (
        <div className="space-y-6">
          {!alphabetQuizCompleted ? (
            <div className="bg-white border border-amber-100 rounded-[30px] p-6 shadow-sm space-y-6">
              
              {/* Question bubble */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] text-slate-400 font-bold">
                  تحدي الحروف: {alphabetIdx + 1} من {ALPHABET_MATCH_QUESTIONS.length}
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs bg-[#0A2E5C] text-white py-1 px-3.5 rounded-full font-black inline-block text-center shadow-sm">
                    ما الكلمة التي تبدأ بهذا الحرف؟
                  </span>
                  
                  {/* Big Target Letter Display */}
                  <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-4xl font-black text-rose-700 mx-auto shadow-inner hover:scale-105 transition-all">
                    {currentAlphabetQuestion.letter}
                  </div>

                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    اضغط على الزر أدناه لمساعدتك، أو تأمل الحرف واختر الكلمة المناسبة له!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => speakText(`الرجاء مطابقة حرف ${currentAlphabetQuestion.letter} بالكلمة المناسبة`)}
                  className="mt-2.5 px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-[10px] rounded-full inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Volume2 size={12} />
                  <span>اسأل المساعد عن الحرف 🔊</span>
                </button>
              </div>

              {/* Game interaction block */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentAlphabetQuestion.options.map((option, oIdx) => {
                    const isSelected = selectedAlphabetOption === option;
                    const isCorrect = option === currentAlphabetQuestion.correctAnswer;

                    let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-205 text-slate-700";
                    if (selectedAlphabetOption !== null) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? "bg-emerald-500 text-white border-emerald-600 scale-[1.03] shadow"
                          : "bg-red-500 text-white border-red-650 scale-[1.03] shadow";
                      } else if (isCorrect) {
                        btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-800 font-black";
                      } else {
                        btnStyle = "opacity-40 bg-slate-50 border-slate-200 text-slate-300";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={selectedAlphabetOption !== null}
                        onClick={() => handleAlphabetOptionClick(option)}
                        className={`p-4 rounded-2xl border-2 font-black text-xs md:text-sm text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${btnStyle}`}
                      >
                        {isCorrect && selectedAlphabetOption !== null && (
                          <span className="text-xl">{currentAlphabetQuestion.emoji}</span>
                        )}
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {selectedAlphabetOption !== null && (
                  <div className="animate-fade-in p-4 rounded-2xl border flex items-center justify-between gap-3 bg-emerald-50 border-emerald-200 text-right">
                    <button
                      onClick={handleNextAlphabetQuestion}
                      className="px-5 py-2.5 bg-[#0A2E5C] hover:bg-slate-900 text-white rounded-xl text-xs font-black cursor-pointer shadow transition-all flex items-center gap-1"
                    >
                      <span>{alphabetIdx < ALPHABET_MATCH_QUESTIONS.length - 1 ? "التالي" : "النتيجة الإجمالية"}</span>
                      <ArrowLeft size={13} />
                    </button>
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-emerald-700 block">
                        {alphabetAnswerStatus === "correct" ? "رائع! إجابة صحيحة ١٠٠٪ 🌸" : "حصل خير! لنتعلم منها معاً:"}
                      </span>
                      <p className="text-[11px] text-slate-600 font-semibold">
                        {currentAlphabetQuestion.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="bg-gradient-to-br from-[#0c2540] to-[#0A2E5C] text-white rounded-[32px] p-6 md:p-8 text-center space-y-6 shadow-lg animate-fade-in">
              <span className="text-4xl animate-bounce inline-block">✨</span>
              <h3 className="text-lg md:text-xl font-extrabold text-amber-400">
                أنت عبقري الحروف الأبجدية المتفوق!
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed max-w-sm mx-auto">
                مبروك لصديقنا الذكي! طابقت الحروف مع أسمائها بنجاح وذكاء منقطع النظير. فخورون بك جداً!
              </p>

              <div className="inline-flex flex-col items-center justify-center p-6 bg-white/10 rounded-full border border-white/20 my-2">
                <span className="text-3xl md:text-5xl font-black block text-amber-305">
                  {alphabetQuizScore} / {ALPHABET_MATCH_QUESTIONS.length}
                </span>
                <span className="text-[10px] text-amber-300 font-bold mt-1">علامة التفوق والمطابقة</span>
              </div>

              <div className="flex justify-center gap-2">
                {Array.from({ length: alphabetQuizScore }).map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 animate-spin-slow" size={24} />
                ))}
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetAlphabetQuiz}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-[#0A2E5C] text-xs font-black rounded-xl transition-all border-b-4 border-amber-700 cursor-pointer"
                >
                  العب من جديد 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Parental Tips bottom block */}
      <div className="mt-4 bg-amber-100/30 border border-amber-200/60 p-4 rounded-3xl space-y-2 text-right">
        <h4 className="text-[11px] font-black text-[#0A2E5C] flex items-center justify-end gap-1">
          <span>💡 إرشاد للوالدين والمربين الفاضلين:</span>
          <span>🎒</span>
        </h4>
        <p className="text-[10px] text-slate-655 leading-relaxed font-semibold">
          استخدموا زري (🔊) لمشاركة تفاعل دافئ ومباشر مع طفلكم الصغير. التلعثم في مخارج الحروف لدى الأطفال طبيعي، وبتقوية تواصلهم وتكرار الأسماء باللعب نمنح روحهم الشجاعة الطموحة الثقة التامة لبدء الروضة أو الصف الأول الابتدائي بسرور وأمان.
        </p>
      </div>

    </div>
  );
};
