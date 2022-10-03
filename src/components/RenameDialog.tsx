import React, { useRef, useState } from "react";
import { useHistory } from "react-router";

import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { isBlank } from "../utils/stringUtils";

interface Props {
    open: boolean
    placeholder?: string
    onConfirm: (fileName: string) => void
    onCancel: () => void
}

const RenameDialog: React.FC<Props> = ({ open, placeholder, onConfirm, onCancel }: Props) => {
    const history = useHistory();
    const input = useRef<HTMLIonInputElement>(null);
    const [showToast] = useIonToast();

    const confirmRename = () => {
        const newFileName = '' + input.current?.value;
    
        if (isBlank(newFileName)) {
          showToast('Renaming failed: file name should not be blank.', 3000)
          return;
        }

        onConfirm(newFileName);
      }

    return (
        <IonModal isOpen={open} trigger="open" onIonModalDidDismiss={onCancel}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onCancel}>Cancel</IonButton>
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
                    <IonInput ref={input} type="text" placeholder={placeholder ?? 'Name.jpeg'} />
                </IonItem>
            </IonContent>
        </IonModal>
    );
}

export default RenameDialog;