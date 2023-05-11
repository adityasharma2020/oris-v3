import { useContext } from 'react';
import Card from '../../../../components/Card/Card';
import styles from './Summary.module.scss';
import { DataContext } from '../../../../context/DataContext';

function Summary({ fileName, fileLength }) {
  const { dispatch } = useContext(DataContext);

  const handleNewFile = () => {
    dispatch({ type: 'UNSET_DATA' });
  };

  return (
    <Card title='Summary'>
      <div className={styles.schedule} style={{ borderColor: '#9BDD7C' }}>
        <h5>File Name: </h5>
        <p>{fileName}</p>
      </div>
      <div className={styles.schedule} style={{ borderColor: '#EE8484' }}>
        <h5>Length of genome</h5>
        <p>{fileLength.toLocaleString('en-US')}</p>
      </div>
      <p className={styles.link} onClick={handleNewFile}>
        Upload a new file!
      </p>
    </Card>
  );
}

export default Summary;
