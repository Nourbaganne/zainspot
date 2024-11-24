import { CityProps } from '@/app/constants/owner-location';
import hiddenLogo from '@/app/assets/owner/locations/hidden-logo.svg';
import unhiddenLogo from '@/app/assets/owner/locations/eye-outline.svg';
import deleteLogo from '@/app/assets/owner/locations/trash-outline.svg';
import editLogo from '@/app/assets/owner/locations/edit-outline.svg';
import Image from 'next/image';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';
import { useHideCity } from '@/app/lib/useHideCity';
import { useContext, useState } from 'react';
import DeleteDialog from './deleteDialog';
import Dialog from './dialog';
import Translation from '@/app/components/translation';
import { AuthContext } from '@/app/contexts/authContext';
import toast from 'react-hot-toast';
import { hasAccess } from '@/app/lib/hasAccess';

const CityItem = ({
	id,
	city,
	country,
	location,
	goldPrice,
	classicPrice,
	hidden,
}: CityProps) => {
	const { user } = useContext(AuthContext);
	const { currency } = useCurrency();
	const { mutate: hideCity } = useHideCity();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleHideCity = () => {
		hideCity({ id, hidden });
	};

	const handleDialogOpening = async () => {
		if (hasAccess(user?.user.role.permissions, 'update:city')) {
			setIsEditDialogOpen(true);
			return;
		}
		toast.error('Access Denied!');
	};
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 py-4 px-2 border-b'>
			<div className='col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 text-sm gap-4'>
				<h1 className='col-span-1 md:col-span-2 font-light'>
					{location.title}
				</h1>
				<div className='col-span-1 md:col-span-2 flex flex-col'>
					<h1 className='font-semibold'>{city}</h1>
					<p className='font-light text-span'>{country}</p>
				</div>
				{/* Gold Price Section */}
				<div className="col-span-1 md:col-span-2 flex flex-col justify-between">
					<div className="flex flex-col gap-2">
						<h1 className="text-xs font-semibold">
							<Translation translationKey='location_yearPayment' />
						</h1>
						<div className="flex gap-8">
							<p className="font-light text-span">
								<Translation translationKey='location_yearLabel' />
							</p>
							<span className="text-primary font-semibold">
								<MoneyValue value={goldPrice?.amount} fromCurrency="USD" toCurrency={currency} decimals={0} />
							</span>
						</div>
					</div>
					{/* Tax Section */}
					<div className="flex flex-col gap-2">
						<h1 className="text-xs font-semibold text-alert-dark">
							<Translation translationKey='location_manuelPayment' />
						</h1>
						<div className="flex gap-8">
							<p className="font-light text-span">
								<Translation translationKey='location_yearLabel' />
							</p>
							<span className="text-alert-dark font-semibold">
								<MoneyValue value={goldPrice?.tax} fromCurrency="USD" toCurrency={currency} decimals={0} />
							</span>
						</div>
					</div>
				</div>
				{/* Classic Price Section */}
				<div className="col-span-1 md:col-span-3 flex flex-col gap-4 max-w-full">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<h1 className="text-xs font-semibold">
								<Translation translationKey='citypage_single_payment' />
							</h1>
							<h1 className="text-xs font-semibold text-alert-dark">
								<Translation translationKey='locationDialog_tax' />
							</h1>
						</div>
						<div className="flex justify-between">
							<p className="text-span font-light">
								<Translation translationKey='location_yearLabel' />
							</p>
							<span className="text-primary font-semibold">
								<MoneyValue value={classicPrice.perMonth[0].amount} fromCurrency="USD" toCurrency={currency} decimals={0} />
							</span>
							<span className="text-alert-dark font-semibold">
								<MoneyValue value={classicPrice.perMonth[0].tax} fromCurrency="USD" toCurrency={currency} decimals={0} />
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<h1 className="text-xs font-semibold">
								<Translation translationKey='citypage_permonth' />
							</h1>
							<h1 className="text-xs font-semibold text-alert-dark">
								<Translation translationKey='locationDialog_tax' />

							</h1>
						</div>
						{classicPrice?.perMonth
							.filter(month => month.duration !== 12)
							.map((month, index) => (
								<div key={index} className="flex justify-between">
									<p className="text-span font-light">{`${month.duration} Months:`}</p>
									<span className="font-semibold text-primary">
										<MoneyValue value={month?.amount} fromCurrency="USD" toCurrency={currency} decimals={0} />
									</span>
									<span className="text-alert-dark font-semibold">
										<MoneyValue value={month?.tax} fromCurrency="USD" toCurrency={currency} decimals={0} />
									</span>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className=' col-span-10 mt-5 lg:mt-0 lg:-col-start-1 flex flex-col gap-3 items-end text-xs font-semibold'>
				<div className='flex flex-row gap-1'>
					<button
						onClick={() => handleDialogOpening()}
						className='flex items-center gap-2 text-span py-2 px-4 border-2 border-span rounded-md'
					>
						<Image src={editLogo} alt="edit-city" />
						<Translation translationKey='location_editBtn' />
					</button>
					<button onClick={handleHideCity}>
						<div className='flex items-center gap-2 text-span py-2 px-4 border-2 border-span rounded-md'>
							<Image
								src={hidden ? unhiddenLogo : hiddenLogo}
								alt={hidden ? 'unhide-city' : 'hide-city'}
								className='w-4'
							/>
							{hidden ? 'Unhide' : 'Hide'}
						</div>
					</button>
				</div>
				<button
					onClick={() => setIsDialogOpen(true)}
					className='flex items-center gap-2 text-alert-dark'
				>
					<Image src={deleteLogo} alt="delete-city" />
					<Translation translationKey='location_deleteBtn' />
				</button>
			</div>

			{isEditDialogOpen && (
				<Dialog
					isOpen={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
					isEdit={true}
					id={id}
				/>
			)}
			{isDialogOpen && (
				<DeleteDialog id={id} setIsDialogOpen={setIsDialogOpen} />
			)}
		</div>
	);
};

export default CityItem;