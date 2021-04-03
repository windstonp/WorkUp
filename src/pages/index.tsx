import React from 'react';
import style from "../styles/pages/Login.module.css";
import { useSession, signIn, signOut } from 'next-auth/client';
import Link from 'next/link';
export default function LoginPage(){
  const [ session, loading ] = useSession();
  return(
    <div className={style.container}>
      <div>
        <img src="/icons/login-logo.svg" alt="logo-transparent"/>
      </div>
      <div>
        <form>
          <img src="/logo-full.svg" alt="logo full"/>
          <h1>
            Bem Vindo!
          </h1>
          <div className={style.githubMessage}>
            <img src="/icons/github.svg" alt="github logo"/>
            <p>
              Faça login com seu Github para começar
            </p>
          </div>
          <div>
            {(!session) ?
              <button className={style.loginButton} onClick={signIn}>Login</button>
              :
              <Link href="/Home">
                <button className={style.loginButton}>
                    acesse seu dashboard!
                </button>
              </Link>
            }
          </div>
        </form>
      </div>
    </div>
  )
}