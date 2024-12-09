import { Button, Modal } from "@/shared/ui";
import styles from "./LinkExpired.module.scss";
import Image from "next/image";
import expiredImg from "../../../../public/auth/resend-email@2x.png";

type Props = {
    onSubmit: () => void;
    isLoading: boolean;
    isShowModal: boolean;
    handleModalClose: () => void;
    email: string;
}

export const LinkExpired = ({onSubmit, isLoading, isShowModal, handleModalClose, email}: Props) => {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Email verification link expired</h1>
            <p className={styles.text}>
                Looks like the verification link has expired. Not to worry, we can send the link again
            </p>
            <form>
                <div className={styles.btn}>
                    <Button variant="contained" type="button" onClick={onSubmit} disabled={isLoading}>
                        {isLoading ? 'In progress' : 'Resend verification link'}
                    </Button>
                </div>
            </form>
        </div>
        <div className={styles.img}>
            <Image src={expiredImg} alt="Your link expired" width={473} height={352} />
        </div>
        <Modal
            selector={'modal-root'}
            header={'Email sent'}
            show={isShowModal}
            onClose={handleModalClose}
        >
            <>
                <p style={{ marginBottom: '18px' }}>We have sent a link to confirm your email to {email}</p>
                <Button
                    style={{ marginLeft: 'auto', display: 'block' }}
                    variant="contained"
                    onClick={handleModalClose}
                    type="button"
                >
                    OK
                </Button>
            </>
        </Modal>
    </div>
    );
}