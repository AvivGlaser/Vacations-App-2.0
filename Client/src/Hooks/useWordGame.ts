import { useState, useEffect, useRef } from "react";
import calcWordCount from "../Helpers/calcWordCount";

export default function useWordGame(startingTime: number) {
  const textBoxRef: any = useRef(null);
  const [state, setState] = useState({
    text: "",
    timeRemaining: startingTime,
    isTimeRunning: false,
    wordCount: 0,
  });
  
  function handleChange(e: any) {
    const { value } = e.target;
    setState({ ...state, text: value });
  }

  function sumbitTime(e: any) {
    const { value } = e.target;
    setState({ ...state, timeRemaining: value });
  }

  function startGame() {
    setState({
      ...state,
      isTimeRunning: true,
      text: "",
    });    
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setState((state) => ({
      ...state,
      isTimeRunning: false,
      wordCount: calcWordCount(state.text),
      text: "",
      timeRemaining: 60,
    }));
  }

  function restartGame() {
    setState((state) => ({
      ...state,
      isTimeRunning: false,
      wordCount: 0,
      text: "",
      timeRemaining: 60,
    }));
  }
  const handleInterval = () => {
      return setInterval(() => {
        setState((state) => {
          return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
          }
        });
      }, 1000);
    }

    useEffect(() => {
      let interval: any = null;
      if (state.isTimeRunning && state.timeRemaining >= 0) {
        interval = handleInterval() 
      } if (state.timeRemaining ===0) {
        endGame()
        clearInterval(interval) 
      } return () => {
       clearInterval(interval);
        }
  }, [state.isTimeRunning, state.timeRemaining]);
  
  const { text, isTimeRunning, wordCount, timeRemaining } = state;
  
  return {
    textBoxRef,
    handleChange,
    startGame,
    sumbitTime,
    text,
    isTimeRunning,
    timeRemaining,
    wordCount,
    restartGame
  };
}
