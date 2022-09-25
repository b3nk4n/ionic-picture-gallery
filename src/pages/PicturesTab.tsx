import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePictureGallery, TakenPicture } from '../hooks/usePictureGallery';

import './PicturesTab.css';

const PicturesTab: React.FC = () => {
  const { pictures, takePicture, deletePicture } = usePictureGallery();
  const [pictureToDelete, setPictureToDelete] = useState<TakenPicture | null>(null)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pictures</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {pictures.map((picture, idx) => (
              <IonCol size="6" key={idx}>
                <IonImg 
                  src={picture.webviewPath}
                  onClick={() => setPictureToDelete(picture)}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePicture()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!pictureToDelete}
          buttons= {[
            {
              text: 'Remove',
              role: 'destructuve',
              icon: trash,
              handler: () => {
                if (pictureToDelete) {
                  deletePicture(pictureToDelete);
                  setPictureToDelete(null);
                }
              }
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel'
            }
          ]}
          onDidDismiss={() => setPictureToDelete(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PicturesTab;