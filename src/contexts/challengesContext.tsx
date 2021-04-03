import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/levelUpModal';
export const ChallengeContext = createContext({} as ChallengesContextData);
interface ChallengesProviderProps{
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    challengerName: string,
    challengerPhoto: string
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
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
    challengerName: string,
    challengerPhoto: string
}
export function ChallengesProvider( { children, ...rest } :ChallengesProviderProps ){
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [challengerName, setChallengerName] = useState(rest.challengerName); 
    const [challengerPhoto, setChallengerPhoto] = useState(rest.challengerPhoto); 
    useEffect(()=>{
        Notification.requestPermission();
    },[]);
    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted]);
    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted( challengesCompleted + 1);
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
                        completeChallenge,
                        closeLevelUpModal,
                        challengerName,
                        challengerPhoto
                    }
                }
        >
            {children}
            {isLevelUpModalOpen && 
                <LevelUpModal/>
            }
        </ChallengeContext.Provider>
    )
}