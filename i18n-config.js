const resources = {
  en: {
    translation: {
      pageTitle: "Course Reflection",
      pageSubtitle: "Share your experience and insights about the course",
      question1Label: "What did you enjoy most about the course?",
      question1Placeholder: "Share your thoughts about what you enjoyed most...",
      question2Label: "What was the most challenging part?",
      question2Placeholder: "Describe the challenges you faced...",
      question3Label: "What could be improved?",
      question3Placeholder: "Share your suggestions for improvement...",
      submitBtn: "Submit Reflection",
      footerText: "Course Management Platform - Student Reflection",
      successMessage: "Thank you for your reflection!",
      errorMessage: "Please fill in all fields.",
      loadingMessage: "Submitting...",
      languageNames: {
        en: "English",
        fr: "Français",
        es: "Español"
      }
    }
  },
  fr: {
    translation: {
      pageTitle: "Réflexion sur le Cours",
      pageSubtitle: "Partagez votre expérience et vos idées sur le cours",
      question1Label: "Qu'est-ce que vous avez le plus apprécié dans ce cours ?",
      question1Placeholder: "Partagez vos pensées sur ce que vous avez le plus apprécié...",
      question2Label: "Quelle était la partie la plus difficile ?",
      question2Placeholder: "Décrivez les défis que vous avez rencontrés...",
      question3Label: "Que pourrait-on améliorer ?",
      question3Placeholder: "Partagez vos suggestions d'amélioration...",
      submitBtn: "Soumettre la Réflexion",
      footerText: "Plateforme de Gestion des Cours - Réflexion Étudiante",
      successMessage: "Merci pour votre réflexion !",
      errorMessage: "Veuillez remplir tous les champs.",
      loadingMessage: "Soumission en cours...",
      languageNames: {
        en: "English",
        fr: "Français",
        es: "Español"
      }
    }
  },
  es: {
    translation: {
      pageTitle: "Reflexión del Curso",
      pageSubtitle: "Comparte tu experiencia e ideas sobre el curso",
      question1Label: "¿Qué fue lo que más disfrutaste del curso?",
      question1Placeholder: "Comparte tus pensamientos sobre lo que más disfrutaste...",
      question2Label: "¿Cuál fue la parte más desafiante?",
      question2Placeholder: "Describe los desafíos que enfrentaste...",
      question3Label: "¿Qué se podría mejorar?",
      question3Placeholder: "Comparte tus sugerencias de mejora...",
      submitBtn: "Enviar Reflexión",
      footerText: "Plataforma de Gestión de Cursos - Reflexión Estudiantil",
      successMessage: "¡Gracias por tu reflexión!",
      errorMessage: "Por favor completa todos los campos.",
      loadingMessage: "Enviando...",
      languageNames: {
        en: "English",
        fr: "Français",
        es: "Español"
      }
    }
  }
};

i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

function changeLanguage(lang) {
  i18next.changeLanguage(lang).then(() => {
    updateLanguageButtons();
    updateContent();
    addTransitionEffect();
  });
}

function updateLanguageButtons() {
  const buttons = document.querySelectorAll('.lang-btn');
  const currentLang = i18next.language;
  
  buttons.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    btn.textContent = i18next.t(`languageNames.${lang}`);
  });
}

function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key.startsWith('[placeholder]')) {
      const placeholderKey = key.replace('[placeholder]', '');
      element.placeholder = i18next.t(placeholderKey);
    } else {
      element.textContent = i18next.t(key);
    }
  });
  
  document.title = `${i18next.t('pageTitle')} - Student Experience`;
  document.documentElement.lang = i18next.language;
}

function addTransitionEffect() {
  const container = document.querySelector('.container');
  container.style.transform = 'scale(0.98)';
  container.style.opacity = '0.8';
  
  setTimeout(() => {
    container.style.transform = 'scale(1)';
    container.style.opacity = '1';
  }, 200);
}

document.addEventListener('DOMContentLoaded', function() {
  updateLanguageButtons();
  updateContent();
}); 