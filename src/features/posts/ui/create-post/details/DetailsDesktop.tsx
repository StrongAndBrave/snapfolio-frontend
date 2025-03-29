'use client'
import styles from "@/features/posts/ui/create-post/CreatePost.module.scss";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import SvgArrowBack from "../../../../../../public/svg/arrow-ios-back.svg";
import {Button, PhotoSlider} from "@/shared/ui";
import {useState} from "react";
import {CreatePostStep, ImageEditData, InfoPostType} from "@/features/posts/model/types";
import {InfoPost} from "@/features/posts/ui/create-post/details/info/InfoPost";
import {useCreatePostMutation, useUploadImagePostMutation} from "@/features/posts/api/postsApi";
import {CreatePostRequest} from "@/features/posts/api/types/postTypes";

type Props = {
    backStep: (step: CreatePostStep) => void;
    images: ImageEditData[];
}

export const DetailsDesktop = ({backStep, images}: Props) => {
    const [info, setInfo] = useState<InfoPostType>({description:'', location: ''});
    const [uploadImagesPost] = useUploadImagePostMutation()
    const [addDescriptionPost] = useCreatePostMutation()


    const handleBackStep = () => {
        backStep('filters')
    }
    const handleNextStep = async () => {
        try {
            const files:File[] = images.map(imagObj => imagObj.filteredImage || imagObj.croppedImage || imagObj.original)

            const uploadResponse = await uploadImagesPost({files}).unwrap();

            if (!uploadResponse?.images?.length) {
                throw new Error('No image data received from server');
            }

            const postData: CreatePostRequest = {
                description: info.description,
                childrenMetadata: uploadResponse.images.map((image) => ({
                    uploadId: image.uploadId
                }))
            };

            await addDescriptionPost(postData).unwrap()
        }
        catch (e) {
            console.log('error:', e)
        }
    }

    return (
        <>
            <div className={styles.header}>
                <ImgBtn icon={<SvgArrowBack/>} onClick={handleBackStep}/>
                <span className={styles.title}>Publication</span>
                <Button variant={'text'} className={styles.nextButton} onClick={handleNextStep}>Publish</Button>
            </div>
            <div className={styles.content}>
                <div className={styles.slider}>
                    <PhotoSlider
                        images={images.map(img =>
                            img.filteredImageUrl || img.croppedImageUrl || img.originalPreview
                        )}
                    />
                </div>
                <InfoPost info={info} setInfo={setInfo}/>
            </div>
        </>
    );
};
