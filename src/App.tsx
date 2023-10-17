import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToggle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import History from './pages/History';
import ProductsContextProvider from './data/ProductContextProvider';

import type { ToggleCustomEvent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { toggle } from 'ionicons/icons';

setupIonicReact();


const App: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState(false);

  const toggleChange = (e: ToggleCustomEvent) => {
    toggleDarkTheme(e.detail.checked);
  }

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  }

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    initializeDarkTheme(prefersDark.matches);
    prefersDark.addEventListener('change', (e) => initializeDarkTheme(e.matches));
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Menu
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem button routerLink='/wishlist'>
                  Wishlist
                </IonItem>
                <IonItem button routerLink='/history'>
                  History
                </IonItem>
                <IonItem button routerLink='/profile'>
                  Profile
                </IonItem>
                <IonItem button>
                  <IonToggle checked={themeToggle} onIonChange={toggleChange}>Dark Theme</IonToggle>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <ProductsContextProvider>
          <IonRouterOutlet id='main'>
            <Route exact path="/home" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/wishlist' component={Wishlist} />
            <Route exact path='/history' component={History} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </ProductsContextProvider>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
