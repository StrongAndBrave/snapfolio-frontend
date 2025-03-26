import styles from './Info.module.scss'
import SvgPin from "../../../../../../../public/svg/pin.svg";
import React, {useState} from "react";
import {ImgBtn} from "@/shared/ui/img-btn/ImgBtn";
export const Info = () => {

    const maxLength = 500;
    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            setText(e.target.value);
        }
    };

    return (
        <div className={styles.info}>
            <div className={styles.persona}>
                <img className={styles.photo} src="" alt="my photo"/>
                <p className={styles.name}>User001</p>
            </div>
            <div className={styles.descriptions}>
                <label className={styles.label} htmlFor='textarea'>Add publication descriptions</label>
                <textarea
                    value={text}
                    onChange={handleChange}
                    id='textarea'
                    className={styles.textarea}
                    placeholder='Description'
                ></textarea>
                <p className={styles.charCount}>{text.length}/{maxLength}</p>
            </div>
            <div className={styles.location}>
                <label className={styles.label}  htmlFor='field'>Add location</label>
                <div className={styles.fieldWrapper}>
                    <input id='field' className={styles.field} type="text"/>
                    <ImgBtn className={styles.pin} icon={<SvgPin/>}/>
                </div>
            </div>
        </div>
    );
};