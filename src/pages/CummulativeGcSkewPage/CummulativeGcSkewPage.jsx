import styles from './CummulativeGcSkewPage.module.scss';
import React, { createRef } from 'react';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import FileInput from '../../components/FileInput/FileInput';
// import "./BrushRechart.scss";

import {
  ComposedChart,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Brush,
  Label,
} from 'recharts';
// import _ from "lodash";
import Rodal from 'rodal';
import { CSVLink } from 'react-csv';
import Card from '../../components/Card/Card';
import * as htmlToImage from 'html-to-image';
import { toast } from 'react-hot-toast';

export default function CummulativeGcSkewPage() {
  const { currentFile, currentFileName } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [windowSize, setWindowSize] = useState(50000);
  const [increment, setIncrement] = useState(10000);

  const ref = createRef(null);
  const getImage = async () => {
    toast.success('Please wait image is being processing...');
    const dataUrl = await htmlToImage.toPng(ref.current);

    // download image
    const link = document.createElement('a');
    link.download = 'cumulative-gc-Skew_CSV_DATA.png';
    link.href = dataUrl;
    link.click();
  };

  const handleSubmit = () => {
    setModalVisible(false);
    let startIndex = 0;
    let endIndex = currentFile?.length;

    let results = [];

    let tempValue = 0;
    for (let i = startIndex; i < endIndex; i += increment) {
      let substring = currentFile.substring(i, i + windowSize);
      let numberOfC = substring.match(/C/g).length;
      let numberOfG = substring.match(/G/g).length;

      tempValue = (numberOfC - numberOfG) / (numberOfG + numberOfC) + tempValue;

      results.push({
        name: startIndex + 1,
        window_number: tempValue,
      });
      startIndex = startIndex + 1;
    }

    // const yArray = results.map(value => value.window_number);
    // const updatedYArray = yArray.map(value => {
    //   tempValue = value+tempValue
    //   return tempValue;
    // })

    // const updatedResults = results.map((value, index)=>{
    //   return {
    //     ...value,
    //     window_number: updatedYArray[index]
    //   }
    // })
    setData(results);
  };
  const csvReport = {
    data: data,
    headers: [
      { label: 'X value', key: 'name' },
      { label: 'Y value', key: 'window_number' },
    ],
    filename: 'cumulative-gc-Skew_CSV_DATA.csv',
  };

  return currentFile ? (
    <div className={styles.brushChartContainer}>
      <Rodal
        visible={modalVisible}
        showCloseButton={false}
        width='600'
        height='300'
      >
        <h1>Choose Window-size and Increment</h1>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type='text'
            placeholder=' '
            value={windowSize}
            onChange={(e) => setWindowSize(+e.target.value)}
          />
          <span className={styles.input__label}>Window Size</span>
        </label>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type='text'
            placeholder=' '
            value={increment}
            onChange={(e) => setIncrement(+e.target.value)}
          />
          <span className={styles.input__label}>Increment</span>
        </label>

        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </Rodal>
      {!modalVisible ? (
        <>
          <Card
            title={'cumulativeGcSkew   - ' + currentFileName}
            className={styles.graphCard}
            ref={ref}
          >
            <ComposedChart
              width={1000}
              height={700}
              data={data}
              className={styles.brushChart}
            >
              <XAxis dataKey='name'></XAxis>
              <YAxis>
                <Label
                  value='Cummulative GC Skew'
                  offset={0}
                  position='center'
                  angle='-90'
                  style={{ fill: '#000' }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <CartesianGrid stroke='#f5f5f5' />
              <Line type='monotone' dataKey='window_number' stroke='#89023E' />
              <Brush startIndex={1} endIndex={280} dataKey='name' />
            </ComposedChart>
          </Card>
          <CSVLink
            className={styles.submitButton}
            {...csvReport}
            onClick={() => {
              toast.success('Please wait csv is being rendering...');
            }}
          >
            Export to CSV
          </CSVLink>
          <button
            style={{ marginTop: '2rem' }}
            className={styles.submitButton}
            onClick={getImage}
          >
            Take Screenshot of Graph
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <FileInput />
  );
}
