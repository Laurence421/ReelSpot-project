const aside = document.querySelector('#asides');
const items = document.querySelector('#items');
const search = document.querySelector('#search');
const close = document.querySelector('#closeBtn')
const label = document.querySelectorAll('.label');
items.addEventListener('click', () => {
  aside.classList.add('open-aside');
  search.classList.add('openSearch');
  close.style.display = "flex";

  label.forEach( labels => {
    labels.style.display = "flex";
  });
  
});
close.addEventListener('click', () => {
  aside.classList.remove('open-aside');
  search.classList.remove('openSearch');
  close.style.display = "none";

  label.forEach( labels => {
    labels.style.display = "none";
  });
});



