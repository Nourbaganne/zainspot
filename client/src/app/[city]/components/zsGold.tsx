'use client';

import { MoneyValue } from '@/app/components/MoneyValue';
import Translation from '@/app/components/translation';
import { useCart } from '@/app/contexts/CartContext';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import City from '@/app/interfaces/City';

interface ZSGoldProps {
	amount: number;
	onSelect: (args: any) => void;
	city: City;
}

const ZsGold = ({ amount, onSelect, city }: ZSGoldProps) => {
	const { state } = useCart();

	const { currency } = useCurrency();
	return (
		<div className='flex flex-col gap-4 border-2 font-sans rounded-md border-secondary  px-2 py-4'>
			<div className='flex flex-col'>
				<div className='flex justify-between items-center'>
					<h1 className='font-sans font-semibold text-semibold-24 md:text-[36px]'>
						ZS Gold
					</h1>
					<h1
						className='font-sans font-extrabold text-[18px] md:text-bold-italic-22 italic  text-alert uppercase'
						style={{ letterSpacing: '-0.01em' }}
					>
						<Translation translationKey='citypage_zg_gold_alert' />
					</h1>
				</div>
				<p className='font-sans font-extrabold leading-normal md:leading-[26.1px] uppercase text-primary'>
					<Translation translationKey='citypage_zg_gold_title' />
				</p>
			</div>

			<p
				className='font-sans font-semibold text-semibold-15 md:text-lg leading-[27px] tracking-wide'
				style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
			>
				<Translation translationKey='citypage_zg_gold_description' />
			</p>

			<h1 className='text-center font-bold text-bold-16 md:text-xl'>
				<Translation translationKey='citypage_cards_subtitle' />
			</h1>

			<div className='flex justify-between items-center font-semibold text-sm md:text-semibold-18'>
				<div className='w-1/3 capitalize'>
					<Translation translationKey='citypage_single_payment' />
				</div>
				<div>
					<span className='text-primary text-lg'>
						<MoneyValue
							value={amount}
							fromCurrency='USD'
							toCurrency={currency}
							decimals={0}
						/>
					</span>
				</div>
				<div className='ml-4 flex items-center gap-2'>
					<input
						type='radio'
						id='buy-gold'
						name='buy'
						className='w-6 h-6 border-4 border-text-foreground text-primary  focus:ring-primary'
						checked={state.items.some(
							(item) => item.optionType == 'gold' && item.cityId == city.id,
						)}
						onClick={() =>
							onSelect({ amount, optionType: 'gold', duration: 12 })
						}
						onChange={() => {}}
					/>
					<label htmlFor='buy-gold'>
						<Translation translationKey='citypage_radio_label' />
					</label>
				</div>
			</div>
		</div>
	);
};

export default ZsGold;
