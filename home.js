// Home page: rotating featured movie + Recently Added / Top Rated rows

const featured = featuredIds.map(findMovie).filter(Boolean);
let featuredIndex = 0;
let rotateTimer = null;

const heroImg = document.querySelector('#heroImg');
const heroPoster = document.querySelector('#heroPoster');
const heroFav = document.querySelector('#heroFav');
const heroDots = document.querySelector('#heroDots');
const recentGrid = document.querySelector('#recentGrid');
const topGrid = document.querySelector('#topGrid');

recentGrid.className = gridClass;
topGrid.className = gridClass;

// ---------- Hero ----------
function showFeatured(index) {
  featuredIndex = (index + featured.length) % featured.length;
  const movie = featured[featuredIndex];
  heroImg.src = movie.poster;
  heroImg.alt = movie.title;
  heroPoster.src = movie.poster;
  heroPoster.alt = `${movie.title} poster`;
  document.querySelector('#heroTitle').textContent = movie.title;
  document.querySelector('#heroMeta').textContent = movieMeta(movie);
  document.querySelector('#heroSynopsis').textContent = movie.synopsis;
  document.querySelector('#heroDirector').textContent = movie.director ? `Director: ${movie.director}` : '';
  document.querySelector('#heroCast').textContent = movie.cast ? `Cast: ${movie.cast}` : '';
  document.querySelector('#watchBtn').dataset.id = movie.id;
  document.querySelector('#infoBtn').href = movieUrl(movie);
  updateHeroFav();
  heroDots.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('bg-[#FF4E4E]', i === featuredIndex);
    dot.classList.toggle('w-8', i === featuredIndex);
    dot.setAttribute('aria-selected', i === featuredIndex);
  });
}

function updateHeroFav() {
  const movie = featured[featuredIndex];
  const isFav = favorites.includes(movie.id);
  heroFav.dataset.id = movie.id;
  heroFav.classList.toggle('is-fav', isFav);
  heroFav.setAttribute('aria-pressed', isFav);
  heroFav.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
  heroFav.title = isFav ? 'In Favorites' : 'Add to Favorites';
}

heroDots.innerHTML = featured.map((movie, i) =>
  `<button class="h-2 w-2 rounded-full bg-white/50 transition-all cursor-pointer" role="tab" aria-label="Show ${escapeHtml(movie.title)}" data-index="${i}"></button>`).join('');
heroDots.addEventListener('click', event => {
  const dot = event.target.closest('button');
  if (!dot) return;
  showFeatured(Number(dot.dataset.index));
  startRotation();
});

// Rotate every 8 seconds; pause while the pointer is over the hero
function startRotation() {
  clearInterval(rotateTimer);
  rotateTimer = setInterval(() => showFeatured(featuredIndex + 1), 8000);
}
const hero = document.querySelector('#hero');
hero.addEventListener('mouseenter', () => clearInterval(rotateTimer));
hero.addEventListener('mouseleave', startRotation);

// ---------- Rows ----------
function renderRows() {
  const query = search.value.trim();
  const recent = movies.filter(movie => movie.lists.includes('recent') && matchesQuery(movie, query));
  const top = movies.filter(movie => movie.lists.includes('top') && matchesQuery(movie, query));

  recentGrid.innerHTML = recent.map(movieCard).join('');
  topGrid.innerHTML = top.map(movieCard).join('');
  document.querySelector('#recentSection').classList.toggle('hidden', recent.length === 0);
  document.querySelector('#topSection').classList.toggle('hidden', top.length === 0);
  document.querySelector('#noResults').classList.toggle('hidden', recent.length + top.length > 0);
  document.querySelector('#noResultsQuery').textContent = query;
}

onSearch = renderRows;
document.addEventListener('favorites-change', () => {
  updateHeroFav();
  renderRows();
});

// ---------- Start ----------
showFeatured(0);
startRotation();
renderRows();
