import React from 'react';
import styles from "@/entities/posts/ui/create-post/CreatePost.module.scss";
import SvgImage from "../../../../../../public/svg/image.svg";
import {Button} from "@/shared/ui";
import SvgClose from "../../../../../../public/svg/close.svg";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {CreatePostStep} from "@/entities/posts/model/types";

type Props = {
    onClose: () => void
    nextStep: (step: CreatePostStep) => void
}

export const UploadDesktop = ({onClose, nextStep}: Props) => {
    return (
        <>
            <div className={styles.header}>
                <span className={styles.title}>Add Photo</span>
                <ImgBtn icon={<SvgClose/>} onClick={onClose}/>
            </div>
            <div className={styles.content}>
                <div className={styles.addingImg}>
                    <SvgImage/>
                </div>
                <Button className={styles.selectBtn} variant={"contained"} fullWidth onClick={() => nextStep('crop')}>
                    Select from Computer
                </Button>
                <Button className={styles.draftBtn} variant={"outlined"} fullWidth>
                    Open Draft
                </Button>
            </div>
        </>
    );
};