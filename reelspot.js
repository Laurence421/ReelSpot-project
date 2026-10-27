// Shared code for every page: saved state, layout (sidebar, footer, modals),
// movie cards, favorites, profile, trailer player and newsletter.
// Each page sets <body data-page="..."> and loads movies-data.js, this file, then its own script.

// ---------- Saved state (localStorage) ----------
function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked: keep working in memory only
  }
}

let favorites = load('reelspot-favorites', []);
let profileName = load('reelspot-name', 'Guest');
const page = document.body.dataset.page;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

// ---------- Helpers ----------
const findMovie = id => movies.find(movie => movie.id === id);
const genresOf = movie => movie.genre.split(',').map(genre => genre.trim());
const movieUrl = movie => `movie.html?id=${encodeURIComponent(movie.id)}`;
const movieMeta = movie => [movie.genre, movie.year, movie.runtime && `${movie.runtime} Min`].filter(Boolean).join(' | ');
const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function matchesQuery(movie, query) {
  if (!query) return true;
  const text = [movie.title, movie.genre, movie.director, movie.cast].join(' ').toLowerCase();
  return text.includes(query.toLowerCase());
}

// ---------- Layout ----------
const navLinks = [
  { nav: 'home', href: 'index.html', icon: 'uil-estate', label: 'Home' },
  { nav: 'browse', href: 'browse.html', icon: 'uil-film', label: 'Browse' },
  { nav: 'favorites', href: 'browse.html?list=favorites', icon: 'uil-star', label: 'Favorites' },
];
const navClass = 'nav-item w-full flex items-center gap-4 rounded-lg px-3 py-3 cursor-pointer hover:bg-white/10';

function renderLayout() {
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="md:hidden sticky top-0 z-30 flex items-center justify-between bg-[#131313] px-4 py-3">
        <a href="index.html" class="text-[red] font-extrabold text-lg">REELSPOT</a>
        <button id="menuBtn" class="text-white text-3xl cursor-pointer" aria-label="Open menu"><i class="uil uil-bars"></i></button>
    </header>
    <div id="overlay" class="hidden fixed inset-0 z-30 bg-black/60 md:hidden"></div>`);

  document.querySelector('#layout').insertAdjacentHTML('afterbegin', `
    <aside id="asides" class="aside fixed top-0 left-0 z-40 h-screen py-5 bg-[#131313] overflow-x-hidden overflow-y-auto">
        <section class="aside-head flex items-center gap-3 px-3 mb-5">
           <a href="index.html" class="text-[red] font-extrabold text-lg whitespace-nowrap">REELSPOT</a>
            <button id="closeBtn" class="text-white text-2xl w-10 h-10 shrink-0 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10" aria-label="Toggle menu" aria-expanded="false"><i class="uil uil-bars"></i></button>
        </section><hr class="text-[gray] mx-3 mb-5">
        <ul id="items" class="text-white flex flex-col gap-2 px-3">
            <li><label data-nav="search" for="search" class="${navClass}" title="Search"><i class="uil uil-search text-2xl"></i>
                <input class="min-w-0 flex-1 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-white text-base font-normal p-1 [&::-webkit-search-cancel-button]:hidden" id="search" type="search" placeholder="Search..." autocomplete="off" aria-label="Search movies"></label></li>
            ${navLinks.map(link => `
            <li><a data-nav="${link.nav}" href="${link.href}" class="${navClass}${link.nav === page ? ' active' : ''}" title="${link.label}"><i class="uil ${link.icon} text-2xl"></i><p class="label">${link.label}</p></a></li>`).join('')}
            <li><button data-nav="profile" class="${navClass}" title="Profile"><i class="uil uil-user text-2xl"></i><p class="label">Profile</p></button></li>
        </ul>
    </aside>`);

  document.querySelector('main').insertAdjacentHTML('beforeend', `
    <footer class="text-white relative flex flex-row justify-center items-center lg:items-stretch overflow-hidden">
    <section class="bg-transparent w-full absolute inset-0 flex flex-col justify-center px-6 sm:px-10 z-10 lg:relative lg:bg-black lg:w-full">
        <h1 class="text-3xl sm:text-4xl font-bold mb-6 lg:mb-8">Stay Connected</h1>
        <p class="text-base sm:text-lg font-thin text-white lg:text-gray-300 mb-2">From cult classics to modern masterpieces.</p>
        <p class="text-base sm:text-lg font-thin text-white lg:text-gray-300 mb-6 lg:mb-8">Stay updated with the latest movies, news and articles from REELSPOT.</p>
        <form id="newsletter" class="flex flex-wrap gap-4 w-full max-w-md" novalidate>
            <input id="newsEmail" class="flex-1 min-w-[150px] border-0 border-b border-white bg-transparent focus:outline-none text-base sm:text-lg font-normal p-1" type="email" placeholder="Your Email" aria-label="Your email">
            <button class="w-28 cursor-pointer text-center border border-1 border-white text-white rounded-full text-base sm:text-lg p-1 hover:bg-white hover:text-black transition-colors" type="submit">Submit</button>
        </form>
        <p id="newsMsg" class="mt-4 text-sm sm:text-base min-h-6"></p>
    </section>
    <img class="grayscale brightness-50 lg:brightness-100 w-full h-90 object-cover lg:w-120 lg:relative" src="./img/footer.jpg" alt="">
    </footer>`);

  document.body.insertAdjacentHTML('beforeend', `
    <div id="profileModal" class="hidden fixed inset-0 z-50 bg-black/70 items-center justify-center p-4">
        <section class="bg-[#131313] text-white rounded-2xl w-full max-w-sm p-6 relative" role="dialog" aria-modal="true" aria-labelledby="profileName">
            <button id="profileClose" class="absolute top-4 right-4 text-2xl cursor-pointer" aria-label="Close profile"><i class="uil uil-times"></i></button>
            <div class="flex items-center gap-4 mb-6">
                <span id="avatarInitial" class="w-14 h-14 rounded-full bg-[#FF4E4E] flex items-center justify-center text-2xl font-bold">G</span>
                <div>
                    <p id="profileName" class="text-xl font-bold">Guest</p>
                    <a href="browse.html?list=favorites" class="text-gray-400 text-sm hover:text-white"><span id="favCount">0</span> favorites</a>
                </div>
            </div>
            <form id="profileForm">
                <label class="text-sm text-gray-400" for="nameInput">Display name</label>
                <input id="nameInput" class="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-white text-lg p-1" type="text" maxlength="30" placeholder="Your name">
                <button class="mt-6 w-full cursor-pointer border border-1 border-[#FF4E4E] text-[#FF4E4E] rounded-full text-lg p-2 hover:border-[#ff1b1b] hover:text-[#ff1b1b]" type="submit">Save</button>
            </form>
        </section>
    </div>

    <div id="trailerModal" class="hidden fixed inset-0 z-50 bg-black/85 items-center justify-center p-4">
        <section class="w-full max-w-4xl relative" role="dialog" aria-modal="true" aria-labelledby="trailerTitle">
            <div class="flex items-center justify-between mb-3 text-white">
                <p id="trailerTitle" class="text-lg md:text-xl font-bold truncate pr-4"></p>
                <button id="trailerClose" class="text-3xl cursor-pointer" aria-label="Close trailer"><i class="uil uil-times"></i></button>
            </div>
            <div id="trailerFrame" class="aspect-video w-full bg-black rounded-xl overflow-hidden"></div>
        </section>
    </div>`);
}

// ---------- Movie cards ----------
function movieCard(movie) {
  const isFav = favorites.includes(movie.id);
  return `
    <li class="movie-card relative group">
      <a class="block" href="${movieUrl(movie)}" aria-label="${escapeHtml(movie.title)}">
        <img class="rounded-lg w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]" src="${movie.poster}" alt="${escapeHtml(movie.title)} poster" loading="lazy">
        <p class="mt-2 text-sm text-gray-300 truncate">${escapeHtml(movie.title)}</p>
      </a>
      <button class="fav-btn${isFav ? ' is-fav' : ''} absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 text-white text-lg flex items-center justify-center cursor-pointer hover:bg-[#FF4E4E]"
        data-id="${movie.id}" aria-label="${isFav ? 'Remove from' : 'Add to'} favorites" aria-pressed="${isFav}">
        <i class="uil uil-star"></i>
      </button>
    </li>`;
}

const gridClass = 'movie-grid gap-4 px-6 sm:px-8 grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

// ---------- Favorites ----------
// Pages listen for this to redraw: document.addEventListener('favorites-change', ...)
function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
  save('reelspot-favorites', favorites);
  updateProfile();
  document.dispatchEvent(new CustomEvent('favorites-change', { detail: { id } }));
}

// Any element with .fav-btn[data-id] toggles that movie
document.addEventListener('click', event => {
  const favBtn = event.target.closest('.fav-btn[data-id]');
  if (favBtn) {
    event.preventDefault();
    toggleFavorite(favBtn.dataset.id);
  }
});

// A big "Add to Favorites" button: <button class="fav-btn" data-id="..."><i></i><span></span></button>
function updateFavButton(button, movie) {
  const isFav = favorites.includes(movie.id);
  button.dataset.id = movie.id;
  button.querySelector('span').textContent = isFav ? 'In Favorites' : 'Add to Favorites';
  button.classList.toggle('is-fav', isFav);
  button.setAttribute('aria-pressed', isFav);
}

// ---------- Trailer player ----------
function openTrailer(movie) {
  if (!movie.trailer) {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${movie.year || ''} trailer`)}`, '_blank', 'noopener');
    return;
  }
  const modal = document.querySelector('#trailerModal');
  document.querySelector('#trailerTitle').textContent = `${movie.title} — Trailer`;
  document.querySelector('#trailerFrame').innerHTML =
    `<iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0" title="${escapeHtml(movie.title)} trailer"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function closeTrailer() {
  const modal = document.querySelector('#trailerModal');
  document.querySelector('#trailerFrame').innerHTML = ''; // stops the video
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Any element with .trailer-btn[data-id] plays that movie's trailer
document.addEventListener('click', event => {
  const trailerBtn = event.target.closest('.trailer-btn[data-id]');
  if (trailerBtn) {
    event.preventDefault();
    openTrailer(findMovie(trailerBtn.dataset.id));
  }
});

// ---------- Profile ----------
function updateProfile() {
  document.querySelector('#profileName').textContent = profileName;
  document.querySelector('#avatarInitial').textContent = profileName.charAt(0).toUpperCase();
  document.querySelector('#favCount').textContent = favorites.length;
}
function openProfile() {
  const nameInput = document.querySelector('#nameInput');
  nameInput.value = profileName === 'Guest' ? '' : profileName;
  updateProfile();
  const modal = document.querySelector('#profileModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  nameInput.focus();
}
function closeProfile() {
  const modal = document.querySelector('#profileModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ---------- Sidebar ----------
let aside, close, overlay, menuBtn, search;

function openAside() {
  aside.classList.add('open-aside');
  close.setAttribute('aria-expanded', 'true');
  if (isMobile()) overlay.classList.remove('hidden');
}
function closeAside() {
  aside.classList.remove('open-aside');
  close.setAttribute('aria-expanded', 'false');
  overlay.classList.add('hidden');
}

// Pages that filter in place set this: onSearch = query => { ... }
// Without it, pressing Enter in the search box goes to the Browse page.
let onSearch = null;

function initLayout() {
  aside = document.querySelector('#asides');
  close = document.querySelector('#closeBtn');
  overlay = document.querySelector('#overlay');
  menuBtn = document.querySelector('#menuBtn');
  search = document.querySelector('#search');

  close.addEventListener('click', () => {
    aside.classList.contains('open-aside') ? closeAside() : openAside();
  });
  menuBtn.addEventListener('click', openAside);
  overlay.addEventListener('click', closeAside);

  // Desktop: clicking outside the expanded sidebar closes it
  document.addEventListener('click', event => {
    if (aside.classList.contains('open-aside') && !aside.contains(event.target) && !menuBtn.contains(event.target)) {
      closeAside();
    }
  });

  // Switching between desktop and mobile resets the sidebar
  window.matchMedia('(max-width: 767px)').addEventListener('change', closeAside);

  document.querySelector('[data-nav="search"]').addEventListener('click', () => {
    openAside();
    search.focus();
  });
  document.querySelector('[data-nav="profile"]').addEventListener('click', () => {
    closeAside();
    openProfile();
  });

  search.value = new URLSearchParams(location.search).get('q') || '';
  search.addEventListener('input', () => onSearch && onSearch(search.value.trim()));
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const query = search.value.trim();
    if (!onSearch) {
      location.href = `browse.html${query ? `?q=${encodeURIComponent(query)}` : ''}`;
      return;
    }
    const results = document.querySelector('#results');
    if (results) results.scrollIntoView({ behavior: 'smooth' });
    if (isMobile()) closeAside();
  });

  // Profile
  document.querySelector('#profileForm').addEventListener('submit', event => {
    event.preventDefault();
    profileName = document.querySelector('#nameInput').value.trim() || 'Guest';
    save('reelspot-name', profileName);
    updateProfile();
    closeProfile();
  });
  document.querySelector('#profileClose').addEventListener('click', closeProfile);
  document.querySelector('#profileModal').addEventListener('click', event => {
    if (event.target.id === 'profileModal') closeProfile();
  });

  // Trailer
  document.querySelector('#trailerClose').addEventListener('click', closeTrailer);
  document.querySelector('#trailerModal').addEventListener('click', event => {
    if (event.target.id === 'trailerModal') closeTrailer();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeTrailer();
      closeProfile();
      closeAside();
    }
  });

  // Newsletter (front-end only: nothing is sent)
  const newsletter = document.querySelector('#newsletter');
  const newsEmail = document.querySelector('#newsEmail');
  const newsMsg = document.querySelector('#newsMsg');
  newsletter.addEventListener('submit', event => {
    event.preventDefault();
    const email = newsEmail.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsMsg.textContent = 'Please enter a valid email address.';
      newsMsg.className = 'mt-4 text-sm sm:text-base min-h-6 text-[#FF4E4E]';
      return;
    }
    newsMsg.textContent = `Thanks for subscribing, ${email}!`;
    newsMsg.className = 'mt-4 text-sm sm:text-base min-h-6 text-green-400';
    newsletter.reset();
  });

  updateProfile();
}

renderLayout();
initLayout();
