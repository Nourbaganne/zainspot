
import Translation from '@/app/components/translation';
import SaveChangesButton from '@/app/components/saveChangesButton';
import InputPassword from '@/app/components/inputPassword';

const LoginSecurityForm = ({ formik }: { formik: any }) => {

    return (
        <div className='flex flex-col py-6 gap-8 border-b'>
            <h1 className='text-span font-semibold'>
                <Translation translationKey='login_security_password' />
            </h1>
            <div className='flex flex-col md:flex-row gap-6'>

                <InputPassword
                    labelKey='register_password_label'
                    value={formik.values.password || ''}
                    name='password'
                    touched={formik.touched.password}
                    errors={formik.errors.password}
                    formik={formik}
                />

                <InputPassword
                    labelKey='register_confirm_password_label'
                    value={formik.values.confirmPassword || ''}
                    name='confirmPassword'
                    touched={formik.touched.confirmPassword}
                    errors={formik.errors.confirmPassword}
                    formik={formik}
                />
            </div>
            <SaveChangesButton />
        </div>
    );
};

export default LoginSecurityForm;
