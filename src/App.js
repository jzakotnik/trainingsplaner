import React, { useState, useEffect, useRef } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import readXlsxFile from "read-excel-file";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";

import logo from "./logo.svg";
import "./App.css";

import TablePage from "./Layout/TablePage";
import UploadPage from "./Layout/UploadPage";
import Filter from "./Layout/Filter";

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

const createUserMapping = (rows) => {
  const mapping = {};
  const headerRow = rows[0];
  rows.map((r) => {
    const userID = createUserID(r[1], r[2]);
    const rowMapping = {};
    for (var i = 0; i < headerRow.length; i++) {
      rowMapping[headerRow[i]] = r[i];
    }
    mapping[userID] = rowMapping;
  });
  return mapping;
};

//have the same ID for all user related data processing
const createUserID = (u1, u2) => {
  return u1.trim() + ", " + u2.trim();
};

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
      const name = createUserID(registrationRow[1], registrationRow[2]);
      if (!!selectedDays) {
        //console.log(time + " - " + selectedDays + ": " + name);
        //parse days by comma
        const days = selectedDays.split(",");
        //insert name for each day and time into the table
        days.map((dayWithSpace) => {
          const day = dayWithSpace.trim();
          //console.log("Cell value to be updated: " + index + ", " + day);
          if (day.trim() in dayMapping) {
            table[index][dayMapping[day]] = table[index][
              dayMapping[day]
            ].concat(name + " ; ");
          }
        });
      }
    });
  });
  //console.log("Processed result:");
  //console.log(table);
  return table;
};

function App() {
  const initArray = new Array(rows.length)
    .fill(0)
    .map((v, index) =>
      [rows[index]].concat(new Array(columns.length).fill(""))
    );
  const [outputTable, setOutputTable] = useState(initArray);
  const [userMapping, setUserMapping] = useState();
  const [years, setYears] = useState([]);

  //to skip the load button for testing, auto-load a file from public folder
  useEffect(() => {
    const done = "";

    fetch("/anmeldung.xlsx")
      .then((response) => response.arrayBuffer())
      .then((xls) => readXlsxFile(xls))
      .then((rows) => {
        //transform google table to table with days + times on axes and names in cell
        const processedTable = processTable(initArray, rows);
        setOutputTable(processedTable);
        //create map of user IDs to all the other data
        const mapping = createUserMapping(rows);
        setUserMapping(mapping);
        //get possible Jahrgänge
        const skipHeader = rows.filter((r) => typeof r[3] == "number");
        const years = skipHeader.map((r) => r[3]);
        const uniqueyears = [...new Set(years)].sort((a, b) => a - b);

        setYears(uniqueyears); //only unique years in the array
        console.log("Loaded Excel: ");
        console.log(rows);
        console.log(uniqueyears);
      });

    return done;
  }, []);

  const filterYears = (filterYears) => {
    console.log("Filter years triggered");
    console.log(filterYears);
    return true;
  };

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
                <div>
                  <Filter years={years} filterYears={filterYears} />
                  <TablePage
                    columns={columns}
                    userMapping={userMapping}
                    table={outputTable}
                    {...props}
                  />
                </div>
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
