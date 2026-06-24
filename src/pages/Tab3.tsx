import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import { GithubUser } from '../interfaces/GithubUser';
import React from 'react';
import { getUserInfo } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom';
import { logoGithub, logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setError] = React.useState<string>("");
  const history = useHistory();

  const loadUserInfo = async () => {
    setLoading(true);
    getUserInfo().then((user) => setUserInfo(user))
      .catch((error) => setError("Error al cargar la información del usuario: " + error))
      .finally(() => setLoading(false))
  }

  const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
  }

  useIonViewWillEnter(() => {
    loadUserInfo();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          {userInfo && (<IonCard className="card">
            <img src={userInfo?.avatar_url} alt={userInfo?.login} />
            <IonCardHeader>
              <IonCardTitle>{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {userInfo?.bio || 'Sin biografía disponible.'}
            </IonCardContent>
          </IonCard>)}
          {errorMsg !== "" && (
            <IonText color="danger">
              {errorMsg}
            </IonText>
          )}
          <IonButton
            expand="block"
            onClick={handleLogout}
          >
            <IonIcon icon={logoGithub} slot="start" />
            <IonIcon icon={logOutOutline} slot="start" />
            Logout
          </IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;