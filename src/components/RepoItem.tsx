import React from 'react';
import { trashOutline, pencil } from 'ionicons/icons';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Repository } from '../interfaces/Repository';
import { deleteRepository } from '../services/GithubService';

interface RepoItemProps extends Repository {
    onRepositoryChanged?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ onRepositoryChanged, ...repo }) => {
    const history = useHistory();

    const handleDelete = async () => {
        const confirmed = window.confirm(`¿Seguro que deseas eliminar el repositorio ${repo.name}?`);

        if (!confirmed) {
            return;
        }

        try {
            await deleteRepository(repo.owner.login, repo.name);
            onRepositoryChanged?.();
        } catch (error) {
            console.error('Error al eliminar el repositorio:', error);
        }
    };

    const handleUpdate = () => {
        history.push('/tab2', { repository: repo });
    };

    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={repo.owner.avatar_url} alt={repo.name} />
                </IonThumbnail>
                <IonLabel>
                    <h1>{repo.name}</h1>
                    {repo.description && <p>{repo.description}</p>}
                    {repo.language && (<p><strong>Language:</strong>{repo.language}</p>)}
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption color="danger" onClick={() => void handleDelete()}>
                    <IonIcon icon={trashOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color="primary" onClick={handleUpdate}>
                    <IonIcon icon={pencil} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default RepoItem;