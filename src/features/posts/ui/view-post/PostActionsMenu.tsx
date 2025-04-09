'use client';
import React, { useCallback, useRef, useEffect } from 'react';
import styles from './PublicPosts.module.scss';
import DotsIcon from '../../../../../public/svg/dotsPostIcon.svg';
import DotsIconActive from '../../../../../public/svg/dotsPostIconActive.svg';
import EditIcon from '../../../../../public/svg/editPostIcon.svg';
import DeleteIcon from '../../../../../public/svg/deletePostIcon.svg';
import { Button } from '@/shared/ui';

type Props = {
    onEdit: () => void;
    onDelete: () => void;
};

export const PostActionsMenu = ({ onEdit, onDelete }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const handleEditClick = useCallback(() => {
        setIsMenuOpen(false);
        onEdit();
    }, [onEdit]);

    const handleDeleteClick = useCallback(() => {
        setIsMenuOpen(false);
        onDelete();
    }, [onDelete]);

    return (
        <div className={styles.postActions} ref={menuRef}>
            <button
                onClick={toggleMenu}
                className={styles.dotsButton}
                aria-label="Post actions"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered || isMenuOpen ? (
                    <DotsIcon width={24} height={24} />
                ) : (
                    <DotsIconActive width={24} height={24} />
                )}
            </button>

            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <Button onClick={handleEditClick} className={styles.dropdownItem}>
                        <EditIcon alt="Edit" width={24} height={24} className={styles.icon} />
                        Edit Post
                    </Button>
                    <Button onClick={handleDeleteClick} className={styles.dropdownItem}>
                        <DeleteIcon alt="Delete" width={24} height={24} className={styles.icon} />
                        Delete Post
                    </Button>
                </div>
            )}
        </div>
    );
};
