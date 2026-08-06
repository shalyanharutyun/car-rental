export const SUPPORTED_LANGS = ['en', 'hy', 'ru'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

export const DEFAULT_LANG: SupportedLang = 'hy';

const STORAGE_KEY = 'lang';

export function isSupportedLang(lang: string | null | undefined): lang is SupportedLang {
  return !!lang && (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

export function detectInitialLang(): SupportedLang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (isSupportedLang(saved)) {
    return saved;
  }

  const browserLang = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
  return isSupportedLang(browserLang) ? browserLang : DEFAULT_LANG;
}

export function saveLang(lang: SupportedLang) {
  localStorage.setItem(STORAGE_KEY, lang);
}
