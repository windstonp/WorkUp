
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/challengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, challengerName, challengerPhoto } = useContext(ChallengeContext);
    return(
        <div className={styles.profileContainer}>
            <img src={challengerPhoto} alt="windstonp"/>
            <div>
                <strong>
                    {challengerName}
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}