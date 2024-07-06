import en_translations from '../translations/en.json';
import fr_translations from '../translations/fr.json';

type Language = 'en' | 'fr';

// Define the type for translations
interface Translations {
  [key: string]: string | string[];
}

function getTranslations(lang: Language): Translations {
  return lang === 'en' ? en_translations : fr_translations;
}

export default function translate(key: string, lang: Language = 'en'): string {
  try {
    const translations = getTranslations(lang);

    // Parse the key to handle array access if needed
    const matchArrayAccess = key.match(/(.+)\[(\d+)\]/);

    if (matchArrayAccess) {
      const arrayKey = matchArrayAccess[1];
      const index = parseInt(matchArrayAccess[2], 10);

      if (translations[arrayKey] && Array.isArray(translations[arrayKey])) {
        return (translations[arrayKey] as string[])[index] || key; // Return the array item or key if not found
      } else {
        throw new Error(`Key "${arrayKey}" is not an array or does not exist in ${lang} translations.`);
      }
    } else {
      if (translations[key] && typeof translations[key] === 'string') {
        return translations[key] as string;
      } else {
        throw new Error(`Key "${key}" not found in ${lang} translations.`);
      }
    }
  } catch (error) {
    console.error(`Error translating "${key}":`, error);
    return key; // Return the key itself if translation fails
  }
}
