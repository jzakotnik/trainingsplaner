import React, { useState, useRef } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";

import logo from "./logo.svg";
import "./App.css";

import TablePage from "./Layout/TablePage";
import UploadPage from "./Layout/UploadPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

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

const dayMapping = {
  Montag: 1,
  Dienstag: 2,
  Mittwoch: 3,
  Donnerstag: 4,
  Freitag: 5,
  Samstag: 6,
  Sonntag: 7,
};

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

const processTable = (template, input) => {
  const table = [...template];
  //console.log("Template table:");
  //console.log(table);
  //create mapping of time columns from template to export table
  const headerRow = input[0];
  const timeMapping = {};
  headerRow.map((v, i) => {
    const matches = v.match(/\[(.*?)\]/);
    if (matches) {
      const submatch = matches[1];
      const index = rows.findIndex((e) => e == submatch);

      timeMapping[submatch] = i;
    }
    //console.log(timeMapping);
  });
  //timemapping = {"9:00":<columnNumber in excel>}

  const processedTable = input.map((registrationRow, index) => {
    //console.log(registrationRow);
    rows.map((time, index) => {
      const selectedDays = registrationRow[timeMapping[time]];
      const name = registrationRow[1] + ", " + registrationRow[2];
      if (!!selectedDays) {
        //console.log(time + " - " + selectedDays + ": " + name);
        //parse days by comma
        const days = selectedDays.split(",");
        //insert name for each day and time into the table

        days.map((dayWithSpace) => {
          const day = dayWithSpace.trim();
          //console.log("Cell value to be updated: " + index + ", " + day);
          //console.log(dayMapping[day]);
          if (day.trim() in dayMapping) {
            //console.log(table[index][dayMapping[day]]);
            table[index][dayMapping[day]] = table[index][
              dayMapping[day]
            ].concat(name + "\n");
            //console.log("new cell entry:");
            //console.log(table[index][dayMapping[day]]);
          }
        });
      }
    });
  });
  console.log("Processed result:");
  console.log(table);
  return table;
};

function App() {
  const initArray = new Array(rows.length)
    .fill(0)
    .map((v, index) =>
      [rows[index]].concat(new Array(columns.length).fill(""))
    );
  const [outputTable, setOutputTable] = useState(initArray);

  const tableUpload = (t) => {
    //process excel table
    //console.log(t);
    const processedTable = processTable(initArray, t);
    setOutputTable(processedTable);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              exact
              path="/upload"
              render={(props) => (
                <UploadPage setTable={tableUpload} {...props} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <TablePage columns={columns} table={outputTable} {...props} />
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
