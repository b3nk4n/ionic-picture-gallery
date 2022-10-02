import React from 'react';
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { TakenPicture } from '../hooks/usePictureGallery';
import { Swiper, SwiperSlide } from 'swiper/react';

//import 'swiper/swiper.min.css';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import './PictureSliderTab.css';

interface Props {
  pictures: TakenPicture[]
}

const PictureSliderTab: React.FC<Props> = ({ pictures }: Props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Picture Slider</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <Swiper>
        {pictures.map(picture => (
          <SwiperSlide>
            <IonImg src={picture.webviewPath} />
          </SwiperSlide>
        ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default PictureSliderTab;
