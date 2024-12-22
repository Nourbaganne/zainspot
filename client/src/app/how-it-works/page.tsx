import Container from '../components/Container'
import Image from 'next/image'
import explanationImage from '@/app/assets/howitworks/how-it-works.svg'
import Translation from '../components/translation'

const page = () => {
    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'footer_title_howitworks' },
            ]}
            withPaddingBottom={false}>
            <div className='flex flex-col gap-8'>
                <h1 className='font-bold text-xl md:text-[32px] text-center'>
                    <Translation translationKey='how_it_works' />
                </h1>
                <Image src={explanationImage} alt='explanation' />
            </div>
        </Container>
    )
}

export default page