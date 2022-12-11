//@ts-ignore
import notFound from "../../../Assets/Images/not-found-img.jpg";
import "./NotFound.css"
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { ImageComponent } from "../../ui-components/ImageComponent/ImageComponent";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <ImageComponent src={notFound} width={"50%"} height={"25%"}/>
      <br/>
      <Button
      children="Home"
      startIcon={<HomeIcon/>}
      variant="contained"
      onClick={()=>{
        navigate("/")
      }}
      />
    </div>
  );
}
