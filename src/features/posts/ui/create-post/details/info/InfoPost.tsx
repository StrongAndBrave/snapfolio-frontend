'use client'
import styles from './InfoPost.module.scss'
import SvgPin from "../../../../../../../public/svg/pin.svg";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
import {ChangeEvent} from "react";
import {InfoPostType} from "@/features/posts/model/types";


type Props = {
    info: InfoPostType;
    setInfo: (info: InfoPostType) => void;
}

export const InfoPost = ({info, setInfo}: Props) => {

    const maxLength = 500;

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            setInfo({...info, description: e.target.value});
        }
    };

    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({...info, location: e.target.value});
    }

    return (
        <div className={styles.info}>
            <div className={styles.persona}>
                <img className={styles.photo} src={undefined} alt="my photo"/>
                <p className={styles.name}>User001</p>
            </div>
            <div className={styles.descriptions}>
                <label className={styles.label} htmlFor='textarea'>Add publication descriptions</label>
                <textarea
                    value={info.description}
                    onChange={handleChangeDescription}
                    id='textarea'
                    className={styles.textarea}
                    placeholder='Description'
                ></textarea>
                <p className={styles.charCount}>{info.description.length}/{maxLength}</p>
            </div>
            <div className={styles.location}>
                <label className={styles.label}  htmlFor='field'>Add location</label>
                <div className={styles.fieldWrapper}>
                    <input value={info.location} onChange={handleChangeLocation} id='field' className={styles.field} type="text"/>
                    <ImgBtn className={styles.pin} icon={<SvgPin/>}/>
                </div>
            </div>
        </div>
    );
};