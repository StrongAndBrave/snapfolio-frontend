'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/shared/ui';
import styles from './CreatePost.module.scss';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import { CreatePostStep, ImageEditData } from '@/features/posts/model/types';
import { UploadDesktop } from '@/features/posts/ui/create-post/upload/UploadDesktop';
import { CropDesktop } from '@/features/posts/ui/create-post/crop/CropDesktop';
import { FiltersDesktop } from '@/features/posts/ui/create-post/filters/FiltersDesktop';
import { DetailsDesktop } from '@/features/posts/ui/create-post/details/DetailsDesktop';

type Props = {
    isOpen: boolean;
    onClose: (variant: boolean) => void;
};
export const CreatePost = ({ isOpen, onClose }: Props) => {
    const isMobile = useIsMobile();
    const [step, setStep] = useState<CreatePostStep>('upload');
    const [images, setImages] = useState<ImageEditData[]>([]);
    const handleUpload = (files: File[]) => {
        const newImages: ImageEditData[] = files.map(file => ({
            id: Math.random().toString(36).substring(2, 9),
            original: file,
            originalPreview: URL.createObjectURL(file),
            cropData: {
                aspect: 1,
                zoom: 1,
                crop: { x: 0, y: 0 },
                croppedAreaPixels: null,
            },
            currentAspect: '1:1',
        }));
        setImages(newImages);
    };

    const handleCloseCreatePost = () => {
        if (step !== 'upload') {
            onClose(false);
        } else {
            onClose(true);
        }
    };

    useEffect(() => {
        setStep('upload');
        handleUpload([]);
    }, [isOpen]);

    const largeModal = step !== 'upload' && step !== 'crop';

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseCreatePost}
            className={`${styles.modal} ${largeModal && styles.largeModal}`}
        >
            {step === 'upload' &&
                (isMobile ? (
                    ''
                ) : (
                    <UploadDesktop uploadImages={handleUpload} onClose={onClose} nextStep={() => setStep('crop')} />
                ))}

            {step === 'crop' && (
                <CropDesktop backStep={setStep} nextStep={setStep} images={images} changeImages={setImages} />
            )}

            {step === 'filters' && (
                <FiltersDesktop backStep={setStep} nextStep={setStep} images={images} changeImages={setImages} />
            )}

            {step === 'details' && <DetailsDesktop onClose={onClose} backStep={setStep} images={images} />}
        </Modal>
    );
};
