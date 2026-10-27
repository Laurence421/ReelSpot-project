// Movie page: movie.html?id=<movie id>

const movie = findMovie(new URLSearchParams(location.search).get('id'));

if (!movie) {
  document.querySelector('#details').classList.add('hidden');
  document.querySelector('#details').nextElementSibling.classList.add('hidden');
  document.querySelector('#notFound').classList.remove('hidden');
  document.title = 'Movie not found · ReelSpot';
} else {
  document.title = `${movie.title} · ReelSpot`;
  document.querySelector('#backdrop').src = movie.poster;
  document.querySelector('#poster').src = movie.poster;
  document.querySelector('#poster').alt = `${movie.title} poster`;
  document.querySelector('#title').textContent = movie.title;
  document.querySelector('#meta').textContent = [movie.year, movie.runtime && `${movie.runtime} Min`].filter(Boolean).join(' | ');
  document.querySelector('#genres').innerHTML = genresOf(movie).map(genre =>
    `<a class="rounded-full px-3 py-1 text-sm border border-white/30 hover:border-white" href="browse.html?genre=${encodeURIComponent(genre)}">${escapeHtml(genre)}</a>`).join('');
  document.querySelector('#synopsis').textContent = movie.synopsis;
  document.querySelector('#director').textContent = movie.director ? `Director: ${movie.director}` : '';
  document.querySelector('#cast').textContent = movie.cast ? `Cast: ${movie.cast}` : '';
  document.querySelector('#watchBtn').dataset.id = movie.id;

  const favBtn = document.querySelector('#favBtn');
  updateFavButton(favBtn, movie);

  // ---------- Inline trailer: a thumbnail that loads the player on click ----------
  const inlineTrailer = document.querySelector('#inlineTrailer');
  if (movie.trailer) {
    inlineTrailer.innerHTML = `
      <button id="playInline" class="group w-full h-full cursor-pointer" aria-label="Play ${escapeHtml(movie.title)} trailer">
        <img class="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition" src="https://i.ytimg.com/vi/${movie.trailer}/hqdefault.jpg" alt="" loading="lazy">
        <span class="absolute inset-0 flex items-center justify-center">
          <span class="w-20 h-20 rounded-full bg-[#FF4E4E] text-white text-4xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"><i class="uil uil-play"></i></span>
        </span>
      </button>`;
    document.querySelector('#playInline').addEventListener('click', () => {
      inlineTrailer.innerHTML = `<iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0" title="${escapeHtml(movie.title)} trailer"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    });
  } else {
    inlineTrailer.className = 'w-full max-w-4xl rounded-xl bg-[#131313] p-8 text-gray-400';
    inlineTrailer.innerHTML = `No trailer saved for this movie yet. <a class="text-[#FF4E4E] hover:underline" target="_blank" rel="noopener"
      href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} trailer`)}">Search YouTube</a>`;
  }

  // ---------- More like this: most shared genres first ----------
  const myGenres = genresOf(movie);
  const similarGrid = document.querySelector('#similarGrid');
  similarGrid.className = gridClass;
  function renderSimilar() {
    similarGrid.innerHTML = movies
      .filter(other => other.id !== movie.id)
      .map(other => ({ other, shared: genresOf(other).filter(genre => myGenres.includes(genre)).length }))
      .filter(item => item.shared > 0)
      .sort((a, b) => b.shared - a.shared || (b.other.year || 0) - (a.other.year || 0))
      .slice(0, 6)
      .map(item => movieCard(item.other))
      .join('');
  }
  renderSimilar();

  document.addEventListener('favorites-change', () => {
    updateFavButton(favBtn, movie);
    renderSimilar();
  });

  // ---------- Share ----------
  const shareBtn = document.querySelector('#shareBtn');
  shareBtn.addEventListener('click', async () => {
    const url = location.href;
    try {
      if (navigator.share && isMobile()) {
        await navigator.share({ title: movie.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      shareBtn.querySelector('span').textContent = 'Link copied!';
    } catch {
      shareBtn.querySelector('span').textContent = 'Copy the address bar link';
    }
    setTimeout(() => (shareBtn.querySelector('span').textContent = 'Share'), 2000);
  });
}
