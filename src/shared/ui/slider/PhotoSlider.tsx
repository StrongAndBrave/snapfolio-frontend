import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

type Props = {
    photos: string[]; // Массив путей или URL фотографий
}

export const PhotoSlider = ({ photos }: Props) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
        >
            {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                    <Image src={photo} alt={`Photo ${index + 1}`} className="photo-slide" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};