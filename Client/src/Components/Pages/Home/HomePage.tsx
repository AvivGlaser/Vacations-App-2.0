import React from "react";
// @ts-ignore
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import NewHeader from "../../ui-components/NewHeader/NewHeader";
import useToggler from "../../../Helpers/useToggler";

export default function Homepage() {
  const navigate = useNavigate();
  const [info, setInfo]: any = useToggler(false);
  const [info2, setInfo2]: any = useToggler(false);

  return (
    <>
      <NewHeader />
      <div className="home-container">
        <div className="project-info">
          <div className="switch-buttons">
            <Button variant="contained" onClick={() => setInfo(true)}>
              {info ?  "The Project" : " Technologies & Frameworks" }
            </Button>
          </div>
          <br />
          {!info ? (
            <>
              <div className="project-text">
                <h5>About the project:</h5>
                <p>
                  End-to-end Vacations Site.
                  <br />
                  <b>User</b> registers to site and his credentials are saved to
                  DB (password is hashed- 'bcrypt').
                  <br />
                  After registration the user login and receives a signed
                  token (JWT) for 15 mintues.
                  <br />
                  The token gets verified on every req to server w/ AxiosInstance and documented in Logger.
                  <br />
                  In site, the user can sort vacations by category, order, pay
                  (strict credit card validations - Joi),
                  <br />
                  and also follow vacations to get real time notifactions for
                  any upcoming updates.
                  <br />
                  <b>Admin</b> can create, delete or edit vacations (DB updates
                  immediately) straight from site, and also check most popular vacations through 'Reports' page.
                  <br />
                  <b>Bonus:</b> type game.
                </p>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  children="About"
                  onClick={() => navigate("/about")}
                  endIcon={<InfoIcon />}
                />
              </div>
            </>
          ) : (
            <>
              <div className="project-text">
                <h4>Technologies & Frameworks:</h4>
                <ul>
                  <li>React TypeScript</li>
                  <li>Node JS (Express)</li>
                  <li>MySQL</li>
                  <li>Docker</li>
                  <li>Redux Toolkit</li>
                  <li>M-ui</li>
                  <li>Cloudinary</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="project-cooming-soon">
          <div className="second-switch-buttons">
            <Button variant="contained" onClick={() => setInfo2(false)} color="info">
              {info2 ? "How To Run": "Coming Soon" }
            </Button>
          </div>
          <br />
          {info2 ? (
            <>
              <div className="project-text">
                <h4>Coming Soon:</h4>
                <ul>
                  <li>Real time notifications for logged users (Socket.iO)</li>
                  <li>
                    MongoDB Implementation, Advanced queries & DB involvement
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="project-text">
                <h4>How To Run:</h4>
                <ul>
                  <li>Clone project from repo </li>
                  <li>Open a new terminal in 'docker/mysql' file</li>
                  <li>Make sure 'Docker desktop' is running</li>
                  <li>
                    Remove running containers w/ 'docker container rm -f
                    $(docker container ls -aq)' command{" "}
                  </li>
                  <li>
                    Remove running images w/ 'docker image rm -f $(docker image
                    ls -q)'{" "}
                  </li>
                  <li>
                    Run 'docker compose down' to make sure workspace is clean{" "}
                  </li>
                  <li>Run 'docker compose up'</li>
                  <li>
                    Open another terminal in the 'src' file of 'Client' folder
                  </li>
                  <li>Run 'npm i' & 'npm start' when finished</li>
                  <li>Repeat steps for 'API' folder- and we're ready to go!</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
