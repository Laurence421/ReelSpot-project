// ---------- Movie data ----------
// lists: which grids the movie appears in ("recent", "top")
const movies = [
  { id: 'avatar', title: 'Avatar: Fire and Ash', poster: './img/avatar.jpg', genre: 'Sci-Fi, Adventure, Action', year: 2025, runtime: 197,
    synopsis: "Jake Sully and Neytiri's family face a new threat on Pandora: the aggressive Ash People, a Na'vi clan led by the fierce Varang.",
    director: 'James Cameron', cast: 'Sam Worthington, Zoe Saldaña, Sigourney Weaver, Stephen Lang, Oona Chaplin', lists: ['recent'] },
  { id: 'coco', title: 'Coco', poster: './img/coco.jpg', genre: 'Animation, Family, Fantasy', year: 2017, runtime: 105,
    synopsis: 'Aspiring musician Miguel enters the colorful Land of the Dead to find his great-great-grandfather, a legendary singer.',
    director: 'Lee Unkrich', cast: 'Anthony Gonzalez, Gael García Bernal, Benjamin Bratt, Alanna Ubach', lists: ['recent', 'top'] },
  { id: 'fastx', title: 'Fast X', poster: './img/f10.jpg', genre: 'Action, Crime, Thriller', year: 2023, runtime: 141,
    synopsis: "Dom Toretto and his family are targeted by Dante Reyes, the vengeful son of a drug lord they took down years ago.",
    director: 'Louis Leterrier', cast: 'Vin Diesel, Michelle Rodriguez, Jason Momoa, Tyrese Gibson, John Cena', lists: ['recent'] },
  { id: 'furiosa', title: 'Furiosa: A Mad Max Saga', poster: './img/furiosa.jpg', genre: 'Action, Adventure, Sci-Fi', year: 2024, runtime: 148,
    synopsis: 'Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of the warlord Dementus and fights to find her way home.',
    director: 'George Miller', cast: 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke', lists: ['recent'] },
  { id: 'goodboys', title: 'Good Boys', poster: './img/goodboys.jpg', genre: 'Comedy', year: 2019, runtime: 90,
    synopsis: 'Three sixth-grade best friends skip school and set off on an epic journey to replace a drone they broke.',
    director: 'Gene Stupnitsky', cast: 'Jacob Tremblay, Keith L. Williams, Brady Noon', lists: ['recent'] },
  { id: 'gandhitalks', title: 'Gandhi Talks', poster: './img/grandhitalks.jpg', genre: 'Comedy, Drama', year: 2026,
    synopsis: 'A silent dark comedy in which money, and the faces printed on it, speak louder than words.',
    director: 'Kishor Pandurang Belekar', cast: 'Vijay Sethupathi, Arvind Swamy, Aditi Rao Hydari, Siddharth Jadhav', lists: ['recent'] },
  { id: 'hexed', title: 'Hexed', poster: './img/hexed.jpg', genre: 'Animation, Fantasy, Comedy', year: 2026,
    synopsis: 'A magical new adventure from Walt Disney Animation Studios.',
    director: 'Josie Trinidad, Jason Hand', lists: ['recent'] },
  { id: 'mandalorian', title: 'The Mandalorian and Grogu', poster: './img/mandalorian.jpg', genre: 'Sci-Fi, Adventure, Action', year: 2026,
    synopsis: 'The Mandalorian and his apprentice Grogu take on a dangerous new mission as the New Republic fights the remnants of the Empire.',
    director: 'Jon Favreau', cast: 'Pedro Pascal, Sigourney Weaver, Jeremy Allen White', lists: ['recent'] },
  { id: 'minecraft', title: 'A Minecraft Movie', poster: './img/mincraft.jpg', genre: 'Adventure, Comedy, Fantasy', year: 2025, runtime: 101,
    synopsis: 'Four misfits are pulled through a portal into the Overworld, a cubic world that thrives on imagination, and must master it to get home.',
    director: 'Jared Hess', cast: 'Jason Momoa, Jack Black, Danielle Brooks, Emma Myers, Sebastian Hansen', lists: ['recent'] },
  { id: 'minions', title: 'Minions & Monsters', poster: './img/mions.jpg', genre: 'Animation, Comedy', year: 2026,
    synopsis: 'The Minions try to make it big in Hollywood and accidentally unleash real monsters.',
    director: 'Pierre Coffin', lists: ['recent'] },
  { id: 'moana', title: 'Moana', poster: './img/moana.jpg', genre: 'Adventure, Family, Musical', year: 2026,
    synopsis: 'In this live-action retelling, a daring young voyager sets sail across the ocean with the demigod Maui to save her people.',
    director: 'Thomas Kail', cast: "Catherine Laga'aia, Dwayne Johnson", lists: ['recent'] },
  { id: 'onemile', title: 'One Mile: Chapter Two', poster: './img/onemile.jpg', genre: 'Action, Thriller',
    synopsis: 'Ryan Phillippe returns in the second chapter of the One Mile action thriller.',
    cast: 'Ryan Phillippe', lists: ['recent'] },

  { id: 'regrettingyou', title: 'Regretting You', poster: './img/regretingyou.jpg', genre: 'Drama, Romance', year: 2025,
    synopsis: 'A mother and her teenage daughter struggle to reconnect after a tragic accident reveals a shocking betrayal.',
    director: 'Josh Boone', cast: 'Allison Williams, Mckenna Grace, Dave Franco, Mason Thames', lists: ['top'] },
  { id: 'snowwhite', title: 'Snow White', poster: './img/snowwhite.jpg', genre: 'Fantasy, Family, Musical', year: 2025, runtime: 109,
    synopsis: "A princess joins forces with seven dwarfs and a band of rebels to free her kingdom from the Evil Queen.",
    director: 'Marc Webb', cast: 'Rachel Zegler, Gal Gadot, Andrew Burnap', lists: ['top'] },
  { id: 'spongebob', title: 'The SpongeBob Movie: Search for SquarePants', poster: './img/spongebob.jpg', genre: 'Animation, Comedy, Adventure', year: 2025,
    synopsis: 'Desperate to prove he is a big guy, SpongeBob follows the ghostly Flying Dutchman on a swashbuckling quest to the depths of the sea.',
    director: 'Derek Drymon', cast: 'Tom Kenny, Bill Fagerbakke, Clancy Brown, Mark Hamill', lists: ['top'] },
  { id: 'odyssey', title: 'The Odyssey', poster: './img/the odyssey.jpg', genre: 'Action, Adventure, Fantasy', year: 2026,
    synopsis: 'After the Trojan War, the Greek king Odysseus makes a long and perilous journey home.',
    director: 'Christopher Nolan', cast: "Matt Damon, Tom Holland, Anne Hathaway, Zendaya, Lupita Nyong'o", lists: ['top'] },
  { id: 'thunderbolts', title: 'Thunderbolts*', poster: './img/thunderbolts.jpg', genre: 'Action, Adventure, Superhero', year: 2025, runtime: 127,
    synopsis: 'A team of unconventional antiheroes is caught in a deadly trap and forced on a dangerous mission that makes them confront their pasts.',
    director: 'Jake Schreier', cast: 'Florence Pugh, Sebastian Stan, David Harbour, Wyatt Russell, Lewis Pullman', lists: ['top'] },
  { id: 'wakanda', title: 'Black Panther: Wakanda Forever', poster: './img/wakanda.jpg', genre: 'Action, Adventure, Drama', year: 2022, runtime: 161,
    synopsis: "After King T'Challa's death, Wakanda's leaders fight to protect their nation from intervening world powers and a hidden undersea kingdom.",
    director: 'Ryan Coogler', cast: "Letitia Wright, Angela Bassett, Lupita Nyong'o, Danai Gurira, Tenoch Huerta", lists: ['top'] },
  { id: 'wardriver', title: 'Wardriver', poster: './img/wardrive.jpg', genre: 'Thriller',
    synopsis: 'A tense thriller where a drive turns into a fight for survival.', lists: ['top'] },
  { id: 'zoolander', title: 'Zoolander', poster: './img/zoolander.jpg', genre: 'Comedy', year: 2001, runtime: 89,
    synopsis: 'Dim-witted supermodel Derek Zoolander is brainwashed into becoming an assassin as part of a fashion-industry conspiracy.',
    director: 'Ben Stiller', cast: 'Ben Stiller, Owen Wilson, Will Ferrell, Christine Taylor', lists: ['top'] },
  { id: 'getout', title: 'Get Out', poster: './img/getout movie.webp', genre: 'Horror, Mystery, Thriller', year: 2017, runtime: 104,
    synopsis: "When Chris, a young African-American man, visits his white girlfriend's family estate, he becomes ensnared in the more sinister, real reason for the invitation.",
    director: 'Jordan Peele', cast: 'Daniel Kaluuya, Allison Williams, Bradley Whitford, Catherine Keener', lists: ['top'] },
  { id: 'quietplace', title: 'A Quiet Place: Day One', poster: './img/quiteplace.jpg', genre: 'Horror, Sci-Fi, Thriller', year: 2024, runtime: 99,
    synopsis: 'A young woman fights to survive in New York City on the day the world went quiet, when sound-hunting creatures invade.',
    director: 'Michael Sarnoski', cast: "Lupita Nyong'o, Joseph Quinn, Alex Wolff, Djimon Hounsou", lists: ['top'] },
  { id: 'shangchi', title: 'Shang-Chi and the Legend of the Ten Rings', poster: './img/shang-chi.jpg', genre: 'Action, Adventure, Fantasy', year: 2021, runtime: 132,
    synopsis: 'Martial-arts master Shang-Chi confronts the past he thought he left behind when he is drawn into the web of the Ten Rings organization.',
    director: 'Destin Daniel Cretton', cast: 'Simu Liu, Awkwafina, Tony Leung, Michelle Yeoh', lists: ['top'] },
];

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
let currentMovie = movies.find(movie => movie.id === 'getout');
let view = 'movies';

// ---------- Elements ----------
const aside = document.querySelector('#asides');
const items = document.querySelector('#items');
const search = document.querySelector('#search');
const close = document.querySelector('#closeBtn');
const menuBtn = document.querySelector('#menuBtn');
const overlay = document.querySelector('#overlay');
const navItems = document.querySelectorAll('.nav-item');

const heroImg = document.querySelector('#heroImg');
const heroPoster = document.querySelector('#heroPoster');
const heroTitle = document.querySelector('#heroTitle');
const heroMeta = document.querySelector('#heroMeta');
const heroSynopsis = document.querySelector('#heroSynopsis');
const heroDirector = document.querySelector('#heroDirector');
const heroCast = document.querySelector('#heroCast');
const watchBtn = document.querySelector('#watchBtn');
const heroFav = document.querySelector('#heroFav');

const recentSection = document.querySelector('#recentSection');
const topSection = document.querySelector('#topSection');
const favoritesSection = document.querySelector('#favoritesSection');
const recentGrid = document.querySelector('#recentGrid');
const topGrid = document.querySelector('#topGrid');
const favoritesGrid = document.querySelector('#favoritesGrid');
const favEmpty = document.querySelector('#favEmpty');
const noResults = document.querySelector('#noResults');
const noResultsQuery = document.querySelector('#noResultsQuery');

const profileModal = document.querySelector('#profileModal');
const profileClose = document.querySelector('#profileClose');
const profileForm = document.querySelector('#profileForm');
const nameInput = document.querySelector('#nameInput');

const newsletter = document.querySelector('#newsletter');
const newsEmail = document.querySelector('#newsEmail');
const newsMsg = document.querySelector('#newsMsg');

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

// ---------- Sidebar ----------
function openAside() {
  aside.classList.add('open-aside');
  if (isMobile()) overlay.classList.remove('hidden');
}
function closeAside() {
  aside.classList.remove('open-aside');
  overlay.classList.add('hidden');
}

items.addEventListener('click', () => {
  if (!isMobile()) openAside();
});
close.addEventListener('click', closeAside);
menuBtn.addEventListener('click', openAside);
overlay.addEventListener('click', closeAside);

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.nav;
    if (target === 'search') {
      openAside();
      search.focus();
      return;
    }
    if (target === 'profile') {
      openProfile();
    } else {
      setView(target);
      document.querySelector('#movies').scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile()) closeAside();
  });
});

function setView(newView) {
  view = newView;
  navItems.forEach(item => item.classList.toggle('active', item.dataset.nav === view));
  renderGrids();
}

// ---------- Movie cards ----------
function movieCard(movie) {
  const isFav = favorites.includes(movie.id);
  const selected = movie.id === currentMovie.id ? ' selected' : '';
  return `
    <li class="movie-card${selected} relative group">
      <button class="show-btn block w-full cursor-pointer text-left" data-id="${movie.id}" aria-label="Show details for ${movie.title}">
        <img class="rounded-lg w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]" src="${movie.poster}" alt="${movie.title} poster" loading="lazy">
        <p class="mt-2 text-sm text-gray-300 truncate">${movie.title}</p>
      </button>
      <button class="fav-btn${isFav ? ' is-fav' : ''} absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 text-white text-lg flex items-center justify-center cursor-pointer hover:bg-[#FF4E4E]"
        data-id="${movie.id}" aria-label="${isFav ? 'Remove from' : 'Add to'} favorites" aria-pressed="${isFav}">
        <i class="uil uil-star"></i>
      </button>
    </li>`;
}

function matches(movie, query) {
  if (!query) return true;
  const text = [movie.title, movie.genre, movie.director, movie.cast].join(' ').toLowerCase();
  return text.includes(query);
}

function renderGrids() {
  const query = search.value.trim().toLowerCase();
  const recent = movies.filter(movie => movie.lists.includes('recent') && matches(movie, query));
  const top = movies.filter(movie => movie.lists.includes('top') && matches(movie, query));
  const favs = movies.filter(movie => favorites.includes(movie.id) && matches(movie, query));

  recentGrid.innerHTML = recent.map(movieCard).join('');
  topGrid.innerHTML = top.map(movieCard).join('');
  favoritesGrid.innerHTML = favs.map(movieCard).join('');

  const showFavorites = view === 'favorites';
  favoritesSection.classList.toggle('hidden', !showFavorites);
  recentSection.classList.toggle('hidden', showFavorites || recent.length === 0);
  topSection.classList.toggle('hidden', showFavorites || top.length === 0);
  favEmpty.classList.toggle('hidden', !showFavorites || favorites.length > 0);

  const visibleCount = showFavorites ? favs.length : recent.length + top.length;
  const noMatch = query && visibleCount === 0 && !(showFavorites && favorites.length === 0);
  noResults.classList.toggle('hidden', !noMatch);
  noResultsQuery.textContent = search.value.trim();
}

document.querySelector('#movies').addEventListener('click', event => {
  const favBtn = event.target.closest('.fav-btn');
  const showBtn = event.target.closest('.show-btn');
  if (favBtn) {
    toggleFavorite(favBtn.dataset.id);
  } else if (showBtn) {
    showMovie(movies.find(movie => movie.id === showBtn.dataset.id));
    document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
  }
});

// ---------- Hero (featured movie) ----------
function showMovie(movie) {
  currentMovie = movie;
  heroImg.src = movie.poster;
  heroImg.alt = movie.title;
  heroPoster.src = movie.poster;
  heroPoster.alt = `${movie.title} poster`;
  heroTitle.textContent = movie.title;
  heroMeta.textContent = [movie.genre, movie.year, movie.runtime && `${movie.runtime} Min`].filter(Boolean).join(' | ');
  heroSynopsis.textContent = movie.synopsis;
  heroDirector.textContent = movie.director ? `Director: ${movie.director}` : '';
  heroDirector.classList.toggle('hidden', !movie.director);
  heroCast.textContent = movie.cast ? `Cast: ${movie.cast}` : '';
  watchBtn.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${movie.year || ''} official trailer`)}`;
  updateHeroFav();
  renderGrids();
}

function updateHeroFav() {
  const isFav = favorites.includes(currentMovie.id);
  heroFav.querySelector('span').textContent = isFav ? 'In Favorites' : 'Add to Favorites';
  heroFav.classList.toggle('fav-btn', true);
  heroFav.classList.toggle('is-fav', isFav);
  heroFav.setAttribute('aria-pressed', isFav);
}

heroFav.addEventListener('click', () => toggleFavorite(currentMovie.id));

// ---------- Favorites ----------
function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
  save('reelspot-favorites', favorites);
  updateHeroFav();
  updateProfile();
  renderGrids();
}

// ---------- Search ----------
search.addEventListener('input', renderGrids);
search.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    document.querySelector('#movies').scrollIntoView({ behavior: 'smooth' });
    if (isMobile()) closeAside();
  }
});

// ---------- Profile ----------
function updateProfile() {
  document.querySelector('#profileName').textContent = profileName;
  document.querySelector('#avatarInitial').textContent = profileName.charAt(0).toUpperCase();
  document.querySelector('#favCount').textContent = favorites.length;
}
function openProfile() {
  nameInput.value = profileName === 'Guest' ? '' : profileName;
  updateProfile();
  profileModal.classList.remove('hidden');
  profileModal.classList.add('flex');
  nameInput.focus();
}
function closeProfile() {
  profileModal.classList.add('hidden');
  profileModal.classList.remove('flex');
}

profileForm.addEventListener('submit', event => {
  event.preventDefault();
  profileName = nameInput.value.trim() || 'Guest';
  save('reelspot-name', profileName);
  updateProfile();
  closeProfile();
});
profileClose.addEventListener('click', closeProfile);
profileModal.addEventListener('click', event => {
  if (event.target === profileModal) closeProfile();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeProfile();
    closeAside();
  }
});

// ---------- Newsletter ----------
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

// ---------- Start ----------
showMovie(currentMovie);
updateProfile();
