import Translation from '@/app/components/translation'
import Link from 'next/link'
import React from 'react'

const PrivacyPolicyLinks = () => {
  return (
    <p className='text-center text-span'>
      <Translation translationKey='registerpage_privacy_policy' />
      <Link href='/terms' className='text-primary underline cursor-pointer hover:no-underline'>
        {' '}
        <Translation translationKey='registerpage_termsofuse_span' />{' '}
      </Link>{' '}
      <Translation translationKey='registerpage_relating_privacy_policy' />{' '}
      <Link href='/privacypolicy' className='text-primary underline cursor-pointer hover:no-underline'>
        {' '}
        <Translation translationKey='registerpage_privacy_policy_span' />
      </Link >
    </p>
  )
}

export default PrivacyPolicyLinks