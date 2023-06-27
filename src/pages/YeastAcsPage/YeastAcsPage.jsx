import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./YeastAcsPage.module.scss";
import FileInput from "../../components/FileInput/FileInput";
import { toast } from "react-hot-toast";
import { CSVLink } from "react-csv";
import Select from "react-select";

const YeastAcsPage = () => {
  const [result, setResult] = useState({
    totalMatches: null,
    exactMatches: null,
  });
  const [loading, setLoading] = useState(false);
  const [allIndexes, setAllIndexes] = useState([]);
  const [downloadIndex, setDonwloadIndex] = useState([]);

  const { currentFile } = useContext(DataContext);

  const textOption = [
    { value: "WTTTATRTTTW", label: "TTTATRTTTW" },
    { value: "TTTTATATTTT", label: "TTTTATATTTT" },
    { value: "TTTTATATTTA", label: "TTTTATATTTA" },
    { value: "TTTTATGTTTT", label: "TTTTATGTTTT" },
    { value: "TTTTATGTTTA", label: "TTTTATGTTTA" },
    { value: "ATTTATATTTT", label: "ATTTATATTTT" },
    { value: "ATTTATATTTA", label: "ATTTATATTTA" },
    { value: "ATTTATGTTTT", label: "ATTTATGTTTT" },
    { value: "ATTTATGTTTA", label: "ATTTATGTTTA" },
  ];
  const [searchInput, setSearchInput] = useState(textOption[3]);

  const handleSearch = () => {
    const pattern = new RegExp(searchInput?.value, "g");
    const matches = currentFile.match(pattern);

    if (matches && searchInput?.value) {
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
    const pattern = new RegExp(searchInput?.value, "g");
    // toast.success("Please wait data in processing...");

    setLoading(true);
    if (searchInput?.value) {
      asyncFunction(pattern, currentFile)
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

  const csvReport = {
    data: downloadIndex,
    headers: [{ label: "Index at", key: "value" }],
    filename: "SearchResult_CSV_DATA.csv",
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      fontSize: "2rem",
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

  return currentFile ? (
    <div className={styles.container}>
      <h1>Select option from below for : Yeast ACS</h1>
      <form>
        <Select
          defaultValue={searchInput}
          onChange={setSearchInput}
          options={textOption}
          styles={colourStyles}
        />
      </form>

      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>

      {result.totalMatches ? (
        <>
          {" "}
          <p className={styles.result}>
            Searched for the string "{searchInput?.value}" with exactly 0
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
                  asyncFunction(pattern, currentFile)
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
              Export to CSV
            </CSVLink>
          </div>
          {loading ? (
            <p>Loading... </p>
          ) : allIndexes.length > 0 ? (
            <div className={`${styles.tableContainer}  ${styles.customHeight}`}>
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
  ) : (
    <FileInput />
  );
};

export default YeastAcsPage;
