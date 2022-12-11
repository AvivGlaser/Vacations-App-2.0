import React, { useContext, useState } from "react";
import "./UserClockDisplay.css"
import { TimeContext } from "../../../Context/TimeContext";
import {  Chip, Popover, Typography } from "@mui/material";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import { useAppSelector } from "../../../Redux/Store/hooks";

export default function UserClockDisplay() {
  const clock: string = useContext(TimeContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  function handleClick(event: any){
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null) 
  };

  return (
    <>
      <Chip
      className="user-clock-display"
      color="info"
        aria-describedby={id}
        onClick={handleClick}
        icon={<FaceOutlinedIcon />}
        label={userInfo? `Hello ${userInfo?.first_name}`: `Hello Guest`}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1.5, fontSize: "14px"}}>
          {clock}
        </Typography>
      </Popover>
    </>
  );
}
