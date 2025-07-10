
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateGmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email) && email.length > 10;
};

export const validateCompanyEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length > 5;
};

export const validateIndianPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validatePassword = (password: string, isCompany: boolean = false): boolean => {
  if (isCompany) {
    return validateStrongPassword(password);
  }
  return password.length >= 6;
};

export const validateStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

export const validateUniversity = (university: string): boolean => {
  return university.trim().length >= 3;
};

export const validateDegree = (degree: string): boolean => {
  return degree.trim().length >= 3;
};

export const validateLocation = (location: string): boolean => {
  return location.trim().length >= 2;
};

export const validateDescription = (description: string): boolean => {
  return description.trim().length >= 10;
};

export const getValidationErrors = (formData: any, isCompany: boolean = false) => {
  const errors: string[] = [];
  
  if (!validateName(formData.name || formData.companyName || '')) {
    errors.push(isCompany ? 'Company name must be at least 2 characters' : 'Name must be at least 2 characters');
  }
  
  if (isCompany) {
    if (!validateCompanyEmail(formData.email || '')) {
      errors.push('Email must be a valid company email address');
    }
  } else {
    if (!validateGmail(formData.email || '')) {
      errors.push('Email must be a valid @gmail.com address');
    }
  }
  
  if (!validateIndianPhone(formData.phone || '')) {
    errors.push('Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9');
  }
  
  if (!validatePassword(formData.password || '', isCompany)) {
    if (isCompany) {
      errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    } else {
      errors.push('Password must be at least 6 characters');
    }
  }

  if (!isCompany) {
    if (!validateUniversity(formData.university || '')) {
      errors.push('University name must be at least 3 characters');
    }
    
    if (!validateDegree(formData.degree || '')) {
      errors.push('Degree must be at least 3 characters');
    }
  }
  
  return errors;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.slice(0, 10);
};

export const isValidPhoneInput = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length <= 10 && (cleaned.length === 0 || /^[6-9]/.test(cleaned));
};
