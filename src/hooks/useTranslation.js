import { useLocale } from '../context/LocaleContext';
import { locales } from '../utils/locale';

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key) => {
    return locales[locale][key] || key;
  };

  return { t, locale };
}
