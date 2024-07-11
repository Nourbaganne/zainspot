import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { Language } from "../lib/translate";
import { Currency } from "../lib/currencyConvert";

const MenuButton = ({
  lang,
  title,
  setOpenLanguagesMenu,
  type,
}: {
  lang: Language | Currency; 
  title: string;
  setOpenLanguagesMenu: (value: boolean) => void;
  type: 'language' | 'currency'; 
}) => {
  const { setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  const handleSelection = (value: Language | Currency) => {
    if (type === 'language') {
      setLanguage(value as Language);
      setOpenLanguagesMenu(false);
    } else if (type === 'currency') {
      setCurrency(value as Currency); 
      setOpenLanguagesMenu(false);
    }
  };

  return (
    <button
      className="hover:text-primary p-2 rounded-md text-left w-full"
      onClick={() => handleSelection(lang)}
    >
      {title}
    </button>
  );
};

export default MenuButton;
