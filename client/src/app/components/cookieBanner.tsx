import { useCookieConsent } from "../lib/useCookieConsent";
import { MdOutlineCookie } from "react-icons/md";
import { trackVisitor } from "../lib/trackVisitor";

const CookieBanner = () => {
  const { isConsentGiven, giveConsent } = useCookieConsent();

  const handleAccept = async () => {
    giveConsent();
    await trackVisitor();
  };

  if (isConsentGiven === null || isConsentGiven) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-20">
      <span>This site uses cookies to improve your experience.</span>
      <button
        onClick={handleAccept}
        className="flex justify-center items-center gap-1 bg-primary px-4 py-2 rounded"
      >
        <MdOutlineCookie size={20} />
        Accept Cookies
      </button>
    </div>
  );
};

export default CookieBanner;
