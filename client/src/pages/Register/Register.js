import React, { useState } from "react";
import styles from "./Register.module.css";

import StepAvatar from "../../pages/Steps/StepAvatar/StepAvatar";
import StepPhoneEmail from "../../pages/Steps/StepPhoneEmail/StepPhoneEmail";
import StepOTP from "../../pages/Steps/StepOTP/StepOTP";
import StepName from "../../pages/Steps/StepName/StepName";
import StepUsername from "../../pages/Steps/StepUsername/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
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

export default Register;
