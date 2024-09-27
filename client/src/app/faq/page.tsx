'use client';

import { FaSearch } from 'react-icons/fa';
import Container from '../components/Container';
import { FiMinus, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import Translation from '../components/translation';

interface Faq {
	question: string;
	answer: string;
}

const originalFaqs: Faq[] = [
	{
		question: 'faqPage_billing_question',
		answer:
			'faqPage_billing_answer',
	},
	{
		question: 'faqPage_emailChanging_question',
		answer:
			'faqPage_emailChanging_question',
	},
	{
		question: 'faqPage_tutorials_question',
		answer:
			"faqPage_tutorials_answer",
	},
	{
		question: 'faqPage_billing_question',
		answer:
			'faqPage_billing_answer',
	},
	{
		question: 'faqPage_cancellation_question',
		answer:
			"faqPage_cancellation_answer",
	},
	{
		question: 'faqPage_cancellation_question',
		answer:
			"faqPage_cancellation_answer",
	},
	{
		question: 'faqPage_billing_question',
		answer:
			'faqPage_billing_answer',
	},
	// Add 2 more FAQs
	{
		question: 'faqPage_emailChanging_question',
		answer:
			'faqPage_emailChanging_question',
	},
	{
		question: 'faqPage_tutorials_question',
		answer:
			"faqPage_tutorials_answer",
	},
	{
		question: 'faqPage_cancellation_question',
		answer:
			"faqPage_cancellation_answer",
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
				{ label: 'breadcrumb_home', href: '/' },
				{ label: 'footer_title_faq' },
			]}
			className='p-0'
		>
			<div>
				<div className='text-center p-6 pb-12'>
					<h1 className='text-3xl font-extrabold'>
						<Translation translationKey='faqPage_header' />
					</h1>
					<p className='mt-3 text-md text-gray-500 max-w-3xl mx-auto'>
						<Translation translationKey='faqPage_desc' />
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

										<Translation translationKey={faq.question} />
									</h2>
									<FiMinus className='h-6 w-6 text-gray-700' />
								</div>
								<p className='mt-4 text-gray-400'>
									<Translation translationKey={faq.answer} />
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
