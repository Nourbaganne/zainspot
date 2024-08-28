'use client';

import { FaSearch } from 'react-icons/fa';
import Container from '../components/Container';
import { FiMinus, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

interface Faq {
	question: string;
	answer: string;
}

const originalFaqs: Faq[] = [
	{
		question: 'How does billing work?',
		answer:
			'Plans are per city and per subscriptions type: Zs Gold or ZS Silver',
	},
	{
		question: 'How can I change my account email?',
		answer:
			'You can log in to your account and change it by following these steps: Go to My ZainSpot > Profile Details and in the Business section, change your business email',
	},
	{
		question: 'Do you provide tutorials?',
		answer:
			"Not yet, but we're working on it! In the meantine, we've done our best to make it intuitive and we're building our documentation page.",
	},
	{
		question: 'How does billing work?',
		answer:
			'Plans are per city and per subscriptions type: Zs Gold or ZS Silver',
	},
	{
		question: 'What is your cancellation policy?',
		answer:
			"We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
	},
	{
		question: 'What is your cancellation policy?',
		answer:
			"We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
	},
	{
		question: 'How does billing work?',
		answer:
			'Plans are per city and per subscriptions type: Zs Gold or ZS Silver',
	},
	// Add 2 more FAQs
	{
		question: 'How can I change my account email?',
		answer:
			'You can log in to your account and change it by following these steps: Go to My ZainSpot > Profile Details and in the Business section, change your business email',
	},
	{
		question: 'Do you provide tutorials?',
		answer:
			"Not yet, but we're working on it! In the meantine, we've done our best to make it intuitive and we're building our documentation page.",
	},
	{
		question: 'What is your cancellation policy?',
		answer:
			"We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
	},
];

export default function FaqPage() {
	const [searchText, setSearchText] = useState('');
	const [faqs, setFaqs] = useState<Faq[]>(originalFaqs);

	function handleSearchTextChange(text: string) {
		setSearchText(text);

		if (!text) {
			setFaqs(originalFaqs);
			return;
		}

		setFaqs(
			originalFaqs.filter((faq) => {
				const question = faq.question.toLowerCase();
				const answer = faq.answer.toLowerCase();
				const searchTextLower = text.toLowerCase();
				return (
					question.includes(searchTextLower) || answer.includes(searchTextLower)
				);
			}),
		);
	}

	return (
		<Container
			breadcrumbItems={[
				{ label: 'Home', href: '/' },
				{ label: 'FAQ', href: '/' },
			]}
			className='p-0'
		>
			<div>
				<div className='text-center p-6 pb-12'>
					<h1 className='text-3xl font-extrabold'>
						Frequently Asked Questions
					</h1>
					<p className='mt-3 text-md text-gray-500 max-w-3xl mx-auto'>
						Stuck on something? We’re here to help with all your questions and
						answers in one place.
					</p>
					{/* Search bar */}
					<div className='mt-8 px-4 form-control bg-white max-w-2xl mx-auto flex items-center gap-0'>
						<FiSearch className='h-6 w-6 text-gray-300' />
						<input
							className='border-none outline-none w-full py-1 placeholder-gray-400 focus:ring-0 focus:placeholder-transparent'
							placeholder='Search'
							value={searchText}
							onChange={(e) => handleSearchTextChange(e.target.value)}
						/>
					</div>
				</div>
				<div className='bg-white px-6 pt-8 pb-12'>
					<div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-8'>
						{/* FAQ Cards */}
						{faqs.map((faq, index) => (
							<div key={index} className='p-6 border-b border-gray-400'>
								<div className='flex items-center justify-between'>
									<h2 className='text-xl font-bold flex-grow'>
										{faq.question}
									</h2>
									<FiMinus className='h-6 w-6 text-gray-700' />
								</div>
								<p className='mt-4 text-gray-400'>{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
