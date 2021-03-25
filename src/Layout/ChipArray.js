import React, { useState, useEffect, useRef } from "react";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import { StayPrimaryLandscape } from "@material-ui/icons";

export const ChipArray = (props) => {
  const handleClick = (e) => {
    console.log("You clicked the Chip with name");
    console.log(e.target.outerText);
    const userID = e.target.outerText;
    //console.log(props.userMapping[userID]);
    //console.log(userID in props.userMapping);
    props.toggleUser(userID);

    //console.log(userMapping[e.target.outerText]);
  };

  const userMapping = props.userMapping;

  const nameArray = props.names.split(";").map((v) => {
    if (v.length < 1) {
      //console.log(txt.length);
      return "";
    }

    if (!(v in userMapping)) {
      //console.log("Did not find user " + v);
    }
    var color = "primary";
    var variant = "outlined";

    if (v in userMapping) {
      const selected = userMapping[v]["selected"];
      color = selected ? "secondary" : "primary";
      variant = selected ? "default" : "outlined";
    }
    return (
      <div>
        <Chip
          key={v}
          size="small"
          color={color}
          onClick={handleClick}
          variant={variant}
          label={v}
        />
      </div>
    );
  });

  return <div>{nameArray}</div>;
};

export default ChipArray;
