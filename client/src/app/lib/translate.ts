import usa_translations from '../translations/usa.json';
import fr_translations from '../translations/fr.json';
import sp_translations from '../translations/sp.json';
import ar_translations from '../translations/ar.json';
import bn_translations from '../translations/bn.json';
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

export type Language = "EN"  | "FR" | "ES" | "AR" | "BN" | "GUJ" | "HIN" | "KN" | "MAY" | "MN" | "MAR" | "PA" | "RJ" | "TM" | "TL" | "UR";

interface Translations {
  [key: string]: string | string[];
}

function getTranslations(lang: Language): Translations {
  switch (lang) {
    case 'FR':
      return fr_translations;
    case 'ES':
      return sp_translations;
    case 'EN':
      return usa_translations;
    case 'AR':
      return ar_translations;
    case 'BN':
      return bn_translations;
    case 'GUJ':
      return gj_translations;
    case 'HIN':
      return hn_translations;
    case 'KN':
      return kn_translations;
    case 'MN':
      return mn_translations
    case 'MAY':
      return ml_translations;
    case 'MAR':
      return mr_translations;
    case 'PA':
      return pn_translations;
    case 'RJ':
      return rj_translations;
    case 'TM':
      return tm_translations;
    case 'TL':
      return tl_translations;
    case 'UR':
      return ur_translations;
    default:
      return usa_translations;
  }
}

export default function translate(key: string, lang: Language = 'EN'): string {
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
