import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
        </div>
    );
};
