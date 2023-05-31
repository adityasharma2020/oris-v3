import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./ExtraxtSequencePage.module.scss";
import FileInput from "../../components/FileInput/FileInput";
import { toast } from "react-hot-toast";
import { CSVLink } from "react-csv";
import Rodal from "rodal";

const ExtraxtSequencePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [tempFile, setTempFile] = useState("");
  const [result, setResult] = useState({
    totalMatches: null,
    exactMatches: null,
  });
  const [loading, setLoading] = useState(false);
  const [allIndexes, setAllIndexes] = useState([]);
  const [downloadIndex, setDonwloadIndex] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(100);

  const { currentFile } = useContext(DataContext);

  const handleSearch = () => {
    const pattern = new RegExp(searchInput, "g");
    const matches = tempFile.match(pattern);

    if (matches && searchInput) {
      toast.success("Pattern succesfully found!");
      setResult((prev) => ({ ...prev, totalMatches: matches.length }));
    } else {
      toast.error("Pattern not found in the text.");
      setResult((prev) => ({ ...prev, totalMatches: 0 }));
    }
  };

  function asyncFunction(pattern, data) {
    return new Promise(function (resolve, reject) {
      let match;
      let indexes = [];
      while ((match = pattern.exec(data))) {
        indexes.push(match.index);
      }
      resolve(indexes);
    });
  }

  const handleFindAllIndex = () => {
    const pattern = new RegExp(searchInput, "g");
    // toast.success("Please wait data in processing...");

    setLoading(true);
    if (searchInput) {
      asyncFunction(pattern, tempFile)
        .then(function (result) {
          // toast.success("");
          setAllIndexes(result);
        })
        .catch(function (error) {
          console.error("An error occurred:", error);
        })
        .finally((e) => {
          setLoading(false);
        });
    } else {
      toast.error("No index found");
      setAllIndexes([]);
    }
  };

  const handleSubmitButton = () => {
    setModalVisible(false);
    if (startIndex <= 0 || endIndex >= currentFile.length) {
      toast.error("Please check the Start and End index");
    } else {
      setTempFile(currentFile.slice(startIndex, endIndex));
    }
  };

  const csvReport = {
    data: downloadIndex,
    headers: [{ label: "Index at", key: "value" }],
    filename: "SearchResult_CSV_DATA.csv",
  };

  return currentFile ? (
    <>
      <Rodal
        visible={modalVisible}
        showCloseButton={false}
        width="600"
        height="300"
      >
        <h1>Choose Start and End Index</h1>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type="text"
            placeholder=" "
            value={startIndex}
            onChange={(e) => setStartIndex(+e.target.value)}
          />
          <span className={styles.input__label}>Start Index</span>
        </label>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type="text"
            placeholder=" "
            value={endIndex}
            onChange={(e) => setEndIndex(+e.target.value)}
          />
          <span className={styles.input__label}>End Index</span>
        </label>

        <button className={styles.submitButton} onClick={handleSubmitButton}>
          Submit
        </button>
      </Rodal>
      {!modalVisible ? (
        <div className={styles.container}>
          <h2
            style={{
              wordBreak: "break-word",
              width: "100%",
              textAlign: "center",
              marginBottom: '2rem'
            }}
          >
            {" "}
            {tempFile}
          </h2>
          <h1>Enter pattern to search</h1>
          <form>
            <input
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder="Enter here"
              value={searchInput}
            />
          </form>

          <p>
            Enter A, G, C, T or R:Purine, Y:Pyrimidine, W: Weak, S: Strong, M:
            Amino, K: Keto, X: Any Base
          </p>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>

          {result.totalMatches ? (
            <>
              {" "}
              <p className={styles.result}>
                Searched for the string "{searchInput}" with exactly 0
                mismatches:
              </p>{" "}
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <tr>
                    <th>Total Matches</th>
                    <th>Exact Matches</th>
                  </tr>
                  <tr>
                    <td>{result.totalMatches}</td>
                    <td>{result.totalMatches}</td>
                  </tr>
                </table>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.searchButton}
                  onClick={handleFindAllIndex}
                >
                  Find All Index
                </button>

                <CSVLink
                  className={styles.searchButton}
                  {...csvReport}
                  asyncOnClick={true}
                  onClick={() => {
                    toast.success("Please wait csv is being rendering...");

                    const pattern = new RegExp(searchInput, "g");
                    if (searchInput) {
                      asyncFunction(pattern, tempFile)
                        .then(function (result) {
                          const tempResult = result.map((value) => {
                            return { value };
                          });
                          setDonwloadIndex(tempResult);
                        })
                        .catch(function (error) {
                          console.error("An error occurred:", error);
                        })
                        .finally((e) => {});
                    } else {
                      toast.error("No index found");
                      setDonwloadIndex([]);
                    }
                  }}
                >
                  Export all the indexes (.csv)
                </CSVLink>
              </div>
              {loading ? (
                <p>Loading... </p>
              ) : allIndexes.length > 0 ? (
                <div
                  className={`${styles.tableContainer}  ${styles.customHeight}`}
                >
                  {" "}
                  <table className={styles.table}>
                    <tr>
                      <th>Serial Number</th>
                      <th>Index at </th>
                    </tr>
                    {allIndexes.map((index, sn) => (
                      <tr key={sn}>
                        <td>{sn + 1}</td>
                        <td>{index}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      ) : null}
    </>
  ) : (
    <FileInput />
  );
};

export default ExtraxtSequencePage;
