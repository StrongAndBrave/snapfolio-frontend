'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from './PhotoSlider.module.scss'
import { Navigation, Pagination } from "swiper/modules";

type Props = {
    images: File[] | string[];
    activeIndex?: number;
    onSlideChange?: (index: number, swiper: SwiperType) => void;
    onSwiperInit?: (swiper: SwiperType) => void;
}

export const PhotoSlider = ({
                                images,
                                activeIndex = 0,
                                onSlideChange = () => {},
                                onSwiperInit = () => {}
                            }: Props) => {
    const imageUrls = images.map(image =>
        typeof image === 'string' ? image : URL.createObjectURL(image)
    );

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={10}
            onSwiper={onSwiperInit}
            onSlideChange={(swiper) => onSlideChange(swiper.activeIndex, swiper)}
            initialSlide={activeIndex}
            className={styles.swiper}
        >
            {imageUrls.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`Photo ${index}`} className="photo-slide" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};