import React from 'react';
import {createOutline, trashOutline, starOutline } from 'ionicons/icons'
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail} from '@ionic/react';  
import { Repository } from '../interfaces/Repository';

const RepoItem: React.FC<Repository> = ( repo ) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={repo.owner.avatar_url}alt={repo.name}/>
                </IonThumbnail>
                <IonLabel>
                    <h1>{repo.name}</h1>
                    {repo.description && <p>{repo.description}</p>}
                    {repo.language &&(<p><strong>Language:</strong>{repo.language}</p>)}
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption>
                    <IonIcon icon={createOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption>
                    <IonIcon icon={trashOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption>
                    <IonIcon icon={starOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default RepoItem;