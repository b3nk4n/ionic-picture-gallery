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

const PICTURE_STORAGE = 'pictures';

export function usePictureGallery() {
  const [pictures, setPictures] = useState<TakenPicture[]>([]);

  const savePicture = async (photo: Photo, fileName: string): Promise<TakenPicture> => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filePath: fileName,
      // Use webPath instead of base64 to display the new image since it's already loaded into memory
      webviewPath: photo.webPath,
    };
  };

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PICTURE_STORAGE });
      const picturesInPreferences = (value ? JSON.parse(value) : []) as TakenPicture[];

      for (let picture of picturesInPreferences) {
        const file = await Filesystem.readFile({
          path: picture.filePath,
          directory: Directory.Data,
        });

        // Web platform only: Load the picture as base64 data
        picture.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
      setPictures(picturesInPreferences);
    };
    loadSaved();
  }, []);

  const takePicture = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';
    const savedPicture = await savePicture(photo, fileName);
    const newPictures = [savedPicture, ...pictures];
    setPictures(newPictures);

    Preferences.set({
      key: PICTURE_STORAGE,
      value: JSON.stringify(newPictures)
    });
  };

  return {
    pictures,
    takePicture
  };
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}