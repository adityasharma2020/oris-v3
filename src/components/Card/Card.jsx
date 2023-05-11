import styles from './Card.module.scss';

import { ReactComponent as ChevronIcon } from '../../assets/icons/bottom_chevron.svg';

function Card({ children, title, subTitle, type, className }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <h1>{title}</h1>
        {subTitle ? (
          <div className={styles.subTitle}>
            <p> {subTitle} </p>
            <div
              className={
                type === 'navigation'
                  ? `${styles.subTitleIcon} ${styles.rotateIcon}`
                  : styles.subTitleIcon
              }
            >
              <ChevronIcon />
            </div>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default Card;
