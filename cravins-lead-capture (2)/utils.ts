
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getSourceFromURL = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get('s') || params.get('source') || 'NFC tap';
};

export const getDomainSuggestion = (email: string): string | null => {
  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gnail.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
  };

  const parts = email.split('@');
  if (parts.length !== 2) return null;

  const domain = parts[1].toLowerCase();
  if (commonTypos[domain]) {
    return `${parts[0]}@${commonTypos[domain]}`;
  }
  return null;
};
