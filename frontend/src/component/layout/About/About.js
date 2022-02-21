import React from "react";
import "./aboutPage.css";
import {  Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedinIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/vogue-emporium/image/upload/v1645385772/avatars/IMG20210215170142_hrgvlt.jpg"
              alt="Developer"
            />
            <Typography>Shawak Choudhary</Typography>
        
            <span>
             Third-year student pursuing Electronics & Communication Engineering at NIT Hamirpur.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social Platform</Typography>
            <a
              href="https://www.linkedin.com/in/shawak-choudhary-8a42a11b7/"
              target="blank"
            >
              <LinkedinIcon className="linkedinSvgIcon" />
            </a>

            <a
              href="https://github.com/shawakchoudhary"
              target="blank"
            >
              <GitHubIcon className="githubSvgIcon" />
            </a>

            <a href="https://www.instagram.com/iamshawakchoudhary/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;