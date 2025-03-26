import {useState} from 'react';
import {Modal} from "@/shared/ui";
import styles from './CreatePost.module.scss'
import {UploadDesktop} from "@/entities/posts/ui/create-post/upload/UploadDesktop";
import {CropDesktop} from "@/entities/posts/ui/create-post/crop/CropDesktop";
import {useIsMobile} from "@/shared/lib/hooks/useIsMobile";
import {CreatePostStep} from "@/entities/posts/model/types";
import {FiltersDesktop} from "@/entities/posts/ui/create-post/filters/FiltersDesktop";
import {DetailsDesktop} from "@/entities/posts/ui/create-post/details/DetailsDesktop";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

export const CreatePost = ({isOpen, onClose}: Props) => {

    const isMobile = useIsMobile()

    const [step, setStep] = useState<CreatePostStep>('upload');

    const [images, setImages] = useState<File[]>([]);

    let largeModal = step !== 'upload' && step !== 'crop'
    console.log(images)

    //Добавление

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={`${styles.modal} ${largeModal && styles.largeModal}`}>
            {step === 'upload' && (isMobile ? '' : <UploadDesktop uploadImages={setImages} onClose={onClose} nextStep={setStep}/>)}
            {step === 'crop' && <CropDesktop backStep={setStep} nextStep={setStep} images={images}  changeImages={setImages}/>}
            {step === 'filters' && <FiltersDesktop backStep={setStep} nextStep={setStep} images={images}/>}
            {step === 'details' && <DetailsDesktop backStep={setStep} nextStep={setStep} images={images}/>}
        </Modal>
    );
};
