'use client';

import Link from 'next/link';
import Image from 'next/image';
import breadcrumbIcon from '@/app/assets/zainspotter/breadcrumbIcon.svg';
import Translation from '@/app/components/translation';
import BreadcrumbItem from '@/app/interfaces/BreadcrumbItem';

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string | '';
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
	return (
		<div className={'text-sm text-span-foreground flex gap-4 ' + className}>
			{items.map((item, index) => (
				<div key={index} className='flex gap-3 items-center'>
					{item.href ? (
						<Link
							href={item.href}
							className={`flex gap-3  ${index === 0 ? 'text-primary' : ''} `}
						>
							<span className='hover:underline'>
								<Translation translationKey={item.label} />
							</span>
							{index < items.length - 1 && (
								<Image src={breadcrumbIcon} alt='breadcrumbIcon' />
							)}
						</Link>
					) : (
						<span>
							<Translation translationKey={item.label} />
						</span>
					)}
				</div>
			))}
		</div>
	);
};

export default Breadcrumb;
