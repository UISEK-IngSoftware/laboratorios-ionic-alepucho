import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/214575627?v=4" alt="Avatar" />
            <IonCardTitle>Alejandro Brito</IonCardTitle>
            <IonCardSubtitle>alepucho</IonCardSubtitle>
            <IonCardHeader>
              <IonCardContent>
                Hola, me gusta mi mujer, jugar jueguitos y la plata.
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
