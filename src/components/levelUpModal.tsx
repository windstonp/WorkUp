import { useContext } from 'react';
import { ChallengeContext } from '../contexts/challengesContext';
import styles from '../styles/components/levelUpModal.module.css';
export function LevelUpModal(){
    const {level, closeLevelUpModal} = useContext(ChallengeContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>
                    você alcançou um novo level.
                </p>
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="icons/close.svg" alt="close"/>
                </button>
            </div>
        </div>
    )
}