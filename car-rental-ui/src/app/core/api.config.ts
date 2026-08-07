export const API_BASE_URL = '';

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
