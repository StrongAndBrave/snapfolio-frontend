'use client';
import styles from './InfoPost.module.scss';
import SvgPin from '../../../../../../../public/svg/pin.svg';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import { ChangeEvent } from 'react';
import { InfoPostType } from '@/features/posts/model/types';
import { useGetProfileQuery } from '@/features/profile/api/profileApi';
import DefaultAvatar from './../../../../../../../public/default_avatar.png';
import Image from 'next/image';

type Props = {
    info: InfoPostType;
    setInfo: (info: InfoPostType) => void;
};

export const InfoPost = ({ info, setInfo }: Props) => {
    const { data: profile } = useGetProfileQuery();

    const avatar = profile?.avatars?.length ? profile.avatars[0].url : DefaultAvatar.src;
    const userName = profile?.userName ? profile.userName : 'no name';

    const maxLength = 500;

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            setInfo({ ...info, description: e.target.value });
        }
    };

    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, location: e.target.value });
    };

    return (
        <div className={styles.info}>
            <div className={styles.persona}>
                <Image className={styles.photo} width={36} height={36} src={avatar} alt="my photo" />
                <p className={styles.name}>{userName}</p>
            </div>
            <div className={styles.descriptions}>
                <label className={styles.label} htmlFor="textarea">
                    Add publication descriptions
                </label>
                <textarea
                    value={info.description}
                    onChange={handleChangeDescription}
                    id="textarea"
                    className={styles.textarea}
                    placeholder="Description"
                ></textarea>
                <p className={styles.charCount}>
                    {info.description.length}/{maxLength}
                </p>
            </div>
            <div className={styles.location}>
                <label className={styles.label} htmlFor="field">
                    Add location
                </label>
                <div className={styles.fieldWrapper}>
                    <input
                        value={info.location}
                        onChange={handleChangeLocation}
                        id="field"
                        className={styles.field}
                        type="text"
                    />
                    <ImgBtn className={styles.pin} icon={<SvgPin />} />
                </div>
            </div>
        </div>
    );
};
