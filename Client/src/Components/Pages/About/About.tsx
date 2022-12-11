import React from "react";
import "./About.css";
//@ts-ignore
import profileImg from "../../../Assets/Images/profile-img.jpg";
import { ImageComponent } from "../../ui-components/ImageComponent/ImageComponent";
import { HeaderComponent } from "../../ui-components/Headers/HeaderComponent";

export default function About() {
  return (
    <div className="about">
      <HeaderComponent header="About" />
      <ImageComponent
        src={profileImg}
        defaultImage="..."
        width={`15%`}
        height={`20%`}
      />
      <div className="about-content">
        <h4>Hello and thank you for exploring my vacation site!</h4>
        <p>
          My name is Aviv Glaser and I'm 29 years old. <br />
          I am a Full Stack Web Developer after graduating my Certification
          Studies in 'John Bryce' High-Tech Academy. 
          <br />
           In this project I've built a vacation site.
          <br />
          I always try my best to keep my code DRY, flexible and organized,
          <br />
          with infrastructue and systematic mindset, as if my projects are out
          in production for million of users, taking under consideration the right balance between user
          experience and security.
          <br />
          You can check out my latest projects & resume in the links attached to
          the footer below!
        </p>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
