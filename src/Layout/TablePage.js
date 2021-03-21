import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import LinkIcon from "@material-ui/icons/Link";
import CloudCircleIcon from "@material-ui/icons/CloudCircle";
import IconButton from "@material-ui/core/IconButton";

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

export const TablePage = (props) => {
  const classes = useStyles();

  const columns = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  console.log("Rendering table..");
  console.log(props.importedTable);

  return (
    <Grid container direction="column" alignItems="center">
      <MUIDataTable
        container
        justify="space-between"
        className={classes.timetable}
        title={"Zeitplan"}
        data={[]}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};
export default TablePage;
