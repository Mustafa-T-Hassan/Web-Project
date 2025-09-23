export const translations={
  en:{ nav_programs:"Programs", nav_faculty:"Faculty", nav_news:"News", nav_events:"Events", nav_contact:"Contact",
       search_placeholder:"Search the site…", home_title:"Department of Computer Science",
       home_lead:"Explore our programs, meet our faculty, and discover our research.",
       programs_title:"Academic Programs", faculty_title:"Faculty & Staff", news_title:"News", events_title:"Events",
       contact_title:"Contact Us", contact_lead:"Send us a message and we'll get back to you.",
       form_name:"Your name", form_email:"Email", form_message:"Message", form_send:"Send", read_more:"Read more",
       coordinator:"Coordinator", outcomes:"Outcomes", overview:"Overview", curriculum:"Curriculum", admission:"Admission Requirements",
       when:"When", location:"Location", no_items:"No items to display.", search_label:"Search" },
  ar:{ nav_programs:"البرامج", nav_faculty:"الهيئة التدريسية", nav_news:"الأخبار", nav_events:"الفعاليات", nav_contact:"اتصل بنا",
       search_placeholder:"ابحث في الموقع…", home_title:"قسم علوم الحاسوب",
       home_lead:"تعرّف على برامجنا وهيئتنا التدريسية وأبحاثنا.",
       programs_title:"البرامج الأكاديمية", faculty_title:"الهيئة التدريسية والموظفون", news_title:"الأخبار", events_title:"الفعاليات",
       contact_title:"تواصل معنا", contact_lead:"أرسل لنا رسالة وسنعاود الاتصال بك.",
       form_name:"الاسم", form_email:"البريد الإلكتروني", form_message:"الرسالة", form_send:"إرسال", read_more:"اقرأ المزيد",
       coordinator:"المنسّق", outcomes:"المخرجات", overview:"نظرة عامة", curriculum:"المنهج الدراسي", admission:"شروط القبول",
       when:"الوقت", location:"الموقع", no_items:"لا توجد عناصر للعرض.", search_label:"بحث" }
};
export function getLang(){ return localStorage.getItem('lang') || 'en'; }
export function setLang(lang){ localStorage.setItem('lang', lang); document.documentElement.lang=lang; document.documentElement.dir=(lang==='ar'?'rtl':'ltr'); applyTranslations(); }
export function t(key){ const lang=getLang(); return translations[lang][key] || key; }
export function applyTranslations(){
  const lang=getLang();
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const key=el.getAttribute('data-i18n'); el.textContent=translations[lang][key]||key; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ const key=el.getAttribute('data-i18n-placeholder'); el.setAttribute('placeholder', translations[lang][key]||key); });
}
