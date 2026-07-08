import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import gamesData from '../../data/games.json';
import { filterGames } from '../../utils/helpers';
import GameCard from '../../components/GameCard/GameCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Search.module.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = filterGames(gamesData, { search: query });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumb items={[
          { label: '首页', path: '/' },
          { label: query ? `搜索：${query}` : '搜索' },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={styles.title}>
            <SearchIcon size={24} /> 搜索结果
          </h1>
          {query && (
            <p className={styles.desc}>
              关键词 "<strong>{query}</strong>" 共找到 {results.length} 个结果
            </p>
          )}
        </motion.div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <SearchIcon size={48} />
            {query ? (
              <p>没有找到匹配 "{query}" 的游戏攻略</p>
            ) : (
              <p>输入关键词搜索游戏攻略</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
