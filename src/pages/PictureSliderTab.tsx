import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './PictureSliderTab.css';

const PictureSliderTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Picture Slider</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* https://ionicframework.com/docs/react/slides */}
      </IonContent>
    </IonPage>
  );
};

export default PictureSliderTab;
