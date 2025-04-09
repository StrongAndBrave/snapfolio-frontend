import {CropPanel} from "@/features/posts/ui/create-post/crop/cropPanel/CropPanel";
import {UploadPanel} from "@/features/posts/ui/create-post/crop/uploadPanel/UploadPanel";
import {AspectRatioOption, ImageEditData} from "@/features/posts/model/types";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import styles from "@/features/posts/ui/create-post/CreatePost.module.scss";
import SvgExpand from "../../../../../../../public/svg/expand.svg";
import SvgImage from "../../../../../../../public/svg/image.svg";
import {useState} from "react";
import {Swiper as SwiperType} from "swiper/types";

type Props = {
    aspectRatio: AspectRatioOption;
    getAspectRatio: (aspectRatio: AspectRatioOption) => void;
    images: ImageEditData[];
    activeIndex: number;

    onThumbClick: (index: number) => void;
    onSwiperInit: (swiper: SwiperType) => void;

    changeImages: (files: ImageEditData[]) => void;
}

export const PhotoOptions = ({aspectRatio, getAspectRatio, images, activeIndex, onThumbClick, onSwiperInit, changeImages}:Props) => {
    const [uploadPanelVisible, setUploadPanelVisible] = useState(false)
    const [cropPanelVisible, setCropPanelVisible] = useState(false)

    const handleCropPanelVisible = () => {
        setCropPanelVisible(!cropPanelVisible)
        setUploadPanelVisible(false)
    }

    const handleUploadPanelVisible = () => {
        setUploadPanelVisible(!uploadPanelVisible)
        setCropPanelVisible(false)
    }

    return (
        <>
            <CropPanel
                aspectRatio={aspectRatio}
                getAspectRatio={getAspectRatio}
                cropPanelVisible={cropPanelVisible}
            />

            <UploadPanel
                images={images}
                activeIndex={activeIndex}
                onThumbClick={onThumbClick}
                onSwiperInit={onSwiperInit}
                changeImages={(files) => changeImages(files as ImageEditData[])}
                uploadPanelVisible={uploadPanelVisible}
            />

            <ImgBtn className={styles.expandBtn} icon={<SvgExpand className={styles.uploadIcon}/>} onClick={handleCropPanelVisible} />

            <ImgBtn className={styles.uploadBtn} icon={<SvgImage className={styles.uploadIcon}/>} onClick={handleUploadPanelVisible}/>
        </>
    );
};