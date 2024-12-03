import { useCookieConsent } from "./useCookieConsent";

const CookieBanner = () => {
  const { isConsentGiven, giveConsent } = useCookieConsent();

  if (isConsentGiven) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <span>This site uses cookies to improve your experience.</span>
      <button
        onClick={giveConsent}
        className="bg-primary px-4 py-2 rounded"
      >
        Accept Cookies
      </button>
    </div>
  );
};

export default CookieBanner;
