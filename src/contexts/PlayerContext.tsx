import { createContext, ReactNode, useContext, useState } from 'react'


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}


type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (episode: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    tooglePlay: () => void;
    setIsPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
};


type PlayerContexProviderProps = {
    children: ReactNode;
}





export const PlayerContext = createContext({} as PlayerContextData)


export function PlayerContexProvider({ children }: PlayerContexProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }


    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }







    function tooglePlay() {
        setIsPlaying(!isPlaying)
        setEpisodeList([])
    }

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state)
    }


    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length


    function playNext() {        
        if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }


    function playPrevious() {
        
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }




    return (

        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                playNext,
                playPrevious,
                isPlaying,
                tooglePlay,
                setIsPlayingState,
                hasNext,
                hasPrevious,
            }}>
            {children}
        </PlayerContext.Provider>
    )
}


export const usePlayer = () => {
    return useContext(PlayerContext);
}