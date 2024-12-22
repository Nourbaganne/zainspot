import BreadcrumbItem from '../interfaces/BreadcrumbItem';
import Breadcrumb from '../zainspotter/components/breadcrumb';

interface Props {
	children: React.ReactNode;
	breadcrumbItems?: BreadcrumbItem[];
	className?: string | '';
	withPaddingBottom?: boolean;
}

export default function Container({
	children,
	breadcrumbItems,
	className,
	withPaddingBottom = true,
}: Props) {
	return (
		<div className={
				'bg-gray-100 ' + (withPaddingBottom ? 'pb-12 ' : '') + className}
		>
			{breadcrumbItems && (
				<Breadcrumb items={breadcrumbItems} className='p-6' />
			)}
			<div>{children}</div>
		</div>
	);
}
