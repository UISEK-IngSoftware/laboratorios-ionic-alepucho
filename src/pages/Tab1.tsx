import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {

  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading]=React.useState<boolean>(false);
  const [errorMsg, setError]=React.useState<string>("");

  const loadRepos = async () => {
    setLoading(true);
    fetchRepositories().then((reposData)=>{
      setRepos(reposData);
    }).catch((error)=>{
      setError("Error al cargar los repositorios: " + error);
    }).finally(()=> setLoading(false))
  }
  
  useIonViewWillEnter(()=>{
    loadRepos();
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map(repo=>(
            <RepoItem key={repo.id} {...repo}/>
          ))}
        </IonList>
        {loading&&<LoadingSpinner isOpen={loading}/>}
        {errorMsg!==""&&(
          <IonText color ="danger">
            {errorMsg}
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
