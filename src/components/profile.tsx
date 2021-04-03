
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/challengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, getChallengerName, getChallengerPhoto } = useContext(ChallengeContext);
    return(
        <div className={styles.profileContainer}>
            <img src={getChallengerPhoto()} alt="windstonp"/>
            <div>
                <strong>
                    {getChallengerName()}
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}