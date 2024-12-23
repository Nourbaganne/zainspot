interface FooterDataInterface {
	translationKey: string;
	sections: { translationKey: string; link: string }[];
}

export const FOOTER_DATA: FooterDataInterface[] = [
	{
		translationKey: 'footer_title_zainspotters',
		sections: [
			{ translationKey: 'footer_title_join', link: '/register' },
			{ translationKey: 'footer_title_login', link: '/login' },
			{ translationKey: 'footer_title_gotomyzainspot', link: '/zainspotter' },
		],
	},
	{
		translationKey: 'footer_title_about',
		sections: [
			{ translationKey: 'footer_title_howitworks', link: '/how-it-works' },
			{ translationKey: 'footer_title_zainspotmission', link: '/zainspotMission' },
		],
	},
	{
		translationKey: 'footer_title_connect',
		sections: [
			{ translationKey: 'footer_title_contact', link: '/contact' },
			{ translationKey: 'footer_title_faq', link: '/contact#faq' },
		],
	},
	{
		translationKey: 'footer_title_termsofuse',
		sections: [
			{ translationKey: 'footer_title_termsofuse', link: '/terms' },
			{ translationKey: 'footer_title_privacypolicy', link: '/privacypolicy' },
		],
	},
];
