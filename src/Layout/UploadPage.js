import React, { useState, useRef } from "react";
import readXlsxFile from "read-excel-file";
import { useHistory } from "react-router-dom";

const UploadPage = (props) => {
  const history = useHistory();
  const form = useRef(null);

  const onFileChange = (e) => {
    console.log(e);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    console.log("Path to be loaded: ");
    console.log(e.target[0].files[0]);
    props.setTable(e.target[0].files[0]);

    history.push("/");
  };

  return (
    <div>
      <h1>Tabelle hochladen</h1>
      <h3>Hier die Tabelle aus dem Formular</h3>
      <div>
        <form ref={form} onSubmit={onFileUpload}>
          <input type="file" onChange={onFileChange} />
          <input type="submit" name="Hochladen" />
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
