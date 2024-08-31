import { useEffect, useRef, useState } from "react";

const useSpeechRecognition = ({ language }: { language: string }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
      alert(
        "Your browser does not support Speech Recognition. Try Chrome or Edge."
      );
      return;
    } else {
      const recognition = new window.SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        setInterimTranscript("");
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + trans + " ");
          } else {
            setInterimTranscript((prev) => prev + trans);
          }
        }
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        alert("Speech recognition error: " + event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTranscript("");
      };
      return () => {
        recognition.stop();
      };
    }
  }, [language]);
  const startListening = () => {
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };
  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
  };
};

export { useSpeechRecognition };
