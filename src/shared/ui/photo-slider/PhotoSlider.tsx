'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PhotoSlider.module.scss';
import { Navigation, Pagination } from 'swiper/modules';
import { Children, ReactNode } from 'react';
import Image from 'next/image';

type Props = {
    images?: File[] | string[];
    children?: ReactNode;
    activeIndex?: number;
    onSlideChange?: (index: number, swiper: SwiperType) => void;
    onSwiperInit?: (swiper: SwiperType) => void;
};

export const PhotoSlider = ({
    images,
    children,
    activeIndex = 0,
    onSlideChange = () => {},
    onSwiperInit = () => {},
}: Props) => {
    const imageUrls = images?.map(image => (typeof image === 'string' ? image : URL.createObjectURL(image)));

    const hasChildren = Children.count(children) > 0;

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={10}
            onSwiper={onSwiperInit}
            onSlideChange={swiper => onSlideChange(swiper.activeIndex, swiper)}
            initialSlide={activeIndex}
            allowTouchMove={false}
            className={styles.swiper}
        >
            {hasChildren
                ? Children.map(children, (child, index) => <SwiperSlide key={index}>{child}</SwiperSlide>)
                : imageUrls?.map((src, index) => (
                      <SwiperSlide className={`${styles.swiperSlide} swiper-slide`} key={index}>
                          <Image src={src} alt={`Photo ${index}`} fill className={`${styles.photoSlide} photo-slide`} />
                      </SwiperSlide>
                  ))}
        </Swiper>
    );
};
