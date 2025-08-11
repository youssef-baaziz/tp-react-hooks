import { useState, useEffect, useCallback } from 'react';

// Accepts a search term as argument
const useProductSearch = (search = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 40;

  // Fetch products with optional search
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const skip = (currentPage - 1) * itemsPerPage;
    let url = `https://api.daaif.net/products?skip=${skip}&limit=${itemsPerPage}&delay=1000`;
    if (search && search.trim() !== '') {
      url += `&q=${encodeURIComponent(search.trim())}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(Math.max(1, Math.ceil((data.total || 0) / itemsPerPage)));
    } catch (err) {
      setError(err.message || 'Erreur inconnue');
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, search]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const reload = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    setCurrentPage,
  };
};

export default useProductSearch;