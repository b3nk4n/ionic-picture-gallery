import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

export interface TakenPicture {
  fileName: string;
  filePath: string;
  webviewPath?: string;
}

const PICTURE_STORAGE = 'pictures';

export function usePictureGallery() {
  const [pictures, setPictures] = useState<TakenPicture[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PICTURE_STORAGE });
      const picturesInPreferences = (value ? JSON.parse(value) : []) as TakenPicture[];

      if (!isPlatform('hybrid')) {
        for (let picture of picturesInPreferences) {
          const file = await Filesystem.readFile({
            path: picture.filePath,
            directory: Directory.Data,
          });
  
          // Web platform only: Load the picture as base64 data, because Filesystem API uses IndexedDB under the hood
          picture.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }

      setPictures(picturesInPreferences);
    };
    loadSaved();
  }, []);

  const savePicture = async (photo: Photo, fileName: string): Promise<TakenPicture> => {
    const base64Data = await base64FromPhoto(photo);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {
      // Display new image by rewriting the file:// path to HTTP
      return {
        fileName,
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      };
    }

    return {
      fileName,
      filePath: fileName,
      // Use webPath instead of base64 to display the new image since it's already loaded into memory
      webviewPath: photo.webPath,
    };
  };

  const takePicture = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';
    const savedPicture = await savePicture(photo, fileName);
    const newPictures = [savedPicture, ...pictures];
    
    Preferences.set({
      key: PICTURE_STORAGE,
      value: JSON.stringify(newPictures)
    });
    setPictures(newPictures);
  };

  const deletePicture = async (picture: TakenPicture) => {
    const filteredPictures = pictures.filter(p => p.filePath !== picture.filePath);

    const fileName = picture.filePath.substring(picture.filePath.lastIndexOf('/') + 1)
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data
    });

    Preferences.set({
      key: PICTURE_STORAGE,
      value: JSON.stringify(filteredPictures)
    });
    setPictures(filteredPictures)
  };

  return {
    pictures,
    takePicture,
    deletePicture
  };
}

async function base64FromPath(path: string): Promise<string> {
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

async function base64FromPhoto(photo: Photo): Promise<string> {
  if (isPlatform('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path!
    });
    return file.data;
  }
  // web
  return await base64FromPath(photo.webPath!);
}