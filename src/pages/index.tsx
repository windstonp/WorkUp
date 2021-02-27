import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar"
import { Profile } from "../components/profile"
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/challengeBox";
import { CountdownProvider } from "../contexts/countdownContext";
import { ChallengesProvider } from "../contexts/challengesContext";

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props :HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
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