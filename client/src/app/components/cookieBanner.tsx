import { useCookieConsent } from "../lib/useCookieConsent";
import { MdOutlineCookie } from "react-icons/md";
import { trackVisitor } from "../lib/trackVisitor";
import Translation from "./translation";

const CookieBanner = () => {
  const { isConsentGiven, giveConsent } = useCookieConsent();

  const handleAccept = async () => {
    giveConsent();
    await trackVisitor();
  };

  if (isConsentGiven === null || isConsentGiven) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <span>
        <Translation translationKey="cookies_desc" />
      </span>
      <button
        onClick={handleAccept}
        className="flex justify-center items-center gap-1 bg-primary px-4 py-2 rounded"
      >
        <MdOutlineCookie size={20} />
        <Translation translationKey="cookies_btn" />
      </button>
    </div>
  );
};

export default CookieBanner;
