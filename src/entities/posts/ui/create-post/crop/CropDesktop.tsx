import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import SvgArrowBack from '../../../../../../public/svg/arrow-ios-back.svg';
import {Button, PhotoSlider} from "@/shared/ui";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {CreatePostStep} from "@/entities/posts/model/types";
import photo from '../../../../../../public/photo.jpg'

type Props = {
    backStep: (step: CreatePostStep) => void
    nextStep: (step: CreatePostStep) => void
}

export const CropDesktop = ({backStep, nextStep}: Props) => {
    console.log(photo)

    const handleBackStep = () => {
        backStep('upload')
    }
    const handleNextStep = () => {
        nextStep('filters')
    }

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack/>} onClick={handleBackStep}/>
                <span className={styles.title}>Cropping</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep}>Next</Button>
            </div>
            <div className={styles.content}>
                <PhotoSlider photos={[photo.src, photo.src]} />
            </div>
        </>
    );
};