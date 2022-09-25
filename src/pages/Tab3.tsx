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
import './Tab3.css';

const Tab3: React.FC = () => {
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

export default Tab3;
