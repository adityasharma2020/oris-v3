import Rodal from "rodal";
import { DataContext } from "../../context/DataContext";
import styles from "./SkewCalculator.module.scss";
import { createRef, useContext,  useState } from "react";
import FileInput from "../../components/FileInput/FileInput";
import Select from "react-select";
import * as htmlToImage from "html-to-image";

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
import Card from "../../components/Card/Card";
import { CSVLink } from "react-csv";
import { toast } from "react-hot-toast";

const SkewCalculator = () => {
  const { currentFile, currentFileName } = useContext(DataContext);
  const ref = createRef(null);

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [windowSize, setWindowSize] = useState(50000);
  const [increment, setIncrement] = useState(10000);

  const numberOption = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
  ];
  const textOption = [
    { value: "A", label: "A" },
    { value: "T", label: "T" },
    { value: "G", label: "G" },
    { value: "C", label: "C" },
    { value: "R", label: "R" },
    { value: "Y", label: "Y" },
    { value: "K", label: "K" },
    { value: "M", label: "M" },
    { value: "W", label: "W" },
  ];
  const operatorOption = [
    { value: "+", label: "+" },
    { value: "-", label: "-" },
    { value: "*", label: "*" },
    { value: "/", label: "/" },
  ];

  const [firstInput, setFirstInput] = useState(numberOption[0]);
  const [secondInput, setSecondInput] = useState(textOption[2]);
  const [thirdInput, setthirdInput] = useState(operatorOption[1]);
  const [fourthInput, setfourthInput] = useState(numberOption[0]);
  const [fifthInput, setfifthInput] = useState(textOption[3]);

  const [sixInput, setsixInput] = useState(numberOption[0]);
  const [sevenInput, setsevenInput] = useState(textOption[2]);
  const [eightInput, seteightInput] = useState(operatorOption[0]);
  const [nineInput, setnineInput] = useState(numberOption[0]);
  const [tenIinput, setTenInput] = useState(textOption[3]);

  const handleSubmit = () => {
    setModalVisible(false);
  };

  const handleGo = () => {
    let startIndex = 0;
    let endIndex = currentFile?.length;
    let secondInputValue;
    let fifthInputValue;
    let sevenInputValue;
    let tenInputValue;

    let results = [];
    let mathItUp = {
      "+": function (x, y) {
        return x + y;
      },
      "-": function (x, y) {
        return x - y;
      },
      "*": function (x, y) {
        return x * y;
      },
      "/": function (x, y) {
        return x / y;
      },
    };

    for (let i = startIndex; i < endIndex; i += increment) {
      let substring = currentFile.substring(i, i + windowSize);
      let numberOfA = substring.match(/A/g).length;
      let numberOfT = substring.match(/T/g).length;
      let numberOfC = substring.match(/C/g).length;
      let numberOfG = substring.match(/G/g).length;
      let numberOfR = numberOfA || numberOfG;
      let numberOfY = numberOfC || numberOfT;
      let numberOfK = numberOfG || numberOfT;
      let numberOfM = numberOfA || numberOfC;
      let numberOfW = numberOfA || numberOfT;

      if (secondInput.value === "A") {
        secondInputValue = numberOfA;
      } else if (secondInput.value === "T") {
        secondInputValue = numberOfT;
      } else if (secondInput.value === "C") {
        secondInputValue = numberOfC;
      } else if (secondInput.value === "G") {
        secondInputValue = numberOfG;
      } else if (secondInput.value === "R") {
        secondInputValue = numberOfR;
      } else if (secondInput.value === "Y") {
        secondInputValue = numberOfY;
      } else if (secondInput.value === "K") {
        secondInputValue = numberOfK;
      } else if (secondInput.value === "M") {
        secondInputValue = numberOfM;
      } else if (secondInput.value === "W") {
        secondInputValue = numberOfW;
      }

      if (fifthInput.value === "A") {
        fifthInputValue = numberOfA;
      } else if (fifthInput.value === "T") {
        fifthInputValue = numberOfT;
      } else if (fifthInput.value === "C") {
        fifthInputValue = numberOfC;
      } else if (fifthInput.value === "G") {
        fifthInputValue = numberOfG;
      } else if (fifthInput.value === "R") {
        fifthInputValue = numberOfR;
      } else if (fifthInput.value === "Y") {
        fifthInputValue = numberOfY;
      } else if (fifthInput.value === "K") {
        fifthInputValue = numberOfK;
      } else if (fifthInput.value === "M") {
        fifthInputValue = numberOfM;
      } else if (fifthInput.value === "W") {
        fifthInputValue = numberOfW;
      }

      if (sevenInput.value === "A") {
        sevenInputValue = numberOfA;
      } else if (sevenInput.value === "T") {
        sevenInputValue = numberOfT;
      } else if (sevenInput.value === "C") {
        sevenInputValue = numberOfC;
      } else if (sevenInput.value === "G") {
        sevenInputValue = numberOfG;
      } else if (sevenInput.value === "R") {
        sevenInputValue = numberOfR;
      } else if (sevenInput.value === "Y") {
        sevenInputValue = numberOfY;
      } else if (sevenInput.value === "K") {
        sevenInputValue = numberOfK;
      } else if (sevenInput.value === "M") {
        sevenInputValue = numberOfM;
      } else if (sevenInput.value === "W") {
        sevenInputValue = numberOfW;
      }
      if (tenIinput.value === "A") {
        tenInputValue = numberOfA;
      } else if (tenIinput.value === "T") {
        tenInputValue = numberOfT;
      } else if (tenIinput.value === "C") {
        tenInputValue = numberOfC;
      } else if (tenIinput.value === "G") {
        tenInputValue = numberOfG;
      } else if (tenIinput.value === "R") {
        tenInputValue = numberOfR;
      } else if (tenIinput.value === "Y") {
        tenInputValue = numberOfY;
      } else if (tenIinput.value === "K") {
        tenInputValue = numberOfK;
      } else if (tenIinput.value === "M") {
        tenInputValue = numberOfM;
      } else if (tenIinput.value === "W") {
        tenInputValue = numberOfW;
      }

      // console.log(
      //   thirdInput.value,
      //   // mathItUp[thirdInput.value](
      //     secondInputValue,
      //     fifthInputValue,
      //     // parseInt(firstInput.value) * secondInputValue,
      //     // parseInt(fourthInput.value) * fifthInputValue,
      //   // ),
      //   // mathItUp[eightInput.value](
      //   //   parseInt(sixInput.value) * sevenInputValue,
      //   //   parseInt(nineInput.value) * tenInputValue
      //   // )
      // );
      results.push({
        name: startIndex + 1,
        window_number:
          mathItUp[thirdInput.value](
            parseInt(firstInput.value) * secondInputValue,
            parseInt(fourthInput.value) * fifthInputValue
          ) /
          mathItUp[eightInput.value](
            parseInt(sixInput.value) * sevenInputValue,
            parseInt(nineInput.value) * tenInputValue
          ),
      });
      startIndex = startIndex + 1;
    }
    setData(results);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      fontSize: "2rem",
      width: "10rem",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: "2rem",
        backgroundColor: isSelected ? "#000" : "#fff",
        color: isSelected ? "#fff" : "#000",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  const getImage = async () => {
    toast.success("Please wait image is being processing...");
    const dataUrl = await htmlToImage.toPng(ref.current);

    // download image
    const link = document.createElement("a");
    link.download = "GCSkew_CSV_DATA.png";
    link.href = dataUrl;
    link.click();
  };
  const csvReport = {
    data: data,
    headers: [
      { label: "X value", key: "name" },
      { label: "Y value", key: "window_number" },
    ],
    filename: "GCSkew_CSV_DATA.csv",
  };


  return currentFile ? (
    <div className={styles.container}>
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
          <h1>Fill the below fields in the required format</h1>
          <form>
            <div className={`${styles.inputs} ${styles.first}`}>
              {" "}
              <h1>(</h1>
              <Select
                defaultValue={firstInput}
                onChange={setFirstInput}
                options={numberOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={secondInput}
                onChange={setSecondInput}
                options={textOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={thirdInput}
                onChange={setthirdInput}
                options={operatorOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={fourthInput}
                onChange={setfourthInput}
                options={numberOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={fifthInput}
                onChange={setfifthInput}
                options={textOption}
                styles={colourStyles}
              />{" "}
              <h1>)</h1>
              <div className={styles.divide}>/</div>
            </div>

            <div className={`${styles.inputs} ${styles.second}`}>
              <h1>(</h1>
              <Select
                defaultValue={sixInput}
                onChange={setsixInput}
                options={numberOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={sevenInput}
                onChange={setsevenInput}
                options={textOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={eightInput}
                onChange={seteightInput}
                options={operatorOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={nineInput}
                onChange={setnineInput}
                options={numberOption}
                styles={colourStyles}
              />
              <Select
                defaultValue={tenIinput}
                onChange={setTenInput}
                options={textOption}
                styles={colourStyles}
              />{" "}
              <h1>)</h1>
            </div>
          </form>

          <button className={styles.searchButton} name="←" onClick={handleGo}>
            Go
          </button>

          {data.length ? (
            <>
              <Card
                title={"Gc Skew   - " + currentFileName}
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
                      value="C-G / C+G"
                      offset={0}
                      position="center"
                      angle="-90"
                      style={{ fill: "#fff" }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line
                    type="monotone"
                    dataKey="window_number"
                    stroke="#89023E"
                  />
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
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <FileInput />
  );
};

export default SkewCalculator;
