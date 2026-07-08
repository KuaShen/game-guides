import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, Gamepad2, Star, Sparkles } from 'lucide-react';
import gamesData from '../../data/games.json';
import { CATEGORIES } from '../../utils/constants';
import HotScroll from '../../components/HotScroll/HotScroll';
import GameCard from '../../components/GameCard/GameCard';
import AdBanner from '../../components/AdBanner/AdBanner';
import styles from './Home.module.css';

export default function Home() {
  const hotGames = gamesData.filter(g => g.isHot);
  const newGames = gamesData.filter(g => g.isNew);
  const topRated = [...gamesData].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            游戏攻略<span className={styles.heroAccent}>大全</span>
          </motion.h1>
          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            最全的中文游戏攻略平台 —— 热门大作、冷门佳作，从入门到精通
          </motion.p>
          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <span className={styles.stat}>
              <Gamepad2 size={16} /> {gamesData.length}+ 款游戏
            </span>
            <span className={styles.stat}>
              <Star size={16} /> {gamesData.reduce((s, g) => s + g.guides.length, 0)}+ 篇攻略
            </span>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Sparkles size={24} /> 游戏分类
          </h2>
        </div>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={cat.path} className={styles.categoryCard} style={{ '--cat-color': cat.color }}>
                <div className={styles.categoryIcon}>{cat.label.slice(0, 2)}</div>
                <h3 className={styles.categoryName}>{cat.label}</h3>
                <ArrowRight size={16} className={styles.categoryArrow} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hot Games Horizontal Scroll */}
      <HotScroll games={hotGames} />

      {/* Ad Banner */}
      <div className={styles.adWrap}>
        <AdBanner slot="top" />
      </div>

      {/* Top Rated */}
      <section className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={24} /> 高分推荐
          </h2>
        </div>
        <div className={styles.gameGrid}>
          {topRated.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      {newGames.length > 0 && (
        <section className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Clock size={24} /> 新游速递
            </h2>
            <Link to="/new-releases" className={styles.viewAll}>
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.gameGrid}>
            {newGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
