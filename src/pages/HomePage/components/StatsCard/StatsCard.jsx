import styles from "./StatsCard.module.scss";

function StatsCard({ color, icon, title, value }) {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.icon}>{icon}</div>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default StatsCard;
