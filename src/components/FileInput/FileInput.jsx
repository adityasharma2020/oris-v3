import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./FileInput.module.scss";
import Card from "../Card/Card";

const FileInput = ({ className }) => {
  const { dispatch } = useContext(DataContext);

  const fileUpload = (e) => {
    loadFileData({
      fileData: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  const loadFileData = ({ fileData, fileName }) => {
    dispatch({ type: "REQUEST_DATA" });
    const reader = new FileReader();

    setTimeout(() => {
      dispatch({ type: "LOAD_DATA" });
    }, 4000);

    reader.readAsBinaryString(fileData);

    reader.onloadend = function () {
      const atgcText = reader.result.split("genome")[1].replace(/[^a-z]/gi, "");

      dispatch({ type: "SET_DATA", payload: { atgcText, fileName } });
    };
  };

  const handleUpload = (params) => {
    let fileUrl;
    let fileName;

    if (params === 1) {
      fileUrl = require("../../assets/GCF_000005845.2_ASM584v2_genomic.fna");
      fileName = "GCF_000005845.2_ASM584v2_genomic.fna";
    } else if (params === 2) {
      fileUrl = require("../../assets/GCF_000009045.1_ASM904v1_genomic.fna");
      fileName = "GCF_000009045.1_ASM904v1_genomic.fna";
    }

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], fileName, { type: "fna" });
        console.log(file);
        loadFileData({
          fileData: file,
          fileName: fileName,
        });
      })
      .catch((error) => {
        // handle errors loading the file
      });
  };

  return (
    <div className={styles.fileupload}>
      <Card
        title="Upload a file from your machine"
        className={styles.inputCard}
        headerButton={
          <a
            href="https://www.ncbi.nlm.nih.gov/"
            target="_blank"
            rel="noreferrer"
            className={styles.submitButton}
          >
            Download from NCBI
          </a>
        }
      >
        <label for="images" class={styles.dropContainer}>
          <span class={styles.dropTitle}>Drop files here</span>
          or
          <input type="file" id="file" accept=".fna" onChange={fileUpload} />
        </label>
      </Card>
      <Card title="Select a file from below options">
        <div className={styles.fileuploads}>
          <div className={styles.file} onClick={() => handleUpload(2)}>
            GCF_000009045.1_ASM904v1_genomic.fna
          </div>
          <div className={styles.file} onClick={() => handleUpload(1)}>
            GCF_000005845.2_ASM584v2_genomic.fna
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileInput;
