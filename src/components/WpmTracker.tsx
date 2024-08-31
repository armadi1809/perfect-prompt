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
        <label htmlFor="wpm">Words per minute: </label>
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
        <button id="start-btn" disabled={isListening} onClick={startListening}>
          Start Listening
        </button>
        <button id="stop-btn" disabled={!isListening} onClick={stopListening}>
          Stop Listening
        </button>
      </div>
    </>
  );
}
