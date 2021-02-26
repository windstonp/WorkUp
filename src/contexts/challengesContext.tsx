import { createContext, useState, ReactNode } from 'react';
import challenges from '../challenges.json';
export const ChallengeContext = createContext({} as ChallengesContextData);
interface ChallengesProviderProps{
    children: ReactNode
}
interface Challenge{
    type: 'body' | 'eye',
    description: string,
    amount: number
}
interface ChallengesContextData{
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experienceToNextLevel: number
}
export function ChallengesProvider( { children } :ChallengesProviderProps ){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState();
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    function levelUp(){
        setLevel(level + 1);
    }
    function startNewChallenge(){
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallenge(challenge);
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    return (
        <ChallengeContext.Provider 
            value=
                {
                    {
                        level,
                        levelUp, 
                        currentExperience, 
                        challengesCompleted,
                        startNewChallenge,
                        activeChallenge,
                        resetChallenge,
                        experienceToNextLevel
                    }
                }
        >
            {children}
        </ChallengeContext.Provider>
    )
}