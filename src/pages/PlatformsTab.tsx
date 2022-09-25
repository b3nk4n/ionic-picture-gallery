import { 
  IonContent,
  IonHeader,
  IonItem, 
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  getPlatforms 
} from '@ionic/react';
import './PlatformsTab.css';

const PlatformsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Platforms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {getPlatforms().map(platform =>(
            <IonItem key={platform}>
              <IonLabel>{platform}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PlatformsTab;
