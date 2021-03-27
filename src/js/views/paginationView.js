import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages =
      this._data.results.length % this._data.resultsPerPage === 0
        ? this._data.results.length / this._data.resultsPerPage
        : Math.trunc(this._data.results.length / this._data.resultsPerPage) + 1;
    // Page 1, and there other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`;
    }

    // Other page
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // Page 1, and there are no numPages
    return '';
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnElement = e.target.closest('.btn--inline');
      if (!btnElement) return;
      const goToPage = +btnElement?.dataset?.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
