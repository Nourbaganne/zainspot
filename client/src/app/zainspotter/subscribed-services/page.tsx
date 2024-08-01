"use client"

import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout'

const Page = () => {
    const breadcrumbItems = [
        { label: "Breadcrumb_home", href: "/" },
        { label: "Breadcrumb_zainspotter", href: "/zainspotter" },
        { label: "editProfile_services" }
    ];
    return (
        <div className="flex flex-col gap-6 bg-background-foreground md:px-16 md:py-8  md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div>this is subscribed services view</div>
            </Layout>
        </div>
    )
}

export default Page;