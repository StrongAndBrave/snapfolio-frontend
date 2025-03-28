'use client'
import {useState} from 'react';
import {Modal} from "@/shared/ui";
import styles from './CreatePost.module.scss'
import {UploadDesktop} from "@/entities/posts/ui/create-post/upload/UploadDesktop";
import {CropDesktop} from "@/entities/posts/ui/create-post/crop/CropDesktop";
import {useIsMobile} from "@/shared/lib/hooks/useIsMobile";
import {CreatePostStep, ImageEditData} from "@/entities/posts/model/types";
import {FiltersDesktop} from "@/entities/posts/ui/create-post/filters/FiltersDesktop";
import {DetailsDesktop} from "@/entities/posts/ui/create-post/details/DetailsDesktop";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export const CreatePost = ({isOpen, onClose}: Props) => {
    const isMobile = useIsMobile()
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
                croppedAreaPixels: null
            },
            currentAspect: '1:1'
        }));
        setImages(newImages);
    };

    let largeModal = step !== 'upload' && step !== 'crop'

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={`${styles.modal} ${largeModal && styles.largeModal}`}>
            {step === 'upload' && (isMobile ? '' :
                <UploadDesktop uploadImages={handleUpload} onClose={onClose} nextStep={() => setStep('crop')}/>)}

            {step === 'crop' &&
                <CropDesktop backStep={setStep} nextStep={setStep} images={images} changeImages={setImages}/>}

            {step === 'filters' && <FiltersDesktop backStep={setStep} nextStep={setStep} images={images} changeImages={setImages}/>}

            {step === 'details' && <DetailsDesktop backStep={setStep} nextStep={setStep} images={images}/>}
        </Modal>
    );
};