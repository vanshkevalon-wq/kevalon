export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const requestHeaders = isFormData
    ? { ...(options.headers || {}) }
    : { 'Content-Type': 'application/json', ...(options.headers || {}) };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: requestHeaders,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }

  return data;
}
