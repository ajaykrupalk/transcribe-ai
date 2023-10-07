import './App.css';
import Upload from './components/upload';
import AudioPlayer from './components/audioPlayer';
import { useState } from 'react';

function App() {
  const [audioFile, setAudioFile] = useState('')
  const [audioSrc, setAudioSrc] = useState('')

  const handleInputValue = (fileValue, fileUrl) => {
    setAudioFile(fileValue)
    setAudioSrc(fileUrl)
  }

  return (
    <div className="font-sans">
      <Upload onInputValue={handleInputValue}></Upload>
      <div className={audioFile.length === 0 ? 'hidden' : '' } >
        <AudioPlayer audioFile={audioFile} audioSrc={audioSrc}></AudioPlayer>
      </div>
    </div>
  );
}

export default App;
