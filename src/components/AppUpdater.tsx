import React, { useEffect, useState } from 'react';

import { IonAlert, useIonLoading, useIonToast } from '@ionic/react';

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

let serviceWorker: ServiceWorker | null;

const AppUpdater: React.FC = () => {
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ showLoading, dismissLoading ] = useIonLoading();
    const [ showToast ] = useIonToast();

    const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
        setShowUpdate(true)
        serviceWorker = registration.waiting
    };
    
    const onServiceWorkerSuccess = () => {
        showToast('App installed as a PWA.', 3000);
    };

    const updateServiceWorker = () => {
        if (!serviceWorker) {
            return;
        }

        showLoading('Updating app...');

        serviceWorker.onstatechange = () => {
            if (serviceWorker?.state === 'activated' && navigator.serviceWorker.controller) {
                dismissLoading();

                // Reload page if waiting was successfully skipped
                window.location.reload();
            }
        }
        serviceWorker.postMessage({ type: 'SKIP_WAITING' });
    };

    useEffect(() => {
        serviceWorkerRegistration.register({
            onUpdate: onServiceWorkerUpdate,
            onSuccess: onServiceWorkerSuccess
        });
    }, []);

    if (!showUpdate) {
        return null;
    }

    return (
        <>
            <IonAlert
                isOpen={showUpdate}
                onDidDismiss={() => setShowUpdate(false)}
                header="Update available"
                message="An updated version of this app is available. Do you want to update now?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setShowUpdate(false)
                    },
                    {
                        text: 'Ok',
                        handler: () => {
                            setShowUpdate(false);
                            updateServiceWorker();
                        }
                    }
                ]}
            />
        </>
    );
};

export default AppUpdater;
