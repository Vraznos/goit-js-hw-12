import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderImageGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(image => {
      return `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <p class="info-title">Likes</p>
            <p class="info-value">${image.likes}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Views</p>
            <p class="info-value">${image.views}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Comments</p>
            <p class="info-value">${image.comments}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Downloads</p>
            <p class="info-value">${image.downloads}</p>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function updateBtnStatus(page, maxPage, btnLoadMore) {
  if (page >= maxPage) {
    hideLoadMore(btnLoadMore);

    if (maxPage) {
      iziToast.info({
        title: 'The End!',
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } else {
    showLoadMore(btnLoadMore);
  }
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function showLoadMore(btnLoadMore) {
  btnLoadMore.classList.remove('active');
}
export function hideLoadMore(btnLoadMore) {
  btnLoadMore.classList.add('active');
}

export function showLoader(loader) {
  loader.classList.remove('hidden');
}
export function hideLoader(loader) {
  loader.classList.add('hidden');
}

export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
