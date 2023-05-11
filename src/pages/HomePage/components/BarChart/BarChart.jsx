import { useContext, useEffect, useState } from 'react';
import Card from '../../../../components/Card/Card';
import styles from './BarChart.module.scss';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { DataContext } from '../../../../context/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

function BarChart() {
  const { currentFile, isCurrentFileLoading } = useContext(DataContext);

  const [data, setData] = useState({
    labels: ['G', 'C', 'T', 'A'],
    datasets: [
      {
        label: ' ',
        data: [20, 14, 31, 55],
        backgroundColor: ['#6972c4', '#EE8484', '#F6DC7D', '#98D89E'],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    if (!isCurrentFileLoading) {
      const totalNumber = currentFile.length;
      const aValue = (
        (currentFile.match(/A/g).length / totalNumber) *
        100
      ).toFixed(2);

      const tValue = (
        (currentFile.match(/T/g).length / totalNumber) *
        100
      ).toFixed(2);

      const gValue = (
        (currentFile.match(/G/g).length / totalNumber) *
        100
      ).toFixed(2);

      const cValue = (
        (currentFile.match(/C/g).length / totalNumber) *
        100
      ).toFixed(2);

      setData((prev) => {
        const updatedDataset = {
          ...prev.datasets[0],
          data: [gValue, cValue, tValue, aValue],
        };
        return {
          ...prev,
          datasets: [updatedDataset],
        };
      });
    }
  }, [isCurrentFileLoading, currentFile]);

  return (
    <Card title='Pie chart'>
      <div className={styles.pieChart}>
        <Pie
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />

        <div className={styles.labels}>
          {data.datasets[0].data.map((currData, index) => (
            <div className={styles.label} key={`BarChart-${index}`}>
              <div
                className={styles.sign}
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></div>
              <div className={styles.value}>
                <h5>{data.labels[index]}</h5>
                <p>{currData} %</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default BarChart;
