'use client';
import { useLanguage } from '../contexts/LanguageContext';
import translate from '../lib/translate';

interface TranslationProps {
  translationKey: string;
}

const Translation: React.FC<TranslationProps> = ({ translationKey }) => {
  const { language } = useLanguage();

  return <>{translate(translationKey, language)}</>;
};

export default Translation;
