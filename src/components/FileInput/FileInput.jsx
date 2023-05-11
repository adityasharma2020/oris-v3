import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import styles from './FileInput.module.scss';
import Card from '../Card/Card';

const FileInput = ({ className }) => {
  const { dispatch } = useContext(DataContext);

  const fileUpload = (e) => {
    loadFileData({
      fileData: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  const loadFileData = ({ fileData, fileName }) => {
    dispatch({ type: 'REQUEST_DATA' });
    const reader = new FileReader();

    setTimeout(() => {
      dispatch({ type: 'LOAD_DATA' });
    }, 4000);

    reader.readAsBinaryString(fileData);

    reader.onloadend = function () {
      const atgcText = reader.result.split('genome')[1].replace(/[^a-z]/gi, '');

      dispatch({ type: 'SET_DATA', payload: { atgcText, fileName } });
    };
  };

  const handleUpload = () => {
    const fileUrl = require('../../assets/GCF_000005845.2_ASM584v2_genomic.fna');
    const fileName = 'GCF_000005845.2_ASM584v2_genomic.fna';

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], fileName, { type: 'fna' });
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
        title='Upload a file from your machine'
        className={styles.inputCard}
      >
        <div className={styles.inputContainer}>
          <input type='file' id='file' accept='.fna' onChange={fileUpload} />
        </div>
      </Card>
      <Card title='Select a file from below options'>
        <div className={styles.fileuploads}>
          <div className={styles.file} onClick={handleUpload}>
            GCF_000005845.2_ASM584v2_genomic.fna
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileInput;
