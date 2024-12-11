'use client';
import dynamic from 'next/dynamic';
import { authApi } from '@/shared/services/auth/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './RegistrationConfirmFeature.module.scss';
import { Button, Modal } from '@/shared/ui';
import Link from 'next/link';
import { EmailVerified } from '@/widgets/email-verified';
import { LinkExpired } from '@/widgets/link-expired';

const RegistrationConfirmFeatureInner = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const email = searchParams.get('email');
    console.log(document.location.origin);
    const baseURL = document.location.origin;
    // const baseURL = process.env.NODE_ENV === 'production' ? 'https://snapfolio.ru' : 'http://localhost:3000';

    const [postRegistrationConfirmation, { isLoading, isSuccess, isError }] =
        authApi.usePostRegistrationConfirmationMutation();
    const [
        postEmailResending,
        { isSuccess: isResending, isError: isErrorResending, error: resendingError, isLoading: isResendingLoading },
    ] = authApi.usePostEmailResendingMutation();

    const [showPortalRegistration, setShowPortalRegistration] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (isErrorResending) {
            setShowModal(true);
        }
    }, [isErrorResending]);

    useEffect(() => {
        if (code) {
            postRegistrationConfirmation({ confirmationCode: code as string });
        }
    }, [code, postRegistrationConfirmation]);

    useEffect(() => {
        if (isResending) {
            setShowPortalRegistration(true);
        }
        if (isErrorResending) {
            setShowModal(true);
        }
        if (resendingError && typeof resendingError === 'object' && 'data' in resendingError) {
            const message = (resendingError.data as { messages: { message: string }[] }).messages;
            if (message[0].message === `Email isn't valid or already confirmed`) {
                setIsVerified(true);
            }
        }
    }, [isResending, isErrorResending, resendingError]);

    const handleModalRegistration = () => {
        setShowPortalRegistration(prev => !prev);
    };

    const handleModalClose = () => {
        setShowModal(prev => !prev);
    };

    const onSubmit = async () => {
        await postEmailResending({
            email: email || '',
            baseUrl: baseURL,
        });
    };

    if (isLoading) {
        return <>Loading...</>;
    }

    if (isSuccess) {
        return <EmailVerified />;
    }

    if (isError && !isVerified) {
        return (
            <LinkExpired
                onSubmit={onSubmit}
                isLoading={isResendingLoading}
                isShowModal={showPortalRegistration}
                handleModalClose={handleModalRegistration}
                email={email as string}
            />
        );
    }

    return (
        <div className={styles.container}>
            <Modal
                selector={'modal-root'}
                header={'Error'}
                show={showModal}
                onClose={handleModalClose}
                needHeaderBtn={false}
            >
                <>
                    <p style={{ marginBottom: '18px' }}>Your email address {email} is already verified.</p>
                    <Button
                        style={{ marginLeft: 'auto', display: 'block' }}
                        variant="contained"
                        as={Link}
                        href={'/auth/sign-in'}
                    >
                        Sign in
                    </Button>
                </>
            </Modal>
        </div>
    );
};

export const RegistrationConfirmFeature = dynamic(() => Promise.resolve(RegistrationConfirmFeatureInner), {
    ssr: false,
});
