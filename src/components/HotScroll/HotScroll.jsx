import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import PlatformBadge from '../PlatformBadge/PlatformBadge';
import styles from './HotScroll.module.css';

export default function HotScroll({ games }) {
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pos = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPos(pos);
    setMaxScroll(max);
    setShowLeft(pos > 20);
    setShowRight(pos < max - 20);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, games]);

  // Auto-play
  useEffect(() => {
    if (isHovered || maxScroll === 0) {
      clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = 280 + 20; // card + gap
      let next = el.scrollLeft + cardWidth;
      if (next >= maxScroll) next = 0;
      el.scrollTo({ left: next, behavior: 'smooth' });
    }, 3000);
    return () => clearInterval(autoPlayRef.current);
  }, [isHovered, maxScroll]);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // Mouse wheel → horizontal scroll
  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: e.deltaY, behavior: 'auto' });
  }, []);

  const progress = maxScroll > 0 ? (scrollPos / maxScroll) * 100 : 0;

  if (!games || games.length === 0) return null;

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.titleRow}>
          <h2 className={styles.title}>
            <Flame size={28} className={styles.fire} />
            热门游戏
          </h2>
        </div>
        <div className={styles.controls}>
          <button
            className={`${styles.arrow} ${showLeft ? styles.arrowVisible : ''}`}
            onClick={() => scrollBy(-1)}
            aria-label="向左滚动"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className={`${styles.arrow} ${showRight ? styles.arrowVisible : ''}`}
            onClick={() => scrollBy(1)}
            aria-label="向右滚动"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </motion.div>

      <div className={styles.carouselWrap}>
        <div className={styles.fadeLeft} style={{ opacity: showLeft ? 1 : 0 }} />
        <div
          className={styles.track}
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleWheel}
        >
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              className={styles.cardWrap}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/game/${game.id}`} className={styles.card}>
                <div className={styles.cardCover}>
                  <img src={game.cover} alt={game.title} loading="lazy" />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardRating}>
                    <Star size={12} className={styles.starIcon} />
                    <span>{game.rating}</span>
                  </div>
                  {game.isNew && <span className={styles.newTag}>新游</span>}
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{game.title}</h3>
                  <div className={styles.cardPlatforms}>
                    {game.platforms.slice(0, 3).map(p => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                  <p className={styles.cardDesc}>{game.description.slice(0, 50)}…</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className={styles.fadeRight} style={{ opacity: showRight ? 1 : 0 }} />
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
