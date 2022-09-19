import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onClick }) => {
  const { name } = useSelector((state) => state.activate);
  const [username, setUsername] = useState(name);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!username) {
      return;
    }
    // adding the username to global state
    dispatch(setName(username));
    onClick();
  };

  return (
    <div className={styles.cardWrapper}>
      <Card
        title="What is your full name?"
        icon={<BsFillEmojiSmileFill color="#ffcd3a" fontSize={30} />}
      >
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="name"
        />
        <p className={styles.paragraph}>
          Enter your custom username or legal name
        </p>
        <div className={styles.actionButtonWrap}>
          <Button onClick={handleSubmit} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepName;
