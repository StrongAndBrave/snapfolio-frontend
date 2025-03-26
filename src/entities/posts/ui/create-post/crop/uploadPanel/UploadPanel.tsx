'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation} from "swiper/modules";
import styles from './UploadPanel.module.scss'
import SvgImage from "../../../../../../../public/svg/plus-circle.svg";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {Uploader} from "@/shared/ui";
import SvgCloseMini from './../../../../../../../public/svg/closeMini.svg'

type Props = {
    images: File[],
    activeIndex: number;
    onThumbClick: (index: number) => void;
    onSwiperInit: (swiper: SwiperType) => void;
    changeImages: (files: File[]) => void
    uploadPanelVisible: boolean
}

export const UploadPanel = ({images, activeIndex, onThumbClick, onSwiperInit, changeImages, uploadPanelVisible}: Props) => {
    const imageUrls = images.map(image => URL.createObjectURL(image));

    const handleUploadImages = (newFiles: File[]) => {
        const remainingSlots = 8 - images.length;

        const filesToAdd = newFiles.slice(0, remainingSlots);

        changeImages([...images, ...filesToAdd]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)

        changeImages(newImages)
    }

    return (
        <div className={`${styles.uploadPanel} ${uploadPanelVisible && styles.visible}`}>
            <Swiper
                modules={[Navigation]}
                slidesPerView="auto"
                spaceBetween={10}
                navigation
                onSwiper={onSwiperInit}
                className={styles.swiper}
            >
                {imageUrls.map((src, index) => (
                    <SwiperSlide key={src}
                                 className={styles.panelSlide}
                                 onClick={() => onThumbClick(index)}>

                        <ImgBtn onClick={() => handleRemoveImage(index)} className={styles.deleteBtn} icon={<SvgCloseMini/>}></ImgBtn>
                        <img src={src} alt={`Photo ${index}`}
                             className={`${styles.slideImage} 
                             ${activeIndex === index && styles.slideActive}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                imageUrls.length < 8 &&
                <Uploader uploadImages={handleUploadImages}>
                    <div className={styles.uploadBtnAdd}>
                        <SvgImage className={styles.addImages}/>
                    </div>
                </Uploader>

            }
        </div>
    );
};