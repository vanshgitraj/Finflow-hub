export function validatePAN(pan: string): boolean {
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panPattern.test(pan);
}

export function formatMobileNumber(value: string): string {
  // Remove all non-digits
  let cleaned = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  cleaned = cleaned.substring(0, 10);
  
  // Format as XXXXX-XXXXX
  if (cleaned.length >= 6) {
    return cleaned.substring(0, 5) + '-' + cleaned.substring(5);
  } else if (cleaned.length > 0) {
    return cleaned;
  }
  
  return '';
}

export function validateMobileNumber(mobile: string): boolean {
  const mobilePattern = /^\d{10}$/;
  return mobilePattern.test(mobile);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}
