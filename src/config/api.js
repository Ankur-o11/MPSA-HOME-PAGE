export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const getUploadUrl = (url) => {
  if (!url) return '';
  let cleanUrl = url;
  if (cleanUrl.startsWith('http://localhost:5000')) {
    cleanUrl = cleanUrl.replace('http://localhost:5000', '');
  }
  if (cleanUrl.startsWith('http')) return cleanUrl;
  const baseUrl = API_BASE_URL.replace(/\/api$/, '');
  return `${baseUrl}${cleanUrl}`;
};
