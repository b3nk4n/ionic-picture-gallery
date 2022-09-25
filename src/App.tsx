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
import PictureSliderTab from './pages/PictureSliderTab';
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
  const platformIcon = isPlatform('hybrid') ? phonePortrait : desktop;

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/picture-slider">
              <PictureSliderTab />
            </Route>
            <Route exact path="/pictures">
              <PicturesTab />
            </Route>
            <Route path="/debug">
              <DebugTab />
            </Route>
            <Route exact path="/">
              <Redirect to="/pictures" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="picture-slider" href="/picture-slider">
              <IonIcon icon={albums} />
              <IonLabel>Picture Slider</IonLabel>
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
  );
};

export default App;
