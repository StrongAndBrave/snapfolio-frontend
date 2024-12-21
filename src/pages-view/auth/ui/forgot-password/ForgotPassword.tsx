import { FormLayout } from '@/features/auth/ui/FormLayout';
import { ForgotPasswordForm } from '@/features/auth';

export const ForgotPassword = () => {
    return (
        <FormLayout title={'Forgot Password'}>
            <ForgotPasswordForm />
        </FormLayout>
    );
};
