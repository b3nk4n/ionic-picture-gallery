import { useRef, useState } from 'react';
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
  IonItem,
  IonModal,
  IonLabel,
  IonInput,
  useIonToast
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { TakenPicture } from '../hooks/usePictureGallery';
import { isBlank } from '../utils/stringUtils';

import './PictureDetailsPage.css';

interface Props extends RouteComponentProps<{
  fileName: string;
}> {
  pictures: TakenPicture[],
  renamePicture(picture: TakenPicture, name: string): Promise<void>
  deletePicture(picture: TakenPicture): Promise<void>
}

const PictureDetailsPage: React.FC<Props> = ({ match, pictures, renamePicture, deletePicture }: Props) => {
  const history = useHistory();
  const input = useRef<HTMLIonInputElement>(null); // TODO extract rename modal component
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [showToast] = useIonToast();

  const fileName = match.params.fileName;
  const filterdPictures = pictures.filter(p => p.fileName === fileName);

  if (filterdPictures.length === 0) {
    return null;
  }

  const picture = filterdPictures[0];

  const handleDelete = () => {
    deletePicture(picture);
    history.goBack();
  };

  const confirmRename = () => {
    const newFileName = '' + input.current?.value;

    if (isBlank(newFileName)) {
      showToast('Renaming failed: file name should not be blank.', 3000)
      return;
    }

    renamePicture(picture, newFileName);

    setIsRenameModalOpen(false);

    history.replace(`/pictures/view/${newFileName}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{fileName}</IonTitle>
          <IonButtons slot="end">
            <IonButton id="open-popover-menu">
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
            <IonPopover trigger="open-popover-menu" triggerAction="click" dismissOnSelect>
              <IonContent>
                <IonList>
                  <IonItem button detail={false} onClick={() => setIsRenameModalOpen(true)}>
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

        <IonModal isOpen={isRenameModalOpen} trigger="open" onIonModalDidDismiss={() => setIsRenameModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsRenameModalOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Rename</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={confirmRename}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter file name</IonLabel>
              <IonInput ref={input} type="text" placeholder={fileName} />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(PictureDetailsPage);
