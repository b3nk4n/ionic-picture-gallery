import { useState } from 'react';
import { useHistory } from 'react-router';
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
import { TakenPicture } from '../hooks/usePictureGallery';
import { camera, trash, close, image } from 'ionicons/icons';

import './PicturesTab.css';

interface Props {
  pictures: TakenPicture[],
  takePicture(): Promise<void>,
  deletePicture(picture: TakenPicture): Promise<void>
}

const PicturesTab: React.FC<Props> = ({ pictures, takePicture, deletePicture }: Props) => {
  const history = useHistory()
  const [selectedPicture, setSelectedPicture] = useState<TakenPicture | null>(null)

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
                  onClick={() => setSelectedPicture(picture)}
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
          isOpen={!!selectedPicture}
          buttons= {[
            {
              text: 'View',
              role: 'descructive',
              icon: image,
              handler: () => {
                if (selectedPicture) {
                  history.push(`/pictures/view/${selectedPicture.fileName}`);
                }
              }
            },
            {
              text: 'Remove',
              role: 'destructuve',
              icon: trash,
              handler: () => {
                if (selectedPicture) {
                  deletePicture(selectedPicture);
                  setSelectedPicture(null);
                }
              }
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel'
            }
          ]}
          onDidDismiss={() => setSelectedPicture(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PicturesTab;
