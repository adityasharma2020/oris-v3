import styles from "./CompositionPage.module.scss";
import React, { createRef } from "react";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import FileInput from "../../components/FileInput/FileInput";
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
} from "recharts";
// import _ from "lodash";
import Rodal from "rodal";
import { CSVLink } from "react-csv";
import Card from "../../components/Card/Card";
import * as htmlToImage from "html-to-image";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function CompositionPage({ type }) {
  const { currentFile, currentFileName } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [windowSize, setWindowSize] = useState(50000);
  const [increment, setIncrement] = useState(10000);
  const [label, setLabel] = useState("A");
  const { dispatch } = useContext(DataContext);

  const ref = createRef(null);
  const getImage = async () => {
    toast.success("Please wait image is being processing...");
    const dataUrl = await htmlToImage.toPng(ref.current);

    // download image
    const link = document.createElement("a");
    link.download = "Composition_CSV_DATA.png";
    link.href = dataUrl;
    link.click();
  };

  const handleSubmit = () => {
    setModalVisible(false);
    let startIndex = 0;
    let endIndex = currentFile?.length;

    let results = [];

    for (let i = startIndex; i < endIndex; i += increment) {
      let substring = currentFile.substring(i, i + windowSize);
      let numberOfA = substring.match(/A/g).length;
      let numberOfT = substring.match(/T/g).length;
      let numberOfG = substring.match(/G/g).length;
      let numberOfC = substring.match(/C/g).length;

      let tempType;
      if (type === "A") {
        tempType = numberOfA;
        // setLabel("A - T/ A + T");
      } else if (type === "T") {
        tempType = numberOfT;
        setLabel("T");
      } else if (type === "G") {
        tempType = numberOfG;
        setLabel("G");
      } else if (type === "C") {
        tempType = numberOfC;
        setLabel("C");
      } else if (type === "A-G") {
        tempType = numberOfA + numberOfG;
        setLabel("A-G");
      } else if (type === "C-T") {
        tempType = numberOfC + numberOfT;
        setLabel("C-T");
      }

      results.push({
        name: startIndex + 1,
        window_number: tempType,
      });
      startIndex = startIndex + 1;
    }
    setData(results);
  };
  const csvReport = {
    data: data,
    headers: [
      { label: "X value", key: "name" },
      { label: "Y value", key: "window_number" },
    ],
    filename: "Composition_CSV_DATA.csv",
  };

  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: { atgcText: null, fileName: "" } });
    setModalVisible(true);
  }, [type, dispatch]);

  return currentFile ? (
    <div className={styles.brushChartContainer}>
      <Rodal
        visible={modalVisible}
        showCloseButton={false}
        width="600"
        height="300"
      >
        <h1>Choose Window-size and Increment</h1>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type="text"
            placeholder=" "
            value={windowSize}
            onChange={(e) => setWindowSize(+e.target.value)}
          />
          <span className={styles.input__label}>Window Size</span>
        </label>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type="text"
            placeholder=" "
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
            title={"Composition of " + label + " - " + currentFileName}
            className={styles.graphCard}
            ref={ref}
          >
            <ComposedChart
              width={1000}
              height={700}
              data={data}
              className={styles.brushChart}
            >
              <XAxis dataKey="name"></XAxis>
              <YAxis>
                <Label
                  value={label}
                  offset={0}
                  position="center"
                  angle="-90"
                  style={{ fill: "#000" }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="window_number" stroke="#89023E" />
              <Brush startIndex={1} endIndex={280} dataKey="name" />
            </ComposedChart>
          </Card>
          <CSVLink
            className={styles.submitButton}
            {...csvReport}
            onClick={() => {
              toast.success("Please wait csv is being rendering...");
            }}
          >
            Export to CSV
          </CSVLink>
          <button
            style={{ marginTop: "2rem" }}
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
