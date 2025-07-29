let isSubmitting = false;

const elements = {
    question1: document.getElementById('question1'),
    question2: document.getElementById('question2'),
    question3: document.getElementById('question3'),
    submitBtn: document.getElementById('submitBtn'),
    form: document.getElementById('reflectionForm')
};

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    elements.form.addEventListener('submit', handleFormSubmission);
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    if (isSubmitting) {
        return;
    }
    
    if (!validateForm()) {
        showMessage(i18next.t('errorMessage'), 'error');
        return;
    }
    
    isSubmitting = true;
    const originalText = elements.submitBtn.textContent;
    elements.submitBtn.textContent = i18next.t('loadingMessage');
    elements.submitBtn.disabled = true;
    
    try {
        const formData = {
            question1: elements.question1.value.trim(),
            question2: elements.question2.value.trim(),
            question3: elements.question3.value.trim(),
            language: i18next.language,
            timestamp: new Date().toISOString()
        };
        
        await simulateSubmission(formData);
        
        showMessage(i18next.t('successMessage'), 'success');
        
        elements.form.reset();
        
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
        changeLanguage,
        updateContent,
        validateForm,
        handleFormSubmission
    };
} 