
export const validateGmail = (email: string): boolean => {
  return email.endsWith('@gmail.com');
};

export const validateIndianPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

export const getValidationErrors = (email: string, phone: string, password: string, isCompany: boolean = false) => {
  const errors: string[] = [];
  
  if (!validateGmail(email)) {
    errors.push('Email must be a valid @gmail.com address');
  }
  
  if (!validateIndianPhone(phone)) {
    errors.push('Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9');
  }
  
  if (isCompany && !validateStrongPassword(password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  } else if (!isCompany && password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  return errors;
};
