import { useEffect, useState } from "react";

export default function WhisperAI({ audioFile, handleClearProcessing}) {
    const [textData, setTextData ] = useState('')
    const [responseOk, setResponseOk] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (audioFile) {
                console.log('Fetching audio')
                // const response = await fetch(
                //     "https://api-inference.huggingface.co/models/openai/whisper-large-v2",
                //     {
                //         headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}` },
                //         method: "POST",
                //         body: audioFile,
                //     }
                // );
                // const result = await response.json();
                // console.log('result: ', result);
                // setTextData(result.text);
                // setResponseOk(true);
                handleClearProcessing(true);
            } else {
                setResponseOk(false);
                setResponseOk(false);
                handleClearProcessing(false);
            }
        }
        
        fetchData();
    },[audioFile])

    return (
        <div className={`mt-5 bg-slate-100 border border-slate-300 text-gray-900 p-3 rounded-md ${!responseOk ? 'hidden' : ''}`}>
            <p>{textData}</p>
        </div>
    )
}