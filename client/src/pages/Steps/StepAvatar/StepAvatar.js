import React, { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import profile from "../../../Assets/image/profile.jpg";
import { activate } from "../../../API";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const StepAvatar = ({ onClick }) => {
  const [image, setImage] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  const { name, avatar } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !avatar) return;
    // create a request to server to activate the user and
    // upload the base64 string of image and name
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });

      if (data.auth) {
        // updating the user credentials in store
        if (unMounted) dispatch(setAuth(data));
      }
      navigate("/rooms");
    } catch (err) {
      // toastify
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    // converting to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  if (loading) {
    return <Loader message="Activation in Progress..." />;
  }

  return (
    <div className={styles.cardWrapper}>
      <Card
        title={`Hello, ${name}`}
        icon={<BsEmojiSunglassesFill color="#ffcd3a" fontSize={30} />}
      >
        <p className={styles.heading}>How's this avatar?</p>
        <div className={styles.avatarWarpper}>
          <img className={styles.avatar} src={image} alt="img" />
        </div>
        <div>
          <input
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
            onChange={handleImage}
          />
          <label className={styles.avatarlabel} htmlFor="avatarInput">
            Choose a different avatar
          </label>
        </div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={handleSubmit} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
