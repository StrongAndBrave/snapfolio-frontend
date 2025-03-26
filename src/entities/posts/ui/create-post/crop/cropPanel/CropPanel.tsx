import styles from './CropPanel.module.scss'

type Props = {
    cropPanelVisible: boolean
}

export const CropPanel = ({cropPanelVisible}: Props) => {
    return (
        <div className={`${styles.cropPanel} ${cropPanelVisible && styles.visible}`}>

        </div>
    );
};
