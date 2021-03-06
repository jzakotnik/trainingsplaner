import React, { useState, useEffect, useRef } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import readXlsxFile from "read-excel-file";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import MaterialSwitch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import logo from "./logo.svg";
import "./App.css";

import TablePage from "./Layout/TablePage";
import ExcelPage from "./Layout/ExcelPage";
import UploadPage from "./Layout/UploadPage";
import Filter from "./Layout/Filter";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: red[600],
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

function App() {
  const initArray = new Array(rows.length)
    .fill(0)
    .map((v, index) =>
      [rows[index]].concat(new Array(columns.length).fill(""))
    );
  const [xlstable, setxlstable] = useState([]);
  const [outputTable, setOutputTable] = useState(initArray);
  const [userMapping, setUserMapping] = useState({});
  const [years, setYears] = useState([]);
  const [renderTarget, setRenderTarget] = useState(true);

  const createUserMapping = (rows) => {
    const mapping = {};
    const headerRow = rows[0];
    rows.map((r) => {
      const userID = createUserID(r[1], r[2]).trim();
      const rowMapping = {};
      for (var i = 0; i < headerRow.length; i++) {
        rowMapping[headerRow[i]] = r[i];
      }
      rowMapping["selected"] = false;
      mapping[userID] = rowMapping;
    });
    return mapping;
  };

  //have the same ID for all user related data processing
  const createUserID = (u1, u2) => {
    return u1.toString().trim() + ", " + u2.toString().trim(); //someone entered a number as name, dough
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
              ].concat(name.trim() + ";");
            }
          });
        }
      });
    });
    //console.log("Processed result:");
    //console.log(table);
    return table;
  };

  const toggleUser = (userid) => {
    console.log(
      "Toggled " +
        userid +
        " which is currently " +
        userMapping[userid]["selected"]
    );
    const newMapping = { ...userMapping };
    newMapping[userid]["selected"] = userMapping[userid]["selected"]
      ? false
      : true;

    //console.log(newMapping[userid]["selected"]);
    setUserMapping(newMapping);
    return true;
  };

  //to skip the load button for testing, auto-load a file from public folder
  useEffect(() => {
    const done = "";
    //tableUpload("/anmeldung2.xlsx"); //for testing only
    setRenderTarget(<ExcelPage xlstable={xlstable} />);

    return done;
  }, []);

  const filterYears = (filterYears) => {
    const originaltable = [...xlstable];
    const filteredtable = originaltable.filter((row) => {
      if (typeof row[3] != "number") return row;
      //this seems a header line
      else if (row[3] >= filterYears[0] && row[3] <= filterYears[1]) return row;
    });
    const processedTable = processTable(initArray, filteredtable);
    setOutputTable(processedTable);
    //const processedTable = processTable(initArray, rows);
    //setOutputTable(processedTable);
    console.log("Filter years triggered");
    //console.log(filterYears);
    //console.log(filteredtable);
    return true;
  };

  const tableUpload = (filename) => {
    //fetch(filename)
    //  .then((response) => response.arrayBuffer())
    readXlsxFile(filename)
      .then((rows) => {
        const loadedexcel = rows;
        setxlstable(loadedexcel);
        //transform google table to table with days + times on axes and names in cell
        const processedTable = processTable(initArray, rows);
        setOutputTable(processedTable);
        //create map of user IDs to all the other data
        const mapping = createUserMapping(rows);
        setUserMapping(mapping);
        //get possible Jahrg??nge
        const skipHeader = rows.filter((r) => typeof r[3] == "number");
        const years = skipHeader.map((r) => r[3]);
        const uniqueyears = [...new Set(years)].sort((a, b) => a - b);

        setYears(uniqueyears); //only unique years in the array
      })
      .then(() => {
        console.log("Loaded Excel: ");
      });
  };

  const handleViewToggle = (event) => {
    renderTarget ? setRenderTarget(false) : setRenderTarget(true);
  };

  const viewExcel = (
    <div>
      <ExcelPage xlstable={xlstable} />
    </div>
  );
  const viewTimetable = (
    <div>
      <Filter years={years} filterYears={filterYears} />
      <TablePage
        columns={columns}
        userMapping={userMapping}
        toggleUser={toggleUser}
        table={outputTable}
      />
    </div>
  );

  const createView = () => {
    return renderTarget ? viewExcel : viewTimetable;
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    console.log("Path to be loaded: ");
    console.log(e.target[0].files[0]);
    tableUpload(e.target[0].files[0]);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={window.location.pathname || ""}>
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
                  <div>
                    <form onSubmit={onFileUpload}>
                      <input type="file" />
                      <input type="submit" name="Hochladen" />
                    </form>
                  </div>
                  <FormControlLabel
                    control={
                      <MaterialSwitch
                        checked={renderTarget}
                        onChange={handleViewToggle}
                        name="view"
                      />
                    }
                    label="Anmeldungen / Namen Sicht"
                  />

                  {createView()}
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
