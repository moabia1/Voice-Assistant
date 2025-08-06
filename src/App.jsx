import React, { useContext } from "react";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io"; // ✅ Import Close Icon
import { dataContext } from "./context/UserContext";

const App = () => {
  const {
    recognition,
    speaking,
    setSpeaking,
    loading,
    voiceResponse,
    setLoading,
    setVoiceResponse
  } = useContext(dataContext);

  // ✅ Function to stop speaking
  const stopResponse = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setLoading("Response stopped");
    setVoiceResponse(false)
  };

  return (
    <div className="main">
      <img src="/assets/ai.png" alt="" id="romi" />
      <span>I'm Romi, Your Virtual Assistant</span>

      {!speaking ? (
        <button
          className="listen"
          onClick={() => {
            setLoading("listening...");
            setSpeaking(true);
            recognition.start();
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {/* ✅ Close Button */}
          <button className="close-btn" onClick={stopResponse}>
            <IoMdCloseCircle size={25} />
          </button>

          {voiceResponse ? (
            <img src="/assets/aiVoice.gif" id="aigif" />
          ) : (
            <img src="/assets/speak.gif" alt="listening" id="speak" />
          )}

          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default App;
