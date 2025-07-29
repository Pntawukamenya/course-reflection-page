let currentLanguage = 'en';
let isSubmitting = false;

const elements = {
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    question1Label: document.getElementById('question1Label'),
    question1: document.getElementById('question1'),
    question2Label: document.getElementById('question2Label'),
    question2: document.getElementById('question2'),
    question3Label: document.getElementById('question3Label'),
    question3: document.getElementById('question3'),
    submitBtn: document.getElementById('submitBtn'),
    footerText: document.getElementById('footerText'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    form: document.getElementById('reflectionForm'),
    progressIndicator: document.getElementById('progressIndicator')
};

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    detectBrowserLanguage();
});

function initializePage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    
    updateLanguageButtons();
    updateContent();
}

function setupEventListeners() {
    elements.form.addEventListener('submit', handleFormSubmission);
    
    elements.languageButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Progress indicator
    [elements.question1, elements.question2, elements.question3].forEach(input => {
        input.addEventListener('input', updateProgress);
    });
    

}

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    if (translations[shortLang] && currentLanguage === 'en') {
        switchLanguage(shortLang);
    }
}

function switchLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not supported`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    updateLanguageButtons();
    updateContent();

}

function updateLanguageButtons() {
    elements.languageButtons.forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLanguage) {
            btn.classList.add('active');
            btn.textContent = translations[currentLanguage].languageNames[lang];
        } else {
            btn.classList.remove('active');
            btn.textContent = translations[currentLanguage].languageNames[lang];
        }
    });
}

function updateContent() {
    const t = translations[currentLanguage];
    
    animateElement(elements.pageTitle, t.pageTitle);
    animateElement(elements.pageSubtitle, t.pageSubtitle);
    animateElement(elements.question1Label, t.question1Label);
    animateElement(elements.question2Label, t.question2Label);
    animateElement(elements.question3Label, t.question3Label);
    animateElement(elements.submitBtn, t.submitBtn);
    animateElement(elements.footerText, t.footerText);
    
    elements.question1.placeholder = t.question1Placeholder;
    elements.question2.placeholder = t.question2Placeholder;
    elements.question3.placeholder = t.question3Placeholder;
    
    document.title = `${t.pageTitle} - Student Experience`;
    
    document.documentElement.lang = currentLanguage;
}

function animateElement(element, newText) {
    element.textContent = newText;
}

function updateProgress() {
    const inputs = [elements.question1, elements.question2, elements.question3];
    const filledInputs = inputs.filter(input => input.value.trim().length > 0);
    const progress = (filledInputs.length / inputs.length) * 100;
    
    elements.progressIndicator.style.width = progress + '%';
}



async function handleFormSubmission(e) {
    e.preventDefault();
    
    if (isSubmitting) {
        return;
    }
    
    if (!validateForm()) {
        showMessage(translations[currentLanguage].errorMessage, 'error');
        return;
    }
    
    isSubmitting = true;
    const originalText = elements.submitBtn.textContent;
    elements.submitBtn.textContent = translations[currentLanguage].loadingMessage;
    elements.submitBtn.disabled = true;
    
    try {
        const formData = {
            question1: elements.question1.value.trim(),
            question2: elements.question2.value.trim(),
            question3: elements.question3.value.trim(),
            language: currentLanguage,
            timestamp: new Date().toISOString()
        };
        
        await simulateSubmission(formData);
        
        showMessage(translations[currentLanguage].successMessage, 'success');
        
        elements.form.reset();
        updateProgress();
        
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    } finally {
        isSubmitting = false;
        elements.submitBtn.textContent = originalText;
        elements.submitBtn.disabled = false;
    }
}

function validateForm() {
    const question1 = elements.question1.value.trim();
    const question2 = elements.question2.value.trim();
    const question3 = elements.question3.value.trim();
    
    return question1.length > 0 && question2.length > 0 && question3.length > 0;
}

function simulateSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data submitted:', formData);
            resolve();
        }, 1500);
    });
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        updateContent,
        validateForm,
        handleFormSubmission
    };
} 