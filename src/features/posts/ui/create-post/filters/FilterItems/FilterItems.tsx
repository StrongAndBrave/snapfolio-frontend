'use client';
import { useEffect, useState } from 'react';
import styles from '@/features/posts/ui/create-post/filters/FilterItems/FilterItems.module.scss';
import { generateFilterPreviews } from '@/features/posts/lib/imageFilters';
import Image from 'next/image';

type Props = {
    activeImageUrl?: string;
    onFilterSelect: (filterId: string) => void;
};

export const FilterItems = ({ activeImageUrl, onFilterSelect }: Props) => {
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [currentPreviewUrls, setCurrentPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        if (!activeImageUrl) return;

        let isMounted = true;

        const loadPreviews = async () => {
            try {
                const generatedPreviews = await generateFilterPreviews(activeImageUrl, 100);

                if (isMounted) {
                    // Сохраняем URL для последующей очистки
                    setCurrentPreviewUrls(Object.values(generatedPreviews));
                    setPreviews(generatedPreviews);
                }
            } catch (error) {
                console.error('Error generating filter previews:', error);
                if (isMounted) {
                    setPreviews({});
                }
            }
        };

        loadPreviews();

        return () => {
            isMounted = false;
            // Очищаем предыдущие превью
            currentPreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [activeImageUrl, currentPreviewUrls]);

    const filters = [
        { id: 'normal', name: 'Normal' },
        { id: 'clarendon', name: 'Clarendon' },
        { id: 'grayscale', name: 'Grayscale' },
        { id: 'sepia', name: 'Sepia' },
        { id: 'invert', name: 'Invert' },
        { id: 'vintage', name: 'Vintage' },
        { id: 'cool', name: 'Cool' },
        { id: 'warm', name: 'Warm' },
        { id: 'blur', name: 'Blur' },
    ];

    return (
        <div className={styles.filters}>
            {filters.map(filter => (
                <div key={filter.id} className={styles.filter} onClick={() => onFilterSelect(filter.id)}>
                    <Image
                        src={previews[filter.id] || activeImageUrl || ''}
                        className={styles.image}
                        alt={filter.name}
                        width={108}
                        height={108}
                        onError={e => {
                            // Fallback если изображение не загрузилось
                            if (activeImageUrl && e.currentTarget.src !== activeImageUrl) {
                                e.currentTarget.src = activeImageUrl;
                            }
                        }}
                    />
                    <p className={styles.title}>{filter.name}</p>
                </div>
            ))}
        </div>
    );
};
