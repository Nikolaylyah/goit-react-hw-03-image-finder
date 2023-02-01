class SearchAPI {
  #baseUrl = 'https://pixabay.com/api/';
  #privatKey = '33289385-01f6fa596aad252f2f41fe083';
  #options = {
    imageType: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  #page = 1;
  #perPage = 12;

  constructor() {
    this.searchQuery = '';
  }

  async fetchSearch() {
    const response = await fetch(
      `${this.#baseUrl}?key=${this.#privatKey}&q=${
        this.searchQuery
      }&image_type=${this.#options.imageType}&orientation=${
        this.#options.orientation
      }&safesearch=${this.#options.safesearch}&page=${this.#page}&per_page=${
        this.#perPage
      }`,
    );

    const data = await response.json();
    this.#page += 1;

    return data;
  }

  resetPage() {
    this.#page = 1;
  }
}

const searchService = new SearchAPI();

export { searchService };
