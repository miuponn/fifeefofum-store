import { useState, useEffect } from 'react';

type ImageUrls = string | string[];

const useImagePreloader = (imageUrls: ImageUrls): boolean => {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadImages = (urls: string[]): Promise<void[]> => {
            const promises: Promise<void>[] = urls.map((url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                });
            });
            return Promise.all(promises);
        };

        const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
        const validUrls = urls.filter(url => url && url.length > 0);

        if (validUrls.length === 0) {
            setImagesLoaded(true);
            return;
        }

        loadImages(validUrls)
            .then(() => setImagesLoaded(true))
            .catch(() => setImagesLoaded(false));

        return () => setImagesLoaded(false);
    }, [imageUrls]);

    return imagesLoaded;
};

export default useImagePreloader;