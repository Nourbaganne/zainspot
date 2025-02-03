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
  setOpenLanguagesMenu?: ((value: boolean) => void) | undefined;
  type: 'language' | 'currency';
}) => {
  const { setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  const handleSelection = (value: Language | Currency) => {
    if (type === 'language') {
      setLanguage(value as Language);
      if (setOpenLanguagesMenu) setOpenLanguagesMenu(false);
      window.location.reload();
    } else if (type === 'currency') {
      setCurrency(value as Currency);
      if (setOpenLanguagesMenu) setOpenLanguagesMenu(false);
    }
  };

  return (
    <button
      className="hover:text-primary p-2 rounded-md text-left w-full"
      onClick={() => handleSelection(lang)}
    >
      {title}{" "}({lang})
    </button>
  );
};


export default MenuButton;
