import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle,
  IonToolbar,
  IonImg,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
  IonPopover,
  IonList,
  IonItem
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { TakenPicture } from '../hooks/usePictureGallery';

import './PictureDetailsPage.css';

interface Props extends RouteComponentProps<{
  fileName: string;
}> {
  pictures: TakenPicture[],
  deletePicture(picture: TakenPicture): Promise<void>
}

const PictureDetailsPage: React.FC<Props> = ({ match, pictures, deletePicture }: Props) => {
  const history = useHistory();

  const fileName = match.params.fileName;
  const filterdPictures = pictures.filter(p => p.fileName === fileName);

  if (filterdPictures.length === 0) {
    return null;
  }

  const picture = filterdPictures[0];

  const handleDelete = () => {
    console.log('delete');
    deletePicture(picture);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{fileName}</IonTitle>
          <IonButtons slot="end">
            <IonButton id="click-trigger">
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
            <IonPopover trigger="click-trigger" triggerAction="click" dismissOnSelect>
              <IonContent>
                <IonList>
                  <IonItem button detail={false}>
                    Rename
                  </IonItem>
                  <IonItem button detail={false} onClick={handleDelete}>
                    Delete
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={picture.webviewPath} />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(PictureDetailsPage);
