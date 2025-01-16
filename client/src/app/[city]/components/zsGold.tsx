'use client';

import { MoneyValue } from '@/app/components/MoneyValue';
import Translation from '@/app/components/translation';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import PerMonth from '@/app/interfaces/PerMonth';

interface ZSGoldProps {
	priceData: PerMonth;
	onSelect: (args: any) => void;
	isSubscribed: boolean;
	selectedItem: {
		optionType: string;
		duration: number;
		stripePriceId: string;
		amount: number;
	} | null;
}

const ZsGold = ({
	priceData,
	onSelect,
	selectedItem,
	isSubscribed,
}: ZSGoldProps) => {
	function isSubscribedToThisService() {
		return isSubscribed && selectedItem?.optionType == 'gold';
	}

	const { currency } = useCurrency();
	return (
		<div className='flex flex-col gap-4 border-2 font-sans rounded-md border-span-background px-8 py-7'>
			<div className='flex flex-col'>
				<div className='flex gap-2 items-center'>
					<h1 className='font-sans font-semibold text-semibold-18 md:text-[28px]'>
						<Translation translationKey='locationDialog_gold' />
					</h1>
					<h1
						className='font-sans font-bold text-[16px] md:text-xl  text-alert uppercase'
						style={{ letterSpacing: '-0.01em' }}
					>
						<Translation translationKey='citypage_zg_gold_alert' />
					</h1>
				</div>
				<p className='font-sans font-bold leading-normal md:leading-[26.1px] uppercase text-primary'>
					<Translation translationKey='citypage_zg_gold_title' />
				</p>
			</div>

			<p
				className='font-sans text-description-foreground text-semibold-15 md:text-lg leading-[27px] tracking-wide'
				style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
			>
				<Translation translationKey='citypage_zg_gold_description' />
			</p>

			<h1 className=' font-bold text-bold-16 md:text-xl'>
				<Translation translationKey='citypage_cards_subtitle' />
			</h1>

			<div
				className={
					'flex justify-between items-center font-semibold text-sm md:text-semibold-18 pt-3 capitalize ' +
					(!isSubscribed || isSubscribedToThisService() ? '' : 'opacity-50')
				}
			>
				<div className='capitalize flex items-center gap-2'>
					<input
						type='radio'
						id='buy-gold'
						name='buy'
						className='w-6 h-6 border-4 border-text-foreground text-primary  focus:ring-primary'
						checked={selectedItem != null && selectedItem.optionType == 'gold'}
						onClick={() =>
							onSelect({
								amount: priceData.amount,
								optionType: 'gold',
								duration: 12,
								stripePriceId: priceData.stripePriceId,
							})
						}
						onChange={() => { }}
						disabled={isSubscribed && !isSubscribedToThisService()}
					/>
					<label htmlFor='buy-gold' className='w-full'>
						<Translation translationKey='citypage_single_payment' />
					</label>
				</div>
				<div>
					<span className='text-primary text-lg'>
						<MoneyValue
							value={priceData.amount}
							fromCurrency='USD'
							toCurrency={currency}
							decimals={0}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ZsGold;
