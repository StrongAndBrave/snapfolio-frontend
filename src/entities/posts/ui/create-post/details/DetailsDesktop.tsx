import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import SvgArrowBack from "../../../../../../public/svg/arrow-ios-back.svg";
import {Button, PhotoSlider} from "@/shared/ui";
import {CreatePostStep, ImageEditData, InfoPostType,} from "@/entities/posts/model/types";
import {useState} from "react";
import {InfoPost} from "@/entities/posts/ui/create-post/details/info/InfoPost";



type Props = {
    backStep: (step: CreatePostStep) => void;
    nextStep: (step: CreatePostStep) => void;
    images: ImageEditData[];
}

export const DetailsDesktop = ({backStep, nextStep, images}: Props) => {
    const [info, setInfo] = useState<InfoPostType>({description:'', location: ''})


    const handleBackStep = () => {
        backStep('filters')
    }
    const handleNextStep = () => {
        console.log('info:', info)
        console.log('images:', images)
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
                        images={images.map(img =>
                            img.filteredImageUrl || img.croppedImageUrl || img.originalPreview
                        )}
                    />
                </div>
                <InfoPost info={info} setInfo={setInfo}/>
            </div>
        </>
    );
};
