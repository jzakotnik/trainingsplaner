import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import LinkIcon from "@material-ui/icons/Link";
import CloudCircleIcon from "@material-ui/icons/CloudCircle";
import IconButton from "@material-ui/core/IconButton";

import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";

import readXlsxFile from "read-excel-file";

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

const columns = [
  "",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

const rows = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const initResultTable = () => {
  const initArray = new Array(rows.length)
    .fill(0)
    .map((v, index) =>
      [rows[index]].concat(new Array(columns.length).fill(""))
    );

  console.log(initArray);

  return initArray;
};

export const TablePage = (props) => {
  //mock data for testing
  /*const xls = readXlsxFile(e.target[0].files[0]).then((rows) => {
    console.log(rows);
    props.setTable(rows);
  });*/

  const classes = useStyles();

  const initArray = initResultTable();

  console.log("first column");
  console.log(initArray[0]);

  console.log("Rendering table..");
  console.log(props.importedTable);

  return (
    <Grid container direction="column" alignItems="center">
      <MUIDataTable
        container
        justify="space-between"
        className={classes.timetable}
        title={"Zeitplan"}
        data={initArray}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};
export default TablePage;
