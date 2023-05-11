import styles from './HomePage.module.scss';
import StatsCard from './components/StatsCard/StatsCard';

import { ReactComponent as DnaIcon } from '../../assets/icons/dna_icon.svg';

// import ActivityChart from './components/ActivityChart/ActivityChart';
import Summary from './components/Summary/Summary';
import BarChart from './components/BarChart/BarChart';
import { useContext } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { DataContext } from '../../context/DataContext';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const { currentFile, isCurrentFileLoading, currentFileName, isFileExist } =
    useContext(DataContext);
  const statsArray = [
    {
      color: '#DDEFE0',
      title: 'No of A',
      value: currentFile?.match(/A/g).length.toLocaleString('en-US'),
      icon: <DnaIcon />,
    },
    {
      color: '#F4ECDD',
      title: 'No of T',
      value: currentFile?.match(/T/g).length.toLocaleString('en-US'),
      icon: <DnaIcon />,
    },
    {
      color: '#EFDADA',
      title: 'No of C',
      value: currentFile?.match(/C/g).length.toLocaleString('en-US'),
      icon: <DnaIcon />,
    },
    {
      color: '#DEE0EF',
      title: 'No of G',
      value: currentFile?.match(/G/g).length.toLocaleString('en-US'),
      icon: <DnaIcon />,
    },
  ];
  
  return isFileExist ? (
    isCurrentFileLoading ? (
      <Loading />
    ) : (
      <>
        <div className={styles.stats}>
          {statsArray.map((stat, index) => (
            <StatsCard
              key={`statscard-${index}`}
              color={stat.color}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
        <div className={styles.bottomCards}>
          <BarChart />
          <Summary fileName={currentFileName} fileLength={currentFile.length} />
        </div>

        {/* <ActivityChart /> */}
        <div className={styles.fileViewContainer}>
          <div className={styles.fileViewHeader}>
            <h1>File Preview</h1>
            <p>{currentFile}</p>
          </div>
        </div>
      </>
    )
  ) : (
    <FileInput />
  );
}

export default HomePage;
