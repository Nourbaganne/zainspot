import { useLanguage } from "../contexts/LanguageContext";


const LanguageButton = ({
  lang,
  title,
  setOpenLanguagesMenu,
}: {
  lang: "usa" | "fr" | "sp" | "ar" | "bn" | "br" | "gj" | "kn" | "ml" | "mn" | "mr" | "pn" | "rj" | "tm" | "tl" | "ur";
  title: string;
  setOpenLanguagesMenu: (value: boolean) => void;
}) => {
  const { setLanguage } = useLanguage();

  const handleLanguageChanges = (lang: "usa" | "fr" | "sp" | "ar" | "bn" | "br" | "gj" | "kn" | "ml" | "mn" | "mr" | "pn" | "rj" | "tm" | "tl" | "ur" ) => {
    setLanguage(lang);
    setOpenLanguagesMenu(false);
  };

  return (
    <button
      className="hover:text-primary p-2 rounded-md text-left w-full "
      onClick={() => handleLanguageChanges(lang)}
    >
      {title}
    </button>
  );
};

export default LanguageButton;
