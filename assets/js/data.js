export const data = {
  programs:[
    { id:"bsc-cs", degree:"BSc",
      title:{en:"BSc in Computer Science", ar:"بكالوريوس في علوم الحاسوب"},
      overview:{ en:"A four-year undergraduate program covering algorithms, data structures, software engineering, and systems.",
                 ar:"برنامج بكالوريوس لمدة أربع سنوات يشمل الخوارزميات وهياكل البيانات والهندسة البرمجية والأنظمة." },
      outcomes:{ en:["Apply core CS principles","Design and evaluate software systems","Communicate effectively"],
                 ar:["تطبيق مبادئ علوم الحاسوب","تصميم وتقييم الأنظمة البرمجية","التواصل الفعّال"] },
      curriculum:{ en:[["Course","Credits"],["Intro to Programming","3"],["Data Structures","3"],["Databases","3"],["Operating Systems","3"]],
                   ar:[["المقرر","الوحدات"],["مقدمة في البرمجة","3"],["هياكل البيانات","3"],["قواعد البيانات","3"],["أنظمة التشغيل","3"]] },
      coordinator:{ en:"Dr. Jane Doe", ar:"د. جين دو" } },
    { id:"msc-cs", degree:"MSc",
      title:{en:"MSc in Computer Science", ar:"ماجستير في علوم الحاسوب"},
      overview:{ en:"A research-oriented master's program focusing on AI, data science, and advanced systems.",
                 ar:"برنامج ماجستير بحثي يركّز على الذكاء الاصطناعي وعلوم البيانات والأنظمة المتقدمة." },
      outcomes:{ en:["Conduct research","Publish findings","Lead technical projects"],
                 ar:["إجراء بحوث","نشر النتائج","قيادة المشاريع التقنية"] },
      curriculum:{ en:[["Course","Credits"],["Advanced Algorithms","3"],["Machine Learning","3"],["Research Methods","3"]],
                   ar:[["المقرر","الوحدات"],["خوارزميات متقدمة","3"],["تعلّم آلي","3"],["طرق البحث العلمي","3"]] },
      coordinator:{ en:"Dr. Ali Ahmed", ar:"د. علي أحمد" } }
  ],
  faculty:[
    { id:"wisam-abdullah",
      name:{en:"Wisam Dawood Abdullah", ar:"وسام داود عبد الله"},
      title:{en:"Assistant Professor of Computer Science", ar:"أستاذ مساعد في علوم الحاسوب"},
      email:"wisam@example.edu",
      office:{en:"Room 301, CS Building", ar:"الغرفة 301، مبنى علوم الحاسوب"},
      research:["IoT","AI/ML","Networks"],
      photo:"assets/img/placeholder.png",
      bio:{ en:"Researcher in Internet of Things, Machine Learning, and networked systems. Supervises multiple theses.",
            ar:"باحث في إنترنت الأشياء والتعلم الآلي والأنظمة الشبكية. يشرف على عدة رسائل علمية." } }
  ],
  news:[
    { id:"news-2025-09-01",
      title:{en:"CS Students Win Hackathon", ar:"طلاب علوم الحاسوب يفوزون بالهاكاثون"},
      date:"2025-09-01",
      summary:{en:"Our students won first place in the national hackathon.", ar:"حصل طلابنا على المركز الأول في الهاكاثون الوطني."},
      hero:"assets/img/placeholder.png",
      body:{ en:"The team developed an AI-powered campus navigator within 24 hours.",
             ar:"طوّر الفريق نظام ملاحة داخل الحرم الجامعي مدعّماً بالذكاء الاصطناعي خلال 24 ساعة." } }
  ],
  events:[
    { id:"event-2025-09-28-seminar",
      title:{en:"AI & IoT Research Seminar", ar:"ندوة بحثية حول الذكاء الاصطناعي وإنترنت الأشياء"},
      start:"2025-09-28 10:00", end:"2025-09-28 12:00",
      location:{en:"Auditorium A", ar:"القاعة أ"},
      summary:{ en:"Guest speakers present cutting-edge research in AI for IoT devices.",
               ar:"متحدثون ضيوف يقدمون أبحاثاً متقدمة في الذكاء الاصطناعي لأجهزة إنترنت الأشياء."},
      body:{ en:"Join faculty and industry experts to explore the latest methods.",
             ar:"انضموا إلى الأساتذة وخبراء الصناعة لاستكشاف أحدث الأساليب." } }
  ]
};
