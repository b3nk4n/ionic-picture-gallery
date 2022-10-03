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
import { TakenPicture, USE_PREFERENCES } from '../hooks/usePictureGallery';
import packageJson from "../../package.json";

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
        <IonLabel>App Info</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem key="__name">
          <IonLabel>{`App Name: ${packageJson.name}`}</IonLabel>
        </IonItem>
        <IonItem key="__version">
          <IonLabel>{`App Version: ${packageJson.version}`}</IonLabel>
        </IonItem>
        {Object.keys(process.env).map(envKey => (
          <IonItem key={envKey}>
            <IonLabel>{`${envKey}: ${process.env[envKey]}`}</IonLabel>
          </IonItem>
        ))}
      </IonList>

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
        <IonLabel>{`Picture Data (from ${USE_PREFERENCES ? 'Prefs' : 'Storage'})`}</IonLabel>
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
