'use client';
import { useState, useCallback } from 'react';
import styles from '@/features/posts/ui/create-post/CreatePost.module.scss';
import SvgArrowBack from '../../../../../../public/svg/arrow-ios-back.svg';
import { Button, PhotoSlider } from '@/shared/ui';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import { CreatePostStep, ImageEditData } from '@/features/posts/model/types';
import { applyFilter } from '@/features/posts/lib/imageFilters';
import { FilterItems } from '@/features/posts/ui/create-post/filters/FilterItems/FilterItems';

type Props = {
    backStep: (step: CreatePostStep) => void;
    nextStep: (step: CreatePostStep) => void;
    images: ImageEditData[];
    changeImages: (images: ImageEditData[]) => void;
};

export const FiltersDesktop = ({ backStep, nextStep, images, changeImages }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBackStep = () => {
        const cleanedImages = images.map(img => ({
            ...img,
            filteredImage: undefined,
            filteredImageUrl: undefined,
            currentFilter: undefined,
        }));
        changeImages(cleanedImages);
        backStep('crop');
    };

    const handleNextStep = () => nextStep('details');

    const handleFilterSelect = useCallback(
        async (filterId: string) => {
            if (!images[activeIndex]) return;

            setIsProcessing(true);
            try {
                const activeImage = images[activeIndex];
                const imageUrl = activeImage.croppedImageUrl || activeImage.originalPreview;

                const result = await applyFilter(imageUrl, filterId);

                const updatedImages = images.map((img, index) =>
                    index === activeIndex
                        ? {
                              ...img,
                              filteredImage: result.file,
                              filteredImageUrl: result.url,
                              currentFilter: filterId,
                          }
                        : img,
                );

                changeImages(updatedImages);
            } finally {
                setIsProcessing(false);
            }
        },
        [activeIndex, images, changeImages],
    );

    const handleSlideChange = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack />} onClick={handleBackStep} />
                <span className={styles.title}>Filters</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep} disabled={isProcessing}>
                    Next
                </Button>
            </div>
            <div className={styles.content}>
                <div className={styles.slider}>
                    <PhotoSlider
                        images={images.map(img => img.filteredImageUrl || img.croppedImageUrl || img.originalPreview)}
                        activeIndex={activeIndex}
                        onSlideChange={handleSlideChange}
                    />
                </div>
                <FilterItems
                    activeImageUrl={images[activeIndex]?.croppedImageUrl || images[activeIndex]?.originalPreview}
                    onFilterSelect={handleFilterSelect}
                    key={activeIndex}
                />
            </div>
        </>
    );
};
