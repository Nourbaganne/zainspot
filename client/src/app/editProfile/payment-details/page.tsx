"use client"

import { Input } from '../../register/components/input'
import { useRegisterForm } from '../../lib/register-form'
import Translation from '../../components/translation'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import { CURRENCIES_DATA, LANGUAGES_DATA } from '../../constants/navbar'
import save from '@/app/assets/profile-details/save.svg'
import Image from 'next/image'
import Layout from '../Layout'

const Page = () => {

    const formik = useRegisterForm()

    return (
        <Layout>
            <div>this is payment details view</div>
        </Layout>
    )
}

export default Page