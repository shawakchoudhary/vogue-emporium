import React from "react";
import "./contactPage.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:chaudharyshawak@gmail.com">
        <Button>Contact:chaudharyshawak@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;