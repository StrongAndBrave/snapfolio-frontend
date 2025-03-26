import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import SvgArrowBack from '../../../../../../public/svg/arrow-ios-back.svg';
import {Button, PhotoSlider} from "@/shared/ui";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {CreatePostStep} from "@/entities/posts/model/types";
import SvgImage from '../../../../../../public/svg/image.svg'
import SvgExpand from '../../../../../../public/svg/expand.svg'
import {UploadPanel} from "@/entities/posts/ui/create-post/crop/uploadPanel/UploadPanel";
import {useState} from "react";
import { Swiper as SwiperType } from "swiper/types";
import React, { useRef } from 'react';
import {CropPanel} from "@/entities/posts/ui/create-post/crop/cropPanel/CropPanel";

type Props = {
    backStep: (step: CreatePostStep) => void
    nextStep: (step: CreatePostStep) => void
    images: File[]
    changeImages: (files: File[]) => void
}

export const CropDesktop = ({backStep, nextStep, images, changeImages}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const [uploadPanelVisible, setUploadPanelVisible] = useState(false)

    const [cropPanelVisible, setCropPanelVisible] = useState(false)



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
            <div className={styles.contentCrop}>
                <PhotoSlider
                    images={images}
                    activeIndex={activeIndex}
                    onSlideChange={(index, swiper) => {
                        setActiveIndex(index);
                        thumbsSwiper?.slideTo(index);
                    }}
                    onSwiperInit={setMainSwiper}
                />

                <CropPanel cropPanelVisible={cropPanelVisible}/>

                <UploadPanel
                    images={images}
                    activeIndex={activeIndex}
                    onThumbClick={(index) => mainSwiper?.slideTo(index)}
                    onSwiperInit={setThumbsSwiper}
                    changeImages={changeImages}
                    uploadPanelVisible={uploadPanelVisible}
                />

                <ImgBtn className={styles.expandBtn} icon={<SvgExpand className={styles.uploadIcon}/>} onClick={() =>
                 setCropPanelVisible(!cropPanelVisible)}/>

                <ImgBtn className={styles.uploadBtn} icon={<SvgImage className={styles.uploadIcon}/>} onClick={() => setUploadPanelVisible(!uploadPanelVisible)}/>

            </div>
        </>
    );
};