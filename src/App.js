import './App.css';
import Upload from './components/upload';
import AudioPlayer from './components/audioPlayer';
import { useCallback, useState } from 'react';
import Header from './components/header';
import ImportButton from './components/importButton';
import WhisperAI from './components/whisperAI';

function App() {
  const [audioFile, setAudioFile] = useState('')
  const [audioSrc, setAudioSrc] = useState('')
  const [clearAudio, setClearAudio] = useState(false)
  const [clearProcessing, setClearProcessing] = useState(false);
  const [sendAudio, setSendAudio] = useState(false);

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
    handleResponse(false)
  }

  const handleClearProcessing = useCallback((value) => {
    setClearProcessing(value)
  },[])

  const handleResponse = (value) => {
    setSendAudio(value)
  }

  return (
    <div className="font-sans p-5 w-screen m-auto md:w-[30em]">
      <Header />
      <Upload onInputValue={handleInputValue} clearAudio={clearAudio} handleAudioFile={handleAudioFile}></Upload>
      <div className={audioFile.length === 0 ? 'hidden' : ''} >
        <AudioPlayer audioFile={audioFile} audioSrc={audioSrc} key={audioFile ? audioFile.name : "no-audio-file"} handleAudioFile={handleAudioFile}></AudioPlayer>
        <ImportButton clearProcessing={clearProcessing} handleClearProcessing={handleClearProcessing} handleResponse={handleResponse} />
      </div>
      {sendAudio ? <WhisperAI audioFile={audioFile} handleClearProcessing={handleClearProcessing}/> : ''}
    </div>
  );
}

export default App;
