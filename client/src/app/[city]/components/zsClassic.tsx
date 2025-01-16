import { MoneyValue } from '@/app/components/MoneyValue';
import Translation from '@/app/components/translation';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import City from '@/app/interfaces/City';
import { useState } from 'react';
import { SelectedItem } from '../[id]/page';
import PerMonth from '@/app/interfaces/PerMonth';

interface ClassicPrice {
	perMonth: PerMonth[];
}

interface ZSClassisProps {
	pricesData: ClassicPrice;
	onSelect: (args: any) => void;
	selectedItem: SelectedItem | null;
	isSubscribed: boolean;
}

const ZsClassic = ({
	pricesData,
	onSelect,
	selectedItem,
	isSubscribed,
}: ZSClassisProps) => {
	const { currency } = useCurrency();

	function isSubscribedToThisService(pm: PerMonth) {
		if (!pm) return false;

		return (
			isSubscribed &&
			selectedItem.duration == pm.duration &&
			selectedItem.amount == pm.amount &&
			selectedItem.optionType == 'classic'
		);
	}

	return (
		<div className='flex flex-col gap-4 border-2 rounded-md border-span-background px-8 py-7 '>
			<div className='flex flex-col'>
				<h1 className='font-sans font-semibold text-semibold-18 md:text-[28px]'>
					<Translation translationKey='locationDialog_classic' />
				</h1>
				<p className='font-sans font-extrabold leading-normal md:leading-[26.1px] uppercase text-primary'>
					<Translation translationKey='citypage_zg_classic_title' />
				</p>
			</div>
			<p
				className='font-sans text-description-foreground text-semibold-15 md:text-lg leading-[27px] tracking-wide'
				style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
			>
				<Translation translationKey='citypage_zg_classic_description' />
			</p>

			<h1 className=' font-bold text-bold-16 md:text-xl'>
				<Translation translationKey='citypage_cards_subtitle' />
			</h1>

			<div
				className={
					'flex justify-between items-center font-semibold text-semibold-14 md:text-semibold-18 capitalize py-4 ' +
					(!isSubscribed || isSubscribedToThisService(pricesData.perMonth[0])
						? ''
						: ' opacity-50')
				}
			>
				<div className='capitalize flex items-center gap-4'>
					<input
						type='radio'
						id='buy-classic-12'
						name='buy'
						className={
							'w-6 h-6 border-4 border-text-foreground text-primary focus:ring-primary'
						}
						checked={
							selectedItem != null &&
							selectedItem.optionType == 'classic' &&
							selectedItem.duration == 12
						}
						onClick={() => {
							onSelect({
								optionType: 'classic',
								duration: 12,
								amount: pricesData?.perMonth[0].amount,
								stripePriceId: pricesData?.perMonth.find(
									(p) => p.duration === 12,
								)?.stripePriceId,
							});
						}}
						onChange={() => { }}
						disabled={
							isSubscribed &&
							!isSubscribedToThisService(pricesData?.perMonth[0])
						}
					/>
					<label htmlFor='buy-classic-12'>
						<Translation translationKey='citypage_single_payment' />
					</label>
				</div>
				<div>
					<span className='text-primary text-lg'>
						<MoneyValue
							value={pricesData?.perMonth[0].amount}
							fromCurrency='USD'
							toCurrency={currency}
							decimals={0}
						/>
					</span>
				</div>

			</div>
			<div className='flex flex-col gap-4 px-4 capitalize'>
				<p className='font-normal text-sm'>
					<Translation translationKey='citypage_permonth' />
				</p>
				{pricesData?.perMonth
					.filter((month) => month.duration !== 12)
					.map((month, index) => (
						<div
							key={index}
							className={
								'flex justify-between font-semibold ' +
								(!isSubscribed || isSubscribedToThisService(month)
									? ''
									: 'opacity-50')
							}
						>
							<div className='flex items-center gap-4'>
								<input
									type='radio'
									id={'buy-classic-' + month.duration}
									name='buy'
									className='w-6 h-6 border-4 border-text-foreground text-primary focus:ring-primary'
									checked={
										selectedItem != null &&
										selectedItem.optionType == 'classic' &&
										selectedItem.duration == month.duration
									}
									onClick={() =>
										onSelect({
											optionType: 'classic',
											duration: month.duration,
											amount: month.amount,
											stripePriceId: month.stripePriceId,
										})
									}
									onChange={() => { }}
									disabled={isSubscribed && !isSubscribedToThisService(month)}
								/>
								<label htmlFor={'buy-classic-' + month.duration} className='flex gap-2'>
									{month?.duration}
									<span>
										<Translation translationKey={month?.duration === 1 ? 'monthly' : 'citypage_month'} />
									</span>
								</label>
							</div>

							<h1 className='text-primary'>
								<MoneyValue
									value={month?.amount}
									fromCurrency='USD'
									toCurrency={currency}
									decimals={0}
								/>
							</h1>
						</div>
					))}
			</div>
		</div>
	);
};

export default ZsClassic;
