type Area = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type CroppedImageResult = {
    file: File;
    url: string;
};

type FlipOptions = {
    horizontal: boolean;
    vertical: boolean;
};

/**
 * Создает объект Image из URL
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

/**
 * Выполняет кроп изображения по заданным координатам
 */
export const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
): Promise<CroppedImageResult> => {
    // 1. Загружаем изображение с проверкой на ошибки
    const image = await createImage(imageSrc);
    if (!image.complete) {
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error("Image failed to load"));
        });
    }

    // 2. Нормализуем параметры кропа (важно!)
    const safeCrop = {
        x: Math.max(0, Math.min(pixelCrop.x, image.width - 1)),
        y: Math.max(0, Math.min(pixelCrop.y, image.height - 1)),
        width: Math.min(pixelCrop.width, image.width - pixelCrop.x),
        height: Math.min(pixelCrop.height, image.height - pixelCrop.y),
    };

    // 3. Проверяем, что кроп валиден
    if (safeCrop.width <= 0 || safeCrop.height <= 0) {
        throw new Error("Invalid crop area: zero or negative dimensions");
    }

    // 4. Создаем canvas и применяем кроп
    const canvas = document.createElement('canvas');
    canvas.width = safeCrop.width;
    canvas.height = safeCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error("Canvas context not available");

    ctx.drawImage(
        image,
        safeCrop.x, safeCrop.y, safeCrop.width, safeCrop.height, // source
        0, 0, safeCrop.width, safeCrop.height                     // destination
    );

    // 5. Конвертируем в Blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
            }
            const file = new File([blob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });
            resolve({ file, url: URL.createObjectURL(file) });
        }, 'image/jpeg', 0.9);
    });
};

/**
 * Вспомогательные функции
 */
const getRadianAngle = (degreeValue: number): number => {
    return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number): { width: number; height: number } => {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
};

/**
 * Генерирует превью изображения
 */
export const generateImagePreview = async (
    file: File,
    maxWidth?: number,
    maxHeight?: number
): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (maxWidth && width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                if (maxHeight && height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
};