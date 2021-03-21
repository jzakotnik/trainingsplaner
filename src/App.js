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

function App() {
  const [importedTable, setImportedTable] = useState();
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
                <UploadPage setTable={setImportedTable} {...props} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <TablePage importedTable={importedTable} {...props} />
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
