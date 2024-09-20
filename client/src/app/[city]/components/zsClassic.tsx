import { MoneyValue } from '@/app/components/MoneyValue';
import Translation from '@/app/components/translation';
import { useCart } from '@/app/contexts/CartContext';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { useState } from 'react';

interface ClassicPrice {
	perMonth: Array<{
		duration?: number;
		amount: number;
		tax?: number;
		stripePriceId: string;
	}>;
}

interface ZSClassisProps {
	amounts: ClassicPrice;
	onSelect: (args: any) => void;
}

const ZsClassic = ({ amounts, onSelect }: ZSClassisProps) => {
	const { state } = useCart();
	const { currency } = useCurrency();

	return (
		<div className='flex flex-col gap-4 border-2 rounded-md border-secondary px-2 py-4 '>
			<div className='flex flex-col'>
				<h1 className='font-sans font-semibold text-semibold-24 md:text-[36px]'>
					ZS Classic
				</h1>
				<p className='font-sans font-extrabold leading-normal md:leading-[26.1px] uppercase text-primary'>
					<Translation translationKey='citypage_zg_classic_title' />
				</p>
			</div>
			<p
				className='font-sans font-semibold text-semibold-15 md:text-lg leading-[27px] tracking-wide'
				style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
			>
				<Translation translationKey='citypage_zg_classic_description' />
			</p>

			<h1 className='text-center font-bold text-bold-16 md:text-xl'>
				<Translation translationKey='citypage_cards_subtitle' />
			</h1>

			<div className='flex justify-between items-center font-semibold text-semibold-14 md:text-semibold-18'>
				<div className='capitalize w-1/3'>
					<Translation translationKey='citypage_single_payment' />
				</div>
				<div>
					<span className='text-primary text-lg'>
						<MoneyValue
							value={amounts?.perMonth[0].amount}
							fromCurrency='USD'
							toCurrency={currency}
							decimals={0}
						/>
					</span>
				</div>
				<div className='flex items-center gap-4 pr-1'>
					<input
						type='radio'
						id='buy-classic-12'
						name='buy'
						className='w-6 h-6 border-4 border-text-foreground text-primary focus:ring-primary'
						checked={state.items.some(
							(item) => item.optionType == 'classic' && item.duration == 12,
						)}
						onClick={() =>
							onSelect({
								optionType: 'classic',
								duration: 12,
								amount: amounts?.perMonth[0].amount,
							})
						}
					/>
					<label htmlFor='buy-classic-12'>
						<Translation translationKey='citypage_radio_label' />
					</label>
				</div>
			</div>
			<div className='flex flex-col gap-4 px-4'>
				<p className='font-normal text-sm text-center'>
					<Translation translationKey='citypage_permonth' />
				</p>
				{amounts?.perMonth
					.filter((month) => month.duration !== 12)
					.map((month, index) => (
						<div key={index} className='flex justify-between font-semibold'>
							<h1>
								{month?.duration}
							</h1>
							<h1 className='text-primary'>
								<MoneyValue
									value={month?.amount}
									fromCurrency='USD'
									toCurrency={currency}
									decimals={0}
								/>
							</h1>
							<div className='flex items-center gap-4'>
								<input
									type='radio'
									id={'buy-classic-' + month.duration}
									name='buy'
									className='w-6 h-6 border-4 border-text-foreground text-primary focus:ring-primary'
									checked={state.items.some(
										(item) =>
											item.optionType == 'classic' &&
											item.duration == month.duration,
									)}
									onClick={() =>
										onSelect({
											optionType: 'classic',
											duration: month.duration,
											amount: month.amount,
										})
									}
								/>
								<label htmlFor={'buy-classic-' + month.duration}>
									<Translation translationKey='citypage_radio_label' />
								</label>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ZsClassic;
