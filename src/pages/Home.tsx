import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChallengeBox } from "../components/challengeBox";
import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar";
import { Navbar } from "../components/Navbar";
import { Profile } from "../components/profile";
import { ChallengesProvider } from "../contexts/challengesContext";
import { CountdownProvider } from "../contexts/countdownContext";
import styles from '../styles/pages/Home.module.css';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props :HomeProps) {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(()=>{
    if(!loading){
      if(session){
        setUser(session.user);
      }else{
        router.push('/');
      }
    }
  },[session, loading]);
  if (typeof window !== 'undefined' && loading || !user)
  { 
    return  null;
  }
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      challengerUserInfo={user}
    >
      <main>
        <Navbar/>
        <div className={styles.container}>
          <Head>
            <title>
              Inicio - WorkUp
            </title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges/>
                <Countdown />
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
        </div>
      </main>
    </ChallengesProvider>
  )
}
export const getServerSideProps :GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return{
    props:{
      level: Number(level ?? 1), 
      currentExperience: Number(currentExperience ?? 0), 
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }
}