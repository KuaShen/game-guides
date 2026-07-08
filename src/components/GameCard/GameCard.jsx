import { Link } from 'react-router-dom';
import { Star, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PlatformBadge from '../PlatformBadge/PlatformBadge';
import TagList from '../TagList/TagList';
import styles from './GameCard.module.css';

export default function GameCard({ game, index = 0, variant = 'default' }) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link to={`/game/${game.id}`} className={`${styles.card} ${isCompact ? styles.compact : ''}`}>
        <div className={styles.cover}>
          <img src={game.cover} alt={game.title} loading="lazy" className={styles.coverImg} />
          <div className={styles.coverOverlay} />
          {game.isNew && <span className={styles.badgeNew}>新游</span>}
          <div className={styles.rating}>
            <Star size={14} className={styles.star} />
            <span>{game.rating}</span>
          </div>
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{game.title}</h3>
          {!isCompact && <p className={styles.desc}>{game.description.slice(0, 60)}…</p>}
          <div className={styles.meta}>
            <div className={styles.platforms}>
              {game.platforms.slice(0, 3).map(p => (
                <PlatformBadge key={p} platform={p} />
              ))}
              {game.platforms.length > 3 && <span className={styles.more}>+{game.platforms.length - 3}</span>}
            </div>
          </div>
          {!isCompact && <TagList tags={game.tags.slice(0, 3)} />}
        </div>
      </Link>
    </motion.div>
  );
}
