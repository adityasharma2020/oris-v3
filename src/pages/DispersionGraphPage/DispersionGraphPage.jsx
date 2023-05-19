import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import styles from './DispersionGraphPage.module.scss';
import FileInput from '../../components/FileInput/FileInput';
import { toast } from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import Rodal from 'rodal';
import * as htmlToImage from 'html-to-image';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DispersionGraphPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState([
    // {
    //   class: null,
    //   freq: null,
    // },
  ]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [noOfClasses, setnoOfClasses] = useState(10);
  const { currentFile } = useContext(DataContext);
  const ref = useRef(null);

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

  const handleSearch = () => {
    const pattern = new RegExp(searchInput, 'g');
    const matches = currentFile;

    if (matches && searchInput) {
      toast.success('Pattern succesfully found!');

      const noOfClassSize = Math.round(matches.length / noOfClasses);
      asyncFunction(pattern, currentFile)
        .then(function (result) {
          let intervals = [];
          let frequencies = [];

          // intervals
          let startIndex = 0;
          let endIndex = noOfClassSize;
          for (let index = 0; index < noOfClasses; index++) {
            intervals.push([startIndex, endIndex]);
            startIndex = endIndex;
            endIndex = endIndex + noOfClassSize;
          }

          // frequencies
          for (let index = 0; index < intervals.length; index++) {
            let start = intervals[index][0];
            let end = intervals[index][1];
            let tempFrequency = 0;

            result.forEach((res) => {
              if (start < res && res < end) {
                tempFrequency = tempFrequency + 1;
              }
            });
            frequencies.push({ freq: tempFrequency, class: [start, end] });
          }
          console.log(frequencies);
          setResult((prev) => frequencies);
        })
        .catch(function (error) {
          console.error('An error occurred:', error);
        })
        .finally((e) => {
          setLoading(false);
        });
    } else {
      toast.error('Pattern not found in the text.');
      setResult((prev) => []);
    }
  };

  const handleSubmit = () => {
    setModalVisible(false);
  };

  const csvReport = {
    data: result,
    headers: [{ label: 'Frequency', key: 'freq' }],
    filename: 'SearchResult_CSV_DATA.csv',
  };

  const getImage = async () => {
    toast.success('Please wait image is being processing...');
    const dataUrl = await htmlToImage.toPng(ref.current);

    // download image
    const link = document.createElement('a');
    link.download = 'Dispersion_graph_CSV_DATA.png';
    link.href = dataUrl;
    link.click();
  };

  return currentFile ? (
    <div className={styles.container}>
      <Rodal
        visible={modalVisible}
        showCloseButton={false}
        width='600'
        height='250'
      >
        <h1>Choose No of classes </h1>

        <label className={styles.input}>
          <input
            className={styles.input__field}
            type='text'
            placeholder=' '
            value={noOfClasses}
            onChange={(e) => setnoOfClasses(+e.target.value)}
          />
          <span className={styles.input__label}>Class size</span>
        </label>

        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </Rodal>

      {!modalVisible ? (
        <>
          <h1>Enter pattern to search</h1>
          <form>
            <input
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder='Enter here'
              value={searchInput}
              className={styles.searchInput}
            />
          </form>
          <p>
            Enter A, G, C, T or R:Purine, Y:Pyrimidine, W: Weak, S: Strong, M:
            Amino, K: Keto, X: Any Base
          </p>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
          {result.length ? (
            <>
              {' '}
              <p className={styles.result}>
                Searched for the string "{searchInput}" with exactly 0
                mismatches:
              </p>{' '}
              {loading ? (
                <p>Loading... </p>
              ) : (
                <>
                  <div
                    className={`${styles.tableContainer}  ${styles.customHeight}`}
                  >
                    {' '}
                    <table className={styles.table}>
                      <tr>
                        <th>No of classes</th>
                        <th>No of frequency</th>
                      </tr>
                      {result.map((res) => (
                        <tr>
                          <td>{res.freq}</td>
                          <td>
                            {res.class[0]} -&gt; {res.class[1]}
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div ref={ref} style={{ width: '100%', height: '100%' }}>
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Dispersion Graph',
                          },
                        },
                      }}
                      data={{
                        labels: result.map(
                          (res) => `${res.class[0]} -> ${res.class[1]}`
                        ),
                        datasets: [
                          {
                            label: 'Group frequency',
                            data: result.map((res) => res.freq),
                            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: '#ff6687',
                            backgroundColor: '#ffb1c1',
                            // backgroundImage:
                            //   'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false,
                          },
                        ],
                      }}
                    />
                  </div>
                  <CSVLink
                    className={styles.submitButton}
                    {...csvReport}
                    onClick={() => {
                      toast.success('Please wait csv is being rendering...');
                    }}
                    style={{ marginTop: '5rem' }}
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
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : null}
    </div>
  ) : (
    <FileInput />
  );
};

export default DispersionGraphPage;
