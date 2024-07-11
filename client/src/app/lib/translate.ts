import usa_translations from '../translations/usa.json';
import fr_translations from '../translations/fr.json';
import sp_translations from '../translations/sp.json';
import ar_translations from '../translations/ar.json';
import bn_translations from '../translations/bn.json';
import br_translations from '../translations/br.json';
import gj_translations from '../translations/gj.json';
import hn_translations from '../translations/hn.json';
import kn_translations from '../translations/kn.json';
import ml_translations from '../translations/ml.json';
import mn_translations from '../translations/mn.json';
import mr_translations from '../translations/mr.json';
import pn_translations from '../translations/pn.json';
import rj_translations from '../translations/rj.json';
import tm_translations from '../translations/tm.json';
import tl_translations from '../translations/tl.json';
import ur_translations from '../translations/ur.json';

type Language = 'usa' | 'fr' | 'sp' | 'ar' | 'bn' | 'br' | 'gj' | 'hn' | 'kn' | 'ml' | 'mn' | 'mr' | 'pn' | 'rj' | 'tm' | 'tl' | 'ur';

interface Translations {
  [key: string]: string | string[];
}

function getTranslations(lang: Language): Translations {
  switch (lang) {
    case 'fr':
      return fr_translations;
    case 'sp':
      return sp_translations;
    case 'usa':
      return usa_translations;
    case 'ar':
      return ar_translations;
    case 'bn':
      return bn_translations;
    case 'br':
      return br_translations;
    case 'gj':
      return gj_translations;
    case 'hn':
      return hn_translations;
    case 'kn':
      return kn_translations;
    case 'ml':
      return ml_translations;
    case 'mn':
      return mn_translations;
    case 'mr':
      return mr_translations;
    case 'pn':
      return pn_translations;
    case 'rj':
      return rj_translations;
    case 'tm':
      return tm_translations;
    case 'tl':
      return tl_translations;
    case 'ur':
      return ur_translations;
    default:
      return usa_translations;
  }
}

export default function translate(key: string, lang: Language = 'usa'): string {
  try {
    const translations = getTranslations(lang);

    const matchArrayAccess = key.match(/(.+)\[(\d+)\]/);

    if (matchArrayAccess) {
      const arrayKey = matchArrayAccess[1];
      const index = parseInt(matchArrayAccess[2], 10);

      if (translations[arrayKey] && Array.isArray(translations[arrayKey])) {
        return (translations[arrayKey] as string[])[index] || key;
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
    return key;
  }
}
