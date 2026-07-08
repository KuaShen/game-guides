import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Gamepad2 } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <Gamepad2 size={28} className={styles.logoIcon} />
          <span className={styles.logoText}>游戏攻略<span className={styles.logoAccent}>大全</span></span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={cat.path} className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {searchOpen ? (
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="搜索游戏..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" className={styles.iconBtn} onClick={() => setSearchOpen(false)}>
                <X size={20} />
              </button>
            </form>
          ) : (
            <button className={styles.iconBtn} onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}
          <button className={`${styles.iconBtn} ${styles.menuBtn}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
