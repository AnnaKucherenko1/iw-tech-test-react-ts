import { createContext, useContext, useEffect, useState } from 'react';
import { EstablishmentType, ProviderType } from '../types';

const AppContext = createContext<ProviderType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a FavoritesProvider');
  }
  return context;
};

export const AppProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<EstablishmentType[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [filtredId, setFiltredId] = useState('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (establishment: EstablishmentType) => {
    if (
      favorites.some((favorite) => favorite.FHRSID === establishment.FHRSID)
    ) {
      setFavorites(
        favorites.filter((favorite) => favorite.FHRSID !== establishment.FHRSID)
      );
    } else {
      setFavorites([...favorites, establishment]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        establishments,
        setEstablishments,
        filtredId,
        setFiltredId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
