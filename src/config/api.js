const rawApiUrl = import.meta.env.VITE_API_URL || 'https://mpsa-home-page-background.onrender.com';

// Ensure API_BASE_URL always ends with /api (without duplicating /api/api)
export const API_BASE_URL = (() => {
  if (!rawApiUrl) return 'https://mpsa-home-page-background.onrender.com/api';
  if (rawApiUrl === '/api') return '/api';
  const clean = rawApiUrl.replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
})();

export const getUploadUrl = (url) => {
  if (!url) return '';
  let cleanUrl = url;
  if (cleanUrl.startsWith('http://localhost:5000')) {
    cleanUrl = cleanUrl.replace('http://localhost:5000', '');
  }
  if (cleanUrl.startsWith('https://mpsa-home-page-background.onrender.com')) {
    cleanUrl = cleanUrl.replace('https://mpsa-home-page-background.onrender.com', '');
  }
  if (cleanUrl.startsWith('http') || cleanUrl.startsWith('data:')) return cleanUrl;

  const baseHost = API_BASE_URL.replace(/\/api\/?$/, '');
  const path = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  return `${baseHost}${path}`;
};

