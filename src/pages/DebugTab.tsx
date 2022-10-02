import { 
  IonContent,
  IonHeader,
  IonItem, 
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  getPlatforms, 
  IonListHeader
} from '@ionic/react';
import { TakenPicture } from '../hooks/usePictureGallery';

import './DebugTab.css';

interface Props {
  pictures: TakenPicture[]
}

const DebugTab: React.FC<Props> = ({ pictures }: Props) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Debug</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonListHeader>
        <IonLabel>Platforms</IonLabel>
      </IonListHeader>
      <IonList>
        {getPlatforms().map(platform => (
          <IonItem key={platform}>
            <IonLabel>{platform}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonListHeader>
        <IonLabel>Picture Data</IonLabel>
      </IonListHeader>
      <IonList>
        {pictures.map(picture => (
          <IonItem key={picture.filePath}>
            <div>
              <IonLabel className='debug-item-label'>{`File name: ${picture.fileName}`}</IonLabel>
              <IonLabel className='debug-item-label'>{`File path: ${picture.filePath}`}</IonLabel>
            </div>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
);

export default DebugTab;
