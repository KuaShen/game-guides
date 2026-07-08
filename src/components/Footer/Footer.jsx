import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import { CATEGORIES, SITE_NAME } from '../../utils/constants';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Gamepad2 size={24} className={styles.logoIcon} />
              <span>{SITE_NAME}</span>
            </div>
            <p className={styles.desc}>{SITE_NAME} 为你提供最全、最专业的游戏攻略内容。</p>
          </div>
          <div className={styles.links}>
            <h4 className={styles.heading}>游戏分类</h4>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={cat.path} className={styles.link}>{cat.label}</Link>
            ))}
          </div>
          <div className={styles.advertise}>
            <h4 className={styles.heading}>广告合作</h4>
            <p className={styles.desc}>广告投放、品牌合作、赞助内容请联系：</p>
            <a href="mailto:ads@game-guide.com" className={styles.link}>ads@game-guide.com</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>&copy; 2026 {SITE_NAME}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
