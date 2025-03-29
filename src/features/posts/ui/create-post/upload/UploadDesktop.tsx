'use client'
import styles from "@/features/posts/ui/create-post/CreatePost.module.scss";
import SvgImage from "../../../../../../public/svg/image.svg";
import {Button, Uploader} from "@/shared/ui";
import SvgClose from "../../../../../../public/svg/close.svg";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {CreatePostStep} from "@/features/posts/model/types";

type Props = {
    onClose: () => void
    nextStep: (step: CreatePostStep) => void
    uploadImages: (files: File[]) => void;
}

export const UploadDesktop = ({onClose, nextStep, uploadImages}: Props) => {

    const handleUploadImages = (images: File[]) => {
        uploadImages(images)
        nextStep('crop')
    }

    return (
        <>
            <div className={styles.header}>
                <span className={styles.title}>Add Photo</span>
                <ImgBtn icon={<SvgClose/>} onClick={onClose}/>
            </div>
            <div className={styles.contentUpload}>
                <Uploader uploadImages={images => handleUploadImages(images)}>
                    <div className={styles.addingImg}>
                        <SvgImage className={styles.image}/>
                    </div>
                </Uploader>

                <Uploader className={styles.labelSelectBtn}   uploadImages={images => handleUploadImages(images)}>
                    <Button as={'div'} variant={"contained"} fullWidth>
                        Select from Computer
                    </Button>
                </Uploader>
                <Button className={styles.draftBtn} variant={"outlined"} fullWidth>
                    Open Draft
                </Button>
            </div>
        </>
    );
};