import './App.css';
import Upload from './components/upload';
import AudioPlayer from './components/audioPlayer';
import { useState } from 'react';
import Header from './components/header';
import ImportButton from './components/importButton';

function App() {
  const [audioFile, setAudioFile] = useState('')
  const [audioSrc, setAudioSrc] = useState('')
  const [clearAudio, setClearAudio] = useState(false)
  const [clearProcessing, setClearProcessing] = useState(false);

  const handleInputValue = (fileValue, fileUrl) => {
    setAudioFile(fileValue)
    setAudioSrc(fileUrl)
    setClearAudio(false)
  }

  const handleAudioFile = () => {
    setAudioFile('')
    setAudioSrc('')
    setClearAudio(true)
    setClearProcessing(true)
  }

  const handleClearProcessing = (value) => {
    setClearProcessing(value)
  }

  return (
    <div className="font-sans p-5 w-screen m-auto md:w-[30em]">
      <Header/>
      <Upload onInputValue={handleInputValue} clearAudio={clearAudio} handleAudioFile={handleAudioFile}></Upload>
      <div className={audioFile.length === 0 ? 'hidden' : '' } >
        <AudioPlayer audioFile={audioFile} audioSrc={audioSrc} key={audioFile ? audioFile.name : "no-audio-file"} handleAudioFile={handleAudioFile}></AudioPlayer>
        <ImportButton clearProcessing={clearProcessing} handleClearProcessing={handleClearProcessing}/>
      </div>
    </div>
  );
}

export default App;
