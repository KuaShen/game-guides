import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import gamesData from '../../data/games.json';
import { getCategoryLabel } from '../../utils/helpers';
import GameCard from '../../components/GameCard/GameCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import AdNative from '../../components/AdNative/AdNative';
import styles from './Category.module.css';

export default function Category() {
  const { catId } = useParams();
  const [sortBy, setSortBy] = useState('rating');

  const label = getCategoryLabel(catId);

  let filtered = gamesData;
  if (catId === 'hot') filtered = gamesData.filter(g => g.isHot);
  else if (catId === 'pc') filtered = gamesData.filter(g => g.category === 'pc');
  else if (catId === 'mobile') filtered = gamesData.filter(g => g.category === 'mobile');
  else if (catId === 'boardgame') filtered = gamesData.filter(g => g.category === 'boardgame');
  else if (catId === 'classic') filtered = gamesData.filter(g => g.category === 'classic');

  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'date') filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  if (sortBy === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={styles.title}>{label}</h1>
          <p className={styles.desc}>共 {filtered.length} 款游戏攻略</p>
        </motion.div>

        <div className={styles.controls}>
          <div className={styles.sort}>
            {['rating', 'date', 'title'].map(s => (
              <button
                key={s}
                className={`${styles.sortBtn} ${sortBy === s ? styles.sortActive : ''}`}
                onClick={() => setSortBy(s)}
              >
                {s === 'rating' ? '评分' : s === 'date' ? '发行日期' : '名称'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
          {/* Native ad card every 4 games */}
          {filtered.length > 4 && <AdNative index={0} />}
          {filtered.length > 8 && <AdNative index={1} />}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>该分类暂无游戏攻略</p>
          </div>
        )}
      </div>
    </div>
  );
}
