import styles from './AdSidebar.module.css';

export default function AdSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.adUnit}>
        <span className={styles.label}>广告</span>
        <div className={styles.placeholder}>
          <p>赞助商展示位</p>
          <p className={styles.sub}>300 x 250</p>
        </div>
      </div>
      <div className={styles.adUnit}>
        <span className={styles.label}>广告</span>
        <div className={styles.placeholder}>
          <p>赞助商展示位</p>
          <p className={styles.sub}>300 x 600</p>
        </div>
      </div>
    </div>
  );
}
