import styles from './Uploader.module.scss';

type Props = {
    children: React.ReactNode;
    multiple?: boolean;
    uploadImages: (files: File[]) => void;
    className?: string;
};

export const Uploader = ({ children, multiple = true, uploadImages, className }: Props) => {
    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validFiles = Array.from(files).filter(
                file => file.type.startsWith('image/'), // Проверяем тип файла
            );
            if (validFiles.length > 0) {
                uploadImages(validFiles);
            }
        }
    };

    return (
        <label className={`${styles.label} ${className || ''}`}>
            <input
                className={styles.input}
                type="file"
                multiple={multiple}
                onChange={handleUploadImage}
                accept="image/*"
            />
            {children}
        </label>
    );
};
