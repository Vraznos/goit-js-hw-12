import { fetchImages } from './js/pixabay-api.js';
import {
  renderImageGallery,
  showError,
  showLoadMore,
  hideLoadMore,
  showLoader,
  hideLoader,
  updateBtnStatus,
  smoothScroll,
} from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="query"]');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const btnLoadMore = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
let maxPage = 1;
let perPage = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();

  if (query === '') {
    showError('Please enter a search query.');
    hideLoadMore(btnLoadMore);
    return;
  }

  page = 1;

  showLoader(loader);
  hideLoadMore(btnLoadMore);
  gallery.innerHTML = '';

  try {
    const data = await fetchImages(query, page, perPage);
    maxPage = Math.ceil(data.totalHits / perPage);

    if (maxPage === 0) {
      showError('Empty Result');
      hideLoader(loader);
      updateBtnStatus(page, maxPage, btnLoadMore);
      return;
    }

    if (data.hits.length === 0) {
      gallery.innerHTML = '';
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    showLoadMore(btnLoadMore);
    renderImageGallery(data.hits);
  } catch (error) {
    gallery.innerHTML = '';
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader(loader);
  }

  form.reset();
});

btnLoadMore.addEventListener('click', async () => {
  page++;
  hideLoadMore(btnLoadMore);
  showLoader(loader);

  try {
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0) {
      showError('No more images found');
      return;
    }

    renderImageGallery(data.hits);
  } catch (error) {
    gallery.innerHTML = '';
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader(loader);
    updateBtnStatus(page, maxPage, btnLoadMore);
    smoothScroll();
  }
});
