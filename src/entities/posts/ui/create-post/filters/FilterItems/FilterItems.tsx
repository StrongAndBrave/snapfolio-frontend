import styles from "@/entities/posts/ui/create-post/filters/FilterItems/FilterItems.module.scss";
import React from "react";


export const FilterItems = () => {
    const filtersArr = [
        { title: 'Normal', image: '/photo.jpg', filter: 'none' },
        { title: 'Clarendon', image: '/photo.jpg', filter: 'contrast(1.2) saturate(1.35)' },
        { title: 'Lark', image: '/photo.jpg', filter: 'sepia(0.25) contrast(1.1)' },
        { title: 'Gingham', image: '/photo.jpg', filter: 'brightness(1.05) hue-rotate(350deg)' },
        { title: 'Moon', image: '/photo.jpg', filter: 'grayscale(1) contrast(1.1) brightness(1.1)' },
        { title: 'Perpetua', image: '/photo.jpg', filter: 'contrast(0.85) saturate(1.1)' },
        { title: 'Reyes', image: '/photo.jpg', filter: 'sepia(0.4) contrast(0.85) brightness(1.1)' },
        { title: 'Slumber', image: '/photo.jpg', filter: 'brightness(0.9) saturate(0.9)' },
        { title: 'Valencia', image: '/photo.jpg', filter: 'contrast(1.1) brightness(1.1)' },
    ];

    return (
        <div className={styles.filters}>
            {filtersArr.map(filter => <div className={styles.filter}>
                <img src={filter.image} className={styles.image} style={{ filter: filter.filter }}/>
                <p className={styles.title}>{filter.title}</p>
            </div>)}
        </div>
    );
};
