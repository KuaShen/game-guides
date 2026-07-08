import styles from './AdBanner.module.css';

const ads = {
  top: {
    label: '广告 · 推荐游戏',
    title: '黑神话：悟空 官方联名周边限量发售',
    subtitle: '天命人集结！限量版手办、T恤、原画集火热预售中',
    cta: '立即抢购',
    bg: 'linear-gradient(135deg, #1a0533, #0f3460)',
  },
  bottom: {
    label: '广告 · 游戏推荐',
    title: '下载游戏攻略大全App',
    subtitle: '随时随地查攻略，离线缓存更省心',
    cta: '免费下载',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  },
  sponsored: {
    label: '赞助内容',
    title: '🌟 精选游戏推荐',
    subtitle: '本栏目由优质游戏内容合作伙伴支持',
    cta: '了解详情',
    bg: 'linear-gradient(135deg, #2d1b69, #1a1a2e)',
  },
};

export default function AdBanner({ slot = 'top', onDismiss } = {}) {
  const ad = ads[slot] || ads.top;
  return (
    <div className={styles.banner} style={{ background: ad.bg }}>
      <div className={styles.content}>
        <span className={styles.label}>{ad.label}</span>
        <h3 className={styles.title}>{ad.title}</h3>
        <p className={styles.subtitle}>{ad.subtitle}</p>
        <button className={styles.cta} onClick={() => window.open('#', '_blank')}>
          {ad.cta}
        </button>
      </div>
      {onDismiss && (
        <button className={styles.dismiss} onClick={onDismiss}>&times;</button>
      )}
    </div>
  );
}
