import profileDetails from '@/app/assets/profile-details/profileDetails.svg'
import profileDetailsHovering from '@/app/assets/profile-details/profileDetailsHovering.svg'
import Security from '@/app/assets/profile-details/Security.svg'
import SecurityHovering from '@/app/assets/profile-details/SecurityHovering.svg'
import payment from '@/app/assets/profile-details/payment.svg'
import paymentHovering from '@/app/assets/profile-details/paymentHovering.svg'
import Invoices from '@/app/assets/profile-details/Invoices.svg'
import InvoicesHovering from '@/app/assets/profile-details/InvoicesHovering.svg'
import notifications from '@/app/assets/profile-details/notifications.svg'
import notificationsHovering from '@/app/assets/profile-details/notificationsHovering.svg'
import services from '@/app/assets/profile-details/services.svg'
import servicesHovering from '@/app/assets/profile-details/servicesHovering.svg'
import cancelation from '@/app/assets/profile-details/cancelation.svg'
import cancelationHovering from '@/app/assets/profile-details/cancelationHovering.svg'
import paymentHistory from '@/app/assets/profile-details/paymentHistory.svg'
import paymentHistoryHover from '@/app/assets/profile-details/paymentHistoryHover.svg'

export const EDIT_PAGE_CARDS_DATA = [
    { logo: profileDetails, hoverLogo: profileDetailsHovering, link: "profile-details", title: "editProfile_ProfileDetails", description: "Provide personal details and how we can reach you" },
    { logo: Security, hoverLogo: SecurityHovering, link: "login-security", title: "editProfile_Login_Security", description: "Update your password and secure your account" },
    { logo: payment, hoverLogo: paymentHovering, link: "payment-details", title: "editProfile_Payment_details", description: "Provide personal details and how we can reach you" },
    { logo: paymentHistory, hoverLogo: paymentHistoryHover, link: "payment-history", title: "editProfile_Payment_history", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { logo: Invoices, hoverLogo: InvoicesHovering, link: "my-invoices", title: "editProfile_Invoices", description: "Manage taxpayer information and tax documents" },
    { logo: notifications, hoverLogo: notificationsHovering, link: "zainspot-notifications", title: "editProfile_notifications", description: "Choose notification preferences and how you want to be contacted" },
    { logo: services, hoverLogo: servicesHovering, link: "subscribed-services", title: "editProfile_services", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { logo: cancelation, hoverLogo: cancelationHovering, link: "cancellation-policy", title: "editProfile_cancellation", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
]