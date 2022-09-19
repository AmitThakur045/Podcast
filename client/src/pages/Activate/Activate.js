import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const Step = steps[currentStep];

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <Step onClick={onNext}></Step>
    </div>
  );
};

export default Activate;
