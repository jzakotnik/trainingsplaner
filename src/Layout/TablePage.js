import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";

import readXlsxFile from "read-excel-file";

import ChipArray from "./ChipArray";

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

const processTable = (xls, template) => {
  return [];
};

export const TablePage = (props) => {
  const classes = useStyles();
  const userMapping = props.userMapping;

  console.log(props.table);
  console.log(userMapping);

  //copy columns to add some styling options from the table
  const columns = [...props.columns];

  const styledColumns = columns.map((v, i) => {
    if (i > 0) {
      //day columns start from second column
      const styling = {
        name: v,
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <ChipArray names={value} userMapping={userMapping} />
          ),
        },
      };
      return styling;
    } else {
      return v;
    }
  });
  console.log(styledColumns);

  return (
    <Grid container direction="column" alignItems="center">
      <MUIDataTable
        container
        justify="space-between"
        className={classes.timetable}
        title={"Zeitplan"}
        data={props.table}
        columns={styledColumns}
        options={options}
      />
    </Grid>
  );
};
export default TablePage;
