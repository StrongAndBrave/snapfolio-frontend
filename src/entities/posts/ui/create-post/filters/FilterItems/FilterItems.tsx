import { useEffect, useState } from "react";
import styles from "@/entities/posts/ui/create-post/filters/FilterItems/FilterItems.module.scss";
import {generateFilterPreviews} from "@/entities/posts/lib/imageFilters";

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
        const newPreviewUrls: string[] = [];

        const loadPreviews = async () => {
            try {
                const generatedPreviews = await generateFilterPreviews(activeImageUrl, 100);

                if (isMounted) {
                    // Сохраняем URL для последующей очистки
                    setCurrentPreviewUrls(Object.values(generatedPreviews));
                    setPreviews(generatedPreviews);
                }
            } catch (error) {
                console.error("Error generating filter previews:", error);
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
    }, [activeImageUrl]);

    const filters = [
        { id: 'normal', name: 'Normal' },
        { id: 'clarendon', name: 'Clarendon' },
        { id: 'grayscale', name: 'Grayscale' },
        { id: 'sepia', name: 'Sepia' },
        { id: 'invert', name: 'Invert' },
        { id: 'vintage', name: 'Vintage' },
        { id: 'cool', name: 'Cool' },
        { id: 'warm', name: 'Warm' },
        { id: 'blur', name: 'Blur' }
    ];

    return (
        <div className={styles.filters}>
            {filters.map(filter => (
                <div
                    key={filter.id}
                    className={styles.filter}
                    onClick={() => onFilterSelect(filter.id)}
                >
                    <img
                        src={previews[filter.id] || activeImageUrl}
                        className={styles.image}
                        alt={filter.name}
                        onError={(e) => {
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