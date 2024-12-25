import profileDetails from '../assets/profile-details/profileDetails.svg';
import profileDetailsHovering from '../assets/profile-details/profileDetailsHovering.svg';
import Security from '../assets/profile-details/Security.svg';
import SecurityHovering from '../assets/profile-details/SecurityHovering.svg';
import payment from '../assets/profile-details/payment.svg';
import paymentHovering from '../assets/profile-details/paymentHovering.svg';
import Invoices from '../assets/profile-details/Invoices.svg';
import InvoicesHovering from '../assets/profile-details/InvoicesHovering.svg';
import notifications from '../assets/profile-details/notifications.svg';
import notificationsHovering from '../assets/profile-details/notificationsHovering.svg';
import services from '../assets/profile-details/services.svg';
import servicesHovering from '../assets/profile-details/servicesHovering.svg';
import cancelation from '../assets/profile-details/cancelation.svg';
import cancelationHovering from '../assets/profile-details/cancelationHovering.svg';
import paymentHistory from '../assets/profile-details/paymentHistory.svg';
import paymentHistoryHover from '../assets/profile-details/paymentHistoryHover.svg';
import reportsIcon from '../assets/owner/reportsIcon.svg';
import reportsHover from '../assets/owner/reportsHover.svg';
import userIcon from '../assets/owner/userIcon.svg';
import userHover from '../assets/owner/userHover.svg';
import locationLogo from '../assets/owner/location-outline.svg';
import locationHover from '../assets/owner/locationHover.svg';

export const ZAINSPOTTER_DASHBOARD = [
	{
		logo: profileDetails,
		hoverLogo: profileDetailsHovering,
		link: 'profile-details',
		title: 'editProfile_ProfileDetails',
		description: 'Provide personal details and how we can reach you',
	},
	{
		logo: Security,
		hoverLogo: SecurityHovering,
		link: 'login-security',
		title: 'editProfile_Login_Security',
		description: 'Update your password and secure your account',
	},
	{
		logo: payment,
		hoverLogo: paymentHovering,
		link: 'payment-details',
		title: 'editProfile_Payment_details',
		description: 'Provide personal details and how we can reach you',
	},
	{
		logo: paymentHistory,
		hoverLogo: paymentHistoryHover,
		link: 'payment-history',
		title: 'editProfile_Payment_history',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		logo: Invoices,
		hoverLogo: InvoicesHovering,
		link: 'my-invoices',
		title: 'editProfile_Invoices',
		description: 'Manage taxpayer information and tax documents',
	},
	{
		logo: notifications,
		hoverLogo: notificationsHovering,
		link: 'zainspot-notifications',
		title: 'editProfile_notifications',
		description:
			'Choose notification preferences and how you want to be contacted',
	},
	{
		logo: services,
		hoverLogo: servicesHovering,
		link: 'subscribed-services',
		title: 'editProfile_services',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		logo: cancelation,
		hoverLogo: cancelationHovering,
		link: 'cancellation-policy',
		title: 'editProfile_cancellation',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
];

export const OWNER_DASHBOARD = [
	{
		logo: reportsIcon,
		hoverLogo: reportsHover,
		link: 'reports',
		title: 'ownerDashboard_reports',
		description: 'ownerDashboard_reports_desc',
		resource: 'reports',
	},
	{
		logo: userIcon,
		hoverLogo: userHover,
		link: 'users',
		title: 'ownerDashboard_users',
		description: 'ownerDashboard_users_desc',
		resource: 'user',
	},
	{
		logo: locationLogo,
		hoverLogo: locationHover,
		link: 'locations',
		title: 'ownerDashboard_location',
		description: 'ownerDashboard_location_desc',
		resource: 'city',
	},
];
