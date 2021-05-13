import { GetStaticProps } from "next"
import { api } from "../services/api"
import { format, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"


import styles from './home.module.scss'




type Episode = {
  id: string,
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  durationAsString: string,
  url: string,
  published_at: string,
  description: string,
}

type HomeProps = {
  lastestEpisodes: Episode[],
  allEpisodes: Episode[],
}



export default function Home({ lastestEpisodes, allEpisodes }: HomeProps) {



  return (
    <div className={styles.homepage}>
      <section className={styles.lastestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul >
          {lastestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <a href={episode.url}>{episode.url}</a>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>

      </section>
    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })


  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })


  const lastestEpisodes = episodes.slice(0 , 2);
  const allEpisodes = episodes.slice(2, episodes.length);



  return {
    props: {
      lastestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }

}