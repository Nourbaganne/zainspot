import profileDetails from '@/app/assets/profile-details/profileDetails.svg'
import Security from '@/app/assets/profile-details/Security.svg'
import payment from '@/app/assets/profile-details/payment.svg'
import Invoices from '@/app/assets/profile-details/Invoices.svg'
import notifications from '@/app/assets/profile-details/notifications.svg'
import services from '@/app/assets/profile-details/services.svg'
import cancelation from '@/app/assets/profile-details/cancelation.svg'
import paymentHistory from '@/app/assets/profile-details/paymentHistory.svg'

export const EDIT_PAGE_CARDS_DATA = [
    {logo: profileDetails,link:"profile-details", title: "editProfile_ProfileDetails", description: "Provide personal details and how we can reach you"},
    {logo: Security,link:"login-security", title: "editProfile_Login_Security", description: "Update your password and secure your account"},
    {logo: payment,link:"payment-details", title: "editProfile_Payment_details", description: "Provide personal details and how we can reach you"},
    {logo: paymentHistory,link:"payment-history", title: "editProfile_Payment_history", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {logo: Invoices,link:"my-invoices", title: "editProfile_Invoices", description: "Manage taxpayer information and tax documents"},
    {logo: notifications,link:"zainspot-notifications", title: "editProfile_notifications", description: "Choose notification preferences and how you want to be contacted"},
    {logo: services,link:"subscribed-services", title: "editProfile_services", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {logo: cancelation,link:"cancelation-policy", title: "editProfile_cancellation", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
]