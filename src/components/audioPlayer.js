import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ audioFile, audioSrc, handleAudioFile }) {
    const [value, setValue] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [maxValue, setMaxValue] = useState(100);
    const audioRef = useRef();

    useEffect(() => {
        const audio = audioRef.current

        audio.addEventListener("loadedmetadata", () => {
            console.log(audio.duration)
            setMaxValue(Math.round(audio.duration))
        })

        audio.addEventListener("timeupdate", () => {
            if (isPlaying) {
                setValue(audio.currentTime);
            }
        });

        audio.addEventListener("ended", () => {
            setIsPlaying(false);
            return;
        })
    }, [isPlaying])

    useEffect(() => {
        const audio = audioRef.current
        console.log(audio.currentTime)
    }, [audioRef])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying, audioRef])

    const handleRange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value)
        const newTime = (event.target.value / maxValue) * audioRef.current.duration;
        console.log('new time: ' + newTime)
        audioRef.current.currentTime = newTime;
    };

    const handlePlay = () => {
        setIsPlaying((isPlaying) => !isPlaying);
    };

    return (
        <>
            <div className="mt-5 h-full w-full p-2 rounded-md bg-slate-100/70">
                <audio src={audioSrc} ref={audioRef} />
                <div className="flex">
                    <img className="w-14 h-14" src={require("../assets/audio-file-icon.png")} alt="Music Player Icon"></img>
                    <div className="flex flex-col w-full">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium w-28 truncate">{audioFile.name ? audioFile.name : 'Sample.mp4'}</h3>
                                <p className="text-xs font-medium">
                                    {audioFile.size ? Math.round(audioFile.size / 1024) : '0'}KB
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <button className="self-end" onClick={handleAudioFile}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 fill-gray-400 hover:fill-red-500">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-1 flex">
                            <button onClick={handlePlay}>
                                {
                                    isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    )
                                }
                            </button>
                            <input type="range" min={0} max={maxValue} step={1} value={value} className="w-full accent-black cursor-pointer" onChange={handleRange}></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}