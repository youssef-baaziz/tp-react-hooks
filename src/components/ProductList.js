import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ search }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useLanguage();
  const {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    setCurrentPage,
  } = useProductSearch(search);

  const t = {
    reload: language === 'fr' ? 'Recharger' : 'Reload',
    loading: language === 'fr' ? 'Chargement...' : 'Loading...',
    error: language === 'fr' ? 'Erreur' : 'Error',
    price: language === 'fr' ? 'Prix' : 'Price',
    previous: language === 'fr' ? 'Précédent' : 'Previous',
    next: language === 'fr' ? 'Suivant' : 'Next',
    page: language === 'fr' ? 'Page' : 'Page',
    of: language === 'fr' ? 'sur' : 'of',
    noProducts: language === 'fr' ? 'Aucun produit trouvé.' : 'No products found.',
  };

  const searchProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  console.log("searchProducts",searchProducts);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: 180 }}>
        <span className="spinner-border" role="status" aria-label={t.loading}></span>
        <span className="ms-3">{t.loading}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        <strong>{t.error}:</strong> {error}
        <button className="btn btn-link ms-3" onClick={reload}>
          {t.reload}
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h6 mb-0">{t.page} {currentPage} {t.of} {totalPages}</h2>
        <button
          className={`btn btn-outline-${isDarkTheme ? 'light' : 'dark'}`}
          onClick={reload}
          type="button"
        >
          <span role="img" aria-label="Reload" className="me-2">🔄</span>
          {t.reload}
        </button>
      </div>

      {searchProducts.length === 0 ? (
        <div className="alert alert-info text-center">{t.noProducts}</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {searchProducts.map(product => (
            <div key={product.id} className="col">
              <article
                className={`card h-100 shadow-sm border-0 ${isDarkTheme ? 'bg-dark text-light' : 'bg-white'}`}
                style={{ transition: 'box-shadow 0.2s' }}
              >
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: 200, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">{product.title}</h5>
                  <p className="card-text flex-grow-1" style={{ fontSize: '0.97rem' }}>
                    {product.description}
                  </p>
                  <div className="mt-2">
                    <span className="fw-bold">{t.price}:</span> {product.price}€
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      <nav className="mt-4" aria-label="Pagination">
        <ul className="pagination justify-content-center mb-0">
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={previousPage}
              disabled={currentPage === 1}
              aria-label={t.previous}
              type="button"
            >
              &laquo; {t.previous}
            </button>
          </li>
          {/* Render page numbers */}
          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNum = idx + 1;
            return (
              <li
                key={pageNum}
                className={`page-item${currentPage === pageNum ? ' active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (pageNum !== currentPage && typeof setCurrentPage === 'function') {
                      setCurrentPage(pageNum);
                    }
                  }}
                  disabled={currentPage === pageNum}
                  type="button"
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label={t.next}
              type="button"
            >
              {t.next} &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default ProductList;