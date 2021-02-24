import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar"
import { Profile } from "../components/profile"
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Inicio - WorkUp
        </title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges/>
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
