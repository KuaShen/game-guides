import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import styles from './AdNative.module.css';

const nativeAds = [
  {
    id: 'ad-1',
    title: '⚡ 游戏加速器 - 永久免费',
    desc: '专为外服游戏玩家打造的低延迟加速器，支持上千款游戏',
    tag: '赞助',
    color: '#4ade80',
  },
  {
    id: 'ad-2',
    title: '🎮 游戏手柄限时特惠',
    desc: '专业级电竞手柄，支持PC/手机/Switch多平台',
    tag: '广告',
    color: '#60a5fa',
  },
];

export default function AdNative({ index = 0 } = {}) {
  const ad = nativeAds[index % nativeAds.length];
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.02 }}
      onClick={() => window.open('#', '_blank')}
    >
      <div className={styles.tagWrap}>
        <span className={styles.tag} style={{ background: ad.color }}>{ad.tag}</span>
        <ExternalLink size={14} className={styles.ext} />
      </div>
      <h4 className={styles.title}>{ad.title}</h4>
      <p className={styles.desc}>{ad.desc}</p>
    </motion.div>
  );
}
