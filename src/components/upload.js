import { useState, useEffect } from "react";

function Upload({ onInputValue, clearAudio, handleAudioFile }) {
    const [selectedFile, setSelectedFile] = useState('')
    const [dragging, setDragging] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (clearAudio) {
            setSelectedFile('')
        }
    }, [clearAudio])

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            handleFile(files[0]);
        }
    }

    const handleFile = (file) => {
        if (file.size > 1048576) {
            setSelectedFile('');
            setError('Please select a smaller audio file.');
            return;
        }
        if (file.type.startsWith('audio/')) {
            const fileUrl = URL.createObjectURL(file)
            setSelectedFile(file.name);
            onInputValue(file, fileUrl)
            setError('');
        } else {
            setSelectedFile('');
            setError('Please select a valid audio file.');
        }
    };

    return (
        <div className="w-full mt-3 p-1">
            <div className={`text-center flex flex-col items-center justify-center flex-nowrap h-44 border-2 border-slate-200 p-2 hover:border-blue-300
                                ${dragging ? 'bg-blue-50 border-blue-500 border-solid rounded-md disabled' : 'border-dashed rounded-sm'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <img src={require("../assets/uploadFile.png")} alt="upload-icon" className="w-6 h-6 mb-2"></img>
                <label className="text-sm font-medium text-gray-500">
                    Drag and Drop or
                    <span>
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept="audio/*"
                            onChange={(e) => {
                                handleAudioFile();
                                handleFileChange(e);
                                e.target.value = '';
                            }}
                        />
                        <label htmlFor="fileInput" className="text-blue-600 hover:text-blue-400"> Choose File </label>
                    </span>
                    to Upload
                </label>
                <p className="text-xs font-medium  text-gray-500/70">Accepts all audio files (Max: 1 MB)</p>
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                {selectedFile && <p className="text-xs font-medium">Uploaded {selectedFile}</p>}
            </div>
        </div>
    );
}

export default Upload;