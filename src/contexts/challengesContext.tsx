import { createContext, useState, ReactNode, useEffect } from 'react';
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
    experienceToNextLevel: number,
    completeChallenge: () => void
}
export function ChallengesProvider( { children } :ChallengesProviderProps ){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    useEffect(()=>{
        Notification.requestPermission();
    },[]);
    function levelUp(){
        setLevel(level + 1);
    }
    function startNewChallenge(){
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();
        if(Notification.permission == 'granted'){
            new Notification('Novo Desafio!',{
                body: `Valendo: ${challenge.amount}xp`,
                icon: 'favicon.png'
            });
        }
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
            setCurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted( challengesCompleted + 1);
        }
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
                        experienceToNextLevel,
                        completeChallenge
                    }
                }
        >
            {children}
        </ChallengeContext.Provider>
    )
}