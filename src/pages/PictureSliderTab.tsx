import React from 'react';
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonicSlides } from '@ionic/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectCube, EffectCards } from 'swiper';
import { TakenPicture } from '../hooks/usePictureGallery';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-cube';
import '@ionic/react/css/ionic-swiper.css';
import './PictureSliderTab.css';

interface Props {
  pictures: TakenPicture[]
}

const PictureSliderTab: React.FC<Props> = ({ pictures }: Props) => {
  const effect = pictures.length > 3 ? 'cards' : 'cube';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Picture Slider</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <Swiper className='full-height'
        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectCube, EffectCards, IonicSlides]}
        autoplay={{delay: 3000 }}
        loop
        keyboard={true}
        pagination={{clickable: true}}
        scrollbar={false}
        zoom={true}
        effect={effect}>
        {pictures.map(picture => (
          <SwiperSlide key={picture.fileName}>
            <IonImg src={picture.webviewPath} />
          </SwiperSlide>
        ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default PictureSliderTab;
