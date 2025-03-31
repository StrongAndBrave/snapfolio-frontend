'use client'
import styles from './CropPanel.module.scss'
import {AspectRatioOption} from "@/features/posts/model/types";


type Props = {
    cropPanelVisible: boolean;
    aspectRatio: AspectRatioOption;
    getAspectRatio: (aspectRatio: AspectRatioOption) => void;
}

export const CropPanel = ({cropPanelVisible, aspectRatio, getAspectRatio}: Props) => {

    return (
        <div className={`${styles.cropPanel} ${cropPanelVisible && styles.visible}`}>
            <button onClick={() => getAspectRatio('original')}  className={`${styles.btn} ${aspectRatio === 'original' && styles.active}`}>
                <span className={styles.title}>Original</span>
                <img className={styles.image} src="/svg/image.svg" alt="img"/>
            </button>
            <button onClick={() => getAspectRatio('1:1')}  className={`${styles.btn} ${aspectRatio === '1:1' && styles.active}`}>
                <span className={styles.title}>1:1</span>
                <span className={styles.square}>img</span>
            </button>
            <button onClick={() => getAspectRatio('4:5')}  className={`${styles.btn} ${aspectRatio === '4:5' && styles.active}`}>
                <span className={styles.title}>4:5</span>
                <span className={styles.verticalRectangle}>img</span>
            </button>
            <button onClick={() => getAspectRatio('16:9')}  className={`${styles.btn} ${aspectRatio === '16:9' && styles.active}`}>
                <span className={styles.title}>16:9</span>
                <span className={styles.horizontalRectangle}>img</span>
            </button>
        </div>
    );
};
