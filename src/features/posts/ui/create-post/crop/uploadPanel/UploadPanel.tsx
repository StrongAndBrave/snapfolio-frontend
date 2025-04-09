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
import {ImageEditData} from "@/features/posts/model/types";

type Props = {
    images: ImageEditData[];
    activeIndex: number;
    onThumbClick: (index: number) => void;
    onSwiperInit: (swiper: SwiperType) => void;
    changeImages: (files: ImageEditData[]) => void;
    uploadPanelVisible: boolean;
}

export const UploadPanel = ({images, activeIndex, onThumbClick, onSwiperInit, changeImages, uploadPanelVisible}: Props) => {
    const handleUploadImages = (newFiles: File[]) => {
        const remainingSlots = 8 - images.length;

        const filesToAdd :ImageEditData[] = newFiles.slice(0, remainingSlots).map(file => ({
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

        changeImages([...images, ...filesToAdd]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        changeImages(newImages);
    };

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
                {images.map((image, index) => (
                    <SwiperSlide key={image.id}
                                 className={styles.panelSlide}
                                 onClick={() => onThumbClick(index)}>
                        <ImgBtn
                            onClick={(e: any) => {
                                e.stopPropagation();
                                handleRemoveImage(index);
                            }}
                            className={styles.deleteBtn}
                            icon={<SvgCloseMini/>}
                        />
                        <img
                            src={image.originalPreview}
                            alt={`Photo ${index}`}
                            className={`${styles.slideImage} 
                            ${activeIndex === index && styles.slideActive}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                images.length < 8 &&
                <Uploader uploadImages={handleUploadImages}>
                    <div className={styles.uploadBtnAdd}>
                        <SvgImage className={styles.addImages}/>
                    </div>
                </Uploader>
            }
        </div>
    );
};