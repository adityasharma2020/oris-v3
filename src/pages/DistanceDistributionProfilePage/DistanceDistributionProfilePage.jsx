import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import styles from './DistanceDistributionProfilePage.module.scss';
import FileInput from '../../components/FileInput/FileInput';
import { toast } from 'react-hot-toast';

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

const DistanceDistributionProfilePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState([
    // {
    //   class: null,
    //   freq: null,
    // },
  ]);
  const [loading, setLoading] = useState(false);
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

      asyncFunction(pattern, currentFile)
        .then(function (result) {
          const indexDistance = [];

          // console.log(result);
          for (let index = 0; index < result.length; index++) {
            let currentDistance = 0;
            currentDistance = result[index + 1] - result[index];
            indexDistance.push(currentDistance);
          }
          // console.log(indexDistance);
          const counts = {};

          for (const num of indexDistance) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
          }

          const finalIndexDistance = [];
          for (const key in counts) {
            if (counts.hasOwnProperty(key)) {
              // console.log(`${key}: ${counts[key]}`);
              finalIndexDistance.push({ key, value: counts[key] });
            }
          }

          console.log(finalIndexDistance);
          setResult((prev) => finalIndexDistance);
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

  // const csvReport = {
  //   data: result,
  //   headers: [{ label: 'Frequency', key: 'freq' }],
  //   filename: 'SearchResult_CSV_DATA.csv',
  // };

  // const getImage = async () => {
  //   toast.success('Please wait image is being processing...');
  //   const dataUrl = await htmlToImage.toPng(ref.current);

  //   // download image
  //   const link = document.createElement('a');
  //   link.download = 'Dispersion_graph_CSV_DATA.png';
  //   link.href = dataUrl;
  //   link.click();
  // };

  return currentFile ? (
    <div className={styles.container}>
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
            Searched for the string "{searchInput}" with exactly 0 mismatches:
          </p>{' '}
          {loading ? (
            <p>Loading... </p>
          ) : (
            <>
              <div
                className={`${styles.tableContainer}  ${styles.customHeight}`}
              >
                {' '}
                {/* <table className={styles.table}>
                      <tr>
                        <th>No of frequency </th>
                        <th>classes </th>
                      </tr>
                      {result.map((res) => (
                        <tr>
                          <td>{res.freq}</td>
                          <td>
                            {res.class[0]} -&gt; {res.class[1]}
                          </td>
                        </tr>
                      ))}
                    </table> */}
              </div>
              <div ref={ref} style={{ width: '100%', height: '100%' }}>
                <ComposedChart
                  width={1000}
                  height={700}
                  data={result}
                  className={styles.brushChart}
                >
                  <XAxis dataKey='key'></XAxis>
                  <YAxis>
                    <Label
                      value='Distance frequency'
                      offset={0}
                      position='center'
                      angle='-90'
                      style={{ fill: '#000' }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke='#f5f5f5' />
                  <Line type='monotone' dataKey='value' stroke='#89023E' />
                  <Brush startIndex={1} endIndex={280} dataKey='name' />
                </ComposedChart>

                {/* <Bar
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
                    labels: result.map((res) => res.key),
                    datasets: [
                      {
                        label: 'Group frequency',
                        data: result.map((res) => res.value),
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
                /> */}
              </div>
              {/* <CSVLink
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
                  </button> */}
            </>
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

export default DistanceDistributionProfilePage;
