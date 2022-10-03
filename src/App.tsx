import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums, images, desktop, phonePortrait } from 'ionicons/icons';
import { usePictureGallery } from './hooks/usePictureGallery';
import PictureDetailsPage from './pages/PictureDetailsPage';
import PictureSliderTab from './pages/PictureSliderTab';
import AppUpdater from './components/AppUpdater';
import NotFoundPage from './pages/NotFoundPage';
import PicturesTab from './pages/PicturesTab';
import DebugTab from './pages/DebugTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const { pictures, takePicture, renamePicture, deletePicture } = usePictureGallery();
  const platformIcon = isPlatform('hybrid') ? phonePortrait : desktop;

  return (
    <>
      <AppUpdater />
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/picture-slider">
                <PictureSliderTab pictures={pictures} />
              </Route>
              <Route exact path="/pictures">
                <PicturesTab
                  pictures={pictures}
                  takePicture={takePicture}
                  deletePicture={deletePicture}
                />
              </Route>
              <Route exact path="/pictures/view/:fileName">
                <PictureDetailsPage 
                  pictures={pictures}
                  renamePicture={renamePicture}
                  deletePicture={deletePicture}
                />
              </Route>
              <Route path="/debug">
                <DebugTab pictures={pictures} />
              </Route>
              <Route exact path="/">
                <Redirect to="/pictures" />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="picture-slider" href="/picture-slider">
                <IonIcon icon={albums} />
                <IonLabel>Slideshow</IonLabel>
              </IonTabButton>
              <IonTabButton tab="pictures" href="/pictures">
                <IonIcon icon={images} />
                <IonLabel>Pictures</IonLabel>
              </IonTabButton>
              <IonTabButton tab="debug" href="/debug">
                <IonIcon icon={platformIcon} />
                <IonLabel>Debug</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
