import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import SvgArrowBack from "../../../../../../public/svg/arrow-ios-back.svg";
import {Button, PhotoSlider} from "@/shared/ui";
import {CreatePostStep} from "@/entities/posts/model/types";
import {Info} from "@/entities/posts/ui/create-post/details/info/Info";

type Props = {
    backStep: (step: CreatePostStep) => void
    nextStep: (step: CreatePostStep) => void
    images: File[]
}

export const DetailsDesktop = ({backStep, nextStep, images}: Props) => {

    const handleBackStep = () => {
        backStep('filters')
    }
    const handleNextStep = () => {
        nextStep('confirm')
    }

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack/>} onClick={handleBackStep}/>
                <span className={styles.title}>Publication</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep}>Publish</Button>
            </div>
            <div className={styles.content}>
                <div className={styles.slider}>
                    <PhotoSlider
                        images={images}
                    />
                </div>
                <Info/>
            </div>
        </>
    );
};
