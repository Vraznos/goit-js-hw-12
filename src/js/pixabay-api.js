import axios from 'axios';

const API_KEY = '44373607-23d837ad960924b19f5bc44a0';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    page: page,
    per_page: perPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params}`;

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.hits.length === 0) {
      throw new Error('No images found');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
