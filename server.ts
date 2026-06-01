import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { IRAQI_UNIVERSITIES } from "./src/data/iraqiUniversities";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini safely
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// 1. AI Navigator gap diagnostic endpoint
app.post("/api/analyze-gap", async (req, res) => {
  try {
    const { userInfo } = req.body;
    if (!userInfo) {
      return res.status(400).json({ error: "userInfo is required" });
    }

    const prompt = `
      أنت مستشار تعليمي ومهني ذكي في "أكاديمية سومر" في العراق.
      قدم تقييماً مفصلاً في قالب JSON باللغة العربية والإنجليزية بناءً على هذه المعلومات: "${userInfo}".
      ابحث عن فجوتهم المعرفية، وجههم للمسار الأنسب (التعليم المدرسي، الجامعي، أو المستمر / ريادة الأعمال وتطوير المهارات)، وقدم توصية بثلاث دورات مفيدة.

      يجب أن تكون الاستجابة بصيغة JSON حقيقية وموافقة تماماً لهذا النموذج الهيكلي، لا تكتب أي نصوص قبلها أو بعدها:
      {
        "assessmentAr": "تقييم مفصل باللغة العربية لمستواهم وإمكانياتهم وطموحهم الفردي...",
        "assessmentEn": "Detailed assessment in English...",
        "knowledgeGapAr": "الفجوات المعرفية الأساسية التي يحتاجون لسدها للوصول لأهدافهم...",
        "knowledgeGapEn": "Key knowledge gaps...",
        "recommendedPathAr": ["دورة أولى مقترحة", "دورة ثانية مقترحة", "دورة ثالثة مقترحة"],
        "recommendedPathEn": ["Recommended Course 1", "Recommended Course 2", "Recommended Course 3"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in analyze-gap:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 2. AI University Career Path Test (New Feature 14)
app.post("/api/career-path-test", async (req, res) => {
  try {
    const { qAnswers, bakaloriaScore, section, interests } = req.body;

    const prompt = `
      بصفتك مستشاراً أكاديمياً خبيراً وموجهاً لطلبة الإعدادية (البكالوريا) في العراق للقبول المركزي الجامعي.
      قم بتحليل نتائج وميول طالب الإعدادية بناءً على المدخلات التالية:
      - معدل البكالوريا المتوقع أو الحالي: ${bakaloriaScore} %
      - الفرع الإعدادي: ${section} (علمي، أدبي، تطبيقي، أحيائي، أو كفاءات فنية/مهنية)
      - الميول والاهتمامات الشخصية: ${interests}
      - إجابات أسئلة تقييم الشخصية: ${JSON.stringify(qAnswers)}

      الأسئلة كانت تدور حول:
      1. أسلوب التفكير المفضل (عملي وتحليلي vs إبداعي وإنساني)
      2. بيئة العمل المثالية (ميدانية/مختبرات vs مكتبية/تكنولوجية)
      3. الشغف بالتكنولوجيا والذكاء الاصطناعي (عالٍ جداً vs متوسط/عام)
      4. التعامل مع التحديات والمسؤوليات (تفكيك مشكلات معقدة vs مهارات إدارية وتواصلية)
      5. الهدف الوظيفي النهائي (ريادة أعمال وعمل حر vs وظيفة أكاديمية ومؤسسية مستقرة)

      حلل هذه البيانات واقترح المسارات الجامعية العراقية الأكثر توافقاً بالذكاء الاصطناعي.
      تأكد من ملاءمة المعدل (${bakaloriaScore}) للقبول المركزي أو الموازي أو الأهلي العراقي، واقترح كليتين أو تخصصين محددين (مثل هندسة الحاسوب، كليات الطب، تقنيات الأجهزة الطبية، كليات القانون، إدارة الأعمال، الترجمة، إلخ).

      يجب أن تلبي الاستجابة الهكيل التالي بصيغة JSON حقيقية وبدون أي نصوص خارجية (دون علامات ماركداون إضافية):
      {
        "primaryRecommendationAr": "التخصص والمسار الرئيسي الموصى به بالعربية ومبرراته الذكية الموائمة للمعدل والميول...",
        "primaryRecommendationEn": "Primary recommendation and reasons in English...",
        "suggestedCollegesAr": ["كلية/قسم محدد 1", "كلية/قسم محدد 2"],
        "suggestedCollegesEn": ["Specific College/Dept 1", "Specific College/Dept 2"],
        "actionPlanAr": [
          "الخطوة الأولى: التركيز على مهارات معينة قبل الدخول...",
          "الخطوة الثانية: اختيار القبول المركزي المناسب وتأمينه...",
          "الخطوة الثالثة: سد فجوة معينة في الكورسات التمهيدية..."
        ],
        "actionPlanEn": ["Step 1", "Step 2", "Step 3"],
        "compatibilityScore": 95
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in career-path-test:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 3. AI On-Demand Course Generation (Feature 7)
app.post("/api/on-demand-course", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }

    const prompt = `
      بصفتك مصمم حقائب تدريبية ومناهج أكاديمية متطورة في "أكاديمية سومر".
      قام مستخدم بالبحث عن تخصص نادر أو رغب في توليد كورس مخصص له بعنوان: "${topic}".
      قم فوراً بجمع المصادر وصياغة منهج تدريبي متكامل له يتكون من 3 وحدات تعليمية (Syllabus Units) مع اختبار ختامي سريع من 3 أسئلة خيارات متعددة.

      قم بصياغة الاستجابة كـ JSON حقيقي مطابق للهيكل التالي تماماً:
      {
        "title": "عنوان الكورس المولد ذكياً (مثال: أساسيات ميكانيك النانو العراقي)",
        "duration": "6 ساعات تدريبية مكثفة",
        "description": "مقدمة شاملة تم توليدها بالذكاء الاصطناعي بناءً على أحدث المعايير العلمية...",
        "modules": [
          {
            "unitTitle": "الوحدة الأولى: عنوان الوحدة",
            "content": "شرح تكاملي غني ومفصل لمحتوى هذه الوحدة وما سيتعلمه الطالب فيها بدقة..."
          },
          {
            "unitTitle": "الوحدة الثانية: عنوان الوحدة الثانية",
            "content": "شرح غني ومفصل لمحتوى الوحدة الثانية..."
          },
          {
            "unitTitle": "الوحدة الثالثة: عنوان الوحدة الثالثة",
            "content": "شرح غني ومفصل لمحتوى الوحدة الثالثة..."
          }
        ],
        "quiz": [
          {
            "question": "سؤال الاختبار الأول المتعلق بالمادة؟",
            "options": ["خيار أ صحيح", "خيار ب خاطئ", "خيار ج خاطئ", "خيار د خاطئ"],
            "answerIndex": 0,
            "explanation": "شرح مبسط لسبب صحة هذا الاختيار."
          },
          {
            "question": "سؤال الاختبار الثاني؟",
            "options": ["خيار أ خاطئ", "خيار ب صحيح", "خيار ج خاطئ", "خيار د خاطئ"],
            "answerIndex": 1,
            "explanation": "شرح مبسط."
          },
          {
            "question": "سؤال الاختبار الثالث؟",
            "options": ["خيار أ خاطئ", "خيار ب خاطئ", "خيار ج صحيح", "خيار د خاطئ"],
            "answerIndex": 2,
            "explanation": "شرح مبسط."
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in on-demand-course:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 4. AI Interactive Gamification (Feature 2)
app.post("/api/ai-gamify", async (req, res) => {
  try {
    const { docText, subject } = req.body;
    const context = docText || subject || "ميكانيك، فيزياء، برمجة، أو قانون عراقي";

    const prompt = `
      بصفتك مطور ألعاب تعليمية وتفاعلية.
      قم بتحويل هذه المادة العلمية/النصية: "${context}" إلى لعبة بطاقات استذكار واختبار معرفة ذكية وسريعة ممزوجة بالتحدي والألعاب اللفظية.
      قم بتوليد 3 بطاقات تحدي ذكية (Flashcards) تحتوي كل منها على تحدي أو سؤال تفاعلي، بالإضافة إلى 3 أسئلة خيارات متعددة تنافسية سريعة.

      صيغة الاستجابة يجب أن تكون JSON حقيقي ومطابق تماماً للهيكل أدناه:
      {
        "gameTitle": "اسم اللعبة الذكية المقترح (مثال: بطل الفيزياء الكهربائية)",
        "flashcards": [
          { "front": "وجه البطاقة: مصطلح أو سؤال غامض ومحفز للبحث", "back": "ظهر البطاقة: الجواب المثير والمفصل مع حقيقة مدهشة" },
          { "front": "تحدي 2", "back": "إجابة 2" },
          { "front": "تحدي 3", "back": "إجابة 3" }
        ],
        "quiz": [
          {
            "question": "السؤال التفاعلي الأول للبطولة؟",
            "options": ["الخيار الأول", "الخيار الثاني", "الخيار الثالث"],
            "answerIndex": 0
          },
          {
            "question": "السؤال الثاني؟",
            "options": ["الخيار الأول", "الخيار الثاني", "الخيار الثالث"],
            "answerIndex": 1
          },
          {
            "question": "السؤال الثالث؟",
            "options": ["الخيار الأول", "الخيار الثاني", "الخيار الثالث"],
            "answerIndex": 2
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in ai-gamify:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 5. In-Lecture AI Assistant (Feature 6 Context-RAG)
app.post("/api/in-lecture-ask", async (req, res) => {
  try {
    const { lectureTitle, question, timeCode } = req.body;

    const prompt = `
      بصفتك المساعد الذكي اللحظي المدمج داخل مشغل الفيديو لمحاضرات أكاديمية سومر.
      الطالب يشاهد الآن كورس/محاضرة بعنوان: "${lectureTitle}"
      الآن عند الدقيقة/الثانية (${timeCode})، توقف الطالب وسألك هذا السؤال اللحظي: "${question}"
      باستخدام تقنيات توليد الفهم المدمج (RAG) وسياق المحاضرة المفترض، أجب بشكل مباشر ودقيق ومقنع جداً للطالب عن هذه الجزئية بلغة عربية مبسطة وواضحة جداً وبأسلوب المعلم الحكيم المباشر.

      الهيكل المرغوب كـ JSON حقيقي:
      {
        "explanationAr": "الجواب المفصل والدقيق مسترشداً بالتسلسل الزمني المحدد والمساق...",
        "tipAr": "نصيحة ذكية موجزة لربط هذا المفهوم بالتطبيق العملي أو بسوق العمل..."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in in-lecture-ask:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 6. General Interactive Chatbot Support (Feature 5) & Interactive AI Queries
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    // Capture last messages for context
    const recentMessages = messages.slice(-5).map((m: any) => `${m.role === "user" ? "الطالب" : "الذكاء الاصطناعي"}: ${m.content}`).join("\n");

    // Format Iraqi universities guide for the AI chatbot context
    const universitiesContext = IRAQI_UNIVERSITIES.map(uni => {
      const collegesStr = uni.colleges.map(col => {
        return `- ${col.name}: نبذة: ${col.introduction}. الموقع الجغرافي: ${col.location}. الأساتذة البارزون: ${col.professors.join("، ")}. الاتصال والبريد: ${col.contact}. تفاصيل إضافية: ${col.additionalDetails || "لا توجد"}`;
      }).join("\n  ");
      return `[جامعة: ${uni.name}]\n  نظرة عامة: ${uni.overview}\n  الموقع العام: ${uni.location}\n  موقع الويب والاتصال: ${uni.website} (${uni.contact})\n  الكليات المتاحة بالتفصيل:\n  ${collegesStr}`;
    }).join("\n\n");

    const prompt = `
      أنت المساعد الذكي التفاعلي ومنسق الدعم الأكاديمي الشامل لأكاديمية سومر (Sumer Academy) في العراق - المنصة الوطنية الأكبر المرتكزة بالكامل على تقنيات الذكاء الاصطناعي وشريكتها نقابة المدربين العراقيين الهادفة للتعليم المهني المستدام للجميع.
      تواصل مع الطالب بأسلوب رائع وملهم، أجب عن استفساره بإيجاز وتوجيه دقيق، مقدماً حكمة وروح وطنية لدعم التعليم المستدام والهدف الرابع من أهداف التنمية المستدامة.

      لديك أيضاً وصول كامل ومعلومات حقيقية ومحدثة من "دليلك الجامعي العراقي للقبول والكليات" المدمج بالمنصة. إذا سألك الطالب عن أي جامعة عراقية، كلياتها، مواقعها، أساتذتها البارزين، أو طرق التواصل معها، قم بالإجابة بالاعتماد الكلي والتفصيلي على هذا الدليل الموثق:
      
      === دليلك الجامعي العراقي المعتمد ===
      ${universitiesContext}
      ===================================

      المحادثة السابقة والحديثة لتتابع الرد بانسجام:
      ${recentMessages}

      أجب بشكل مباشر وممتع ومختصر وبأسلوب دقيق وواضح جداً (يرجى التركيز على التفاصيل المطلوبة بدقة وتوجيه المتقدم) باللغة العربية. يمكنك إضافة رموز تعبيرية خفيفة ملائمة مثل القبس العلمي 🎓 أو النجمة ✨.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Error in chat:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Vite middleware configuration for development vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sumer Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
