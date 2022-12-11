import React from "react";
import "./Games.css";
//@ts-ignore
import Coupon from "../../../Assets/Images/coupon-img.png";
import { Slider, Button, ButtonGroup } from "@mui/material";
import { Clear, PlayArrow } from "@mui/icons-material";
import useWordGame from "../../../Hooks/useWordGame";
import PopUpModal from "../../ui-components/PopUpModal/PopUpModal";

export default function Games() {
  const {
    textBoxRef,
    handleChange,
    text,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount,
    sumbitTime,
    restartGame,
  } = useWordGame(60);
  return (
    <div className="word-game-content">
      {wordCount >= 100 ? (
        <PopUpModal
          header="Congratulations!"
          message={`${wordCount} Words... Outstanding job!`}
          description={"Here is your discount coupon:"}
          severity="success"
          btnText="OK"
          image={Coupon}
          btnColor="info"
        />
      ) : null}
      <h2 className="word-game-header"> Ready For A Challange?</h2>
      <h6>Type 100 words in 60 seconds to get a 5$ discount coupon!</h6>
      <textarea
        className="word-game-text"
        ref={textBoxRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <Slider
        sx={{ width: 300, color: "lime", margin: 2 }}
        aria-label="Always visible"
        defaultValue={60}
        min={5}
        max={60}
        step={5}
        value={timeRemaining}
        valueLabelDisplay={"auto"}
        onChange={sumbitTime}
        disabled={isTimeRunning}
      />
      <h6>Time remaining: {timeRemaining} Seconds </h6>
      <ButtonGroup className="games-buttons" variant={"contained"}>
        <Button
          startIcon={<Clear />}
          onClick={restartGame}
          children={"Clear"}
        />
        <Button
          startIcon={<PlayArrow />}
          onClick={startGame}
          children={"Start"}
        />
      </ButtonGroup>
      <h1>Score: {wordCount}</h1>
    </div>
  );
}
