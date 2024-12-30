import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import SvgArrowBack from '../../../../../../public/svg/arrow-ios-back.svg';
import {Button} from "@/shared/ui";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {CreatePostStep} from "@/entities/posts/model/types";

type Props = {
    backStep: (step: CreatePostStep) => void
    nextStep: (step: CreatePostStep) => void
}

export const FiltersDesktop = ({backStep, nextStep}: Props) => {

    const handleBackStep = () => {
        backStep('crop')
    }
    const handleNextStep = () => {
        nextStep('details')
    }

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack/>} onClick={handleBackStep}/>
                <span className={styles.title}>Filters</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep}>Next</Button>
            </div>
            <div className={styles.content}>

            </div>
        </>
    );
};