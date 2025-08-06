import React, { createContext, useState } from "react";
import main from "../services/gemini";

export const dataContext = createContext();
function UserContext({ children }) {
  const [loading, setLoading] = useState("loading...")
  const [voiceResponse, setVoiceResponse] = useState(false)
  const [speaking, setSpeaking] = useState(false)


  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1,
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    text_speak.onend = () => {
      setSpeaking(false);
    };
    window.speechSynthesis.speak(text_speak);
  }


  async function aiResponse(prompt) {
    let text = await main(prompt);
   let newText = text
     .replace(/Google/g, "Moaawiyaa")
     .replace(/google/g, "Moaawiyaa")
     .replace(/\*\*/g, "")
     .replace(/\*/g, "");
    setLoading(newText)
    setVoiceResponse(true)
    speak(newText);
  }


  let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript
    setLoading(transcript)
    takeCommand(transcript.toLowerCase())
  }
  
  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank")
      speak("Opening Youtube")
      setLoading("Opening youtube")
    } else {
      aiResponse(command)
    }
  }


  const value = {
    recognition,
    setSpeaking,
    speaking,
    loading,
    voiceResponse,
    setVoiceResponse,
    setLoading
  }
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
