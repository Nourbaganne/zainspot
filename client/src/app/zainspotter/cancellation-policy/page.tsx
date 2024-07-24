"use client"

import Breadcrumb from '../component/breadcrumb';
import Layout from '../Layout'

const Page = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "My Zainspotter", href: "/zainspotter" },
        { label: "Cancellation Policy TBD" }
    ];
    return (
        <div className="flex flex-col gap-6 bg-background-foreground md:px-16 md:py-8  md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div>this is Cancellation Policy TBD view</div>
            </Layout>
        </div>
    )
}

export default Page;