import React from 'react';
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonicSlides } from '@ionic/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { TakenPicture } from '../hooks/usePictureGallery';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
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
          <IonTitle>Slideshow</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <Swiper className='full-height'
        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]}
        autoplay={{delay: 3000 }}
        loop
        keyboard={true}
        pagination={{clickable: true}}
        scrollbar={false}
        zoom={true}>
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
