import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // App
      "app.name": "Coligo",
      
      // Dashboard Greeting
      "dashboard.greeting": "Welcome {{name}},",
      
      // Menu Items
      "menu.dashboard": "Dashboard",
      "menu.schedule": "Schedule",
      "menu.courses": "Courses",
      "menu.gradebook": "Gradebook",
      "menu.performance": "Performance",
      "menu.announcement": "Announcement",
      
      // Dashboard Content
      "dashboard.examsTime.title": "EXAMS TIME",
      "dashboard.examsTime.subtitle": "Here we are, Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.",
      "dashboard.examsTime.quote": "\"Nothing happens until something moves\" - Albert Einstein",
      "dashboard.examsTime.button": "View exams tips",
      
      "dashboard.announcements.title": "Announcements",
      "dashboard.announcements.item1": "We have 9 assignments waiting for you in Assignments tool.",
      "dashboard.announcements.item2": "Don't forget to submit your assignment today.",
      "dashboard.announcements.item3": "Please be informed that the school will be closed due to maintenance on Dec 25th.",
      "dashboard.announcements.item4": "The annual sports day will be held on Dec 30th. Please register now.",
      
      "dashboard.whatsDue.title": "What's due",
      "dashboard.whatsDue.startQuiz": "Start Quiz",
      "dashboard.whatsDue.solveAssignment": "Solve Assignment",
      "dashboard.whatsDue.assignmentTopic": "12-12 Assignment",
      
      // Common
      "viewAll": "All",
      "search": "Search",
      "profile": "Profile",
      "logout": "Logout",
      
      // Accessibility labels
      "aria.menu": "menu",
      "aria.search": "search",
      "aria.notifications": "notifications",
      "aria.messages": "messages",
      "aria.account": "account of current user",
    }
  },
  ar: {
    translation: {
      // App
      "app.name": "كوليجو",
      
      // Dashboard Greeting
      "dashboard.greeting": "مرحباً {{name}}،",
      
      // Menu Items
      "menu.dashboard": "لوحة التحكم",
      "menu.schedule": "الجدول",
      "menu.courses": "المواد",
      "menu.gradebook": "درجات الطلاب",
      "menu.performance": "الأداء",
      "menu.announcement": "الإعلانات",
      
      // Dashboard Content
      "dashboard.examsTime.title": "وقت الامتحانات",
      "dashboard.examsTime.subtitle": "ها نحن هنا، هل أنت مستعد للقتال؟ لا تقلق، لقد أعددنا بعض النصائح لتكون جاهزاً للامتحانات.",
      "dashboard.examsTime.quote": "\"لا شيء يحدث حتى يتحرك شيء\" - ألبرت آينشتاين",
      "dashboard.examsTime.button": "عرض نصائح الامتحانات",
      
      "dashboard.announcements.title": "الإعلانات",
      "dashboard.announcements.item1": "لدينا 9 واجبات في انتظارك في أداة الواجبات.",
      "dashboard.announcements.item2": "لا تنس تسليم واجبك اليوم.",
      "dashboard.announcements.item3": "يرجى العلم أن المدرسة ستكون مغلقة للصيانة في 25 ديسمبر.",
      "dashboard.announcements.item4": "سيقام اليوم الرياضي السنوي في 30 ديسمبر. يرجى التسجيل الآن.",
      
      "dashboard.whatsDue.title": "ما هو مستحق",
      "dashboard.whatsDue.startQuiz": "ابدأ الاختبار",
      "dashboard.whatsDue.solveAssignment": "حل الواجب",
      "dashboard.whatsDue.assignmentTopic": "واجب 12-12",
      
      // Common
      "viewAll": "الكل",
      "search": "بحث",
      "profile": "الملف الشخصي",
      "logout": "تسجيل خروج",
      
      // Accessibility labels
      "aria.menu": "القائمة",
      "aria.search": "بحث",
      "aria.notifications": "الإشعارات",
      "aria.messages": "الرسائل",
      "aria.account": "حساب المستخدم الحالي",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    debug: false,
  });

export default i18n;
