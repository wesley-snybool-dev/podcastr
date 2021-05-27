import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContexProvider } from '../contexts/PlayerContext';




function MyApp({ Component, pageProps }) {

  return (
    <PlayerContexProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContexProvider>
  )
}

export default MyApp
