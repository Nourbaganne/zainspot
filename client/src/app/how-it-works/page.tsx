import Container from '../components/Container'
import Image from 'next/image'
import explanationImage from '@/app/assets/howitworks/Container.svg'

const page = () => {
    return (
        <Container
            breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'How it works' },
            ]}
            withPaddingBottom={false}>
            <div className='flex flex-col gap-8'>
                <h1 className='font-bold text-xl md:text-[32px] text-center'>How it works</h1>
                <Image src={explanationImage} alt='explanation' />
            </div>
        </Container>
    )
}

export default page