export function getCategoryLabel(categoryId) {
  const map = {
    hot: '热门游戏',
    new: '新游速递',
    pc: '端游',
    mobile: '手游',
    boardgame: '桌游',
    classic: '怀旧经典',
  };
  return map[categoryId] || '未知分类';
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function filterGames(games, { category, platform, genre, search, sortBy, ratingMin } = {}) {
  let result = [...games];

  if (category === 'hot') result = result.filter(g => g.isHot);
  else if (category === 'new') result = result.filter(g => g.isNew);
  else if (category) result = result.filter(g => g.category === category);

  if (platform && platform !== 'all') {
    result = result.filter(g => g.platforms.includes(platform));
  }
  if (genre && genre !== 'all') {
    result = result.filter(g => g.subCategory.includes(genre));
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.titleEn.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (ratingMin) {
    result = result.filter(g => g.rating >= ratingMin);
  }

  if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'date') result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  else if (sortBy === 'title') result.sort((a, b) => a.title.localeCompare(b.title));

  return result;
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
