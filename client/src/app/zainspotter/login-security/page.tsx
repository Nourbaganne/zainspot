'use client';

import 'react-phone-input-2/lib/style.css';
import Layout from '../Layout';
import Translation from '@/app/components/translation';
import { useContext, useState } from 'react';
import { useUpdateForm } from '@/app/lib/update-form';
import Dialog from '@/app/components/dialog';
import Breadcrumb from '../components/breadcrumb';
import { AuthContext } from '@/app/contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import UseUserData from '@/app/lib/getUserData';
import Loader from '@/app/components/loader';
import Authentification from '../components/authentification';
import LoginSecurityForm from '../components/loginSecurityForm';
import { WithAuth } from '@/app/lib/withAuth';

const Page = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', user?.user.userId],
    queryFn: () => UseUserData(user?.user.userId, user?.access_token),
    enabled: !!user?.user.userId && !!user?.access_token,
  });

  const formik = useUpdateForm(data);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error: {error.message || 'Something went wrong'}</div>;
  }
  

  const breadcrumbItems = [
    { label: 'breadcrumb_home', href: '/' },
    { label: 'breadcrumb_zainspotter', href: '/zainspotter' },
    { label: 'editProfile_Login_Security' },
  ];

  return (
    <div className='flex flex-col gap-4 md:gap-6 bg-background-foreground py-6 px-2 md:px-16 md:py-8  md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <Layout>
        <div className='flex flex-col p-4 px-6 gap-3 bg-background border mb-20'>
          <h1 className='font-bold'>
            <Translation translationKey='login_security_header' />
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <LoginSecurityForm formik={formik} />
          </form>
          <Authentification
            isEmailAuthenticated={data?.EmailAuthentication}
            userId={user?.user.userId}
            access_token={user?.access_token}
            refetch={refetch}
            email={data?.email}
            setIsOpenDialog={setIsOpenDialog}
          />

        </div>
      </Layout>
      {isOpenDialog && (
        <Dialog
          email={data?.email}
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        />
      )}
    </div>
  );
};

export default WithAuth(Page, 'zainspotter');