type ImageFilter = {
    id: string;
    name: string;
    apply: (context: CanvasRenderingContext2D, width: number, height: number) => void;
};

type FilterApplicationResult = {
    file: File;
    url: string;
};

export const AVAILABLE_FILTERS: ImageFilter[] = [
    {
        id: 'normal',
        name: 'Normal',
        apply: () => {} // No operation
    },
    {
        id: 'clarendon',
        name: 'Clarendon',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                // Увеличиваем контраст и насыщенность
                data[i] = Math.min(255, data[i] * 1.1);     // R
                data[i + 1] = Math.min(255, data[i + 1] * 1.05); // G
                data[i + 2] = Math.min(255, data[i + 2] * 1.05); // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'grayscale',
        name: 'Grayscale',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                data[i] = avg;     // R
                data[i + 1] = avg; // G
                data[i + 2] = avg; // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'sepia',
        name: 'Sepia',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'invert',
        name: 'Invert',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];     // R
                data[i + 1] = 255 - data[i + 1]; // G
                data[i + 2] = 255 - data[i + 2]; // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'vintage',
        name: 'Vintage',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 0.9);     // R
                data[i + 1] = Math.min(255, data[i + 1] * 0.7); // G
                data[i + 2] = Math.min(255, data[i + 2] * 0.8); // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'cool',
        name: 'Cool',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 0.9);     // R
                data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
                data[i + 2] = Math.min(255, data[i + 2] * 1.2); // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'warm',
        name: 'Warm',
        apply: (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 1.2);     // R
                data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
                data[i + 2] = Math.min(255, data[i + 2] * 0.9); // B
            }

            ctx.putImageData(imageData, 0, 0);
        }
    },
    {
        id: 'blur',
        name: 'Blur',
        apply: (ctx, width, height) => {
            // Упрощенный blur эффект
            ctx.filter = 'blur(4px)';
            ctx.drawImage(ctx.canvas, 0, 0);
            ctx.filter = 'none';
        }
    }
];

export const applyFilter = async (
    imageUrl: string,
    filterId: string,
    options?: { width?: number; height?: number }
): Promise<FilterApplicationResult> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error('Could not get canvas context');
                }

                // Устанавливаем размеры
                canvas.width = options?.width || img.width;
                canvas.height = options?.height || img.height;

                // Рисуем изображение
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Применяем фильтр
                const filter = AVAILABLE_FILTERS.find(f => f.id === filterId) || AVAILABLE_FILTERS[0];
                filter.apply(ctx, canvas.width, canvas.height);

                // Конвертируем в Blob
                canvas.toBlob((blob) => {
                    if (!blob) {
                        throw new Error('Failed to create blob');
                    }

                    resolve({
                        file: new File([blob], `filtered-${Date.now()}.jpg`, { type: 'image/jpeg' }),
                        url: URL.createObjectURL(blob)
                    });
                }, 'image/jpeg', 0.9);

            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageUrl;
    });
};

export const generateFilterPreviews = async (imageUrl: string, size = 100): Promise<Record<string, string>> => {
    const previews: Record<string, string> = {};

    await Promise.all(
        AVAILABLE_FILTERS.map(async (filter) => {
            try {
                const result = await applyFilter(imageUrl, filter.id, {
                    width: size,
                    height: size
                });
                previews[filter.id] = result.url;
            } catch (error) {
                console.error(`Error generating preview for ${filter.name}:`, error);
                previews[filter.id] = imageUrl;
            }
        })
    );

    return previews;
};

export const revokeObjectURLs = (urls: string[]) => {
    urls.forEach(url => URL.revokeObjectURL(url));
};