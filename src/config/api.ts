const getApiUrl = () => {
  // Production environment
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://bagstore-api.onrender.com';
  }
  // Development environment
  return 'http://localhost:5001';
};

export const API_URL = getApiUrl();
