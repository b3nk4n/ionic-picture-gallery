import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

export interface TakenPicture {
    filePath: string;
    webviewPath?: string;
}

export function usePictureGallery() {
    const [pictures, setPictures] = useState<TakenPicture[]>([]);

    const takePicture = async () => {
        const picture = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.jpeg';
        const newPictures = [
            {
                filePath: fileName,
                webviewPath: picture.webPath
            },
            ...pictures
        ];
        setPictures(newPictures);
    };

    return {
        pictures,
        takePicture
    }
}