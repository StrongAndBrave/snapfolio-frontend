'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PhotoSlider.module.scss';
import { Navigation, Pagination } from 'swiper/modules';

type Image = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
    uploadId: string;
};
type PhotoSliderProps = {
    images: Image[];
};

export const PhotoSlider = ({ images }: PhotoSliderProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            className={styles.swiper}
        >
            {images.map((image, index) => (
                <SwiperSlide key={image.uploadId}>
                    <img src={image.url} alt={`Photo ${index}`} className={styles['photo-slide']} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
