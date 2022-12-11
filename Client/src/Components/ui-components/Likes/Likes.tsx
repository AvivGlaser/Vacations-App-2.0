import React from "react";
import "./Likes.css";

import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";

export function Likes() {
  const initalState: number = 0;
  const [likes, setLikes] = useState(initalState);

  const handleLikes = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="likes">
    <Button
      onClick={handleLikes}
      startIcon={<ThumbUpIcon />}
      variant={"contained"}
      children={likes}
      disabled={likes ? true : false}
    />
    </div>
  );
}
