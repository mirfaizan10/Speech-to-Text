import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

function App() {
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [textToCopy, setTextToCopy] = useState();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const stopListening = () => SpeechRecognition.stopListening();
  const reset = () => {
    resetTranscript();
    setCopyButtonText("Copy");
  };
  const handleCopy=async ()=>{
    try{
      await navigator.clipboard.writeText(transcript);
      setCopyButtonText("Copied")
    }
    catch(err){
      console.error("Failed to copy",err);
      setCopyButtonText("Failed");
    }
  }


  if (!browserSupportsSpeechRecognition) {
    return <h1>Browser does not support speech Recognition</h1>;
  }
  return (
    <>
      <div className="container h-[100vh] bg-gradient-to-r from-emerald-500 via-cyan-700 to-blue-900 ... flex flex-col justify-center items-center">
        <h2 className="m-6 p-4 font-serif font-medium text-4xl max-[680px]:text-2xl ">
          Speech to Text Converter
        </h2>
        <div
          className="h-96 w-1/4 border-2 border-solid rounded font-serif font-medium border-black mb-4 shadow-md shadow-cyan-500 p-3 overflow-y-auto max-[680px]:w-1/2"
          
        >
          {transcript}
        </div>
        <div className="flex justify-around items-center ">
          <button
            className="border-2 border-transparent font-serif px-4 py-2 m-2 bg-zinc-700 rounded-full ... text-yellow-500 hover:bg-zinc-900 hover:font-bold"
            onClick={startListening}
          >
            Start
          </button>

          <button
            className="border-2 border-transparent font-serif px-4 py-2 m-2 bg-zinc-700 rounded-full ... text-yellow-500 hover:bg-zinc-900 hover:font-bold"
            onClick={stopListening}
          >
            Stop
          </button>
          <button
            className="border-2 border-transparent font-serif px-4 py-2 m-2 bg-zinc-700 rounded-full ... text-yellow-500 hover:bg-zinc-900 hover:font-bold"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="border-2 border-transparent font-serif px-4 py-2 m-2 bg-zinc-700 rounded-full ... text-yellow-500 hover:bg-zinc-900 hover:font-bold"
            onClick={handleCopy}
          >
            {copyButtonText}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;


