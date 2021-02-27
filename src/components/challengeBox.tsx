import { useContext } from "react";
import { ChallengeContext } from "../contexts/challengesContext";
import { CountdownContext } from "../contexts/countdownContext";
import styles  from "../styles/components/challengeBox.module.css";
export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);
    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }
    return(
            <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                    <div className={styles.challengesActive}>
                        <header>
                            Ganhe {activeChallenge.amount} xp
                        </header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} alt="body"/>
                            <strong>
                                Novo desafio
                            </strong>
                            <p>
                                {activeChallenge.description}
                            </p>
                        </main>
                        <footer>
                            <button
                                type="button"
                                className={styles.challengeFailButton}
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSucceededButton}
                                onClick={handleChallengeSucceeded}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                ) : (
                    <div className={styles.challengeBoxNotActive}>
                        <strong>
                            Finalize um ciclo para receber um desafio
                        </strong>
                        <p>
                            <img src="icons/level-up.svg"  alt="level-up"/>
                            Avance de level completando desafios!.
                        </p>
                    </div>
                )}
            </div>
    )
    
}