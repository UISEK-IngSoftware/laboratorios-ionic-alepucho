import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory, useLocation } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository, updateRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';

interface LocationState {
  repository?: Repository;
}

const Tab2: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [repoFormData, setRepoFormData] = React.useState<RepositoryPayload>({
    name: '',
    description: ''
  });
  const history = useHistory();
  const location = useLocation<LocationState>();
  const repositoryToEdit = location.state?.repository;
  const isEditing = Boolean(repositoryToEdit);

  React.useEffect(() => {
    if (repositoryToEdit) {
      setRepoFormData({
        name: repositoryToEdit.name,
        description: repositoryToEdit.description || ''
      });
    } else {
      setRepoFormData({ name: '', description: '' });
    }
    setErrorMsg('');
  }, [repositoryToEdit]);

  const saveRepository = async () => {
    if (repoFormData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      if (isEditing && repositoryToEdit) {
        await updateRepository(repositoryToEdit.owner.login, repositoryToEdit.name, repoFormData);
      } else {
        await createRepository(repoFormData);
      }
      history.push('/tab1');
    } catch (error) {
      setErrorMsg(isEditing ? 'Error al actualizar el repositorio: ' + error : 'Error al crear el repositorio: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => setErrorMsg(''));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Actualizar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? 'Actualizar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            className='form-input'
            label="Nombre del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Nombre del Repositorio'
            value={repoFormData.name}
            onIonChange={(e) => setRepoFormData({ ...repoFormData, name: e.detail.value || '' })}
          ></IonInput>
          <IonTextarea
            className='form-field'
            label="Descripción del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del Repositorio'
            rows={5}
            value={repoFormData.description}
            onIonChange={(e) => setRepoFormData({ ...repoFormData, description: e.detail.value || '' })}
            autoGrow
          ></IonTextarea>
          {errorMsg !== '' && (
            <IonText color="danger">
              {errorMsg}
            </IonText>
          )}
          <IonButton
            className='form-field'
            expand="block"
            fill='solid'
            onClick={saveRepository}
          >
            {isEditing ? 'Actualizar Repositorio' : 'Crear Repositorio'}
          </IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;