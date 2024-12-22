import Translation from "../components/translation";
import { useCookieConsent } from "./useCookieConsent";

const CookieBanner = () => {
  const { isConsentGiven, giveConsent } = useCookieConsent();

  if (isConsentGiven) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <span>
        <Translation translationKey="cookies_span" />
      </span>
      <button
        onClick={giveConsent}
        className="bg-primary px-4 py-2 rounded"
      >
        <Translation translationKey="cookies_accept" />
      </button>
    </div>
  );
};

export default CookieBanner;
