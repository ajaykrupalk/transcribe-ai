import { useEffect, useState } from "react";

export default function WhisperAI({ audioFile, handleClearProcessing }) {
    const [textData, setTextData] = useState(null)
    const [responseOk, setResponseOk] = useState(false);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (audioFile !== null) {
                setErrors('');
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/openai/whisper-large-v2",
                    {
                        headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}` },
                        method: "POST",
                        body: audioFile,
                    }
                );
                
                if (response.ok) {
                    const result = await response.json();
                    setTextData(result.text);
                    setResponseOk(true);
                    handleClearProcessing(true);
                } else if (response.status === 503 || response.status === 500) {
                    setResponseOk(false);
                    handleClearProcessing(true);
                    setErrors('Our servers are busy. Please try again!');
                } else {
                    setResponseOk(false);
                    handleClearProcessing(true);
                    setErrors('No response received. Try another file.');
                }

                return;
            } else {
                setResponseOk(false);
                handleClearProcessing(false);
            }
        }

        fetchData();
    }, [audioFile, handleClearProcessing])

    return (
        <>
            <p className={`mt-2 text-sm text-red-600 font-semibold text-right ${!errors ? 'hidden' : ''}`}>{errors}</p>
            <div className={`mt-5 bg-slate-100 border border-slate-300 text-gray-900 p-3 rounded-md ${!responseOk ? 'hidden' : ''}`}>
                <p>{textData}</p>
            </div>
        </>
    )
}