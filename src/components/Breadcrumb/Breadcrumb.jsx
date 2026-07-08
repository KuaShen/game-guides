import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items }) {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {i > 0 && <ChevronRight size={14} className={styles.sep} />}
          {item.path ? (
            <Link to={item.path} className={styles.link}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
