import { useState } from 'react';
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
import RenameDialog from '../components/RenameDialog';

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
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);

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

  const renameFile = (newFileName: string) => {
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

        <RenameDialog 
          open={isRenameModalOpen}
          placeholder={fileName}
          onConfirm={renameFile}
          onCancel={() => setIsRenameModalOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(PictureDetailsPage);
