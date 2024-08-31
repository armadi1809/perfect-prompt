import { useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

export default function WpmTraker() {
  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    interimTranscript,
  } = useSpeechRecognition({
    language: "en-US",
  });
  const [recordingStartTime, setRecordingStartTime] = useState<
    number | undefined
  >(undefined);
  const wpm = recordingStartTime
    ? Math.floor(
        transcript.length / ((Date.now() - recordingStartTime) / 60000)
      )
    : 0;
  return (
    <>
      <div>Tracking your WPM</div>
      <div>
        <label htmlFor="language">Language:</label>
        <select id="language">
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="fr-FR">French (France)</option>
        </select>
      </div>
      <div>
        <label htmlFor="wpm">Words per minute: {wpm.toString()}</label>
        <p id="wpm"></p>
      </div>
      <div id="transcript">
        {!transcript ? (
          "Your speech will appear here.."
        ) : (
          <>
            {transcript} <i style={{ color: "gray" }}>{interimTranscript}</i>
          </>
        )}
      </div>

      <div id="controls">
        <button
          id="start-btn"
          disabled={isListening}
          onClick={() => {
            setRecordingStartTime(Date.now());
            startListening();
          }}
        >
          Start Listening
        </button>
        <button
          id="stop-btn"
          disabled={!isListening}
          onClick={() => {
            stopListening();
          }}
        >
          Stop Listening
        </button>
      </div>
    </>
  );
}
