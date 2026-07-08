import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, User, BookOpen, Swords, Wrench, Map, Users, Brain, ArrowLeft } from 'lucide-react';
import gamesData from '../../data/games.json';
import PlatformBadge from '../../components/PlatformBadge/PlatformBadge';
import TagList from '../../components/TagList/TagList';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import AdBanner from '../../components/AdBanner/AdBanner';
import AdSidebar from '../../components/AdSidebar/AdSidebar';
import AdNative from '../../components/AdNative/AdNative';
import { formatDate } from '../../utils/helpers';
import styles from './GameDetail.module.css';

const iconMap = { BookOpen, Swords, Wrench, Map, Users, Brain };

export default function GameDetail() {
  const { id } = useParams();
  const [activeGuide, setActiveGuide] = useState(0);

  const game = gamesData.find(g => g.id === id);

  useEffect(() => { setActiveGuide(0); }, [id]);

  if (!game) {
    return (
      <div className={styles.notFound}>
        <h2>游戏未找到</h2>
        <Link to="/">返回首页</Link>
      </div>
    );
  }

  const related = gamesData
    .filter(g => g.id !== game.id && (g.category === game.category || g.subCategory.some(s => game.subCategory.includes(s))))
    .slice(0, 4);

  const currentGuide = game.guides[activeGuide];
  const GuideIcon = iconMap[currentGuide?.icon] || BookOpen;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label: game.title },
        ]} />

        {/* Hero */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.heroCover}>
            <img src={game.cover} alt={game.title} />
            {game.isNew && <span className={styles.badgeNew}>新游</span>}
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.heroMeta}>
              <h1 className={styles.gameTitle}>{game.title}</h1>
              <span className={styles.titleEn}>{game.titleEn}</span>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <Star size={15} className={styles.gold} />
                <span className={styles.ratingValue}>{game.rating}</span>
              </div>
              <div className={styles.infoItem}>
                <Calendar size={15} />
                <span>{formatDate(game.releaseDate)}</span>
              </div>
              <div className={styles.infoItem}>
                <User size={15} />
                <span>{game.publisher}</span>
              </div>
            </div>
            <p className={styles.desc}>{game.description}</p>
            <div className={styles.platforms}>
              {game.platforms.map(p => <PlatformBadge key={p} platform={p} size="md" />)}
            </div>
            <TagList tags={game.tags} size="md" />
          </div>
        </motion.div>

        {/* Ad Banner */}
        <AdBanner slot="sponsored" />

        {/* Guide Tabs */}
        <div className={styles.guideSection}>
          <h2 className={styles.sectionTitle}>攻略指南</h2>
          <div className={styles.tabs}>
            {game.guides.map((guide, i) => {
              const Icon = iconMap[guide.icon] || BookOpen;
              return (
                <button
                  key={guide.id}
                  className={`${styles.tab} ${activeGuide === i ? styles.tabActive : ''}`}
                  onClick={() => setActiveGuide(i)}
                >
                  <Icon size={16} />
                  <span>{guide.title}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className={styles.guideContent}
            key={currentGuide?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.guideHeader}>
              <GuideIcon size={22} className={styles.guideIcon} />
              <h3 className={styles.guideTitle}>{currentGuide?.title}</h3>
            </div>
            <div className={styles.guideBody}>
              {currentGuide?.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h4 key={i} className={styles.guideH4}>{line.replace('## ', '')}</h4>;
                if (line.startsWith('### ')) return <h5 key={i} className={styles.guideH5}>{line.replace('### ', '')}</h5>;
                if (line.startsWith('**') && line.endsWith('**')) return <h5 key={i} className={styles.guideH5}>{line.replace(/\*\*/g, '')}</h5>;
                if (line.startsWith('- **')) {
                  const parts = line.match(/- \*\*(.+?)\*\*(?:: (.+))?/);
                  if (parts) return <p key={i} className={styles.guideP}><strong>{parts[1]}</strong>{parts[2] ? `：${parts[2]}` : ''}</p>;
                  return <p key={i} className={styles.guideP}>{line.replace(/^\-\s*/, '')}</p>;
                }
                if (line.match(/^\d+\./)) {
                  return <p key={i} className={styles.guideP}>{line}</p>;
                }
                if (line.trim() === '') return <div key={i} className={styles.guideSpacer} />;
                return <p key={i} className={styles.guideP}>{line}</p>;
              })}
            </div>
          </motion.div>
        </div>

        {/* Side-by-side ad */}
        <div className={styles.adRow}>
          <AdNative index={0} />
          <AdNative index={1} />
        </div>

        {/* Related Games */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.sectionTitle}>相关推荐</h2>
            <div className={styles.relatedGrid}>
              {related.map(game => (
                <Link key={game.id} to={`/game/${game.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedCover}>
                    <img src={game.cover} alt={game.title} />
                  </div>
                  <div className={styles.relatedInfo}>
                    <h4>{game.title}</h4>
                    <div className={styles.relatedMeta}>
                      <Star size={12} className={styles.gold} />
                      <span>{game.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad */}
        <AdBanner slot="bottom" />
      </div>
    </div>
  );
}
