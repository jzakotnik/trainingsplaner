import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 600,
    paddingTop: "24px",
    paddingBottom: "12px",
    paddingLeft: "12px",
  },
});

const Filter = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState([1980, 2020]);
  const [marks, setMarks] = useState([]);
  const years = props.years;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.filterYears(newValue);
    //console.log(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Jahrgänge {value[0]} - {value[1]}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={10}
        marks
        min={1950}
        max={2025}
        step={1}
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export default Filter;
