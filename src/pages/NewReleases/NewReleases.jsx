import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import gamesData from '../../data/games.json';
import GameCard from '../../components/GameCard/GameCard';
import AdBanner from '../../components/AdBanner/AdBanner';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './NewReleases.module.css';

export default function NewReleases() {
  const newGames = gamesData.filter(g => g.isNew);
  const sorted = [...newGames].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label: '新游速递' },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={styles.title}>
            <Sparkles size={28} /> 新游速递
          </h1>
          <p className={styles.desc}>最新发布的游戏攻略，第一时间掌握</p>
        </motion.div>

        {sorted.length > 0 ? (
          <div className={styles.grid}>
            {sorted.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Clock size={48} />
            <p>暂无新游攻略，敬请期待</p>
          </div>
        )}

        <div className={styles.adWrap}>
          <AdBanner slot="bottom" />
        </div>
      </div>
    </div>
  );
}
