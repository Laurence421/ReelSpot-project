// Browse page: every movie, filtered by list, genre and search, with sorting.
// The filters live in the URL (e.g. browse.html?list=favorites&genre=Comedy), so any view can be shared.

const lists = [
  { id: 'all', label: 'All' },
  { id: 'recent', label: 'Recently Added' },
  { id: 'top', label: 'Top Rated' },
  { id: 'favorites', label: 'Favorites' },
];
const allGenres = [...new Set(movies.flatMap(genresOf))].sort();

const params = new URLSearchParams(location.search);
const state = {
  q: params.get('q') || '',
  list: lists.some(list => list.id === params.get('list')) ? params.get('list') : 'all',
  genre: allGenres.includes(params.get('genre')) ? params.get('genre') : '',
  sort: params.get('sort') || 'title',
};

const browseSearch = document.querySelector('#browseSearch');
const sortSelect = document.querySelector('#sortSelect');
const listTabs = document.querySelector('#listTabs');
const genreChips = document.querySelector('#genreChips');
const browseGrid = document.querySelector('#browseGrid');
browseGrid.className = gridClass;

const chipClass = 'chip shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm border border-white/20 cursor-pointer hover:border-white transition-colors';

const sorters = {
  title: (a, b) => a.title.localeCompare(b.title),
  newest: (a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title),
  oldest: (a, b) => (a.year || 9999) - (b.year || 9999) || a.title.localeCompare(b.title),
  runtime: (a, b) => (b.runtime || 0) - (a.runtime || 0) || a.title.localeCompare(b.title),
};

function inList(movie) {
  if (state.list === 'all') return true;
  if (state.list === 'favorites') return favorites.includes(movie.id);
  return movie.lists.includes(state.list);
}

function updateUrl() {
  const query = new URLSearchParams();
  if (state.q) query.set('q', state.q);
  if (state.list !== 'all') query.set('list', state.list);
  if (state.genre) query.set('genre', state.genre);
  if (state.sort !== 'title') query.set('sort', state.sort);
  const qs = query.toString();
  history.replaceState(null, '', `browse.html${qs ? `?${qs}` : ''}`);
}

function render() {
  const results = movies
    .filter(movie => inList(movie) && (!state.genre || genresOf(movie).includes(state.genre)) && matchesQuery(movie, state.q))
    .sort(sorters[state.sort] || sorters.title);

  const listLabel = lists.find(list => list.id === state.list).label;
  const title = state.list === 'favorites' ? 'My Favorites' : state.list === 'all' ? 'Browse Movies' : listLabel;
  document.querySelector('#browseTitle').textContent = state.genre ? `${title} · ${state.genre}` : title;
  document.title = `${title} · ReelSpot`;
  document.querySelector('#browseCount').textContent = `${results.length} ${results.length === 1 ? 'movie' : 'movies'}`;

  // Sidebar: highlight Favorites or Browse
  document.querySelectorAll('.nav-item[data-nav]').forEach(item => {
    item.classList.toggle('active', item.dataset.nav === (state.list === 'favorites' ? 'favorites' : 'browse'));
  });

  listTabs.innerHTML = lists.map(list =>
    `<button class="${chipClass}${list.id === state.list ? ' chip-active' : ''}" role="tab" aria-selected="${list.id === state.list}" data-list="${list.id}">${list.label}</button>`).join('');
  genreChips.innerHTML = ['', ...allGenres].map(genre =>
    `<button class="${chipClass}${genre === state.genre ? ' chip-active' : ''}" aria-pressed="${genre === state.genre}" data-genre="${escapeHtml(genre)}">${genre || 'All genres'}</button>`).join('');

  browseGrid.innerHTML = results.map(movieCard).join('');

  const empty = results.length === 0;
  document.querySelector('#browseEmpty').classList.toggle('hidden', !empty);
  if (empty) {
    const noFavorites = state.list === 'favorites' && favorites.length === 0;
    document.querySelector('#browseEmptyText').textContent = noFavorites
      ? 'No favorites yet. Tap the ☆ on any poster to add it here.'
      : `No movies match${state.q ? ` "${state.q}"` : ' these filters'}.`;
    document.querySelector('#clearFilters').classList.toggle('hidden', noFavorites);
  }
  updateUrl();
}

// ---------- Controls ----------
listTabs.addEventListener('click', event => {
  const tab = event.target.closest('[data-list]');
  if (!tab) return;
  state.list = tab.dataset.list;
  render();
});
genreChips.addEventListener('click', event => {
  const chip = event.target.closest('[data-genre]');
  if (!chip) return;
  state.genre = chip.dataset.genre;
  render();
});
sortSelect.value = sorters[state.sort] ? state.sort : 'title';
sortSelect.addEventListener('change', () => {
  state.sort = sortSelect.value;
  render();
});

// The page search box and the sidebar search box stay in sync
browseSearch.value = state.q;
function setQuery(query) {
  state.q = query;
  browseSearch.value = query;
  search.value = query;
  render();
}
browseSearch.addEventListener('input', () => setQuery(browseSearch.value.trim()));
onSearch = setQuery;

document.querySelector('#clearFilters').addEventListener('click', () => {
  state.list = 'all';
  state.genre = '';
  setQuery('');
});

document.addEventListener('favorites-change', render);

render();
