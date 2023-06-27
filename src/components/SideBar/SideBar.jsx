import styles from './SideBar.module.scss';
import { useState } from 'react';

import sidebarData from '../../data/sidebar';

import { ReactComponent as ChevronIcon } from '../../assets/icons/bottom_chevron.svg';

import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';

function SideBar() {
  return (
    <div className={styles.container}>
      <div>
        <Link to={'/'} about='h1' className={styles.header}>
          Oris.
        </Link>

        <div className={styles.navItems}>
          {sidebarData.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.bottomTexts}>
        <p>Support</p>
        <p>Report Bug</p>
      </div>
    </div>
  );
}

function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          open ? `${styles.sidebarItem} ${styles.open}` : styles.sidebarItem
        }
      >
        <div className={styles.sidebarTitles} onClick={() => setOpen(!open)}>
          <div className={styles.sidebarTitle} id={'tooltip-' + item.title}>
            {item.icon && item.icon}
            {item.title}
          </div>
          <ReactTooltip
            anchorId={'tooltip-' + item.title}
            place='bottom'
            content={item.fullForm ?? item.title}
          />

          <div className={open ? styles.up : ''}>
            <ChevronIcon />
          </div>
        </div>
        <div className={styles.sidebarContent}>
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path || '#'}
        className={`${styles.sidebarItem} ${styles.plain}`}
      >
        <div className={styles.sidebarTitle} id={'tooltip-' + item.title}>
          {item.icon && item.icon}
          {item.title}
        </div>
        <ReactTooltip
          anchorId={'tooltip-' + item.title}
          place='bottom'
          content={item.fullForm ?? item.title}
        />
      </Link>
    );
  }
}

export default SideBar;
