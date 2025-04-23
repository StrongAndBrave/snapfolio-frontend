import { Area } from 'react-easy-crop';

export type CreatePostStep = 'upload' | 'crop' | 'filters' | 'details';

export type AspectRatioOption = '1:1' | '4:5' | '16:9' | 'original';

export type CropData = {
    aspect: number | undefined;
    zoom: number;
    crop: { x: number; y: number };
    croppedAreaPixels: Area | null;
};

export type ImageEditData = {
    id: string;
    original: File;
    originalPreview: string;
    cropData: CropData;
    currentAspect: AspectRatioOption;
    croppedImage?: File;
    croppedImageUrl?: string;
    filteredImage?: File;
    filteredImageUrl?: string;
    currentFilter?: string;
};

export type InfoPostType = {
    description: string;
    location: string;
};
