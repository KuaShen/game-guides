import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>页面未找到</h2>
        <p className={styles.desc}>你寻找的页面可能已经被移除了</p>
        <Link to="/" className={styles.btn}>
          <Home size={18} /> 返回首页
        </Link>
      </motion.div>
    </div>
  );
}
