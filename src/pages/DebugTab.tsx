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
import { usePictureGallery } from '../hooks/usePictureGallery';
import './DebugTab.css';

const DebugTab: React.FC = () => {
  const { pictures } = usePictureGallery();

  return (
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
          {getPlatforms().map(platform =>(
            <IonItem key={platform}>
              <IonLabel>{platform}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonListHeader>
          <IonLabel>Picture Data</IonLabel>
        </IonListHeader>
        <IonList>
          {pictures.map(picture =>(
            <IonItem key={picture.filePath}>
              <div>
                <IonLabel className='debug-item-label' >{picture.filePath}</IonLabel>
                <IonLabel className='debug-item-label'>{picture.webviewPath}</IonLabel>
              </div>
              
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DebugTab;
