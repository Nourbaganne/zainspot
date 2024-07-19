import profileDetails from '@/app/assets/profile-details/profileDetails.svg'
import Security from '@/app/assets/profile-details/Security.svg'
import payment from '@/app/assets/profile-details/payment.svg'
import Invoices from '@/app/assets/profile-details/Invoices.svg'
import notifications from '@/app/assets/profile-details/notifications.svg'
import services from '@/app/assets/profile-details/services.svg'
import cancelation from '@/app/assets/profile-details/cancelation.svg'
import paymentHistory from '@/app/assets/profile-details/paymentHistory.svg'

export const EDIT_PAGE_CARDS_DATA = [
    {logo: profileDetails,link:"profile-details", title: "Profile Details", description: "Provide personal details and how we can reach you"},
    {logo: Security,link:"login-security", title: "Login & Security", description: "Update your password and secure your account"},
    {logo: payment,link:"payment-details", title: "Payment Details", description: "Provide personal details and how we can reach you"},
    {logo: paymentHistory,link:"payment-history", title: "Payment History", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {logo: Invoices,link:"my-invoices", title: "My Invoices", description: "Manage taxpayer information and tax documents"},
    {logo: notifications,link:"zainspot-notifications", title: "ZainSpot Notifications", description: "Choose notification preferences and how you want to be contacted"},
    {logo: services,link:"subscribed-services", title: "Subscribed Services", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {logo: cancelation,link:"cancelation-policy", title: "Cancellation Policy TBD", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
]