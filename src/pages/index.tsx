import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar"
import { Profile } from "../components/profile"
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/challengeBox";
import { CountdownProvider } from "../contexts/countdownContext";

export default function Home() {
  return (
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
  )
}
