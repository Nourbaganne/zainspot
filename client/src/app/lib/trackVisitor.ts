import Cookies from "js-cookie";
import axiosInstance from "./axios/axiosInstance";

export const trackVisitor = async () => {
    const visitorId = Cookies.get("visitorId");
    const cookieConsent = localStorage.getItem("cookieConsent");

    if (!cookieConsent || cookieConsent !== "true") return;

    if (!visitorId) {
        const newVisitorId = crypto.randomUUID();
        Cookies.set("visitorId", newVisitorId, { expires: 365 });

        await axiosInstance.post("/visitor", { visitorId: newVisitorId })
    }
};
