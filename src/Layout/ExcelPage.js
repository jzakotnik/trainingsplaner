import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "blue",
  },

  main: {
    width: "100%",
    overflowX: "auto",
    paddingTop: "24px",
    paddingBottom: "12px",
  },
  mainOnResultView: {
    height: "83%",
    width: "100%",
    transition: "height 1s",
  },
  timetable: {
    width: "100%",
  },
  footer: {
    height: "5%",
    backgroundColor: "black",
  },
}));

const options = {
  selectableRows: "none",
  pagination: false,
};
const columns = ["Name", "Vorname", "Spielpartner", "Kommentar"];

export const ExcelPage = (props) => {
  const classes = useStyles();
  console.log(props.xlstable);

  const filteredTable = props.xlstable.map((v) => [v[1], v[2], v[34], v[29]]);

  return (
    <Grid container direction="column" alignItems="center">
      <MUIDataTable
        container
        justify="space-between"
        className={classes.timetable}
        title={"Anmeldungen"}
        data={filteredTable}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};
export default ExcelPage;
