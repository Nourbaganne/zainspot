'use client';

import { FaSearch } from 'react-icons/fa';
import Container from '../components/Container';
import { FiMinus, FiSearch } from 'react-icons/fi';
import { IoChevronDownOutline, IoChevronUp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Translation from '../components/translation';

interface Faq {
	question: string;
	answer: string;
}

interface Steps {
	title: string;
	body: Faq[];
}

const originalSteps: Steps[] = [
	{
		title: "faq_gettingStarted",
		body: [
			{
				question: "faq_gettingStarted_benefitsQuestion",
				answer: "faq_gettingStarted_benefitsAnswer"
			},
			{
				question: "faq_gettingStarted_citiesQuestion",
				answer: "faq_gettingStarted_citiesAnswer"
			},
			{
				question: "faq_gettingStarted_membersQuestion",
				answer: "faq_gettingStarted_membersAnswer"
			},
			{
				question: "faq_gettingStarted_zainspotQuestion",
				answer: "faq_gettingStarted_zainspotAnswer"
			},
			{
				question: "faq_gettingStarted_zainspotterQuestion",
				answer: "faq_gettingStarted_zainspotterAnswer"
			},
			{
				question: "faq_gettingStarted_internationLocationQuestion",
				answer: "faq_gettingStarted_internationLocationAnswer"
			},
		]
	},
	{
		title: "faq_zainspotServices",
		body: [
			{
				question: "faq_zainpsotServices_workingQuestion",
				answer: "faq_zainpsotServices_workingAnswer",
			},
			{
				question: "faq_zainspotServices_outZainspotQuestion",
				answer: "faq_zainspotServices_outZainspotAnswer",
			},
			{
				question: "faq_zainspotServices_mailsQuestion",
				answer: "faq_zainspotServices_mailsAnswer",
			},
			{
				question: "faq_zainspotServices_phoneQuestion",
				answer: "faq_zainspotServices_phoneAnswer",
			},
			{
				question: "faq_zainspotServices_renewQuestion",
				answer: "faq_zainspotServices_renewAnwser",
			},
			{
				question: "faq_zainspotServices_cityQuestion",
				answer: "faq_zainspotServices_cityAnswer",
			}
		]
	},
	{
		title: "faq_security",
		body: [
			{
				question: "faq_security_zainspotQuestion",
				answer: "faq_security_zainspotAnswer",
			},
		]
	},
	{
		title: "faq_fees",
		body: [
			{
				question: "faq_fees_zainspotQuestion",
				answer: "faq_fees_zainspotAnswer"
			},
			{
				question: "faq_fees_extraFeesQuestion",
				answer: "faq_fees_extraFeesAnswer"
			},
			{
				question: "faq_fees_cancellationQuestion",
				answer: "faq_fees_cancellationAnswer"
			},
			{
				question: "faq_fees_helpsQuestion",
				answer: "faq_fees_helpsAnswer"
			},
		]
	}
]

export default function FaqPage() {
	const { t } = useTranslation();
	const [searchText, setSearchText] = useState('');
	const [steps, setSteps] = useState<Steps[]>(originalSteps);
	const [openAnswers, setOpenAnswers] = useState<{ [key: string]: boolean }>({});

	function handleSearchTextChange(text: string) {
		setSearchText(text);
	  
		if (!text) {
		  setSteps(originalSteps);
		  return;
		}
	  
		const searchTextLower = text.toLowerCase(); // Lowercase search text
	  
		setSteps(
		  originalSteps.filter((step) => {
			// Get translated title and convert to lowercase
			const titleText = t(step.title).toLowerCase();
			const titleMatch = titleText.includes(searchTextLower);
	  
			// Check each FAQ question and answer
			const bodyMatch = step.body.some((faq) => {
			  // Get translated question and answer, then convert to lowercase
			  const questionText = t(faq.question).toLowerCase();
			  const answerText = t(faq.answer).toLowerCase();
	  
			  return (
				questionText.includes(searchTextLower) ||
				answerText.includes(searchTextLower)
			  );
			});
	  
			return titleMatch || bodyMatch;
		  })
		);
	  }
	  

	const toggleAnswer = (stepIndex: number, faqIndex: number) => {
		setOpenAnswers(prevState => ({
			...prevState,
			[`${stepIndex}-${faqIndex}`]: !prevState[`${stepIndex}-${faqIndex}`]
		}))
	}

	return (
		<div>
			<div className='text-center p-6 pb-12'>
				<h1 className='text-3xl font-extrabold text-primary'>
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
				<div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-12 lg:gap-y-3'>
					{steps.map((step, index) => (
						<div key={index} className="flex flex-col space-y-4">
							<h1 className='text-semibold-24 font-semibold text-primary'>
								<Translation translationKey={step.title} />
							</h1>
							{step.body.map((faq, faqIndex) => (
								<div key={faqIndex} className='py-2 border-b border-gray-400'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg italic font-semibold flex-grow text-span'>
											<Translation translationKey={faq.question} />
										</h2>
										{openAnswers[`${index}-${faqIndex}`] ? (
											<IoChevronDownOutline
												className='h-6 w-6 text-primary cursor-pointer'
												onClick={() => toggleAnswer(index, faqIndex)}
											/>
										) : (
											<IoChevronUp
												className='h-6 w-6 text-primary cursor-pointer'
												onClick={() => toggleAnswer(index, faqIndex)}
											/>
										)}
									</div>

									{openAnswers[`${index}-${faqIndex}`] && (
										<p className='mt-4 text-gray-400 transition-all duration-300 ease-in-out'>
											<Translation translationKey={faq.answer} />
										</p>
									)}
								</div>
							))}
						</div>
					))}
				</div>


			</div>
		</div>
	);
}
