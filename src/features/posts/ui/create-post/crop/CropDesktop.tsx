'use client';
import styles from '@/features/posts/ui/create-post/CreatePost.module.scss';
import SvgArrowBack from '../../../../../../public/svg/arrow-ios-back.svg';
import { Button, PhotoSlider } from '@/shared/ui';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import { useState, useCallback } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import Cropper, { Area } from 'react-easy-crop';
import { AspectRatioOption, CreatePostStep, ImageEditData } from '@/features/posts/model/types';
import { getCroppedImg } from '@/features/posts/lib/canvasUtils';
import { PhotoOptions } from '@/features/posts/ui/create-post/crop/photo-options/PhotoOptions';

type Props = {
    backStep: (step: CreatePostStep) => void;
    nextStep: (step: CreatePostStep) => void;
    images: ImageEditData[];
    changeImages: (files: ImageEditData[]) => void;
};

export const CropDesktop = ({ backStep, nextStep, images, changeImages }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const handleBackStep = () => {
        backStep('upload');
    };
    const handleNextStep = async () => {
        const updatedImages = [...images];
        for (let i = 0; i < updatedImages.length; i++) {
            const img = updatedImages[i];
            if (img.cropData.croppedAreaPixels) {
                try {
                    const croppedImage = await getCroppedImg(img.originalPreview, img.cropData.croppedAreaPixels);
                    updatedImages[i] = { ...img, croppedImage: croppedImage.file, croppedImageUrl: croppedImage.url };
                } catch (error) {
                    console.error(`Failed to crop image ${i}:`, error);
                }
            }
        }
        changeImages(updatedImages);
        nextStep('filters');
    };

    const handleAspectChange = useCallback(
        (aspect: AspectRatioOption) => {
            changeImages(
                images.map((img, index) =>
                    index === activeIndex
                        ? {
                              ...img,
                              currentAspect: aspect,
                              cropData: {
                                  ...img.cropData,
                                  aspect:
                                      aspect === 'original'
                                          ? undefined
                                          : Number(aspect.split(':')[0]) / Number(aspect.split(':')[1]),
                              },
                          }
                        : img,
                ),
            );
        },
        [activeIndex, images, changeImages],
    );

    const handleCropChange = useCallback(
        (crop: { x: number; y: number }) => {
            changeImages(
                images.map((img, index) =>
                    index === activeIndex
                        ? {
                              ...img,
                              cropData: {
                                  ...img.cropData,
                                  crop,
                              },
                          }
                        : img,
                ),
            );
        },
        [activeIndex, images, changeImages],
    );

    const handleZoomChange = useCallback(
        (zoom: number) => {
            changeImages(
                images.map((img, index) =>
                    index === activeIndex
                        ? {
                              ...img,
                              cropData: {
                                  ...img.cropData,
                                  zoom,
                              },
                          }
                        : img,
                ),
            );
        },
        [activeIndex, images, changeImages],
    );

    const handleCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            changeImages(
                images.map((img, index) =>
                    index === activeIndex
                        ? {
                              ...img,
                              cropData: {
                                  ...img.cropData,
                                  croppedAreaPixels,
                              },
                          }
                        : img,
                ),
            );
        },
        [activeIndex, images, changeImages],
    );

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack />} onClick={handleBackStep} />
                <span className={styles.title}>Cropping</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep}>
                    Next
                </Button>
            </div>
            <div className={styles.contentCrop}>
                <PhotoSlider
                    activeIndex={activeIndex}
                    onSlideChange={index => {
                        setActiveIndex(index);
                        thumbsSwiper?.slideTo(index);
                    }}
                    onSwiperInit={setMainSwiper}
                >
                    {images.map(image => (
                        <div key={image.id} className={styles.cropContainer}>
                            <Cropper
                                image={image.originalPreview}
                                crop={image.cropData.crop}
                                zoom={image.cropData.zoom}
                                aspect={image.cropData.aspect}
                                onCropChange={handleCropChange}
                                onZoomChange={handleZoomChange}
                                onCropComplete={handleCropComplete}
                                classes={{ containerClassName: styles.cropperContainer }}
                            />
                        </div>
                    ))}
                </PhotoSlider>

                <PhotoOptions
                    aspectRatio={images[activeIndex]?.currentAspect || '1:1'}
                    getAspectRatio={handleAspectChange}
                    images={images}
                    activeIndex={activeIndex}
                    onThumbClick={index => mainSwiper?.slideTo(index)}
                    onSwiperInit={setThumbsSwiper}
                    changeImages={files => changeImages(files as ImageEditData[])}
                />
            </div>
        </>
    );
};
