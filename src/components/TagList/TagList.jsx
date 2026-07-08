import styles from './TagList.module.css';

export default function TagList({ tags, size = 'sm' }) {
  return (
    <div className={`${styles.tags} ${styles[size]}`}>
      {tags.map(tag => (
        <span key={tag} className={styles.tag}>{tag}</span>
      ))}
    </div>
  );
}
