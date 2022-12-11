import React from "react";
import "./Footer.css";
import { Tooltip } from "@mui/material";
import { LinkedIn, GitHub, Whatshot, SwitchAccount, ReceiptLong } from "@mui/icons-material";
import { IFooterAnchor } from "../../../Helpers/interfaces";

export default function Footer() {
  const footerAnchors: Array<IFooterAnchor> = [
    {
      tooltip: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/aviv-glaser-226656202/",
      icon: <LinkedIn />
    },
    {
      tooltip: "Github Profile",
      href: "https://github.com/AvivGlaser",
      icon: <GitHub />,
    },
    {
      tooltip: "Aviv Glaser CV",
      href: "https://www.linkedin.com/in/aviv-glaser-226656202/overlay/1635502287839/single-media-viewer/",
      icon: <SwitchAccount />,
    },
    {
      tooltip: "My Last Project",
      href: "https://e-commerce-project-aviv-glaser.web.app/",
      icon: <Whatshot />,
    },
    {
      tooltip: "Full Stack Certificate",
      href: "https://www.linkedin.com/in/aviv-glaser-226656202/details/education/1635510308343/single-media-viewer/",
      icon: <ReceiptLong />,
    },
  ];
  
  return (
    <footer>
      <div className="footer">
        <div className="footer-basic">
          <div className="social">
            {footerAnchors.map((anchor: IFooterAnchor) => {
              const {tooltip, href, icon} = anchor;
              return <Tooltip title={tooltip} placement="top" key={tooltip}>
                <a href={href} children={icon} target="_blank" rel="noreferrer"  />
              </Tooltip>
            })}
            <br/>
           <span>All Rights Reserved © || Aviv Glaser 2022</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
