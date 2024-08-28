import BreadcrumbItem from '../interfaces/BreadcrumbItem';
import Breadcrumb from '../zainspotter/components/breadcrumb';

interface Props {
	children: React.ReactNode;
	breadcrumbItems?: BreadcrumbItem[];
	className?: string | '';
}

export default function Container({
	children,
	breadcrumbItems,
	className,
}: Props) {
	return (
		<div className={'bg-gray-100 ' + className}>
			{breadcrumbItems && (
				<Breadcrumb items={breadcrumbItems} className='p-6' />
			)}
			<div>{children}</div>
		</div>
	);
}
