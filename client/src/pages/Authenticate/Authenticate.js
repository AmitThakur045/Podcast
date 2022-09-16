import React, { useState } from "react";
import StepPhoneEmail from "../../pages/Steps/StepPhoneEmail/StepPhoneEmail";
import StepOTP from "../../pages/Steps/StepOTP/StepOTP";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <div>
      <Step onClick={onNext} />
    </div>
  );
};

export default Authenticate;
