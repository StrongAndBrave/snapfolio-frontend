import styles from './Form.module.scss';

type Props = {
    title: string;
    children: React.ReactNode;
};

export const FormLayout = ({ title, children }: Props) => {
    return (
        <div className={styles.formWrapper}>
            <section className={styles.formSection}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </section>
        </div>
    );
};
