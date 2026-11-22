import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import ne from './ne.js';

const DICTS = { en, ne };
const STORAGE_KEY = 'tsms-lang';

const lookup = (dict, key) =>
  key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);

function translate(lang, key, vars) {
  const dict = DICTS[lang] || en;
  const value = lookup(dict, key) ?? lookup(en, key);
  if (typeof value !== 'string') return key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] == null ? '' : String(vars[name])));
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ne' ? 'ne' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = useCallback((next) => {
    const value = next === 'ne' ? 'ne' : 'en';
    setLangState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translate(lang, 'meta.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', translate(lang, 'meta.description'));
  }, [lang]);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

/** Decorative Nepali line shown under an English heading. Hidden in Nepali mode. */
export function NpLine({ k, className = 'np-sub' }) {
  const { lang, t } = useI18n();
  if (lang !== 'en') return null;
  return <div className={className}>{t(k)}</div>;
}
