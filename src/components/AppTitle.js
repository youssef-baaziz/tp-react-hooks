import { useLanguage } from '../LanguageContext';

const AppTitle = () => {
  const { language } = useLanguage();
  return (
    <h1 className="shop-title">
      {language === 'fr' ? 'Catalogue de Produits' : 'Product Catalog'}
    </h1>
  );
};

export default AppTitle;