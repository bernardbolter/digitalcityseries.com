import React, { useState } from 'react';
// Assuming useLocale comes from your context as shown in Footer.tsx
import { useLocale } from '@/context/LocaleContext'; 

export default function BasicForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the translation function 't'
  const { t } = useLocale(); 

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; message?: string} = {};
    
    // --- UPDATED VALIDATION LOGIC ---
    // The keys now refer to your i18n JSON structure (e.g., 'contact.error.nameRequired')

    if (!name.trim()) {
      // Use 't' to translate the string based on the key
      newErrors.name = t('contact.error.nameRequired');
    } else if (name.trim().length < 2) {
      newErrors.name = t('contact.error.nameMinLength'); // Example with interpolation
    }
    
    if (!email.trim()) {
      newErrors.email = t('contact.error.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('contact.error.emailInvalid');
    }
    
    if (!message.trim()) {
      newErrors.message = t('contact.error.messageRequired');
    } else if (message.trim().length < 10) {
      newErrors.message = t('contact.error.messageMinLength'); // Example with interpolation
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // ... (onSubmit function remains the same) ...
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    setSubmitError('');
    setSubmitSuccess(false);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    fetch("https://formcarry.com/s/eD9FjEgvZtX", {
      method: 'POST',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(response => {
      if (response.code === 200) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      }
      else if(response.code === 422){
        // TRANSLATE the server error if possible, or fall back to an internal key
        setSubmitError(t('contact.serverError.formCarry422'));
      }
      else {
        setSubmitError(t('contact.serverError.unknown'));
      }
    })
    .catch(() => {
      // TRANSLATE the catch-all error
      setSubmitError(t('contact.serverError.genericCatch'));
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="contact-form-container" id="contact-form">
      <form onSubmit={(e) => onSubmit(e)} noValidate>
        
        <div className={`formcarry-block ${errors.name ? 'has-error' : ''}`}>
          {/* Translate labels */}
          <label htmlFor="name">{t('contact.label.fullName')}</label> 
          <input 
            type="text" 
            value={name} 
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({...errors, name: undefined});
            }} 
            id="name" 
            placeholder={t('contact.placeholder.fullName')} // Translate placeholder
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className={`formcarry-block ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">{t('contact.label.email')}</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({...errors, email: undefined});
            }} 
            id="email" 
            placeholder={t('contact.placeholder.email')}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className={`formcarry-block ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="message">{t('contact.label.message')}</label>
          <textarea 
            value={message} 
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors({...errors, message: undefined});
            }} 
            id="message" 
            placeholder={t('contact.placeholder.message')}
            className={errors.message ? 'error' : ''}
            rows={5}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <div className="formcarry-block">  
          <button type="submit" disabled={isSubmitting}>
            {/* Translate button text */}
            {isSubmitting ? t('contact.button.sending') : t('contact.button.send')} 
          </button>
        </div>
        
        {submitError && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span>
            {submitError}
          </div>
        )}
        
        {submitSuccess && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            {/* Translate success message */}
            {t('contact.successMessage')} 
          </div>
        )}
      </form>
    </div>
  );
}