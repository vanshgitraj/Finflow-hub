export function validatePAN(pan: string): boolean {
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panPattern.test(pan);
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function validateName(name: string): boolean {
  const namePattern = /^[a-zA-Z\s.]{2,100}$/;
  return namePattern.test(name) && name.trim().length >= 2;
}

export function formatMobileNumber(value: string): string {
  // Remove all non-digits
  let cleaned = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  cleaned = cleaned.substring(0, 10);
  
  // Format as XXXXX XXXXX (Indian mobile format)
  if (cleaned.length >= 6) {
    return cleaned.substring(0, 5) + ' ' + cleaned.substring(5);
  } else if (cleaned.length > 0) {
    return cleaned;
  }
  
  return '';
}

export function validateMobileNumber(mobile: string): boolean {
  const mobilePattern = /^[6-9]\d{9}$/;
  return mobilePattern.test(mobile);
}

export function validateLoanAmount(amount: number): boolean {
  return amount >= 10000 && amount <= 10000000 && !isNaN(amount);
}

export function validateTenure(tenure: number): boolean {
  return tenure >= 1 && tenure <= 30 && Number.isInteger(tenure);
}

export function validateIncome(income: number): boolean {
  return income >= 15000 && !isNaN(income);
}

export function validateAge(dateOfBirth: Date): boolean {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    return age - 1 >= 18 && age - 1 <= 70;
  }
  
  return age >= 18 && age <= 70;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
