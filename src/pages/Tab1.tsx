import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <RepoItem name="Repositorio1" avatarUrl="https://avatars.githubusercontent.com/u/214575627?v=4"/>
          <RepoItem name="Repositorio2" avatarUrl="https://avatars.githubusercontent.com/u/214575627?v=4"/>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
