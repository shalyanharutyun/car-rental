export const SUPPORTED_LANGS = ['en', 'hy', 'ru'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

const STORAGE_KEY = 'lang';

export function detectInitialLang(): SupportedLang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    return saved as SupportedLang;
  }

  const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return (SUPPORTED_LANGS as readonly string[]).includes(browserLang)
    ? (browserLang as SupportedLang)
    : 'en';
}

export function saveLang(lang: SupportedLang) {
  localStorage.setItem(STORAGE_KEY, lang);
}
