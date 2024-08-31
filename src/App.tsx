import { useState } from "react";
import "./App.css";
import WpmTracker from "./components/WpmTracker";
import PromptRecorder from "./components/PromptRecorder";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {currentStep === 1 && <WpmTracker />}
      {currentStep === 2 && <PromptRecorder />}
      <div className="stepController">
        <button
          onClick={() =>
            setCurrentStep((prev) => (prev === 1 ? prev + 1 : prev - 1))
          }
        >
          Next step
        </button>
      </div>
    </>
  );
}

export default App;
